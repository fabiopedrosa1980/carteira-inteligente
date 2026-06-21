import { AssetType } from './transaction.model';

// Detecção do tipo de ativo a partir do ticker da B3. Como as APIs (quote/search)
// não retornam a categoria, FII e ETF (ambos terminam em 11) são separados por
// uma lista de ETFs conhecidos: o que termina em 11 e não está na lista é tratado
// como FII. Novos ETFs precisam ser adicionados aqui.
export const ETF_TICKERS = new Set<string>([
  'BOVA11',
  'BOVV11',
  'BOVB11',
  'BRAX11',
  'PIBB11',
  'IVVB11',
  'SPXI11',
  'NASD11',
  'SMAL11',
  'SMAC11',
  'DIVO11',
  'FIND11',
  'GOVE11',
  'MATB11',
  'ECOO11',
  'ISUS11',
  'XBOV11',
  'GOLD11',
  'HASH11',
  'QBTC11',
  'ETHE11',
  'XINA11',
  'ACWI11',
  'EURP11',
  'TECK11',
  'USTK11',
  'WRLD11',
  'ESGB11',
  'NDIV11',
  'FIXA11',
  'IMAB11',
  'IRFM11',
  'LFTS11',
  'B5P211',
  'IB5M11',
  'DEBB11',
]);

// Retorna o tipo detectado pelo sufixo do ticker, ou null se indeterminado.
export function detectAssetType(ticker: string): AssetType | null {
  const t = (ticker ?? '').toUpperCase().trim();
  if (/11$/.test(t)) return ETF_TICKERS.has(t) ? 'ETFs' : 'FIIs';
  if (/[345678]$/.test(t)) return 'Acoes';
  return null;
}

// Rótulo legível do tipo (para mensagens).
export function assetTypeLabel(type: AssetType): string {
  return type === 'Acoes' ? 'Ações' : type;
}
