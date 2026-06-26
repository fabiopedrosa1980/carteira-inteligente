import { AssetType } from './transaction.model';

// FALLBACK OFFLINE. A fonte de verdade do tipo de ativo é o catálogo B3 da API
// (tabela b3_assets), exposto via `assetType` da cotação e do endpoint
// `/assets/:ticker`. Esta heurística por sufixo só é usada quando o catálogo não
// respondeu ou não conhece o ticker (offline/erro/papel recém-listado).
// O sufixo 11 é ambíguo (FIIs, ETFs e units de ações o usam), então um ticker
// terminado em 11 fora da lista de ETFs fica indeterminado (null) — não é
// chutado como FII, o que travava o registro de units como Ações.
// Novos ETFs podem ser adicionados aqui, mas o catálogo da API os cobre.
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
  if (/11$/.test(t)) return ETF_TICKERS.has(t) ? 'ETFs' : null;
  if (/[345678]$/.test(t)) return 'Acoes';
  return null;
}

// Rótulo legível do tipo (para mensagens).
export function assetTypeLabel(type: AssetType): string {
  return type === 'Acoes' ? 'Ações' : type;
}
