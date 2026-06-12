export type MetaType = 'patrimonio' | 'renda_mensal' | 'preco_medio';

export interface Meta {
  id: string;
  name: string;

  targetValue: number;
  type: MetaType;
  ticker?: string; // só para type === 'preco_medio'
  createdAt: string;
}
