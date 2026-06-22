## Context

O tooltip de oportunidade vive em `dashboard.html`, dentro da célula `.cell-oportunidade`. O título é o elemento `<span class="ot-title">Preço-teto</span>`, seguido do veredito (`.ot-verdict`) e da grade de cinco campos. Um dos campos é rotulado "Preço-teto", o que torna o título homônimo redundante.

## Goals / Non-Goals

**Goals:**
- Título coerente com a coluna ("Oportunidade"), sem repetir "Preço-teto".

**Non-Goals:**
- Mudar veredito, campos, formatação, estilos ou comportamento de hover.
- Renomear o rótulo do campo "Preço-teto".

## Decisions

- **Trocar apenas o texto do `.ot-title`.** Substituir "Preço-teto" por "Oportunidade". Mudança de uma palavra no template; estilos (uppercase/letter-spacing) já existem e permanecem. Alternativa considerada: remover o título — descartada porque o usuário optou por manter um título nomeado.

## Risks / Trade-offs

- [Repetição conceitual com o nome da coluna "Oportunidade"] → aceitável: reforça o contexto e elimina a ambiguidade maior (duas ocorrências de "Preço-teto").

## Open Questions

- Nenhuma.
