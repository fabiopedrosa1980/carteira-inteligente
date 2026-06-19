// Motor de cadência: estima a próxima data-com (ex_date) de um ativo a partir
// do histórico de datas-com, já que o backend não traz ex_date futuro.

export type CadenceName = 'mensal' | 'trimestral' | 'semestral' | 'anual';

export interface CadenceResult {
  next: Date; // próxima data-com estimada (>= hoje)
  level: 'day' | 'month'; // confiança: dia exato vs apenas o mês provável
  cadence: CadenceName;
  daysUntil: number; // dias de hoje até `next`
}

const DAY_MS = 24 * 60 * 60 * 1000;

// Valores canônicos de cadência (dias) e seus rótulos.
const CADENCES: { days: number; name: CadenceName }[] = [
  { days: 30, name: 'mensal' },
  { days: 91, name: 'trimestral' },
  { days: 182, name: 'semestral' },
  { days: 365, name: 'anual' },
];

// "YYYY-MM-DD" → Date em meia-noite local (evita deslocamento de fuso do UTC).
function parseLocal(s: string): Date | null {
  if (!s) return null;
  const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(s);
  if (!m) return null;
  const d = new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]));
  return isNaN(d.getTime()) ? null : d;
}

function midnight(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

function median(nums: number[]): number {
  const s = [...nums].sort((a, b) => a - b);
  const mid = Math.floor(s.length / 2);
  return s.length % 2 ? s[mid] : (s[mid - 1] + s[mid]) / 2;
}

function classify(gap: number): CadenceName {
  let best = CADENCES[0];
  let bestDiff = Infinity;
  for (const c of CADENCES) {
    const diff = Math.abs(gap - c.days);
    if (diff < bestDiff) {
      bestDiff = diff;
      best = c;
    }
  }
  return best.name;
}

/**
 * Estima a próxima data-com a partir das ex_dates históricas.
 * Retorna null quando não há padrão confiável:
 *  - menos de 2 datas-com (sem intervalo);
 *  - ritmo quebrado (última ex muito mais antiga que 1,5× o intervalo).
 */
export function estimateNextExDate(
  exDates: string[],
  now: Date = new Date(),
): CadenceResult | null {
  const dates = exDates
    .map(parseLocal)
    .filter((d): d is Date => d !== null)
    .sort((a, b) => a.getTime() - b.getTime());

  if (dates.length < 2) return null;

  const gaps: number[] = [];
  for (let i = 1; i < dates.length; i++) {
    gaps.push(Math.round((dates[i].getTime() - dates[i - 1].getTime()) / DAY_MS));
  }

  const gap = median(gaps);
  if (gap <= 0) return null;

  const today = midnight(now);
  const last = dates[dates.length - 1];

  // Ritmo quebrado: a última data-com ficou para trás além de 1,5× o intervalo.
  if ((today.getTime() - last.getTime()) / DAY_MS > gap * 1.5) return null;

  // Projeta para frente até ultrapassar hoje.
  let next = last;
  while (next.getTime() <= today.getTime()) {
    next = new Date(next.getFullYear(), next.getMonth(), next.getDate() + Math.round(gap));
  }

  const daysUntil = Math.round((next.getTime() - today.getTime()) / DAY_MS);

  // Confiança: coeficiente de variação dos intervalos.
  const mean = gaps.reduce((s, g) => s + g, 0) / gaps.length;
  const variance = gaps.reduce((s, g) => s + (g - mean) ** 2, 0) / gaps.length;
  const cv = mean > 0 ? Math.sqrt(variance) / mean : Infinity;
  const level: 'day' | 'month' = dates.length >= 3 && cv <= 0.15 ? 'day' : 'month';

  return { next, level, cadence: classify(gap), daysUntil };
}
