import { Component, Input, OnChanges, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { forkJoin } from 'rxjs';
import { BackendApiService, ApiDividend } from '../../services/backend-api.service';

interface MonthCell {
  month: number;
  label: string;
  tickers: string[];
}

const MONTHS = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];

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
  readonly months = signal<MonthCell[]>([]);
  readonly year = new Date().getFullYear() - 1;

  // Mês seguinte ao atual (oportunidade mais próxima); Dez→Jan.
  readonly nextMonth = ((new Date().getMonth() + 1) % 12) + 1;

  // Mês com mais tickers (length > 0); empate resolve no primeiro; 0 se nenhum.
  readonly topMonth = computed(() => {
    let top = 0;
    let max = 0;
    for (const m of this.months()) {
      if (m.tickers.length > max) {
        max = m.tickers.length;
        top = m.month;
      }
    }
    return top;
  });

  isTop(m: MonthCell): boolean {
    return m.month === this.topMonth();
  }

  isNext(m: MonthCell): boolean {
    return m.month === this.nextMonth;
  }

  ngOnChanges(): void {
    this.load();
  }

  private empty(): MonthCell[] {
    return MONTHS.map((label, idx) => ({ month: idx + 1, label, tickers: [] }));
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
    this.months.set([]);
    const source = this.assetType === 'FIIs' ? this.api.getFiis() : this.api.getAcoes();
    source.subscribe({
      next: (positions) => {
        const visible = positions.filter((p) => p.stock_id > 0);
        if (visible.length === 0) {
          this.months.set(this.empty());
          this.loading.set(false);
          return;
        }
        forkJoin(visible.map((p) => this.api.getStockDividends(p.stock_id))).subscribe({
          next: (lists) => {
            const byMonth = new Map<number, Set<string>>();
            visible.forEach((p, i) => {
              (lists[i] ?? []).forEach((d) => {
                if (this.yearOf(d) !== this.year) return;
                const m = this.monthOf(d);
                if (m < 1 || m > 12) return;
                if (!byMonth.has(m)) byMonth.set(m, new Set());
                byMonth.get(m)!.add(p.ticker);
              });
            });
            this.months.set(
              MONTHS.map((label, idx) => ({
                month: idx + 1,
                label,
                tickers: [...(byMonth.get(idx + 1) ?? [])].sort(),
              })),
            );
            this.loading.set(false);
          },
          error: () => {
            this.months.set(this.empty());
            this.loading.set(false);
          },
        });
      },
      error: () => {
        this.months.set(this.empty());
        this.loading.set(false);
      },
    });
  }
}
