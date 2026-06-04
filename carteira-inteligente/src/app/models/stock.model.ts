export interface DividendRecord {
  year: number;
  month: number;
  value: number;
  type: 'dividendo' | 'jcp' | 'rendimento';
  exDate: string;
  payDate: string;
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
