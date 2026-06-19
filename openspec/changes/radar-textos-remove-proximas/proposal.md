## Why

A faixa "Próximas datas-com" depende de estimativa por cadência e, com a carteira atual, traz pouco/nada acionável — virou ruído. Melhor simplificar: voltar a uma única aba **Radar** e tornar o próprio grid de sazonalidade mais comunicativo, com chamadas diretas nos cards de destaque (mês com mais ativos e próximo mês).

## What Changes

- **Remover** a sub-tab e o componente **"Próximas datas-com"** (`ProximasDatasComComponent` + util de cadência).
- **Renomear** a sub-tab "Radar de proventos" de volta para **"Radar"**.
- No card do **próximo mês** (destaque `.next`), adicionar o texto **"Oportunidade de compra"**.
- No card do **mês com mais ativos** (estrela `.top`), adicionar o texto **"Melhor mês, aproveite"**.

## Capabilities

### Modified Capabilities
- `dividends-radar`: a sub-tab volta a se chamar "Radar"; o card do próximo mês exibe "Oportunidade de compra" e o card do mês com mais ativos exibe "Melhor mês, aproveite".

### Removed Capabilities
- `proximas-datas-com`: a faixa de próximas datas-com estimadas é removida da aplicação.

## Impact

**Frontend (este repo):**
- `src/app/components/dividends/dividends.ts` — remover a tab `proximas` e o import do componente; renomear o label do radar para "Radar".
- `src/app/components/dividends/dividends.html` — remover o render de `app-proximas-datas-com`.
- `src/app/components/proximas-datas-com/*` — excluir os arquivos do componente e `cadence.ts`.
- `src/app/components/dividends-radar/dividends-radar.{html,scss}` — textos nos cards `.top` e `.next`.
