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
  dividend_yield: number;
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
  private readonly baseUrl = 'http://localhost:8080/api/v1';

  constructor(private http: HttpClient) {}

  getStocks(): Observable<ApiStock[]> {
    return this.http
      .get<ApiStock[]>(`${this.baseUrl}/stocks`)
      .pipe(catchError(() => of([])));
  }

  getDividendsMonthly(year: number): Observable<ApiMonthSummary[]> {
    return this.http
      .get<ApiMonthSummary[]>(`${this.baseUrl}/dividends/monthly?year=${year}`)
      .pipe(catchError(() => of([])));
  }
}
