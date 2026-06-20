## Context

`DividendsComponent` já tem sub-tabs (Histórico/Recebidos/Projetados) e o seletor `assetType` (Ações/FIIs), passado via `@Input` aos filhos. `dividends-summary` carrega posições (`getAcoes`/`getFiis`) e, para cada `stock_id>0`, busca `getStockDividends(id)` via `forkJoin`. `ApiDividend` tem `ex_date`, `pay_date`, `month`, `year`.

## Decisions

**1. Data-com (ex_date), ano anterior.** O mês de cada provento no Radar SHALL vir do **`ex_date`** (data-com) — é a data relevante para "comprar antes". Filtra `year(ex_date) === anoAtual-1`. Mês = `new Date(ex_date).getMonth()+1` (fallback para `month` quando `ex_date` ausente).

**2. Novo componente `DividendsRadarComponent`** (standalone, `@Input() assetType`, `OnChanges` como os irmãos). Carrega via `forkJoin([getAcoes|getFiis, ...getStockDividends])`, agrega em `Map<mês, Set<ticker>>`, e expõe `months: { label, tickers[] }[]` (12 entradas, Jan→Dez).

**3. Layout.** Grade responsiva de cards (ex.: 4 col desktop, 2 tablet, 1 mobile); header do card = nome do mês; corpo = chips de ticker (reusando estilo de `.ticker-badge`); mês vazio mostra um traço/placeholder.

**4. Sub-tab.** Adicionar `{ id:'radar', label:'Radar', iconPath: <svg radar/alvo> }` em `dividends.ts` e o `<app-dividends-radar *ngIf="activeTab()==='radar'" [assetType]>` em `dividends.html`.

## Risks / Trade-offs

- [Custo de N requisições `getStockDividends`] → já é o padrão do `dividends-summary`; aceitável.
- [Sazonalidade ≠ garantia] → o Radar é histórico (ano anterior); deixar claro no rótulo ("com base no ano anterior").
- [ex_date ausente em alguns proventos] → fallback para `month`/`pay_date`.
