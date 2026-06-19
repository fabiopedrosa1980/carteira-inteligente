## Context

Após as últimas mudanças, Dividendos tem 5 sub-tabs, a última sendo "Próximas datas-com" (`ProximasDatasComComponent`). O `DividendsRadarComponent` já marca cada card com `.top` (mês com mais ativos, estrela) e `.next` (próximo mês ao atual) via `isTop(m)`/`isNext(m)`.

## Goals / Non-Goals

**Goals:**
- Remover a faixa de próximas datas-com (UI + arquivos).
- Sub-tab do radar volta a se chamar "Radar".
- Textos contextuais nos cards `.top` e `.next`.

**Non-Goals:**
- Mudar a lógica de `topMonth`/`nextMonth` ou o grid em si.
- Mexer nas outras abas (Histórico/Recebidos/Projetados).

## Decisions

**1. Remoção do componente.** Remover de `dividends.ts`: o import `ProximasDatasComComponent`, a entrada em `imports`, a tab `proximas` e o tipo `'proximas'` de `DividendsTab`. Remover de `dividends.html` o `app-proximas-datas-com`. Excluir a pasta `src/app/components/proximas-datas-com/` (component .ts/.html/.scss + `cadence.ts`). Sem referências remanescentes.

**2. Rename da tab.** Label `'Radar de proventos'` → `'Radar'`. `id` permanece `'radar'` (sem impacto no roteamento de abas).

**3. Textos nos cards.** No template do radar, dentro do `.radar-card`:
- quando `isNext(m)`: exibir um rótulo "Oportunidade de compra".
- quando `isTop(m)`: exibir um rótulo "Melhor mês, aproveite".
Renderizados como uma linha curta (`.rc-tag`) abaixo do cabeçalho, com cor coerente ao destaque (accent para next, verde/pos para top). Se um card for `.top` e `.next` ao mesmo tempo, mostra os dois rótulos.

## Risks / Trade-offs

- [Perda de trabalho] o componente de próximas datas-com é descartado; aceitável — decisão de produto por simplicidade.
- [Espaço no card] os cards do radar têm `min-height` modesto; o rótulo extra ocupa uma linha. Mantém legível porque só aparece em 1–2 cards.
- [Texto fixo PT] strings hardcoded, coerentes com o restante do app (sem i18n no projeto).
