## Context

A tabela `.acoes-list` (em `dashboard.scss`) tem 7 colunas na ordem: Ativo(1), Qtd(2), Preço Médio(3), Hoje(4), Saldo(5), Variação(6), Rent.(7). A media query `@media (max-width: 640px)` atual oculta Preço(3), Hoje(4) e Rent.(7), mantendo Ativo, Qtd, Saldo, Variação. O usuário agora quer trocar Variação por Rentabilidade e definir larguras específicas.

## Goals / Non-Goals

**Goals:**
- Mobile: exibir Ativo, Qtd, Rentabilidade, Saldo.
- Larguras: Ativo 15%, Qtde 15%, Rent. 35%, Saldo 35%.

**Non-Goals:**
- Não alterar o desktop (mantém 7 colunas).
- Não mexer em HTML/TS; apenas SCSS.

## Decisions

- Na media query ≤640px da `.acoes-list`:
  - Ocultar Preço Médio(3), Hoje(4) e **Variação(6)** — antes ocultava 3,4,7.
  - Manter Ativo(1), Qtd(2), Saldo(5), Rent.(7).
  - `nth-child` ocultos: `3`, `4`, `6` (th e td).
  - Larguras `.cl-*`: `.cl-ativo { width: 15% }`, `.cl-qtd { width: 15% }`, `.cl-saldo { width: 35% }`, `.cl-rent { width: 35% }`. Colunas ocultas (`.cl-preco`, `.cl-hoje`, `.cl-var`) com `width: 0`.
  - Atualizar o comentário do mapeamento de colunas.

## Risks / Trade-offs

- A sub-linha `.ca-qty` permanece oculta (já estava).
- 15+15+35+35 = 100%; com `table-layout: fixed` as larguras são respeitadas. Conteúdos longos (valores em R$) truncam com ellipsis, comportamento já existente nas `td`.
