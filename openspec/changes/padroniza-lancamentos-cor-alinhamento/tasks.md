## 1. Cores neutras (my-assets.scss)

- [ ] 1.1 `.total-cell` (desktop): trocar `color: var(--accent)` por `var(--text-primary)`, mantendo `font-weight: 700`.
- [ ] 1.2 `.ticker-badge`: remover o tratamento de pílula verde (background `--accent`, `color: var(--accent)`, padding/border-radius) → texto simples em `var(--text-primary)`.
- [ ] 1.3 No mobile, o ticker que hoje é `--accent` passa a `var(--text-primary)`; remover o override de tema claro que existia só para reverter esse verde.

## 2. Alinhamento à esquerda (my-assets.scss)

- [ ] 2.1 No bloco `@media (min-width: 601px)`, remover o `text-align: right` / `justify-content: flex-end` dos cabeçalhos (`.table-header > span:nth-child(3..6)`) e das células (`.qty-cell`, `.price-cell`, `.total-cell`) e o `flex-end` do `.action-cell` — deixando todas as colunas à esquerda.
- [ ] 2.2 Preservar `font-variant-numeric: tabular-nums` nas colunas numéricas.

## 3. Verificação

- [ ] 3.1 Desktop: tabela de Lançamentos com ticker neutro (sem pílula verde), Total em cor primária e todas as colunas à esquerda — igual a Meus Ativos.
- [ ] 3.2 Mobile (≤600px): cards de Lançamentos inalterados.
- [ ] 3.3 Cabeçalho de seção do acordeão e faixa de resumo inalterados.
- [ ] 3.4 `npx prettier --write` no arquivo alterado e `ng build` sem erros.
