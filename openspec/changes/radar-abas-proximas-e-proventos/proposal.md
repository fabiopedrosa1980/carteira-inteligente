## Why

A sub-tab **Radar** hoje empilha duas coisas com propósitos diferentes: a faixa **Próximas datas-com** (acionável — o que comprar antes da data-com) e o **Radar de proventos** (sazonalidade descritiva do ano anterior). Misturadas na mesma tela, competem por atenção e a leitura fica longa. Separá-las em abas próprias deixa cada visão com foco e espaço.

## What Changes

- Dividir a sub-tab **Radar** em **duas sub-tabs**:
  - **Próximas datas-com** — a faixa estimada por cadência (`ProximasDatasComComponent`).
  - **Radar de proventos** — o grid de 12 meses de sazonalidade (`DividendsRadarComponent`).
- Cada aba renderiza apenas o seu componente, respeitando o seletor Ações/FIIs.
- Apenas frontend: reorganização das abas em `dividends.{ts,html}`; os componentes existentes não mudam de comportamento.

## Capabilities

### Modified Capabilities
- `dividends-radar`: a visão de sazonalidade passa a viver numa sub-tab própria "Radar de proventos", separada da faixa de próximas datas-com.
- `proximas-datas-com`: a faixa passa a viver numa sub-tab própria "Próximas datas-com", em vez de empilhada no topo do Radar.

## Impact

**Frontend (este repo):**
- `src/app/components/dividends/dividends.ts` — substituir a tab `radar` por duas tabs (`proximas`, `radar`), com rótulos e ícones.
- `src/app/components/dividends/dividends.html` — renderizar cada componente na sua aba.

Sem mudança nos componentes `proximas-datas-com` e `dividends-radar`, nem no backend.
