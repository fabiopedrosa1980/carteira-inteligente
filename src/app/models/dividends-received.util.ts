// Cálculo de dividendos recebidos — fonte única compartilhada entre a tela
// Dividendos → Recebidos (DividendsSummaryComponent) e o card "Dividendos
// Recebidos" do Dashboard (Meus Ativos), para que os valores coincidam.

/** Provento no formato mínimo necessário ao cálculo de recebidos. */
export interface ReceivedDividend {
  year?: number | null;
  month?: number | null;
  /** Valor por cota (equivale a `amount`/`value`). */
  amount: number;
  exDate?: string | null;
  payDate?: string | null;
}

/** Lançamento mínimo: quantidade e data (YYYY-MM-DD). */
export interface ReceivedTx {
  quantity: number;
  date: string;
}

/** Data de hoje em horário local (YYYY-MM-DD), evitando o fuso do toISOString(). */
export function localDateStr(d: Date = new Date()): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

/** Ano do provento, com fallback para o ano da data de pagamento. */
export function yearOf(d: ReceivedDividend): number {
  if (d.year && d.year > 0) return d.year;
  return d.payDate ? new Date(d.payDate).getFullYear() : 0;
}

/** Mês (1-12) do provento, com fallback para a data de pagamento/data-com. */
export function monthOf(d: ReceivedDividend): number {
  if (d.month && d.month >= 1 && d.month <= 12) return d.month;
  const ref = d.payDate || d.exDate;
  if (ref) {
    const m = new Date(ref).getMonth() + 1;
    if (m >= 1 && m <= 12) return m;
  }
  return 0;
}

// Recebidos por mês do ano corrente: soma amount × cotas elegíveis (lançamentos
// cuja data é <= data-com), considerando apenas proventos já pagos (pay_date
// anterior a hoje). Retorna o acumulado por mês (1-12).
export function receivedByMonth(
  dividends: ReceivedDividend[],
  txOfTicker: ReceivedTx[],
  todayStr: string = localDateStr(),
  currentYear: number = new Date().getFullYear(),
): Map<number, number> {
  const byMonth = new Map<number, number>();
  for (const d of dividends) {
    if (yearOf(d) !== currentYear) continue;
    // Só conta o que já foi pago: pay_date existente e anterior a hoje.
    if (!d.payDate || d.payDate >= todayStr) continue;

    const comDate = d.exDate || d.payDate || '';
    const eligibleShares = txOfTicker.reduce(
      (sum, t) => (!comDate || t.date <= comDate ? sum + t.quantity : sum),
      0,
    );
    const month = monthOf(d);
    byMonth.set(month, (byMonth.get(month) ?? 0) + d.amount * eligibleShares);
  }
  return byMonth;
}

// Total recebido do ativo no ano corrente (soma de todos os meses).
export function receivedForTicker(
  dividends: ReceivedDividend[],
  txOfTicker: ReceivedTx[],
  todayStr: string = localDateStr(),
  currentYear: number = new Date().getFullYear(),
): number {
  let total = 0;
  for (const v of receivedByMonth(dividends, txOfTicker, todayStr, currentYear).values()) {
    total += v;
  }
  return total;
}

// Projetados por mês do ano corrente: proventos ainda a receber (data de
// pagamento de hoje em diante, pay_date >= hoje), soma amount × cotas atuais.
// Complementa `receivedByMonth` (pay_date < hoje) sem lacuna nem sobreposição.
export function projectedByMonth(
  dividends: ReceivedDividend[],
  currentShares: number,
  todayStr: string = localDateStr(),
  currentYear: number = new Date().getFullYear(),
): Map<number, number> {
  const byMonth = new Map<number, number>();
  for (const d of dividends) {
    if (yearOf(d) !== currentYear) continue;
    // Só conta o que ainda será pago: pay_date existente e de hoje em diante.
    if (!d.payDate || d.payDate < todayStr) continue;
    const month = monthOf(d);
    byMonth.set(month, (byMonth.get(month) ?? 0) + d.amount * currentShares);
  }
  return byMonth;
}

// Total a receber do ativo no ano corrente (soma de todos os meses projetados).
export function projectedForTicker(
  dividends: ReceivedDividend[],
  currentShares: number,
  todayStr: string = localDateStr(),
  currentYear: number = new Date().getFullYear(),
): number {
  let total = 0;
  for (const v of projectedByMonth(dividends, currentShares, todayStr, currentYear).values()) {
    total += v;
  }
  return total;
}
