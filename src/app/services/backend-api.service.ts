import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';

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
}
