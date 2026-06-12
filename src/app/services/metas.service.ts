import { Injectable, inject, signal } from '@angular/core';
import { Meta } from '../models/meta.model';
import { ApiAcaoItem, BackendApiService } from './backend-api.service';
import { StockDataService } from './stock-data.service';

@Injectable({ providedIn: 'root' })
export class MetasService {
  private readonly api = inject(BackendApiService);
  private readonly stockData = inject(StockDataService);

  private readonly _metas = signal<Meta[]>([]);
  private readonly _loading = signal(true);

  readonly getMetas = this._metas.asReadonly();
  readonly loading = this._loading.asReadonly();

  constructor() {
    this.api.getGoals().subscribe({
      next: goals => {
        this._metas.set(goals.map(g => ({
          id: g.id,
          name: g.name,

          targetValue: g.targetValue,
          type: g.type as Meta['type'],
          ticker: g.ticker,
          createdAt: g.createdAt,
        })));
        this._loading.set(false);
      },
      error: () => this._loading.set(false),
    });
  }

  addMeta(meta: Omit<Meta, 'id' | 'createdAt'>): void {
    this.api.createGoal(meta).subscribe(created => {
      this._metas.update(list => [...list, {
        id: created.id,
        name: created.name,

        targetValue: created.targetValue,
        type: created.type as Meta['type'],
        ticker: created.ticker,
        createdAt: created.createdAt,
      }]);
    });
  }

  updateMeta(id: string, changes: Partial<Meta>): void {
    const current = this._metas().find(m => m.id === id);
    if (!current) return;
    const payload = { ...current, ...changes };
    this.api.updateGoal(id, payload).subscribe(updated => {
      this._metas.update(list => list.map(m => m.id === id ? {
        ...m,
        name: updated.name,

        targetValue: updated.targetValue,
        type: updated.type as Meta['type'],
        ticker: updated.ticker,
      } : m));
    });
  }

  deleteMeta(id: string): void {
    this.api.deleteGoal(id).subscribe(() => {
      this._metas.update(list => list.filter(m => m.id !== id));
    });
  }

  getCurrentValue(meta: Meta, acoes: ApiAcaoItem[]): number {
    switch (meta.type) {
      case 'patrimonio':
        return acoes.reduce((sum, a) => sum + a.total_quantity * a.current_price, 0);

      case 'renda_mensal': {
        const stocks = this.stockData.getStocks();
        return acoes.reduce((sum, a) => {
          const stock = stocks.find(s => s.ticker === a.ticker);
          const dy = stock?.dividendYield ?? 0;
          return sum + (a.total_quantity * a.current_price * dy) / 100 / 12;
        }, 0);
      }

      case 'preco_medio': {
        const item = acoes.find(a => a.ticker === meta.ticker);
        return item ? item.avg_price : 0;
      }

      default:
        return 0;
    }
  }
}
