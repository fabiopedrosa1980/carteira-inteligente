import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
import { AssetType } from '../models/transaction.model';

export interface StockQuote {
  ticker: string;
  name: string;
  sector: string;
  price: number;
  prevClose: number;
  changePercent: number;
  dividendYield: number;
  found: boolean;
  // Tipo do ativo classificado pelo catálogo B3 da API (b3_assets). Vazio/ausente
  // quando o ticker não está no catálogo — nesse caso o front usa fallback offline.
  assetType?: AssetType | '';
}

export interface TickerSuggestion {
  ticker: string;
  name: string;
}

// Ativo resolvido pelo catálogo local da API (tabela b3_assets), sem consulta
// externa. `found: false` quando o ticker não existe no catálogo.
export interface CatalogAsset {
  ticker: string;
  name: string;
  type: AssetType | '';
  sector: string;
  found: boolean;
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

  // Resolve um ticker pelo catálogo local da API (b3_assets), sem consulta
  // externa: nome, setor e tipo autoritativo. Defensivo: retorna não-encontrado
  // em erro/ausência (ex.: catálogo ainda não populado), e o front faz fallback.
  getAsset(ticker: string): Observable<CatalogAsset> {
    const t = ticker.trim().toUpperCase();
    return this.http
      .get<CatalogAsset>(`${this.proxyUrl}/assets/${t}`)
      .pipe(catchError(() => of(this.emptyAsset(t))));
  }

  // Busca de tickers para o autocomplete do lançamento. Consome o endpoint do
  // catálogo local (b3_assets) — sem site externo. Defensivo: lista vazia em erro.
  searchTickers(query: string): Observable<TickerSuggestion[]> {
    const q = query.trim().toUpperCase();
    return this.http
      .get<TickerSuggestion[]>(`${this.proxyUrl}/assets/search?q=${encodeURIComponent(q)}`)
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

  private emptyAsset(ticker: string): CatalogAsset {
    return { ticker, name: '', type: '', sector: '', found: false };
  }
}
