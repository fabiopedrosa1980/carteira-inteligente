// Alocação & rebalanceamento — cálculo puro e testável (estilo de
// preco-teto.util.ts). Responde "estou concentrado/desbalanceado?" usando o
// saldo das posições já carregadas. Granularidade: por classe (Ações/FIIs/ETFs)
// + alerta de concentração por ativo. Sem lógica fiscal (aporte = venda).

import { Stock } from './stock.model';
import { saldo } from './position.util';
import { classeFromSector, PrecoTetoClasse } from './preco-teto.util';

export type AllocClasse = PrecoTetoClasse; // 'Acoes' | 'FIIs' | 'ETFs'

export interface AllocationTargets {
  Acoes: number;
  FIIs: number;
  ETFs: number;
}

const CLASSES: AllocClasse[] = ['Acoes', 'FIIs', 'ETFs'];

export interface ClassAllocation {
  classe: AllocClasse;
  saldo: number;
  /** Percentual do patrimônio (0–100). */
  pct: number;
}

export interface AllocationResult {
  patrimonio: number;
  byClass: ClassAllocation[];
}

export type DeviationStatus = 'abaixo' | 'acima' | 'no-alvo';

export interface ClassDeviation {
  classe: AllocClasse;
  atualPct: number;
  alvoPct: number;
  /** Desvio em pontos percentuais (atual − alvo). */
  desvioPp: number;
  /** Montante em R$ (≥ 0) para convergir ao alvo. */
  montante: number;
  /** abaixo → aportar · acima → reduzir · no-alvo → dentro da tolerância. */
  status: DeviationStatus;
}

export interface Concentration {
  ticker: string;
  /** Percentual do patrimônio (0–100). */
  pct: number;
}

/** Alocação atual por classe (saldo e %), a partir do saldo das posições. */
export function allocationByClass(stocks: Stock[]): AllocationResult {
  const saldoByClass: Record<AllocClasse, number> = { Acoes: 0, FIIs: 0, ETFs: 0 };
  let patrimonio = 0;

  for (const s of stocks) {
    const v = saldo(s);
    if (v === null || v <= 0) continue;
    const classe = classeFromSector(s.sector);
    saldoByClass[classe] += v;
    patrimonio += v;
  }

  const byClass = CLASSES.map((classe) => ({
    classe,
    saldo: saldoByClass[classe],
    pct: patrimonio > 0 ? (saldoByClass[classe] / patrimonio) * 100 : 0,
  }));

  return { patrimonio, byClass };
}

/**
 * Desvio de cada classe vs alvo + montante R$ para convergir. Aporte (abaixo) e
 * venda (acima) têm o mesmo peso. `tolerancia` (pp) define a faixa "no alvo".
 */
export function deviations(
  atual: ClassAllocation[],
  alvos: AllocationTargets,
  patrimonio: number,
  tolerancia = 2,
): ClassDeviation[] {
  const atualByClass = new Map(atual.map((a) => [a.classe, a.pct]));
  return CLASSES.map((classe) => {
    const atualPct = atualByClass.get(classe) ?? 0;
    const alvoPct = alvos[classe] ?? 0;
    const desvioPp = atualPct - alvoPct;
    const montante = (Math.abs(alvoPct - atualPct) / 100) * patrimonio;
    let status: DeviationStatus;
    if (Math.abs(desvioPp) <= tolerancia) status = 'no-alvo';
    else status = desvioPp < 0 ? 'abaixo' : 'acima';
    return { classe, atualPct, alvoPct, desvioPp, montante, status };
  });
}

/** Ativos cujo saldo ultrapassa o limite de concentração (% do patrimônio). */
export function concentrations(
  stocks: Stock[],
  patrimonio: number,
  limite: number,
): Concentration[] {
  if (patrimonio <= 0) return [];
  const out: Concentration[] = [];
  for (const s of stocks) {
    const v = saldo(s);
    if (v === null || v <= 0) continue;
    const pct = (v / patrimonio) * 100;
    if (pct > limite) out.push({ ticker: s.ticker, pct });
  }
  return out.sort((a, b) => b.pct - a.pct);
}
