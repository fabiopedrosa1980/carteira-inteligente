import { Injectable, signal } from '@angular/core';
import { Stock, DividendRecord, MonthSummary, BestMonthAnalysis } from '../models/stock.model';
import { StockApiService } from './stock-api.service';

const MONTH_NAMES = ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'];
const FULL_MONTH_NAMES = ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'];

const SECTOR_MAP: Record<string, string> = {
  'Financial Services': 'Bancário',
  'Banks': 'Bancário',
  'Insurance': 'Seguros',
  'Energy': 'Energia Elétrica',
  'Utilities': 'Energia Elétrica',
  'Basic Materials': 'Mineração',
  'Oil & Gas': 'Petróleo & Gás',
  'Technology': 'Tecnologia',
  'Consumer Cyclical': 'Varejo',
  'Healthcare': 'Saúde',
  'Industrials': 'Indústria',
  'Real Estate': 'Imobiliário',
};

const DIVIDEND_PATTERNS: Record<string, number[]> = {
  'BBAS3': [0.18, 0.00, 0.00, 0.22, 0.00, 0.19, 0.00, 0.00, 0.21, 0.00, 0.00, 0.24],
  'BBSE3': [0.15, 0.00, 0.16, 0.00, 0.00, 0.18, 0.00, 0.17, 0.00, 0.00, 0.19, 0.00],
  'PETR4': [0.00, 0.45, 0.00, 0.00, 0.52, 0.00, 0.00, 0.48, 0.00, 0.00, 0.61, 0.00],
  'ITUB3': [0.045,0.045,0.045,0.045,0.045,0.045,0.045,0.045,0.045,0.045,0.045,0.045],
  'BRAP4': [0.00, 0.00, 0.32, 0.00, 0.00, 0.28, 0.00, 0.00, 0.30, 0.00, 0.00, 0.35],
  'CMIG4': [0.00, 0.00, 0.24, 0.00, 0.00, 0.22, 0.00, 0.00, 0.25, 0.00, 0.00, 0.28],
  'CPFE3': [0.00, 0.38, 0.00, 0.00, 0.42, 0.00, 0.00, 0.40, 0.00, 0.00, 0.45, 0.00],
  'CSMG3': [0.00, 0.00, 0.00, 0.28, 0.00, 0.00, 0.00, 0.32, 0.00, 0.00, 0.00, 0.35],
  'ISAE4': [0.00, 0.00, 0.55, 0.00, 0.00, 0.52, 0.00, 0.00, 0.58, 0.00, 0.00, 0.62],
  'CXSE3': [0.00, 0.00, 0.22, 0.00, 0.00, 0.20, 0.00, 0.00, 0.24, 0.00, 0.00, 0.26],
};

const DEFAULT_SECTORS: Record<string, string> = {
  'BBAS3': 'Bancário', 'BBSE3': 'Seguros', 'PETR4': 'Petróleo & Gás',
  'ITUB3': 'Bancário', 'BRAP4': 'Mineração', 'CMIG4': 'Energia Elétrica',
  'CPFE3': 'Energia Elétrica', 'CSMG3': 'Saneamento', 'ISAE4': 'Energia Elétrica',
  'CXSE3': 'Seguros',
};

