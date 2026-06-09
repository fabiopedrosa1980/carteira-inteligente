import { Injectable, signal } from '@angular/core';
import { forkJoin, of } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { Stock, DividendRecord, MonthSummary, BestMonthAnalysis } from '../models/stock.model';
import { BackendApiService, ApiDividend } from './backend-api.service';

const MONTH_NAMES = ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'];
const FULL_MONTH_NAMES = ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'];

@Injectable({ providedIn: 'root' })
export class StockDataService {
  private readonly _stocks = signal<Stock[]>([]);
  private readonly _loading = signal(true);

  readonly stocks = this._stocks.asReadonly();
  readonly loading = this._loading.asReadonly();

  constructor(private api: BackendApiService) {
    this.fetchPortfolioStocks();
  }

  private fetchPortfolioStocks(): void {
    this.api.getStocks().pipe(
      switchMap(apiStocks => {
        if (apiStocks.length === 0) return of({ apiStocks, allDividends: [] as ApiDividend[][] });
        return forkJoin(apiStocks.map(s => this.api.getStockDividends(s.id))).pipe(
          map(allDividends => ({ apiStocks, allDividends }))
        );
      })
    ).subscribe({
      next: ({ apiStocks, allDividends }) => {
        this._stocks.set(apiStocks.map((s, i) => ({
          ticker: s.ticker,
          name: s.name || s.ticker,
          sector: s.sector || 'Other',
          price: s.current_price ?? 0,
          changePercent: s.daily_change ?? 0,
          dividendYield: s.dy ?? 0,
          nota: s.score ?? 0,
          dividends: (allDividends[i] ?? []).map(d => ({
            year: d.year,
            month: d.month,
            value: d.amount,
            type: d.type as DividendRecord['type'],
            exDate: d.ex_date,
            payDate: d.pay_date,
          })),
        })));
        this._loading.set(false);
      },
      error: () => this._loading.set(false),
    });
  }

  getStocks(): Stock[] { return this._stocks(); }

  addStock(stock: Stock): void {
    this._stocks.update(list => [...list, stock]);
  }

  removeStock(ticker: string): void {
    this._stocks.update(list => list.filter(s => s.ticker !== ticker));
  }

  hasTicker(ticker: string): boolean {
    return this._stocks().some(s => s.ticker === ticker);
  }

  getMonthSummaries(): MonthSummary[] {
    return Array.from({ length: 12 }, (_, i) => {
      const month = i + 1;
      const tickers: string[] = [];
      let totalDividends = 0;
      let totalYield = 0;
      for (const stock of this._stocks()) {
        const recs = stock.dividends.filter(d => d.month === month);
        if (recs.length === 0) continue;
        const avg = recs.reduce((s, r) => s + r.value, 0) / recs.length;
        tickers.push(stock.ticker);
        totalDividends += avg;
        totalYield += stock.price > 0 ? (avg / stock.price) * 100 : 0;
      }
      return {
        month,
        monthName: FULL_MONTH_NAMES[i],
        tickers,
        totalDividends,
        avgYield: tickers.length > 0 ? totalYield / tickers.length : 0,
      };
    });
  }

  getBestMonthAnalysis(): BestMonthAnalysis[] {
    return this._stocks().map(stock => {
      const monthData = Array.from({ length: 12 }, (_, i) => {
        const month = i + 1;
        const recs = stock.dividends.filter(d => d.month === month);
        return {
          month,
          monthName: MONTH_NAMES[i],
          avgDividend: recs.length > 0 ? recs.reduce((s, r) => s + r.value, 0) / recs.length : 0,
          frequency: recs.length,
        };
      }).filter(m => m.avgDividend > 0).sort((a, b) => b.avgDividend - a.avgDividend);
      return { ticker: stock.ticker, bestMonths: monthData.slice(0, 3) };
    });
  }

  getBestMonthsToBuy(): { month: number; monthName: string; score: number; stockCount: number; nextMonthName: string }[] {
    const summaries = this.getMonthSummaries();
    return summaries.map((s, i) => {
      const next = summaries[(i + 1) % 12];
      return {
        month: s.month,
        monthName: s.monthName,
        score: next.totalDividends * next.tickers.length,
        stockCount: next.tickers.length,
        nextMonthName: next.monthName,
      };
    }).sort((a, b) => b.score - a.score);
  }

  getDividendsForMonth(year: number, month: number): { stock: Stock; dividend: DividendRecord }[] {
    return this._stocks()
      .map(stock => ({ stock, dividend: stock.dividends.find(d => d.year === year && d.month === month) }))
      .filter(x => x.dividend !== undefined) as { stock: Stock; dividend: DividendRecord }[];
  }

  getMonthName(month: number): string { return FULL_MONTH_NAMES[month - 1]; }
  getShortMonthName(month: number): string { return MONTH_NAMES[month - 1]; }
}
