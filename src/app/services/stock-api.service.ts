import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';

export interface StockQuote {
  ticker: string;
  name: string;
  sector: string;
  price: number;
  prevClose: number;
  changePercent: number;
  dividendYield: number;
  found: boolean;
}

@Injectable({ providedIn: 'root' })
export class StockApiService {
  private readonly proxyUrl = 'http://localhost:3001/api';

  constructor(private http: HttpClient) {}

  getQuote(ticker: string): Observable<StockQuote> {
    return this.http
      .get<StockQuote>(`${this.proxyUrl}/quote/${ticker.toUpperCase()}`)
      .pipe(catchError(() => of(this.empty(ticker))));
  }

  getBulkQuotes(tickers: string[]): Observable<StockQuote[]> {
    const joined = tickers.map(t => t.toUpperCase()).join(',');
    return this.http
      .get<StockQuote[]>(`${this.proxyUrl}/quotes?tickers=${joined}`)
      .pipe(catchError(() => of(tickers.map(t => this.empty(t)))));
  }

  private empty(ticker: string): StockQuote {
    return { ticker, name: '', sector: '', price: 0, prevClose: 0, changePercent: 0, dividendYield: 0, found: false };
  }
}
