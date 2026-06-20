## Context

`.tab-nav` (dashboard) já é flex com `overflow-x:auto`, `white-space:nowrap`, `flex-shrink:0` (rola, mas não encolhe). `.stocks-grid` agora é `auto-fill minmax` (1 col em ≤380). `.dv-tabs` (dividends) e `.dh-years` (history) usam `flex-wrap: wrap` (quebram linha). `MyAssetsComponent` tem `svc.loading` disponível (signal no `TransactionService`), mas não renderiza skeleton. O sistema global de skeleton (`.skeleton`, shimmer, `prefers-reduced-motion`) já existe em `styles.scss`.

## Goals / Non-Goals

**Goals:** menus em 1 linha no mobile; 2 cards/linha; skeleton de Lançamentos nas 3 seções; chips de anos em 1 linha.

**Non-Goals:** novas telas; mudar dados; desktop.

## Decisions

**1. Menu principal em 1 linha.** No `@media (max-width: 600px)` do `.tab-nav`: reduzir `padding` lateral do nav e dos botões, `font-size` (~12–13px), `gap` e o ícone; trocar `flex-shrink:0` por permitir encolher (`flex: 1 1 auto; min-width: 0`) com `justify-content: space-between`, e elipse no label se faltar espaço. Mantém `overflow-x:auto` como fallback.

**2. Minhas Ações 2 colunas.** `.stocks-grid` no `@media (max-width: 640px)` → `grid-template-columns: repeat(2, 1fr)`; remover a regra de 1 coluna ≤380 (passa a 2). As proteções de overflow do card (min-width:0, wrap, clamp do preço) já cobrem 2 colunas estreitas.

**3. Skeleton de Lançamentos.** No `accordion-inner` de cada seção, quando `svc.loading()`, renderizar um bloco skeleton (ex.: 3 linhas `.skeleton`) no lugar da tabela/empty. Markup simples reutilizando `.skeleton`/`.skeleton-line`. Some quando `!svc.loading()`.

**4. Dividendos em 1 linha.** `.dv-tabs`: trocar `flex-wrap: wrap` por `nowrap` + `overflow-x:auto` (scrollbar oculta) no mobile; reduzir padding/fonte dos `.dv-tab` para caber 4 tabs.

**5. Anos do Histórico em 1 linha.** `.dh-years`: `flex-wrap: nowrap` + `overflow-x:auto` no mobile; `.dh-year-chip` menor (padding/fonte) e `flex-shrink:0` para os 5 anos + "Todos" ficarem numa linha (rolando se não couber).

## Risks / Trade-offs

- [Rótulos longos no tab-nav] "Lançamentos"/"Dividendos" podem apertar; elipse + scroll de segurança evitam quebra.
- [nowrap com scroll] "caber em 1 linha" pode virar 1 linha rolável quando não cabe tudo; aceitável e melhor que quebrar em 2 linhas.
