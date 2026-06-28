## 1. Cores neutras (my-assets.scss)

- [x] 1.1 `.total-cell` (desktop): trocar `color: var(--accent)` por `var(--text-primary)`, mantendo `font-weight: 700`.
- [x] 1.2 `.ticker-badge`: remover o tratamento de pílula verde (background `--accent`, `color: var(--accent)`, padding/border-radius) → texto simples em `var(--text-primary)`.
- [x] 1.3 No mobile, o ticker que hoje é `--accent` passa a `var(--text-primary)`; remover o override de tema claro que existia só para reverter esse verde.
- [x] 1.4 `.th-sort.active`: trocar `color: var(--accent)` por `var(--text-primary)` — coluna ordenada (ao clicar) sem verde.
- [x] 1.5 `.date-cell` e `.price-cell`: trocar `color: var(--text-secondary)` por `var(--text-primary)` — todos os valores em branco.

## 2. Alinhamento à esquerda (my-assets.scss)

- [x] 2.1 No bloco `@media (min-width: 601px)`, remover o `text-align: right` / `justify-content: flex-end` dos cabeçalhos (`.table-header > span:nth-child(3..6)`) e das células (`.qty-cell`, `.price-cell`, `.total-cell`) e o `flex-end` do `.action-cell` — deixando todas as colunas à esquerda.
- [x] 2.2 Preservar `font-variant-numeric: tabular-nums` nas colunas numéricas.

## 3. Verificação

- [x] 3.1 Desktop: tabela de Lançamentos com ticker neutro (sem pílula verde), Total em cor primária e todas as colunas à esquerda — igual a Meus Ativos. _(Verificado por lógica + build; confirmação visual pendente.)_
- [x] 3.2 Mobile (≤600px): cards de Lançamentos inalterados. _(Blocos `@media (max-width:600px)` preservados.)_
- [x] 3.3 Cabeçalho de seção do acordeão e faixa de resumo inalterados. _(.sec-total / .ma-summary intocados.)_
- [x] 3.4 `npx prettier --write` no arquivo alterado e `ng build` sem erros.