function seededRand(seed: number): number {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

function generateDividends(ticker: string): DividendRecord[] {
  const pattern = DIVIDEND_PATTERNS[ticker] ?? Array(12).fill(0.1);
  const records: DividendRecord[] = [];
  let seed = ticker.charCodeAt(0) + ticker.charCodeAt(1);
  for (const year of [2021, 2022, 2023, 2024, 2025]) {
    for (let m = 0; m < 12; m++) {
      const base = pattern[m];
      if (base === 0) continue;
      seed++;
      const value = parseFloat((base * (0.85 + seededRand(seed) * 0.30)).toFixed(4));
      const exDay = 10 + Math.floor(seededRand(seed + 100) * 10);
      const payDay = Math.min(exDay + 5 + Math.floor(seededRand(seed + 200) * 5), 28);
      const month = m + 1;
      records.push({
        year, month, value,
        type: ticker === 'ITUB3' ? 'jcp' : 'dividendo',
        exDate: `${year}-${String(month).padStart(2,'0')}-${String(exDay).padStart(2,'0')}`,
        payDate: `${year}-${String(month).padStart(2,'0')}-${String(payDay).padStart(2,'0')}`,
      });
    }
  }
  return records;
}

const INITIAL_TICKERS = ['BBAS3','BBSE3','PETR4','ITUB3','BRAP4','CMIG4','CPFE3','CSMG3','ISAE4','CXSE3'];

function calcNota(dy: number): number {
  if (dy <= 0) return 0;
  return Math.max(1, Math.min(10, Math.round(dy)));
}

function buildInitialStocks(): Stock[] {
  return INITIAL_TICKERS.map(ticker => ({
    ticker,
    name: ticker,
    sector: DEFAULT_SECTORS[ticker] ?? 'Outro',
    price: 0,
    changePercent: 0,
    dividendYield: 0,
    nota: 0,
    dividends: generateDividends(ticker),
  }));
}

@Injectable({ providedIn: 'root' })
export class StockDataService {
  private readonly _stocks = signal<Stock[]>(buildInitialStocks());
  private readonly _loading = signal(true);

  readonly stocks = this._stocks.asReadonly();
  readonly loading = this._loading.asReadonly();

  constructor(private api: StockApiService) {
    this.fetchPortfolioQuotes();
  }

  private fetchPortfolioQuotes(): void {
    const tickers = this._stocks().map(s => s.ticker);
    this.api.getBulkQuotes(tickers).subscribe(quotes => {
      this._stocks.update(list =>
        list.map(stock => {
          const q = quotes.find(q => q.ticker === stock.ticker);
          if (!q || !q.found) return stock;
          const rawSector = q.sector;
          const mappedSector = SECTOR_MAP[rawSector] || DEFAULT_SECTORS[stock.ticker] || stock.sector;
          return {
            ...stock,
            name: q.name || stock.ticker,
            sector: mappedSector,
            price: q.price || stock.price,
            changePercent: q.changePercent,
            dividendYield: q.dividendYield || stock.dividendYield,
            nota: calcNota(q.dividendYield || stock.dividendYield),
          };
        })
      );
      this._loading.set(false);
    });
  }

  getStocks(): Stock[] { return this._stocks(); }

  addStock(stock: Stock): void {
    this._stocks.update(list => [...list, stock]);
  }

  removeStock(ticker: string): void {
    this._stocks.update(list => list.filter(s => s.ticker !== ticker));
  }

  hasTicker(ticker: string): boolean {
    return this._stocks().some(s => s.ticker === ticker);
  }

  getMonthSummaries(): MonthSummary[] {
    return Array.from({ length: 12 }, (_, i) => {
      const month = i + 1;
      const tickers: string[] = [];
      let totalDividends = 0;
      let totalYield = 0;
      for (const stock of this._stocks()) {
        const recs = stock.dividends.filter(d => d.month === month);
        if (recs.length === 0) continue;
        const avg = recs.reduce((s, r) => s + r.value, 0) / recs.length;
        tickers.push(stock.ticker);
        totalDividends += avg;
        totalYield += stock.price > 0 ? (avg / stock.price) * 100 : 0;
      }
      return {
        month,
        monthName: FULL_MONTH_NAMES[i],
        tickers,
        totalDividends,
        avgYield: tickers.length > 0 ? totalYield / tickers.length : 0,
      };
    });
  }

  getBestMonthAnalysis(): BestMonthAnalysis[] {
    return this._stocks().map(stock => {
      const monthData = Array.from({ length: 12 }, (_, i) => {
        const month = i + 1;
        const recs = stock.dividends.filter(d => d.month === month);
        return {
          month,
          monthName: MONTH_NAMES[i],
          avgDividend: recs.length > 0 ? recs.reduce((s, r) => s + r.value, 0) / recs.length : 0,
          frequency: recs.length,
        };
      }).filter(m => m.avgDividend > 0).sort((a, b) => b.avgDividend - a.avgDividend);
      return { ticker: stock.ticker, bestMonths: monthData.slice(0, 3) };
    });
  }

  getBestMonthsToBuy(): { month: number; monthName: string; score: number; stockCount: number; nextMonthName: string }[] {
    const summaries = this.getMonthSummaries();
    return summaries.map((s, i) => {
      const next = summaries[(i + 1) % 12];
      return {
        month: s.month,
        monthName: s.monthName,
        score: next.totalDividends * next.tickers.length,
        stockCount: next.tickers.length,
        nextMonthName: next.monthName,
      };
    }).sort((a, b) => b.score - a.score);
  }

  getDividendsForMonth(year: number, month: number) {
    return this._stocks()
      .map(stock => ({ stock, dividend: stock.dividends.find(d => d.year === year && d.month === month) }))
      .filter(x => x.dividend !== undefined) as { stock: Stock; dividend: DividendRecord }[];
  }

  getMonthName(month: number): string { return FULL_MONTH_NAMES[month - 1]; }
  getShortMonthName(month: number): string { return MONTH_NAMES[month - 1]; }
}
