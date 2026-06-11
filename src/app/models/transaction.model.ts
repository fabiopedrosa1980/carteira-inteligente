export type AssetType = 'Acoes' | 'FIIs' | 'ETFs';

export interface Transaction {
  id: number;
  assetType: AssetType;
  ticker: string;
  date: string;
  quantity: number;
  price: number;
}
