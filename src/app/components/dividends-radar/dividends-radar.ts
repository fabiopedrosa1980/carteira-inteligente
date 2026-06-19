import { Component, Input, OnChanges, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { forkJoin } from 'rxjs';
import { BackendApiService, ApiDividend } from '../../services/backend-api.service';

interface TickerRow {
  ticker: string;
  marks: boolean[]; // 12 posições (Jan→Dez); true = teve data-com no mês
}

const MONTHS = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
const MONTH_INITIALS = ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'];

@Component({
  selector: 'app-dividends-radar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dividends-radar.html',
  styleUrls: ['./dividends-radar.scss'],
})
export class DividendsRadarComponent implements OnChanges {
  @Input() assetType: 'Acoes' | 'FIIs' = 'Acoes';

  private readonly api = inject(BackendApiService);
  readonly loading = signal(true);
  readonly rows = signal<TickerRow[]>([]);
  readonly monthLabels = MONTHS;
  readonly monthInitials = MONTH_INITIALS;
  readonly year = new Date().getFullYear() - 1;

  ngOnChanges(): void {
    this.load();
  }

  // Mês/ano da data-com (ex_date) — data relevante para comprar antes do provento.
  private monthOf(d: ApiDividend): number {
    if (d.ex_date) {
      const m = new Date(d.ex_date).getMonth() + 1;
      if (m >= 1 && m <= 12) return m;
    }
    return d.month;
  }
  private yearOf(d: ApiDividend): number {
    if (d.ex_date) {
      const y = new Date(d.ex_date).getFullYear();
      if (y) return y;
    }
    return d.year;
  }

  private load(): void {
    this.loading.set(true);
    this.rows.set([]);
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
          next: (lists) => {
            const byTicker = new Map<string, Set<number>>();
            visible.forEach((p, i) => {
              const set = byTicker.get(p.ticker) ?? new Set<number>();
              (lists[i] ?? []).forEach((d) => {
                if (this.yearOf(d) !== this.year) return;
                const m = this.monthOf(d);
                if (m >= 1 && m <= 12) set.add(m);
              });
              byTicker.set(p.ticker, set);
            });
            const rows: TickerRow[] = [...byTicker.entries()]
              .map(([ticker, set]) => ({
                ticker,
                marks: MONTHS.map((_, idx) => set.has(idx + 1)),
              }))
              .sort((a, b) => a.ticker.localeCompare(b.ticker));
            this.rows.set(rows);
            this.loading.set(false);
          },
          error: () => {
            this.rows.set([]);
            this.loading.set(false);
          },
        });
      },
      error: () => {
        this.rows.set([]);
        this.loading.set(false);
      },
    });
  }
}
