import { Component, Input, OnChanges, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { forkJoin } from 'rxjs';
import { BackendApiService, ApiDividend } from '../../services/backend-api.service';

interface TickerRow {
  ticker: string;
  marks: boolean[]; // 12 posições (Jan→Dez); true = teve data-com no mês
}

interface MonthCard {
  month: number;
  label: string;
  tickers: string[];
}

type RadarView = 'cards' | 'matrix';
const VIEW_KEY = 'radar-view';

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

  // Dimensões do skeleton de carregamento (6 linhas × 13 colunas).
  readonly skelRows = Array.from({ length: 6 });
  readonly skelCols = Array.from({ length: 13 });
  readonly skelCards = Array.from({ length: 12 });

  // Visualização: matriz (padrão) ou cards; lembrada entre sessões.
  readonly view = signal<RadarView>(this.readView());

  setView(v: RadarView): void {
    this.view.set(v);
    try {
      localStorage.setItem(VIEW_KEY, v);
    } catch {
      /* ignore */
    }
  }
  isView(v: RadarView): boolean {
    return this.view() === v;
  }
  private readView(): RadarView {
    try {
      return localStorage.getItem(VIEW_KEY) === 'cards' ? 'cards' : 'matrix';
    } catch {
      return 'matrix';
    }
  }

  // Cards Jan→Dez derivados das linhas (sem fetch extra): tickers por mês.
  readonly monthCards = computed<MonthCard[]>(() =>
    MONTHS.map((label, i) => ({
      month: i + 1,
      label,
      tickers: this.rows()
        .filter((r) => r.marks[i])
        .map((r) => r.ticker),
    })),
  );

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
