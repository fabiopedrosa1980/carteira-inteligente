## Context

A tabela de Lançamentos usa "grade-como-tabela" (`.table-header`/`.table-row` em CSS grid), compartilhada entre as visões detalhada e agrupada. Estado atual no mobile (`@media max-width: 600px`):

- **`.table-header` (geral)**: vira `grid-template-columns: repeat(3, minmax(0,1fr)) 56px` e oculta `> span:nth-child(2)` e `:nth-child(4)` (Data e Preço unitário da visão detalhada).
- **`.price-cell`** e **`.date-cell`**: já têm `display: none` no mobile (globais).
- **`.transactions-table.grouped`**: no mobile, `.table-header { display: none }` e `.table-row { display: block }` com rótulos `::before` — ou seja, **cards empilhados**. É isso que será removido.

Colunas da visão agrupada (ordem): Ativo(1) · Qtd(2) · Preço médio(3) · Total(4) · Lançamentos(5).

## Goals / Non-Goals

**Goals:**
- Visão agrupada no mobile = tabela em colunas (igual web), não cards.
- Mostrar Ativo · Qtd · Total; ocultar Preço médio e Lançamentos.
- Sem rolagem horizontal; cabeçalho visível e alinhado.

**Non-Goals:**
- Alterar a visão detalhada (não agrupada).
- Mudar a marcação HTML da tabela (resolver via CSS).
- Mudar dados/serviços.

## Decisions

- **Remover o bloco de cards empilhados.** Apagar o `@media (max-width: 600px)` dentro de `.transactions-table.grouped` que faz `display:block` nas linhas, `display:none` no header e os rótulos `::before`. Racional: contraria o "igual à web".
- **Regra mobile própria da visão agrupada (grade de 3 colunas).** Adicionar `.transactions-table.grouped @media (max-width: 600px)` que define `.table-header, .table-row { grid-template-columns: minmax(0, 1.4fr) minmax(0, 1fr) minmax(0, 1fr) }` (Ativo larguinho + Qtd + Total). Como a regra geral de `.table-header` no mobile força 4 trilhas e esconde child 2/4, a visão agrupada precisa **sobrescrever**:
  - reexibir o cabeçalho de Qtd e Total: `.table-header > span:nth-child(2), .table-header > span:nth-child(4) { display: block }`;
  - ocultar Preço médio e Lançamentos: `.table-header > span:nth-child(3), .table-header > span:nth-child(5) { display: none }` e `.count-cell { display: none }` (o `.price-cell` já é oculto globalmente no mobile).
- **Reaproveitar contenção existente.** `minmax(0, 1fr)` + `.table-row > span { min-width: 0; overflow: hidden; text-overflow: ellipsis }` (já existentes) garantem ajuste sem estourar.

## Risks / Trade-offs

- [Ordem/escopo das regras nth-child entre header geral e agrupado] → A regra agrupada é mais específica (`.transactions-table.grouped .table-header > span:nth-child(...)`) e vence a geral; validar no build/visual.
- [Total em moeda truncar em telas muito estreitas] → `text-overflow: ellipsis` evita overflow; ~320px com 3 colunas comporta "R$ 3,4k"/valores; conferir.
- [Perda de Preço médio/Lançamentos no mobile] → Decisão do usuário; informação detalhada permanece no desktop e na visão detalhada.
