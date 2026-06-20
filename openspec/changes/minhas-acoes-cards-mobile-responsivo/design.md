## Context

`.stocks-grid` (dashboard.scss) usa `grid-template-columns: repeat(5,1fr)` com breakpoints fixos (4 @1200, 3 @960, 2 @640). O `stock-card` já tem `overflow: hidden`, `min-width: 0` na identidade, elipse no nome e um `@media (max-width: 640px)` que compacta padding, reduz preço (22px) e faz a `.stat-strip` quebrar (ocultando separadores/setor). O scroll horizontal vem das 2 colunas forçadas em telas muito estreitas (cada card fica menor que o conteúdo mínimo).

## Goals / Non-Goals

**Goals:** grid que se adapta à largura (até 1 coluna), sem scroll horizontal; cards que nunca estouram.

**Non-Goals:** nova identidade visual; mudar dados/HTML.

## Decisions

**Plano (refinamento sobre o sistema existente — sem nova paleta/tipografia):**

**1. Grid fluido (assinatura da mudança).** `.stocks-grid` → `grid-template-columns: repeat(auto-fill, minmax(160px, 1fr))`, removendo os breakpoints fixos. Em ~<360px cai naturalmente para **1 coluna**; em telas maiores preenche quantas couberem. `gap` reduz no mobile. Isso elimina a imposição de 2 colunas apertadas e o overflow.

**2. Endurecer o card.** Onde houver flex com filhos de texto, garantir `min-width: 0`; aplicar `overflow-wrap: anywhere`/elipse onde faltar; no `@media` estreito, reduzir o `min-width` efetivo do card (via minmax) e, se necessário, baixar o preço hero mais um passo (ex.: 20px) e permitir que a `.stat-strip` quebre sem empurrar largura.

**3. Verificação visual.** Conferir em larguras 320/360/414px que não há scroll horizontal e o conteúdo cabe.

## Risks / Trade-offs

- [minmax muito pequeno] 160px pode deixar 2 colunas em telas ~330px ainda apertadas; se preciso, subir para 170–180px para forçar 1 coluna antes. Ajuste fino na implementação.
- [Cards muito largos em telas médias] auto-fill pode esticar 1 card sozinho; `1fr` distribui — aceitável.
