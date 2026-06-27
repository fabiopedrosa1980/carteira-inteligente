## Context

Os títulos de página usam a classe global `.page-title` (definida em `src/styles.scss`). O recuo horizontal do título não vem de uma margem própria, e sim do **padding do container** `.content` (`dashboard.scss`):

- desktop: `padding: 32px`
- `≤ 768px`: `padding: 16px`
- `≤ 600px`: `padding: 12px` (+ padding-bottom para a barra fixa)

Os cabeçalhos de página (`.page-header` global, `.metas-header` em Metas, `.section-header` em Meus Ativos) definem `padding-left: 0` de propósito, para o título ficar **flush com a borda esquerda dos cards** (requisito `titulo-alinhado-aos-cards`). Como tanto o título quanto os cards herdam o mesmo recuo do `.content`, no desktop os 32px dão respiro confortável; no mobile os 12px deixam o título (e os cards) praticamente colados na borda da tela.

Restrição central: o título **deve continuar alinhado** à borda esquerda dos cards. Qualquer fix que adicione recuo só ao título quebraria esse alinhamento.

## Goals / Non-Goals

**Goals:**
- Eliminar o efeito de título "colado na borda esquerda" no mobile.
- Manter o alinhamento título × borda esquerda dos cards em todos os breakpoints.
- Solução única e consistente entre todas as telas (sem ajuste por página).

**Non-Goals:**
- Mudar tipografia, tamanho ou peso do título.
- Redesenhar o layout dos cabeçalhos ou a barra inferior fixa do mobile.
- Alterar o comportamento desktop/tablet (que já está correto).

## Decisions

### Decisão: aumentar o padding horizontal do `.content` no mobile (12px → 16px)

Como título e cards compartilham o recuo do container, aumentar o padding horizontal do `.content` no breakpoint `≤ 600px` move ambos juntos para dentro, criando o respiro lateral **sem quebrar o alinhamento**. Mantém-se o `padding-bottom` atual (reserva da barra fixa).

Implementação: no `.content` do `dashboard.scss`, na media query `max-width: 600px`, separar os eixos — manter `padding-bottom: calc(84px + env(safe-area-inset-bottom))` e usar `padding-left`/`padding-right: 16px` (em vez de 12px). Isso alinha o recuo mobile ao do breakpoint tablet, que já é confortável.

**Alternativa considerada — margem só no `.page-title`:** rejeitada. Adicionar `margin-left`/`padding-left` apenas ao título no mobile desalinharia o título dos cards, violando `titulo-alinhado-aos-cards`.

**Alternativa considerada — corrigir página a página:** rejeitada. As telas usam classes de cabeçalho diferentes (`.page-header`, `.metas-header`, `.section-header`); um fix por página seria duplicado e propenso a divergência. O `.content` é o ponto único compartilhado.

### Decisão: verificar a paridade do cabeçalho de Metas

`.metas-header` (Metas) e `.section-header` (Meus Ativos) não têm a media query de `flex-direction: column` que o `.page-header` global tem em `≤ 600px`. Para o escopo deste fix (recuo horizontal), o ajuste no `.content` já resolve o "colado na borda" porque o título herda o recuo do container. Não é necessário tocar nessas classes para a margem; qualquer diferença de empilhamento vertical fica fora de escopo.

## Risks / Trade-offs

- [Cards ficam ~4px mais estreitos no mobile] → Trade-off aceitável; o ganho de respiro lateral é o objetivo, e 16px já é o valor usado no breakpoint tablet.
- [Outros elementos dentro do `.content` (não só título/cards) também ganham +4px de recuo] → Desejável: mantém todo o conteúdo da tela consistente; não há elementos que dependam dos 12px exatos.
- [Regressão visual em telas não inspecionadas] → Mitigação: validar manualmente Dividendos, Metas, Lançamentos (Meus Ativos), Importar e Radar no viewport mobile após a mudança.

## Migration Plan

Mudança apenas de CSS, sem migração de dados. Deploy normal. Rollback = reverter o commit do `.content`/`styles.scss`.

## Open Questions

- O valor alvo de recuo mobile é 16px (paridade com tablet). Se o usuário preferir um respiro maior (ex.: 20px), ajustar o número num único ponto no `.content`.
