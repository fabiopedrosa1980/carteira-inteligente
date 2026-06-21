# Tasks: meus-ativos-resumo-financeiro

## dashboard.ts — computeds de resumo

- [x] Importar `custo` de `../../models/position.util` (junto com `saldo`, `variacaoPosicao`, `rentabilidade` já importados na linha 17)
- [x] Adicionar computed `readonly patrimonioTotal = computed(() => this.sortedStocks().reduce((sum, s) => sum + (saldo(s) ?? 0), 0))`
- [x] Adicionar computed `readonly valorInvestido = computed(() => this.sortedStocks().reduce((sum, s) => sum + (custo(s) ?? 0), 0))`
- [x] Adicionar computed `readonly lucroTotal = computed(() => this.patrimonioTotal() - this.valorInvestido())`
- [x] Adicionar computed `readonly lucroPercent = computed(() => { const inv = this.valorInvestido(); return inv > 0 ? (this.lucroTotal() / inv) * 100 : null; })`
- [x] Adicionar computed `readonly dividendosRecebidos = computed(() => this.svc.stocks().reduce((sum, stk) => sum + stk.dividends.reduce((ds, d) => ds + d.value * (stk.quantity ?? 0), 0), 0))`

## dashboard.html — bloco .portfolio-summary

- [x] Inserir o bloco `.portfolio-summary` dentro do `ng-container *ngIf="!acoesLoading() && acoes().length > 0"` (linha 96), antes da tag `@if (viewMode() === 'list')`, usando a estrutura:

```html
<div class="portfolio-summary">
  <div class="ps-strip">
    <div class="ps-hero">
      <span class="ps-label">Patrimônio Total</span>
      <span class="ps-value">R$ {{ patrimonioTotal() | number:'1.2-2' }}</span>
      <span class="ps-lucro"
            [class.pos]="lucroPercent() !== null && lucroTotal() >= 0"
            [class.neg]="lucroPercent() !== null && lucroTotal() < 0">
        <ng-container *ngIf="lucroPercent() !== null">
          {{ lucroTotal() >= 0 ? '+' : '−' }}R$ {{ (lucroTotal() < 0 ? -lucroTotal() : lucroTotal()) | number:'1.2-2' }}
          &nbsp;{{ lucroTotal() >= 0 ? '+' : '−' }}{{ (lucroPercent()! < 0 ? -lucroPercent()! : lucroPercent()!) | number:'1.1-1' }}%
        </ng-container>
        <ng-container *ngIf="lucroPercent() === null">—</ng-container>
      </span>
    </div>
    <div class="ps-secondary">
      <div class="ps-stat">
        <span class="ps-stat-label">Investido</span>
        <span class="ps-stat-value">R$ {{ valorInvestido() | number:'1.2-2' }}</span>
      </div>
      <div class="ps-stat">
        <span class="ps-stat-label">Dividendos Hist.</span>
        <span class="ps-stat-value">R$ {{ dividendosRecebidos() | number:'1.2-2' }}</span>
      </div>
    </div>
  </div>
</div>
```

## dashboard.scss — estilos do bloco e ajuste mobile

- [x] Adicionar estilos do `.portfolio-summary` e `.ps-*` (bloco de resumo com layout ledger strip):

```scss
.portfolio-summary {
  margin-bottom: 12px;
}

.ps-strip {
  background: var(--card-bg);
  border: 1px solid var(--border);
  border-radius: 10px;
  display: grid;
  grid-template-columns: 3fr 2fr;
  gap: 0;
  overflow: hidden;
}

.ps-hero {
  padding: 18px 20px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  border-right: 1px solid var(--border);
}

.ps-label {
  font-size: 11px;
  font-weight: 500;
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.ps-value {
  font-size: 22px;
  font-weight: 700;
  color: var(--text-primary);
  font-variant-numeric: tabular-nums;
  line-height: 1.1;
}

.ps-lucro {
  font-size: 13px;
  font-weight: 500;
  color: var(--text-secondary);
  font-variant-numeric: tabular-nums;
  &.pos { color: var(--pos-color, #22c55e); }
  &.neg { color: var(--neg-color, #ef4444); }
}

.ps-secondary {
  display: grid;
  grid-template-columns: 1fr 1fr;
}

.ps-stat {
  padding: 18px 16px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  &:first-child { border-right: 1px solid var(--border); }
}

.ps-stat-label {
  font-size: 11px;
  font-weight: 500;
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.ps-stat-value {
  font-size: 15px;
  font-weight: 600;
  color: var(--text-primary);
  font-variant-numeric: tabular-nums;
}

@media (max-width: 640px) {
  .ps-strip {
    grid-template-columns: 1fr;
  }
  .ps-hero {
    border-right: none;
    border-bottom: 1px solid var(--border);
    flex-direction: row;
    flex-wrap: wrap;
    align-items: baseline;
    gap: 6px 12px;
  }
  .ps-label { width: 100%; }
}
```

- [x] Adicionar breakpoint ≤480px na regra `@media (max-width: 640px)` existente da `.acoes-list` para ocultar também a coluna Rentabilidade (`nth-child(7)`):

```scss
@media (max-width: 480px) {
  .acoes-list {
    th:nth-child(7), td:nth-child(7) { display: none; }
    th:nth-child(1), td:nth-child(1) { width: 60%; }
    th:nth-child(5), td:nth-child(5) { width: 40%; }
  }
}
```
