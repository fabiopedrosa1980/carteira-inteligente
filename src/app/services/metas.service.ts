import { Injectable, signal, inject } from '@angular/core';
import { Meta } from '../models/meta.model';
import { ApiAcaoItem } from './backend-api.service';
import { StockDataService } from './stock-data.service';

const STORAGE_KEY = 'ci-metas';

@Injectable({ providedIn: 'root' })
export class MetasService {
  private readonly stockData = inject(StockDataService);

  private readonly _metas = signal<Meta[]>(this.load());
  readonly getMetas = this._metas.asReadonly();

  private load(): Meta[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? (JSON.parse(raw) as Meta[]) : [];
    } catch {
      return [];
    }
  }

  private persist(): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this._metas()));
  }

  getMetasList(): Meta[] {
    return this._metas();
  }

  addMeta(meta: Omit<Meta, 'id' | 'createdAt'>): void {
    const novo: Meta = {
      ...meta,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };
    this._metas.update(list => [...list, novo]);
    this.persist();
  }

  updateMeta(id: string, changes: Partial<Meta>): void {
    this._metas.update(list =>
      list.map(m => (m.id === id ? { ...m, ...changes, id: m.id, createdAt: m.createdAt } : m))
    );
    this.persist();
  }

  deleteMeta(id: string): void {
    this._metas.update(list => list.filter(m => m.id !== id));
    this.persist();
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
