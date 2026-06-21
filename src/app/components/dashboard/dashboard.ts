import { Component, computed, signal, Signal, inject, effect, untracked } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { StockDataService } from '../../services/stock-data.service';
import { BackendApiService, ApiAcaoItem, ApiTransaction } from '../../services/backend-api.service';
import { AuthService } from '../../services/auth.service';
import { TransactionService } from '../../services/transaction.service';
import { MetasService } from '../../services/metas.service';
import { StockCardComponent } from '../stock-card/stock-card';
import { StockDetailsModalComponent } from '../stock-details-modal/stock-details-modal';
import { AddStockModalComponent } from '../add-stock-modal/add-stock-modal';
import { MyAssetsComponent } from '../my-assets/my-assets';
import { GoalsComponent } from '../goals/goals';
import { DividendsComponent } from '../dividends/dividends';
import { Stock } from '../../models/stock.model';
import { saldo, custo, variacaoPosicao, rentabilidade } from '../../models/position.util';

type SortField = 'name' | 'price' | 'change' | 'qty' | 'saldo' | 'variacao' | 'rentabilidade';
type ViewMode = 'cards' | 'list';

const THEME_KEY = 'ci-theme';
const PAGE_SIZE = 10;

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    StockCardComponent,
    StockDetailsModalComponent,
    AddStockModalComponent,
    MyAssetsComponent,
    GoalsComponent,
    DividendsComponent,
  ],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss'],
})
export class DashboardComponent {
  private readonly api = inject(BackendApiService);
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);
  private readonly transactionSvc = inject(TransactionService);
  private readonly metasSvc = inject(MetasService);

  readonly user = this.auth.user;

  logout(): void {
    this.auth.signOut();
    this.router.navigate(['/login']);
  }

  showModal = false;
  activeTab = 'portfolio';

  setActiveTab(id: string): void {
    this.activeTab = id;
    this.selectedStock.set(null);
    this.refreshActiveTab();
  }

  goHome(): void {
    this.setActiveTab('portfolio');
  }

  private refreshActiveTab(): void {
    switch (this.activeTab) {
      case 'meus-ativos':
        this.transactionSvc.reload();
        break;
      case 'portfolio':
        this.loadAtivos();
        break;
      case 'calendar':
        this.loadAtivos();
        break;
      case 'metas':
        this.metasSvc.load();
        break;
    }
  }

  isDark = signal(localStorage.getItem(THEME_KEY) !== 'light');

  readonly acoes = signal<Stock[]>([]);
  readonly acoesLoading = signal(false);
  readonly skelCards = Array.from({ length: 6 });
  readonly selectedStock = signal<Stock | null>(null);

  readonly viewMode = signal<ViewMode>('list');
  setView(mode: ViewMode) {
    this.viewMode.set(mode);
  }

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

  toggleTheme() {
    this.isDark.update((v) => !v);
    document.body.classList.toggle('light-theme', !this.isDark());
    localStorage.setItem(THEME_KEY, this.isDark() ? 'dark' : 'light');
  }

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

  readonly patrimonioTotal = computed(() =>
    this.sortedStocks().reduce((sum, s) => sum + (saldo(s) ?? 0), 0)
  );
  readonly valorInvestido = computed(() =>
    this.sortedStocks().reduce((sum, s) => sum + (custo(s) ?? 0), 0)
  );
  readonly lucroTotal = computed(() => this.patrimonioTotal() - this.valorInvestido());
  readonly lucroPercent = computed(() => {
    const inv = this.valorInvestido();
    return inv > 0 ? (this.lucroTotal() / inv) * 100 : null;
  });
  readonly dividendosRecebidos = computed(() =>
    this.svc.stocks().reduce(
      (sum, stk) => sum + stk.dividends.reduce((ds, d) => ds + d.value * (stk.quantity ?? 0), 0),
      0
    )
  );

  sortedStocks = computed(() => {
    const list = [...this.acoes()];
    const field = this.sortField();
    const asc = this.sortAsc();
    return list.sort((a, b) => {
      let cmp = 0;
      if (field === 'name') cmp = a.name.localeCompare(b.name, 'pt-BR');
      else if (field === 'price') cmp = (a.avgPrice ?? 0) - (b.avgPrice ?? 0);
      else if (field === 'change') cmp = a.changePercent - b.changePercent;
      else if (field === 'qty') cmp = (a.quantity ?? 0) - (b.quantity ?? 0);
      else if (field === 'saldo') cmp = (saldo(a) ?? 0) - (saldo(b) ?? 0);
      else if (field === 'variacao') cmp = (variacaoPosicao(a) ?? 0) - (variacaoPosicao(b) ?? 0);
      else if (field === 'rentabilidade') cmp = (rentabilidade(a) ?? 0) - (rentabilidade(b) ?? 0);
      return asc ? cmp : -cmp;
    });
  });

  tabs = [
    {
      id: 'portfolio',
      label: 'Meus Ativos',
      iconPath: 'M3 17l6-6 4 4 7-8M21 7v5M21 7h-5',
    },
    {
      id: 'meus-ativos',
      label: 'Lançamentos',
      iconPath: 'M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01',
    },
    {
      id: 'calendar',
      label: 'Dividendos',
      iconPath:
        'M7 3v3M17 3v3M4 8h16M5 6h14a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1Z',
    },
    {
      id: 'metas',
      label: 'Metas',
      iconPath:
        'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18ZM12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10ZM12 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z',
    },
  ];

  loading: Signal<boolean> = signal(true);

  constructor(readonly svc: StockDataService) {
    this.loading = svc.loading;
    document.body.classList.toggle('light-theme', !this.isDark());

    effect(() => {
      if (this.auth.isAuthenticated()) {
        untracked(() => this.loadAtivos());
      }
    });
  }

  private deriveEtfPositions(txns: ApiTransaction[]): Stock[] {
    const byTicker = new Map<string, ApiTransaction[]>();
    for (const t of txns) {
      if (!byTicker.has(t.ticker)) byTicker.set(t.ticker, []);
      byTicker.get(t.ticker)!.push(t);
    }
    return Array.from(byTicker.entries())
      .map(([ticker, ts]) => {
        const qty = ts.reduce((s, t) => s + t.quantity, 0);
        const cost = ts.reduce((s, t) => s + t.quantity * t.price, 0);
        return {
          ticker,
          name: ticker,
          sector: 'ETF',
          price: 0,
          changePercent: 0,
          dividendYield: 0,
          nota: 0,
          dividends: [],
          quantity: qty,
          avgPrice: qty > 0 ? cost / qty : 0,
        } as Stock;
      })
      .filter((s) => (s.quantity ?? 0) > 0);
  }

  loadAtivos(): void {
    this.acoesLoading.set(true);
    forkJoin([
      this.api.getAcoes(),
      this.api.getFiis(),
      this.api.getEtfs(),
      this.api.getTransactions(),
    ]).subscribe({
      next: ([acoes, fiis, etfs, txns]) => {
        const mapItem = (item: ApiAcaoItem, sector: string): Stock => ({
          ticker: item.ticker,
          name: item.name || item.ticker,
          sector,
          price: item.current_price,
          changePercent: item.change_percent,
          dividendYield: item.dividend_yield,
          nota: item.nota,
          dividends: [],
          stockId: item.stock_id,
          quantity: item.total_quantity,
          avgPrice: item.avg_price,
          indicators: item.indicators,
          companyInfo: item.company_info,
        });

        // Se o backend não tem /transactions/etfs, deriva posições das transações.
        const etfStocks =
          etfs.length > 0
            ? etfs.map((item) => mapItem(item, 'ETF'))
            : this.deriveEtfPositions(txns.filter((t) => t.asset_type === 'ETFs'));

        this.acoes.set([
          ...acoes.map((item) => mapItem(item, 'Ações')),
          ...fiis.map((item) => mapItem(item, 'FII')),
          ...etfStocks,
        ]);
        this.acoesLoading.set(false);
      },
      error: () => this.acoesLoading.set(false),
    });
  }
}
