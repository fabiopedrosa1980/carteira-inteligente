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

// Indicadores fundamentais (Status Invest) — opcionais; preenchidos pelo backend
// quando disponíveis. Ver contrato em design.md.
export interface StockIndicators {
  pl?: number;
  pvp?: number;
  dy?: number;
  roe?: number;
  payout?: number;
}

@Injectable({ providedIn: 'root' })
export class StockApiService {
  private readonly proxyUrl = 'https://carteira-inteligente-api.onrender.com/api/v1';

  constructor(private http: HttpClient) {}

  getQuote(ticker: string): Observable<StockQuote> {
    return this.http
      .get<StockQuote>(`${this.proxyUrl}/quote/${ticker.toUpperCase()}`)
      .pipe(catchError(() => of(this.empty(ticker))));
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
