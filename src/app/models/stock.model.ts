export interface DividendRecord {
  year: number;
  month: number;
  value: number;
  type: 'dividendo' | 'jcp' | 'rendimento';
  exDate: string;
  payDate: string;
}

export interface IndicatorItem {
  label: string;
  value: string;
}

export interface Stock {
  ticker: string;
  name: string;
  sector: string;
  price: number;
  changePercent: number;
  dividendYield: number;
  nota: number;
  dividends: DividendRecord[];
  stockId?: number;
  quantity?: number;
  avgPrice?: number;
  indicators?: IndicatorItem[];
  companyInfo?: IndicatorItem[];
  // Faixa de 52 semanas (máxima/mínima). Usada no veredito de oportunidade dos
  // ETFs pela posição do preço atual na faixa. Opcionais: ausência → faixa neutra.
  high52?: number;
  low52?: number;
}

export interface MonthSummary {
  month: number;
  monthName: string;
  tickers: string[];
  totalDividends: number;
  avgYield: number;
}

export interface BestMonthAnalysis {
  ticker: string;
  bestMonths: { month: number; monthName: string; avgDividend: number; frequency: number }[];
}
