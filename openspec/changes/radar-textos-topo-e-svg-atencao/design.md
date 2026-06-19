## Context

No `dividends-radar.html`, cada `.radar-card` tem um `.rc-head` (flex `space-between`: `.rc-month` à esquerda, `.rc-count` à direita) e, logo abaixo, os rótulos `.rc-tag` (`rc-tag-top` / `rc-tag-next`) em linha própria. `.rc-count` é um badge com o número de ativos. Os destaques vêm de `isTop(m)` / `isNext(m)`.

## Goals / Non-Goals

**Goals:**
- Rótulos de destaque no topo do card, encostando no contador.
- Ícone de atenção no card do próximo mês.

**Non-Goals:**
- Mudar os textos, a lógica de `topMonth`/`nextMonth`, ou o restante do card (chips, contador, estrela).

## Decisions

**1. Agrupar à direita do cabeçalho.** Envolver, no `.rc-head`, um container à direita (`.rc-head-right`, flex com `gap` e `align-items: center`) contendo, nesta ordem: rótulo(s) `.rc-tag` → ícone de atenção (só `next`) → `.rc-count`. Assim os textos ficam "encostando" no número. `.rc-month` permanece à esquerda; o `space-between` empurra o grupo todo para a direita.

**2. Ícone de atenção.** SVG inline (viewBox `0 0 24 24`, `stroke="currentColor"`) com triângulo de alerta + exclamação:
`M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z` + `M12 9v4` + `M12 17h.01`. Tamanho ~14px. A cor acompanha o estilo do "Melhor mês" (`var(--color-pos)`), via `currentColor`. Renderizado só quando `isNext(m)`.

**2b. Estilo unificado dos rótulos.** O rótulo do próximo mês (`.rc-tag-next`) usa a **mesma cor de fonte e o mesmo destaque** do "Melhor mês" (`.rc-tag-top`): `color: var(--color-pos)` e `background: color-mix(in srgb, var(--color-pos) 12%, transparent)`. Na prática os dois rótulos compartilham o mesmo visual (verde), diferindo só no texto e, no próximo mês, no ícone de atenção.

**3. Tamanho/encaixe.** Como o cabeçalho é estreito, o `.rc-tag` no topo usa fonte menor (~10px) e `white-space: nowrap`; em telas estreitas o grupo pode quebrar a linha (flex-wrap no `.rc-head`) sem estourar o card.

## Risks / Trade-offs

- [Texto longo no topo] "Oportunidade de compra" é comprido para o cabeçalho de um card em grid de 4 colunas. Mitiga com fonte menor e wrap do `.rc-head`; aceita-se que em telas largas ocupe boa parte da linha do cabeçalho.
- [Card top E next] se um card for os dois, mostra os dois rótulos + ícone + contador no topo; pode apertar — wrap resolve.
