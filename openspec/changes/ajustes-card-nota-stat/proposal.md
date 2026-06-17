## Why

O nome da empresa em 40 caracteres ainda fica longo demais para o card, e a nota — hoje isolada num bloco inferior (`.card-bottom`) com estilo de badge próprio — destoa do restante. As métricas Hoje e DY já têm um padrão visual limpo na faixa de estatísticas (rótulo pequeno em cima, valor colorido embaixo). A nota deve seguir o mesmo padrão, ao lado delas.

## What Changes

- Reduzir o limite de exibição do nome da empresa no `StockCardComponent` de 40 para 30 caracteres antes das reticências.
- Mover a nota do bloco inferior (`.card-bottom`) para dentro da `.stat-strip`, exibida como mais um `stat` ao lado de Hoje e DY, com rótulo "Nota" e valor no mesmo estilo (cor por faixa: alto/médio/baixo).
- Remover o badge de nota (`.nota-badge`) e o bloco `.card-bottom`, agora sem uso.

## Capabilities

### New Capabilities
<!-- Nenhuma capability nova. -->

### Modified Capabilities
- `stock-card-display`: muda o limite de caracteres do nome (40 → 30) e a forma de exibir a nota (de badge no rodapé para um stat na faixa de estatísticas, ao lado de Hoje e DY).

## Impact

- `src/app/components/stock-card/stock-card.ts` — limite de caracteres em `displayName`.
- `src/app/components/stock-card/stock-card.html` — remoção do `.card-bottom`/`.nota-badge` e adição de um `stat` de Nota na `.stat-strip`.
- `src/app/components/stock-card/stock-card.scss` — remoção dos estilos de `.card-bottom`/`.nota-badge`; reutiliza os estilos de `.stat`/`.stat-value` (incluindo as faixas `nota-high/mid/low` já existentes).
