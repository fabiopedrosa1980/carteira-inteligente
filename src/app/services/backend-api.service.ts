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
  message?: string;
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
  history_ready: boolean;
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
    return this.http.get<ApiStock[]>(`${this.baseUrl}/stocks`).pipe(catchError(() => of([])));
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

  updateTransaction(
    id: number,
    data: {
      asset_type: string;
      quantity: number;
      price: number;
      date: string;
    },
  ): Observable<ApiTransaction> {
    return this.http.put<ApiTransaction>(`${this.baseUrl}/transactions/${id}`, data);
  }

  deleteTransaction(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/transactions/${id}`);
  }

  // Remove todos os lançamentos de uma vez (idempotente no backend).
  deleteAllTransactions(): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/transactions`);
  }

  // Importa a planilha de Posição da B3 (.xlsx) por upload multipart. A API Go
  // parseia, classifica os tickers e SOBREPÕE os lançamentos existentes,
  // devolvendo um resumo. Sem catchError aqui: a tela precisa distinguir
  // sucesso de erro (endpoint é dependência externa do repo Go).
  importTransactions(file: File): Observable<ImportResult> {
    const form = new FormData();
    form.append('file', file, file.name);
    return this.http.post<ImportResult>(`${this.baseUrl}/transactions/import`, form);
  }

  getAcoes(): Observable<ApiAcaoItem[]> {
    return this.http
      .get<ApiAcaoItem[]>(`${this.baseUrl}/transactions/acoes`)
      .pipe(catchError(() => of([])));
  }

  getFiis(): Observable<ApiAcaoItem[]> {
    return this.http
      .get<ApiAcaoItem[]>(`${this.baseUrl}/transactions/fiis`)
      .pipe(catchError(() => of([])));
  }

  getEtfs(): Observable<ApiAcaoItem[]> {
    return this.http
      .get<ApiAcaoItem[]>(`${this.baseUrl}/transactions/etfs`)
      .pipe(catchError(() => of([])));
  }

  getGoals(): Observable<ApiGoal[]> {
    return this.http.get<ApiGoal[]>(`${this.baseUrl}/goals`).pipe(catchError(() => of([])));
  }

  createGoal(data: Omit<ApiGoal, 'id' | 'createdAt'>): Observable<ApiGoal> {
    return this.http.post<ApiGoal>(`${this.baseUrl}/goals`, data);
  }

  updateGoal(id: string, data: Partial<ApiGoal>): Observable<ApiGoal> {
    return this.http.put<ApiGoal>(`${this.baseUrl}/goals/${id}`, data);
  }

  deleteGoal(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/goals/${id}`);
  }

  // Configuração de alocação da carteira. Endpoint é dependência externa (repo
  // Go): enquanto não existir, getAllocation degrada para null e o frontend
  // aplica defaults.
  getAllocation(): Observable<ApiAllocation | null> {
    return this.http
      .get<ApiAllocation>(`${this.baseUrl}/allocation`)
      .pipe(catchError(() => of(null)));
  }

  updateAllocation(data: ApiAllocation): Observable<ApiAllocation | null> {
    return this.http
      .put<ApiAllocation>(`${this.baseUrl}/allocation`, data)
      .pipe(catchError(() => of(null)));
  }
}

export interface ApiAllocation {
  targets: { Acoes: number; FIIs: number; ETFs: number };
  concentrationLimit: number;
}

// Resumo devolvido pela importação da planilha de Posição da B3: quantos
// lançamentos foram criados por classe e quais tickers foram ignorados.
export interface ImportResult {
  created: { Acoes: number; FIIs: number; ETFs: number };
  ignored: { ticker: string; reason?: string }[];
}

export interface ApiAcaoItem {
  ticker: string;
  name: string;
  total_quantity: number;
  avg_price: number;
  current_price: number;
  change_percent: number;
  dividend_yield: number;
  nota: number;
  history_ready: boolean;
  stock_id: number;
  transaction_count: number;
  // Indicadores fundamentalistas (Investidor10) como lista rótulo/valor.
  indicators?: { label: string; value: string }[];
  // Informações sobre a empresa (Investidor10) como lista rótulo/valor.
  company_info?: { label: string; value: string }[];
  // Faixa de 52 semanas (origem Yahoo Finance). Usada para o veredito de
  // oportunidade dos ETFs (posição na faixa). Opcionais: o sinal degrada para
  // neutro enquanto o backend não as fornece.
  fifty_two_week_high?: number;
  fifty_two_week_low?: number;
}

export interface ApiGoal {
  id: string;
  name: string;
  targetValue: number;
  createdAt: string;
  currentValue?: number;
  progressPercent?: number;
  message?: string;
}
