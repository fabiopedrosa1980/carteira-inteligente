// Preço-teto / Zona de compra — cálculo puro e testável, no estilo de
// `dividends-received.util.ts`. Responde "a que preço esse ativo vira compra?"
// usando dados que o app já tem (histórico de proventos + cotação + P/VP).
//
// - Ações (Bazin): teto = DPA(12m) / yield-alvo.
// - FIIs: teto por yield (DPA(12m) como rendimento anual, robusto à frequência)
//   + sinal de P/VP quando disponível nos indicadores.
// - ETFs: preço-teto não se aplica → status "na".

/** Classe usada pelo preço-teto e pela configuração de yield-alvo. */
export type PrecoTetoClasse = 'Acoes' | 'FIIs' | 'ETFs';

/** Zona de decisão (semáforo). */
export type Zona = 'compra' | 'justo' | 'caro' | 'sem-dados' | 'na';

/** Provento no formato mínimo necessário ao DPA: valor por cota + pagamento. */
export interface TetoDividend {
  /** Valor por cota (equivale a `value`/`amount`). */
  value: number;
  /** Data de pagamento (YYYY-MM-DD). Sem ela, o provento é ignorado. */
  payDate?: string | null;
}

/** Mapeia o `sector` do `Stock` ('Ações' | 'FII' | 'ETF') para a classe. */
export function classeFromSector(sector: string): PrecoTetoClasse {
  if (sector === 'FII') return 'FIIs';
  if (sector === 'ETF') return 'ETFs';
  return 'Acoes';
}

/**
 * DPA(12m): soma dos proventos por cota pagos na janela `(today − 12m, today]`.
 * Independe da quantidade de cotas. Proventos sem `payDate` são desconsiderados.
 */
export function dpaTrailing12m(dividends: TetoDividend[], today: Date = new Date()): number {
  const cutoff = new Date(today);
  cutoff.setFullYear(cutoff.getFullYear() - 1);
  let sum = 0;
  for (const d of dividends) {
    if (!d.payDate) continue;
    const pd = new Date(d.payDate);
    if (isNaN(pd.getTime())) continue;
    if (pd > cutoff && pd <= today) sum += d.value;
  }
  return sum;
}

// Normaliza rótulo de indicador (minúsculas, sem acentos/espaços/pontos; mantém "/").
function normLabel(label: string): string {
  return (label ?? '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[\s.]/g, '');
}

/** Extrai o P/VP (número) dos indicadores quando presente; senão `null`. */
export function parsePvp(indicators?: { label: string; value: string }[]): number | null {
  if (!indicators) return null;
  const item = indicators.find((i) => {
    const k = normLabel(i.label);
    return k === 'pvp' || k === 'p/vp';
  });
  if (!item) return null;
  const num = parseFloat((item.value ?? '').replace(/\./g, '').replace(',', '.'));
  return isFinite(num) ? num : null;
}

/** Sinal de P/VP: > 1 caro, < 1 barato, = 1 neutro, ausente null. */
export function pvpSinal(pvp: number | null | undefined): 'barato' | 'caro' | 'neutro' | null {
  if (pvp === null || pvp === undefined || !isFinite(pvp)) return null;
  if (pvp > 1) return 'caro';
  if (pvp < 1) return 'barato';
  return 'neutro';
}

export interface PrecoTetoInput {
  classe: PrecoTetoClasse;
  /** DPA(12m) por cota. */
  dpa12m: number;
  /** Yield-alvo em decimal (ex.: 0.06 = 6%). */
  yieldAlvo: number;
  /** Preço atual do ativo. */
  price: number;
  /** Margem de segurança em decimal (ex.: 0.10 = 10%). */
  margem: number;
  /** P/VP do FII quando disponível. */
  pvp?: number | null;
}

export interface PrecoTetoResult {
  zona: Zona;
  /** DPA(12m) usado no cálculo (por cota). */
  dpa12m: number;
  /** Yield-alvo aplicado, em decimal. */
  yieldAlvo: number;
  /** Preço-teto (DPA12m / yield-alvo) ou null quando não aplicável. */
  teto: number | null;
  /** Preço justo de compra = teto × (1 − margem). */
  precoJusto: number | null;
  /** Preço atual vs teto: `price/teto − 1` (negativo = desconto). */
  descontoPct: number | null;
  /** Sinal de P/VP (FIIs), quando o indicador existe. */
  pvpSinal: 'barato' | 'caro' | 'neutro' | null;
}

/**
 * Calcula o preço-teto e classifica em zona, aplicando a margem de segurança:
 * 🟢 preço ≤ justo · 🟡 justo < preço ≤ teto · 🔴 preço > teto · ⚪ sem dados · n/a (ETF).
 */
export function precoTeto(input: PrecoTetoInput): PrecoTetoResult {
  const { classe, dpa12m, yieldAlvo, price, margem } = input;
  const sinal = classe === 'FIIs' ? pvpSinal(input.pvp) : null;

  if (classe === 'ETFs') {
    return {
      zona: 'na',
      dpa12m,
      yieldAlvo,
      teto: null,
      precoJusto: null,
      descontoPct: null,
      pvpSinal: null,
    };
  }
  if (!(dpa12m > 0) || !(yieldAlvo > 0)) {
    return {
      zona: 'sem-dados',
      dpa12m,
      yieldAlvo,
      teto: null,
      precoJusto: null,
      descontoPct: null,
      pvpSinal: sinal,
    };
  }

  const teto = dpa12m / yieldAlvo;
  const precoJusto = teto * (1 - margem);
  const descontoPct = price > 0 ? price / teto - 1 : null;

  let zona: Zona;
  if (!(price > 0)) zona = 'sem-dados';
  else if (price <= precoJusto) zona = 'compra';
  else if (price <= teto) zona = 'justo';
  else zona = 'caro';

  return { zona, dpa12m, yieldAlvo, teto, precoJusto, descontoPct, pvpSinal: sinal };
}
