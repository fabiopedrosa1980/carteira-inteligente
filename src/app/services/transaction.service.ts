import { Injectable, signal, inject } from '@angular/core';
import { switchMap, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { Transaction, AssetType, PortfolioItem } from '../models/transaction.model';
import { BackendApiService } from './backend-api.service';
import { StockApiService, StockQuote } from './stock-api.service';

@Injectable({ providedIn: 'root' })
export class TransactionService {
  private readonly api = inject(BackendApiService);
  private readonly stockApi = inject(StockApiService);

  private _transactions = signal<Transaction[]>([]);
  private _portfolio = signal<PortfolioItem[]>([]);

  readonly transactions = this._transactions.asReadonly();
  readonly portfolio = this._portfolio.asReadonly();
  readonly loading = signal(false);
  readonly portfolioLoading = signal(false);

  constructor() {
    this.loadAll();
    this.loadPortfolio();
  }

  private loadAll(): void {
    this.loading.set(true);
    this.api.getTransactions().subscribe({
      next: list => {
        this._transactions.set(list.map(t => ({
          id: t.id,
          assetType: t.asset_type as AssetType,
          ticker: t.ticker,
          date: t.date.split('T')[0],
          quantity: t.quantity,
          price: t.price,
        })));
        this.loading.set(false);
      },
      error: () => this.loading.set(false),
    });
  }

  loadPortfolio(): void {
    this.portfolioLoading.set(true);
    this.api.getPortfolio().pipe(
      switchMap(items => {
        if (items.length === 0) return of({ items, quotes: [] as StockQuote[] });
        const tickers = items.map(i => i.ticker);
        return this.stockApi.getBulkQuotes(tickers).pipe(
          map(quotes => ({ items, quotes }))
        );
      })
    ).subscribe({
      next: ({ items, quotes }) => {
        const quoteMap = new Map(quotes.map(q => [q.ticker, q]));
        this._portfolio.set(items.map(p => {
          const q = quoteMap.get(p.ticker);
          return {
            ticker: p.ticker,
            assetType: p.asset_type as AssetType,
            totalQuantity: p.total_quantity,
            avgPrice: p.avg_price,
            currentPrice: q?.price ?? 0,
            changePercent: q?.changePercent ?? 0,
            dividendYield: q?.dividendYield ?? 0,
          };
        }));
        this.portfolioLoading.set(false);
      },
      error: () => this.portfolioLoading.set(false),
    });
  }

  add(t: Omit<Transaction, 'id'>, onDone?: () => void): void {
    this.api.createTransaction({
      ticker: t.ticker,
      asset_type: t.assetType,
      quantity: t.quantity,
      price: t.price,
      date: t.date,
    }).subscribe({
      next: created => {
        this._transactions.update(list => [...list, {
          id: created.id,
          assetType: created.asset_type as AssetType,
          ticker: created.ticker,
          date: created.date.split('T')[0],
          quantity: created.quantity,
          price: created.price,
        }]);
        this.loadPortfolio();
        onDone?.();
      },
    });
  }

  remove(id: number): void {
    this.api.deleteTransaction(id).subscribe({
      next: () => {
        this._transactions.update(list => list.filter(t => t.id !== id));
        this.loadPortfolio();
      },
    });
  }

  byType(type: AssetType): Transaction[] {
    return this._transactions().filter(t => t.assetType === type);
  }
}
