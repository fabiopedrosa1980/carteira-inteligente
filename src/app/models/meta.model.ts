export type MetaType = 'patrimonio' | 'renda_mensal' | 'preco_medio';

export interface Meta {
  id: string;
  name: string;
  targetValue: number;
  type: MetaType;
  ticker?: string;
  createdAt: string;
  currentValue?: number;
  progressPercent?: number;
}
