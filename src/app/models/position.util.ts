import { Stock } from './stock.model';

// Cálculos de posição derivados de quantity, avgPrice (preço médio) e price
// (preço atual). Guardas: retornam null quando faltam dados para o cálculo,
// para a UI não exibir valores inválidos.

export function saldo(stock: Stock): number | null {
  const qty = stock.quantity ?? 0;
  if (qty <= 0 || stock.price <= 0) return null;
  return qty * stock.price;
}

export function custo(stock: Stock): number | null {
  const qty = stock.quantity ?? 0;
  const avg = stock.avgPrice ?? 0;
  if (qty <= 0 || avg <= 0) return null;
  return qty * avg;
}

export function variacaoPosicao(stock: Stock): number | null {
  const s = saldo(stock);
  const c = custo(stock);
  if (s === null || c === null) return null;
  return s - c;
}

export function rentabilidade(stock: Stock): number | null {
  const avg = stock.avgPrice ?? 0;
  if (avg <= 0 || stock.price <= 0) return null;
  return ((stock.price - avg) / avg) * 100;
}
