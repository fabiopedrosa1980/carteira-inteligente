## Context

Dois ajustes de estilo, sem mudança de lógica, dados ou DOM/HTML:

1. **Card Meus Ativos (mobile)** — em `dashboard.scss`, no `@media (max-width: 640px)` da `.acoes-list`, o `grid-template-areas` da `.acoes-row` está (após o ajuste anterior):
   ```
   'ticker hoje'
   'saldo  patual'
   'preco  qtd'
   'rent   var'
   ```
   `preco` (Preço médio) e `patual` (Preço atual) ficam em linhas diferentes, com `qtd` (Quantidade) entre eles. Os campos usam grid-areas nomeadas (`patual`, `qtd`, `preco`, etc.) atribuídas via `td:nth-child(...)`.
2. **Histórico** — em `dividend-history.scss`, `.dh-section` tem `border: 1px solid var(--border-color, #333)` (linha 6), além de `background`, `border-radius` e `padding`. Essa borda é a que está fora do padrão desejado para a tela.

## Goals / Non-Goals

**Goals:**
- Deixar Preço médio e Preço atual na mesma linha do card mobile, trocando a quantidade de lugar com o Preço atual.
- Remover a borda do contêiner da tela de Histórico.

**Non-Goals:**
- Não alterar o layout desktop do card de ativos.
- Não alterar fundo/espaçamento/cantos do `.dh-section` (apenas a borda).
- Não mexer nas telas de Recebidos/Projetados/Radar.

## Decisions

- **Trocar `qtd` ↔ `patual` no grid**: alterar apenas o `grid-template-areas` para:
  ```
  'ticker hoje'
  'saldo  qtd'
  'preco  patual'
  'rent   var'
  ```
  Assim `preco` e `patual` ficam na mesma linha e `qtd` assume a posição ao lado do `saldo`. Como os nomes das áreas são reaproveitados, **só o mapa muda**; as atribuições `td:nth-child(...) { grid-area: ... }` e os alinhamentos (`justify-self: end`) permanecem válidos, mantendo a coluna direita alinhada à direita. Alternativa descartada: reescrever os `nth-child` — desnecessário e mais arriscado.
- **Remover a borda do Histórico**: excluir a linha `border: 1px solid …` de `.dh-section`, preservando `background`, `border-radius` e `padding`. Conforme decisão do usuário, a remoção é **apenas no Histórico** — Recebidos/Projetados (`.ds-section`) mantêm a borda.

## Risks / Trade-offs

- [Manter `border-radius`/`background` no Histórico sem borda pode parecer levemente diferente do Radar (que não tem card)] → É o pedido explícito ("tirar a borda só do Histórico"); fundo e cantos permanecem por decisão do usuário.
- [Trocar áreas pode desalinhar a coluna direita] → Os alinhamentos seguem por área nomeada e `justify-self: end`; validar visualmente em ≤640px.

## Open Questions

Nenhuma.
