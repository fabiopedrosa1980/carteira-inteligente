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

// Normaliza para comparação: minúsculas e sem acentos.
function normalizeName(s: string): string {
  return (s ?? '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
}

// Classifica um ticker terminado em 11 pelo NOME do ativo (cotação). Usado como
// fallback quando o catálogo da API não conhece o ticker: FIIs trazem
// "imobiliário"/"FII"; ETFs trazem "índice"/"index"/"ishares"/"ETF"; o restante
// é unit de ação (TAEE11/SANB11). Retorna null quando não há sinal utilizável
// (ticker não termina em 11 ou nome vazio).
export function detectAssetTypeByName(ticker: string, name: string): AssetType | null {
  const t = (ticker ?? '').toUpperCase().trim();
  if (!/11$/.test(t)) return null;
  const n = normalizeName(name);
  if (!n) return null;
  if (/imobiliari|\bfii\b/.test(n)) return 'FIIs';
  if (/indice|index|ishares|\betf\b/.test(n)) return 'ETFs';
  return 'Acoes';
}

// Resolve o tipo do ativo em tiers, do sinal mais confiável ao menos:
//  1. catálogo da API Go (assetType da cotação) — fonte de verdade;
//  2. nome do ativo (desambigua tickers 11 fora do catálogo);
//  3. heurística por sufixo (só 3–8 é confiável; 11 → null/indeterminado).
// Retorna null = indeterminado (a validação NÃO deve bloquear).
export function resolveAssetType(
  ticker: string,
  catalogType?: AssetType | '' | null,
  name?: string,
): AssetType | null {
  if (catalogType) return catalogType;
  const byName = detectAssetTypeByName(ticker, name ?? '');
  if (byName) return byName;
  return detectAssetType(ticker);
}

// Rótulo legível do tipo (para mensagens).
export function assetTypeLabel(type: AssetType): string {
  return type === 'Acoes' ? 'Ações' : type;
}
