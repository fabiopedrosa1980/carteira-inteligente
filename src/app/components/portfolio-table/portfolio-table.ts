import { Component, EventEmitter, Input, Output, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Stock } from '../../models/stock.model';
import { saldo, custo, variacaoPosicao, rentabilidade } from '../../models/position.util';
import { PrecoTetoResult, Zona } from '../../models/preco-teto.util';
import { PrecoTetoService } from '../../services/preco-teto.service';

type SortField =
  | 'name'
  | 'price'
  | 'precoAtual'
  | 'change'
  | 'qty'
  | 'saldo'
  | 'variacao'
  | 'rentabilidade'
  | 'zona';

const PAGE_SIZE = 10;

/**
 * Tabela de ativos agrupada (Ações/FIIs/ETFs) com ordenação, paginação por grupo
 * e a coluna de oportunidade (preço-teto / distância do topo do ETF). Extraída do
 * dashboard: recebe as posições via input e emite seleção de ativo e pedido de
 * novo lançamento; os cálculos de preço-teto ficam encapsulados aqui.
 */
@Component({
  selector: 'app-portfolio-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './portfolio-table.html',
  styleUrls: ['./portfolio-table.scss'],
})
export class PortfolioTableComponent {
  private readonly precoTetoSvc = inject(PrecoTetoService);

  // Posições da carteira (vindas do dashboard).
  private readonly _stocks = signal<Stock[]>([]);
  @Input() set stocks(value: Stock[]) {
    this._stocks.set(value ?? []);
  }

  // Oculta os valores em R$ (acompanha o botão olho do header).
  @Input() hideValues = false;

  // Clique numa linha → abre o detalhe do ativo (modal vive no dashboard).
  @Output() selectStock = new EventEmitter<Stock>();
  // Botão "Adicionar" do acordeão → abre o modal de lançamento para o grupo.
  @Output() addTransaction = new EventEmitter<string>();

  // ---- Grupos de ativos ----
  readonly groups = ['Ações', 'FII', 'ETF'] as const;
  readonly groupLabels: Record<string, string> = {
    Ações: 'Ações',
    FII: 'FIIs',
    ETF: 'ETFs',
  };

  readonly collapsed = signal<Set<string>>(new Set());

  toggle(g: string): void {
    this.collapsed.update((set) => {
      const next = new Set(set);
      if (next.has(g)) next.delete(g);
      else next.add(g);
      return next;
    });
  }

  isCollapsed(g: string): boolean {
    return this.collapsed().has(g);
  }

  stocksForGroup(g: string): Stock[] {
    return this.sortedStocks().filter((s) => s.sector === g);
  }

  // ---- Agregados por tipo (cabeçalho do acordeão) ----
  // Total do tipo = somatório do saldo (valor atual) das posições.
  groupSaldo(g: string): number {
    return this.stocksForGroup(g).reduce((sum, s) => sum + (saldo(s) ?? 0), 0);
  }
  private groupCusto(g: string): number {
    return this.stocksForGroup(g).reduce((sum, s) => sum + (custo(s) ?? 0), 0);
  }
  // Rentabilidade agregada = (saldo total − custo total) / custo total × 100.
  groupRentabilidade(g: string): number | null {
    const c = this.groupCusto(g);
    if (c <= 0) return null;
    return ((this.groupSaldo(g) - c) / c) * 100;
  }

  // ---- Paginação por grupo ----
  private readonly groupPages = signal<Record<string, number>>({});

  totalPages(g: string): number {
    return Math.max(1, Math.ceil(this.stocksForGroup(g).length / PAGE_SIZE));
  }

  pageOf(g: string): number {
    return Math.min(this.groupPages()[g] ?? 0, this.totalPages(g) - 1);
  }

  showPager(g: string): boolean {
    return this.stocksForGroup(g).length > PAGE_SIZE;
  }

  pagedFor(g: string): Stock[] {
    const start = this.pageOf(g) * PAGE_SIZE;
    return this.stocksForGroup(g).slice(start, start + PAGE_SIZE);
  }

  prevPage(g: string): void {
    const p = this.pageOf(g);
    if (p > 0) this.groupPages.update((m) => ({ ...m, [g]: p - 1 }));
  }

