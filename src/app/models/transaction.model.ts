export type AssetType = 'Acoes' | 'FIIs' | 'ETFs';

export interface Transaction {
  id: number;
  assetType: AssetType;
  ticker: string;
  date: string;
  quantity: number;
  price: number;
}

export interface PortfolioItem {
  ticker: string;
  assetType: AssetType;
  totalQuantity: number;
  avgPrice: number;
  currentPrice: number;
  changePercent: number;
  dividendYield: number;
}
