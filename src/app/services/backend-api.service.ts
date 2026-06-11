import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';

export interface ApiTransaction {
  id: number;
  ticker: string;
  asset_type: 'Acoes' | 'FIIs' | 'ETFs';
  quantity: number;
  price: number;
  date: string;
  created_at: string;
}

export interface ApiStock {
  id: number;
  ticker: string;
  name: string;
  sector: string;
  score: number;
  current_price: number;
  daily_change: number;
  dy: number;
}

export interface ApiDividend {
  id: number;
  stock_id: number;
  amount: number;
  month: number;
  year: number;
  type: string;
  ex_date: string;
  pay_date: string;
}

export interface ApiMonthSummary {
  month: number;
  month_name: string;
  tickers: string[];
  stock_count: number;
  avg_total: number;
  avg_yield: number;
}

@Injectable({ providedIn: 'root' })
export class BackendApiService {
  private readonly baseUrl = 'https://carteira-inteligente-api.onrender.com/api/v1';

  constructor(private http: HttpClient) {}

  getStocks(): Observable<ApiStock[]> {
    return this.http
      .get<ApiStock[]>(`${this.baseUrl}/stocks`)
      .pipe(catchError(() => of([])));
  }

  getStockDividends(id: number): Observable<ApiDividend[]> {
    return this.http
      .get<ApiDividend[]>(`${this.baseUrl}/stocks/${id}/dividends`)
      .pipe(catchError(() => of([])));
  }

  getDividendsMonthly(year: number): Observable<ApiMonthSummary[]> {
    return this.http
      .get<ApiMonthSummary[]>(`${this.baseUrl}/dividends/monthly?year=${year}`)
      .pipe(catchError(() => of([])));
  }

  getTransactions(ticker?: string): Observable<ApiTransaction[]> {
    const url = ticker
      ? `${this.baseUrl}/transactions?ticker=${ticker}`
      : `${this.baseUrl}/transactions`;
    return this.http.get<ApiTransaction[]>(url).pipe(catchError(() => of([])));
  }

  createTransaction(data: {
    ticker: string;
    asset_type: string;
    quantity: number;
    price: number;
    date: string;
  }): Observable<ApiTransaction> {
    return this.http.post<ApiTransaction>(`${this.baseUrl}/transactions`, data);
  }

  deleteTransaction(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/transactions/${id}`);
  }

  getPortfolio(): Observable<ApiPortfolioItem[]> {
    return this.http
      .get<ApiPortfolioItem[]>(`${this.baseUrl}/transactions/portfolio`)
      .pipe(catchError(() => of([])));
  }
}

export interface ApiPortfolioItem {
  ticker: string;
  asset_type: 'Acoes' | 'FIIs' | 'ETFs';
  total_quantity: number;
  avg_price: number;
}
