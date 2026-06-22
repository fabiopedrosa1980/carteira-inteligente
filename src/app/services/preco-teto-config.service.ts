import { Injectable, signal } from '@angular/core';
import { PrecoTetoClasse } from '../models/preco-teto.util';

// Configuração do preço-teto: yield-alvo padrão por classe, override por ativo e
// margem de segurança. Persistida em localStorage (mesmo padrão de `radar-view`),
// client-side. Sem configuração salva, aplicam-se os defaults.

const STORAGE_KEY = 'preco-teto-config';

export interface PrecoTetoConfig {
  /** Yield-alvo padrão por classe, em decimal (0.06 = 6%). */
  yieldByClass: { Acoes: number; FIIs: number };
  /** Override por ticker (yield-alvo próprio), em decimal. */
  overrides: Record<string, number>;
  /** Margem de segurança em decimal (0.10 = 10%). */
  margem: number;
}

const DEFAULTS: PrecoTetoConfig = {
  yieldByClass: { Acoes: 0.06, FIIs: 0.08 },
  overrides: {},
  margem: 0.1,
};

@Injectable({ providedIn: 'root' })
export class PrecoTetoConfigService {
  private readonly _config = signal<PrecoTetoConfig>(this.load());
  readonly config = this._config.asReadonly();

  private load(): PrecoTetoConfig {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return { ...DEFAULTS, yieldByClass: { ...DEFAULTS.yieldByClass }, overrides: {} };
      const parsed = JSON.parse(raw) as Partial<PrecoTetoConfig>;
      return {
        yieldByClass: {
          Acoes: parsed.yieldByClass?.Acoes ?? DEFAULTS.yieldByClass.Acoes,
          FIIs: parsed.yieldByClass?.FIIs ?? DEFAULTS.yieldByClass.FIIs,
        },
        overrides: parsed.overrides ?? {},
        margem: parsed.margem ?? DEFAULTS.margem,
      };
    } catch {
      return { ...DEFAULTS, yieldByClass: { ...DEFAULTS.yieldByClass }, overrides: {} };
    }
  }

  private persist(next: PrecoTetoConfig): void {
    this._config.set(next);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      // localStorage indisponível (modo privado): mantém só em memória.
    }
  }

  private norm(ticker: string): string {
    return (ticker ?? '').toUpperCase().trim();
  }

  /** Yield-alvo resolvido para um ativo: override por ticker ?? padrão da classe. */
  yieldFor(ticker: string, classe: PrecoTetoClasse): number {
    if (classe === 'ETFs') return 0;
    const ov = this._config().overrides[this.norm(ticker)];
    if (ov && ov > 0) return ov;
    return classe === 'FIIs' ? this._config().yieldByClass.FIIs : this._config().yieldByClass.Acoes;
  }

  /** Margem de segurança atual (decimal). */
  margem(): number {
    return this._config().margem;
  }

  setYieldByClass(classe: 'Acoes' | 'FIIs', value: number): void {
    const cur = this._config();
    this.persist({ ...cur, yieldByClass: { ...cur.yieldByClass, [classe]: value } });
  }

  setOverride(ticker: string, value: number | null): void {
    const cur = this._config();
    const overrides = { ...cur.overrides };
    const key = this.norm(ticker);
    if (value && value > 0) overrides[key] = value;
    else delete overrides[key];
    this.persist({ ...cur, overrides });
  }

  setMargem(value: number): void {
    this.persist({ ...this._config(), margem: value });
  }
}
