import { Component, Input, OnChanges, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { forkJoin } from 'rxjs';
import { BackendApiService, ApiStock } from '../../services/backend-api.service';
import { estimateNextExDate } from './cadence';

interface UpcomingItem {
  ticker: string;
  owned: boolean;
  dateLabel: string;
  cadence: string;
  daysUntil: number;
  level: 'day' | 'month';
}

const MONTHS = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'];
const HORIZON_DAYS = 45;

@Component({
  selector: 'app-proximas-datas-com',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './proximas-datas-com.html',
  styleUrls: ['./proximas-datas-com.scss'],
})
export class ProximasDatasComComponent implements OnChanges {
  @Input() assetType: 'Acoes' | 'FIIs' = 'Acoes';

  private readonly api = inject(BackendApiService);
  readonly loading = signal(true);
  readonly items = signal<UpcomingItem[]>([]);

  ngOnChanges(): void {
    this.load();
  }

  private norm(t: string): string {
    return (t ?? '').toUpperCase().trim();
  }

  private inClass(s: ApiStock): boolean {
    const isFii = (s.sector ?? '').toUpperCase().includes('FII');
    return this.assetType === 'FIIs' ? isFii : !isFii;
  }

  private load(): void {
    this.loading.set(true);
    this.items.set([]);

    const portfolio = this.assetType === 'FIIs' ? this.api.getFiis() : this.api.getAcoes();

    forkJoin({ universe: this.api.getStocks(), owned: portfolio }).subscribe({
      next: ({ universe, owned }) => {
        const ownedSet = new Set(
          owned.filter((p) => p.stock_id > 0).map((p) => this.norm(p.ticker)),
        );
        const stocks = universe.filter((s) => s.id > 0 && this.inClass(s));
        if (stocks.length === 0) {
          this.items.set([]);
          this.loading.set(false);
          return;
        }

        forkJoin(stocks.map((s) => this.api.getStockDividends(s.id))).subscribe({
          next: (lists) => {
            const items: UpcomingItem[] = [];
            stocks.forEach((s, i) => {
              const exDates = (lists[i] ?? []).map((d) => d.ex_date).filter((x) => !!x);
              const est = estimateNextExDate(exDates);
              if (!est || est.daysUntil > HORIZON_DAYS) return;
              items.push({
                ticker: this.norm(s.ticker),
                owned: ownedSet.has(this.norm(s.ticker)),
                dateLabel: this.formatDate(est.next, est.level),
                cadence: est.cadence,
                daysUntil: est.daysUntil,
                level: est.level,
              });
            });
            items.sort((a, b) => a.daysUntil - b.daysUntil);
            this.items.set(items);
            this.loading.set(false);
          },
          error: () => {
            this.items.set([]);
            this.loading.set(false);
          },
        });
      },
      error: () => {
        this.items.set([]);
        this.loading.set(false);
      },
    });
  }

  private formatDate(d: Date, level: 'day' | 'month'): string {
    const month = MONTHS[d.getMonth()];
    return level === 'day' ? `~${d.getDate()}/${month}` : `~${month}/${d.getFullYear()}`;
  }
}
