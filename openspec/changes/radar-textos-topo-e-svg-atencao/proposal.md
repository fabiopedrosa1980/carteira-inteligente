## Why

Os textos "Oportunidade de compra" e "Melhor mês, aproveite" hoje ficam numa linha própria abaixo do cabeçalho do card, soltos. Reposicioná-los na **parte superior do card, encostando no contador de ativos**, deixa o destaque mais coeso e legível de relance. Um **ícone de atenção** no próximo mês reforça visualmente a urgência da "Oportunidade de compra".

## What Changes

- Mover os rótulos `.rc-tag` ("Oportunidade de compra" e "Melhor mês, aproveite") para o **cabeçalho do card** (`.rc-head`), alinhados à direita, **encostando no contador** de ativos.
- Adicionar um **SVG de atenção** (triângulo de alerta) no card do **próximo mês**, junto ao texto "Oportunidade de compra".

## Capabilities

### Modified Capabilities
- `dividends-radar`: os textos de destaque passam para o topo do card junto ao contador; o card do próximo mês ganha um ícone de atenção.

## Impact

**Frontend (este repo):**
- `src/app/components/dividends-radar/dividends-radar.html` — mover os `.rc-tag` para dentro do `.rc-head` (à direita, junto ao `.rc-count`); adicionar o `<svg>` de atenção no card do próximo mês.
- `src/app/components/dividends-radar/dividends-radar.scss` — ajustar o layout do cabeçalho (agrupar tag + ícone + contador) e estilizar o ícone.
