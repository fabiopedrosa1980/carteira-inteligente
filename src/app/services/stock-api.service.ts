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

export interface TickerSuggestion {
  ticker: string;
  name: string;
}

@Injectable({ providedIn: 'root' })
export class StockApiService {
  private readonly proxyUrl = 'https://carteira-inteligente-api.onrender.com/api/v1';

  constructor(private http: HttpClient) {}

  // Cotação do ativo. Se `date` (YYYY-MM-DD) for informada e anterior a hoje,
  // pede o fechamento naquela data via `?date=`; senão, a cotação atual.
  getQuote(ticker: string, date?: string): Observable<StockQuote> {
    let url = `${this.proxyUrl}/quote/${ticker.toUpperCase()}`;
    if (date && date < this.todayStr()) {
      url += `?date=${date}`;
    }
    return this.http.get<StockQuote>(url).pipe(catchError(() => of(this.empty(ticker))));
  }

  // Data de hoje em horário local (YYYY-MM-DD), evitando deslocamento de fuso.
  private todayStr(): string {
    const d = new Date();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${d.getFullYear()}-${m}-${day}`;
  }

  // Busca de tickers para o autocomplete do lançamento. Consome o endpoint de
  // busca do backend (ver contrato em design.md). Defensivo: lista vazia em erro.
  searchTickers(query: string): Observable<TickerSuggestion[]> {
    const q = query.trim().toUpperCase();
    return this.http
      .get<TickerSuggestion[]>(`${this.proxyUrl}/search?q=${encodeURIComponent(q)}`)
      .pipe(catchError(() => of([])));
  }

  getBulkQuotes(tickers: string[]): Observable<StockQuote[]> {
    const joined = tickers.map((t) => t.toUpperCase()).join(',');
    return this.http
      .get<StockQuote[]>(`${this.proxyUrl}/quotes?tickers=${joined}`)
      .pipe(catchError(() => of(tickers.map((t) => this.empty(t)))));
  }

  private empty(ticker: string): StockQuote {
    return {
      ticker,
      name: '',
      sector: '',
      price: 0,
      prevClose: 0,
      changePercent: 0,
      dividendYield: 0,
      found: false,
    };
  }
}
