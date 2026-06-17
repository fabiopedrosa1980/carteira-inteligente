import { Component, Input, OnInit, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { forkJoin } from 'rxjs';
import { BackendApiService, ApiAcaoItem, ApiDividend } from '../../services/backend-api.service';
import { TransactionService } from '../../services/transaction.service';

export type SummaryMode = 'received' | 'projected';

interface SummaryRow {
  ticker: string;
  shares: number;
  value: number;
}

@Component({
  selector: 'app-dividends-summary',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dividends-summary.html',
  styleUrls: ['./dividends-summary.scss'],
})
export class DividendsSummaryComponent implements OnInit {
  @Input({ required: true }) mode!: SummaryMode;

  private readonly api = inject(BackendApiService);
  private readonly txService = inject(TransactionService);

  readonly loading = signal(true);
  readonly error = signal(false);
  readonly rows = signal<SummaryRow[]>([]);

  readonly total = computed(() => this.rows().reduce((sum, r) => sum + r.value, 0));

  readonly title = computed(() =>
    this.mode === 'received' ? 'Dividendos Recebidos' : 'Dividendos Projetados',
  );
  readonly icon = computed(() => (this.mode === 'received' ? '💰' : '📈'));
  readonly subtitle = computed(() =>
    this.mode === 'received'
      ? `Proventos do ano de ${this.currentYear}, considerando lançamentos até a data-com.`
      : `Projeção com base nos proventos por cota de ${this.currentYear - 1}.`,
  );

  private readonly currentYear = new Date().getFullYear();

  ngOnInit(): void {
    this.api.getAcoes().subscribe({
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

      const value =
        this.mode === 'received'
          ? this.computeReceived(dividends, txOfTicker)
          : this.computeProjected(dividends, pos.total_quantity);

      return { ticker, shares: pos.total_quantity, value };
    });

    // Maiores valores primeiro.
    return rows.sort((a, b) => b.value - a.value);
  }

  // Recebidos: para cada provento do ano atual, soma amount × cotas elegíveis
  // (lançamentos cuja data é <= data-com do provento).
  private computeReceived(
    dividends: ApiDividend[],
    txOfTicker: { quantity: number; date: string }[],
  ): number {
    let total = 0;
    for (const d of dividends) {
      const year = d.year ?? (d.pay_date ? new Date(d.pay_date).getFullYear() : 0);
      if (year !== this.currentYear) continue;

      const comDate = d.ex_date || d.pay_date || '';
      const eligibleShares = txOfTicker.reduce((sum, t) => {
        if (!comDate || t.date <= comDate) return sum + t.quantity;
        return sum;
      }, 0);

      total += d.amount * eligibleShares;
    }
    return total;
  }

  // Projetados: total por cota do ano anterior × total de cotas atuais.
  private computeProjected(dividends: ApiDividend[], currentShares: number): number {
    const prevYear = this.currentYear - 1;
    const totalPerShare = dividends.reduce((sum, d) => {
      const year = d.year ?? (d.pay_date ? new Date(d.pay_date).getFullYear() : 0);
      return year === prevYear ? sum + d.amount : sum;
    }, 0);
    return totalPerShare * currentShares;
  }
}
