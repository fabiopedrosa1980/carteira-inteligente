import { Component, Input, OnChanges, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { forkJoin } from 'rxjs';
import { BackendApiService, ApiAcaoItem, ApiDividend } from '../../services/backend-api.service';
import { TransactionService } from '../../services/transaction.service';

export type SummaryMode = 'received' | 'projected';

interface MonthValue {
  month: number;
  label: string;
  value: number;
}

interface SummaryRow {
  ticker: string;
  shares: number;
  value: number;
  months: MonthValue[];
}

const MONTH_LABELS = [
  'Jan',
  'Fev',
  'Mar',
  'Abr',
  'Mai',
  'Jun',
  'Jul',
  'Ago',
  'Set',
  'Out',
  'Nov',
  'Dez',
];

@Component({
  selector: 'app-dividends-summary',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dividends-summary.html',
  styleUrls: ['./dividends-summary.scss'],
})
export class DividendsSummaryComponent implements OnChanges {
  @Input({ required: true }) mode!: SummaryMode;
  @Input() assetType: 'Acoes' | 'FIIs' = 'Acoes';

  private readonly api = inject(BackendApiService);
  private readonly txService = inject(TransactionService);

  readonly loading = signal(true);
  readonly error = signal(false);
  readonly rows = signal<SummaryRow[]>([]);
  readonly expanded = signal<Set<string>>(new Set());

  // Linhas do skeleton de carregamento.
  readonly skelRows = Array.from({ length: 5 });

  readonly total = computed(() => this.rows().reduce((sum, r) => sum + r.value, 0));

  toggle(ticker: string): void {
    this.expanded.update((set) => {
      const next = new Set(set);
      if (next.has(ticker)) next.delete(ticker);
      else next.add(ticker);
      return next;
    });
  }

  isExpanded(ticker: string): boolean {
    return this.expanded().has(ticker);
  }

  readonly title = computed(() => (this.mode === 'received' ? 'Recebidos' : 'Projetados'));

  private readonly currentYear = new Date().getFullYear();

  // Data de hoje em horário local (YYYY-MM-DD), evitando o deslocamento de fuso
  // do toISOString() (UTC).
  private readonly todayStr = this.localDateStr(new Date());

  private localDateStr(d: Date): string {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
  }

  ngOnChanges(): void {
    this.load();
  }

  private load(): void {
    // Carrega apenas a classe selecionada (Ações ou FIIs).
    this.loading.set(true);
    this.error.set(false);
    this.rows.set([]);
    this.expanded.set(new Set());

    const source = this.assetType === 'FIIs' ? this.api.getFiis() : this.api.getAcoes();
    source.subscribe({
      next: (positions) => {
        const visible = positions.filter((p) => p.stock_id > 0);
        if (visible.length === 0) {
          this.rows.set([]);
          this.loading.set(false);
          return;
        }
        forkJoin(visible.map((p) => this.api.getStockDividends(p.stock_id))).subscribe({
          next: (dividendLists) => {
            this.rows.set(this.compute(visible, dividendLists));
            this.loading.set(false);
          },
          error: () => {
            this.error.set(true);
            this.loading.set(false);
          },
        });
      },
      error: () => {
        this.error.set(true);
        this.loading.set(false);
      },
    });
  }

  private norm(ticker: string): string {
    return (ticker ?? '').toUpperCase().trim();
  }

  private compute(positions: ApiAcaoItem[], dividendLists: ApiDividend[][]): SummaryRow[] {
    const transactions = this.txService.transactions();

    const rows = positions.map((pos, idx) => {
      const ticker = this.norm(pos.ticker);
      const dividends = dividendLists[idx] ?? [];
      const txOfTicker = transactions.filter((t) => this.norm(t.ticker) === ticker);

      const months =
        this.mode === 'received'
          ? this.computeReceived(dividends, txOfTicker)
          : this.computeProjected(dividends, pos.total_quantity);

      const value = months.reduce((sum, m) => sum + m.value, 0);

      return { ticker, shares: pos.total_quantity, value, months };
    });

    // Lista apenas ativos com valor maior que zero (Recebidos e Projetados).
    const filtered = rows.filter((r) => r.value > 0);

    // Maiores valores primeiro.
    return filtered.sort((a, b) => b.value - a.value);
  }

  // Resolve o mês (1-12) de um provento: usa o campo `month`, com fallback para
  // a data de pagamento/data-com.
  private monthOf(d: ApiDividend): number {
    if (d.month >= 1 && d.month <= 12) return d.month;
    const ref = d.pay_date || d.ex_date;
    if (ref) {
      const m = new Date(ref).getMonth() + 1;
      if (m >= 1 && m <= 12) return m;
    }
    return 0;
  }

  private yearOf(d: ApiDividend): number {
    return d.year ?? (d.pay_date ? new Date(d.pay_date).getFullYear() : 0);
  }

  // Converte o acumulado por mês em lista ordenada (1→12), descartando zeros.
  private toMonthList(byMonth: Map<number, number>): MonthValue[] {
    return [...byMonth.entries()]
      .filter(([month, value]) => month >= 1 && month <= 12 && value !== 0)
      .sort((a, b) => a[0] - b[0])
      .map(([month, value]) => ({ month, label: MONTH_LABELS[month - 1], value }));
  }

  // Recebidos: por mês do ano atual, soma amount × cotas elegíveis
  // (lançamentos cuja data é <= data-com), considerando apenas proventos já
  // pagos (data de pagamento anterior a hoje).
  private computeReceived(
    dividends: ApiDividend[],
    txOfTicker: { quantity: number; date: string }[],
  ): MonthValue[] {
    const byMonth = new Map<number, number>();
    for (const d of dividends) {
      if (this.yearOf(d) !== this.currentYear) continue;
      // Só conta o que já foi pago: pay_date existente e anterior a hoje.
      if (!d.pay_date || d.pay_date >= this.todayStr) continue;

      const comDate = d.ex_date || d.pay_date || '';
      const eligibleShares = txOfTicker.reduce((sum, t) => {
        if (!comDate || t.date <= comDate) return sum + t.quantity;
        return sum;
      }, 0);

      const month = this.monthOf(d);
      byMonth.set(month, (byMonth.get(month) ?? 0) + d.amount * eligibleShares);
    }
    return this.toMonthList(byMonth);
  }

  // Projetados: proventos do ano corrente ainda a receber (data de pagamento de
  // hoje em diante), por mês, soma amount × total de cotas atuais.
  // Complementa Recebidos (pay_date < hoje) sem lacuna nem sobreposição.
  private computeProjected(dividends: ApiDividend[], currentShares: number): MonthValue[] {
    const byMonth = new Map<number, number>();
    for (const d of dividends) {
      if (this.yearOf(d) !== this.currentYear) continue;
      // Só conta o que ainda será pago: pay_date existente e >= hoje.
      if (!d.pay_date || d.pay_date < this.todayStr) continue;
      const month = this.monthOf(d);
      byMonth.set(month, (byMonth.get(month) ?? 0) + d.amount * currentShares);
    }
    return this.toMonthList(byMonth);
  }
}
