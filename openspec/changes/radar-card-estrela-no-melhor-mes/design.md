## Context

No card do Radar (`dividends-radar.html`), o `.rc-month` contém um `<svg class="ic-star">` (condicional a `isTopMonth(m.month)`) antes do `{{ m.label }}`, e logo abaixo há `<span class="rc-tag rc-tag-top">Melhor mês</span>` sem estrela. A `.rc-tag` já estiliza um `svg` interno (12px) e a `.rc-tag-top` usa a cor de destaque; o `.ic-star` herda `currentColor`.

## Goals / Non-Goals

**Goals:**
- Estrela antes do texto "Melhor mês" na tag; nome do mês sem estrela.

**Non-Goals:**
- Mudar a matriz, a tag "Oportunidade de compra" ou cores/estilos.

## Decisions

**1. Mover o SVG.** Tirar o `<svg class="ic-star">` de dentro do `.rc-month` (que volta a mostrar só `{{ m.label }}`) e inseri-lo como **primeiro filho** da `<span class="rc-tag rc-tag-top">`, antes do texto "Melhor mês". A estrela herda a cor da tag (warning), e o tamanho já vem da regra `.rc-tag svg`.

**2. Sem novos estilos.** As regras existentes (`.rc-tag` com `gap` e `svg` dimensionado) já cobrem o alinhamento ícone+texto.

## Risks / Trade-offs

- [Nenhum relevante] mudança puramente de posição no template; reaproveita estilos. O `.rc-month` volta ao estado simples (só label).