  nextPage(g: string): void {
    const p = this.pageOf(g);
    if (p < this.totalPages(g) - 1) this.groupPages.update((m) => ({ ...m, [g]: p + 1 }));
  }

  // ---- Cálculos de posição ----
  saldoOf(s: Stock): number | null {
    return saldo(s);
  }
  variacaoOf(s: Stock): number | null {
    return variacaoPosicao(s);
  }
  rentabilidadeOf(s: Stock): number | null {
    return rentabilidade(s);
  }
  abs(n: number): number {
    return Math.abs(n);
  }

  // ---- Preço-teto / Zona de compra ----
  // Cálculo delegado ao serviço compartilhado (mesma fonte usada pelo modal de
  // detalhe do ativo).
  precoTetoOf(s: Stock): PrecoTetoResult {
    return this.precoTetoSvc.of(s);
  }

  zonaOf(s: Stock): Zona {
    return this.precoTetoOf(s).zona;
  }

  // Limiares da distância do preço até a máxima de 52 semanas (o "teto" do ETF),
  // em fração negativa (preço abaixo do topo): a menos de 7% abaixo = caro; entre
  // 7% e 15% abaixo = justo; mais de 15% abaixo = oportunidade.
  private static readonly ETF_TOP_NEAR = -0.07;
  private static readonly ETF_TOP_FAR = -0.15;

  // Oportunidade do ETF: usa a máxima de 52 semanas como referência de "caro"
  // (paralelo ao preço-teto das ações). desvioTopo = (atual − máx) / máx
  // (negativo quando abaixo do topo). available=false sem máxima válida/preço ≤ 0.
  etfOportunidade(s: Stock): {
    available: boolean;
    zona: Zona;
    high52: number;
    low52: number;
    price: number;
    desvioTopo: number;
  } {
    const price = s.price ?? 0;
    const high = s.high52 ?? 0;
    const low = s.low52 ?? 0;
    if (!(price > 0) || !(high > 0)) {
      return { available: false, zona: 'na', high52: high, low52: low, price, desvioTopo: 0 };
    }
    const desvioTopo = (price - high) / high;
    let zona: Zona;
    if (desvioTopo > PortfolioTableComponent.ETF_TOP_NEAR) zona = 'caro';
    else if (desvioTopo < PortfolioTableComponent.ETF_TOP_FAR) zona = 'compra';
    else zona = 'justo';
    return { available: true, zona, high52: high, low52: low, price, desvioTopo };
  }

  // Faixa lateral do ETF = oportunidade pela distância até a máxima de 52 semanas.
  private etfZonaClass(s: Stock): string {
    return 'zona-' + this.etfOportunidade(s).zona;
  }

  // Classe CSS da faixa lateral (cor do semáforo). ETF usa distância da máxima de
  // 52 semanas; demais classes seguem a zona de preço-teto.
  zonaClass(s: Stock): string {
    if (s.sector === 'ETF') return this.etfZonaClass(s);
    return 'zona-' + this.zonaOf(s);
  }

  // Badge da coluna "Oportunidade": semáforo + desconto/ágio vs teto
  // (ex.: "🟢 −18%"). ETF usa a distância da máxima de 52 semanas.
  oportunidadeBadge(s: Stock): string {
    if (s.sector === 'ETF') return this.etfBadge(s);
    const r = this.precoTetoOf(s);
    if (r.zona === 'na') return 'n/a';
    if (r.zona === 'sem-dados' || r.descontoPct === null) return '⚪ —';
    const emoji = r.zona === 'compra' ? '🟢' : r.zona === 'justo' ? '🟡' : '🔴';
    const pct = Math.round(r.descontoPct * 100);
    return `${emoji} ${pct >= 0 ? '+' : '−'}${Math.abs(pct)}%`;
  }

  // Badge do ETF: emoji da zona + distância do topo (ex.: "🟢 −22%"). "n/a" quando
  // não há máxima de 52 semanas válida.
  private etfBadge(s: Stock): string {
    const o = this.etfOportunidade(s);
    if (!o.available) return 'n/a';
    const emoji = o.zona === 'compra' ? '🟢' : o.zona === 'justo' ? '🟡' : '🔴';
    const pct = Math.round(o.desvioTopo * 100);
    return `${emoji} ${pct >= 0 ? '+' : '−'}${Math.abs(pct)}%`;
  }

