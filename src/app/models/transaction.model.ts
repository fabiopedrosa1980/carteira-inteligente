export type AssetType = 'Acoes' | 'FIIs' | 'ETFs';

export interface Transaction {
  id: string;
  assetType: AssetType;
  ticker: string;
  date: string;
  quantity: number;
  price: number;
}
