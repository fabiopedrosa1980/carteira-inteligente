import { Injectable, computed, inject } from '@angular/core';
import { Stock } from '../models/stock.model';
import {
  classeFromSector,
  dpaTrailing12m,
  parsePvp,
  precoTeto,
  PrecoTetoResult,
} from '../models/preco-teto.util';
import { PrecoTetoConfigService } from './preco-teto-config.service';
import { StockDataService } from './stock-data.service';

/**
 * Cálculo do preço-teto por dividendos para uma posição. Domínio compartilhado
 * entre a tabela de ativos (coluna Oportunidade) e o modal de detalhe do ativo —
 * antes duplicado no dashboard. Os proventos vêm de StockDataService.stocks()
 * (carregados via getStockDividends), cruzados por ticker com a posição.
 */
@Injectable({ providedIn: 'root' })
export class PrecoTetoService {
  private readonly svc = inject(StockDataService);
  private readonly config = inject(PrecoTetoConfigService);

  private readonly dividendsByTicker = computed(() => {
    const map = new Map<string, { value: number; payDate?: string | null }[]>();
    const norm = (t: string) => (t ?? '').toUpperCase().trim();
    for (const stk of this.svc.stocks()) {
      map.set(
        norm(stk.ticker),
        stk.dividends.map((d) => ({ value: d.value, payDate: d.payDate })),
      );
    }
    return map;
  });

  // Resultado do preço-teto para uma posição (zona, teto, desconto, P/VP).
  of(s: Stock): PrecoTetoResult {
    const classe = classeFromSector(s.sector);
    const norm = (t: string) => (t ?? '').toUpperCase().trim();
    const divs = this.dividendsByTicker().get(norm(s.ticker)) ?? [];
    const dpa12m = dpaTrailing12m(divs);
    return precoTeto({
      classe,
      dpa12m,
      yieldAlvo: this.config.yieldFor(s.ticker, classe),
      price: s.price ?? 0,
      margem: this.config.margem(),
      pvp: parsePvp(s.indicators),
    });
  }
}