  // Veredito do ETF por extenso, para o topo do tooltip de oportunidade.
  private static readonly ETF_VEREDICTO: Record<Zona, string> = {
    compra: '🟢 Oportunidade — longe do topo',
    justo: '🟡 Preço justo / perto',
    caro: '🔴 Caro — perto do topo',
    'sem-dados': '⚪ Sem dados de 52 semanas',
    na: '⚪ Sem dados de 52 semanas',
  };
  etfVeredicto(s: Stock): string {
    return PortfolioTableComponent.ETF_VEREDICTO[this.etfOportunidade(s).zona];
  }

  // Veredito da zona (semáforo) por extenso, espelhando a tela de detalhe —
  // usado no topo do tooltip de oportunidade.
  private static readonly ZONA_LABEL: Record<Zona, string> = {
    compra: '🟢 Zona de compra',
    justo: '🟡 Preço justo / perto',
    caro: '🔴 Caro',
    'sem-dados': '⚪ Sem dados',
    na: 'n/a (ETF)',
  };
  zonaLabel(z: Zona): string {
    return PortfolioTableComponent.ZONA_LABEL[z];
  }

  // Desconto/ágio vs teto formatado (ex.: "−18%" / "+10%"), espelhando o
  // helper da tela de detalhe — usado no tooltip de oportunidade.
  descontoLabel(pct: number | null): string {
    if (pct === null) return '—';
    const v = Math.round(pct * 100);
    return (v >= 0 ? '+' : '−') + Math.abs(v) + '%';
  }

  // DY atual formatado como percentual; "—" quando ausente/zero.
  dyLabel(s: Stock): string {
    const dy = s.dividendYield;
    if (!dy || dy <= 0) return '—';
    return dy.toLocaleString('pt-BR', { maximumFractionDigits: 1, minimumFractionDigits: 1 }) + '%';
  }

  // ---- Ordenação ----
  sortField = signal<SortField>('name');
  sortAsc = signal(true);

  setSort(field: SortField) {
    if (this.sortField() === field) {
      this.sortAsc.update((v) => !v);
    } else {
      this.sortField.set(field);
      // Métricas onde "maior é melhor" iniciam em ordem decrescente.
      this.sortAsc.set(!['change', 'saldo', 'variacao', 'rentabilidade'].includes(field));
    }
    // Reinicia páginas ao mudar ordenação.
    this.groupPages.set({});
  }

  sortedStocks = computed(() => {
    const list = [...this._stocks()];
    const field = this.sortField();
    const asc = this.sortAsc();
    return list.sort((a, b) => {
      let cmp = 0;
      if (field === 'name') cmp = a.name.localeCompare(b.name, 'pt-BR');
      else if (field === 'price') cmp = (a.avgPrice ?? 0) - (b.avgPrice ?? 0);
      else if (field === 'precoAtual') cmp = (a.price ?? 0) - (b.price ?? 0);
      else if (field === 'change') cmp = a.changePercent - b.changePercent;
      else if (field === 'qty') cmp = (a.quantity ?? 0) - (b.quantity ?? 0);
      else if (field === 'saldo') cmp = (saldo(a) ?? 0) - (saldo(b) ?? 0);
      else if (field === 'variacao') cmp = (variacaoPosicao(a) ?? 0) - (variacaoPosicao(b) ?? 0);
      else if (field === 'rentabilidade') cmp = (rentabilidade(a) ?? 0) - (rentabilidade(b) ?? 0);
      // Zona: ordena por oportunidade (mais barato primeiro). Não-ETF usa desconto
      // vs teto; ETF usa a distância da máxima de 52 sem. Sem dados ao fim.
      else if (field === 'zona') {
        const key = (s: Stock) => {
          if (s.sector === 'ETF') {
            const o = this.etfOportunidade(s);
            return o.available ? o.desvioTopo : Number.POSITIVE_INFINITY;
          }
          return this.precoTetoOf(s).descontoPct ?? Number.POSITIVE_INFINITY;
        };
        cmp = key(a) - key(b);
      }
      return asc ? cmp : -cmp;
    });
  });
}
