## Why

As telas de Dividendos não têm um padrão visual consistente de **título**, **card** e **borda**. A tela de **Projetados** (componente de Resumo) é a referência desejada: contêiner em card com fundo, cantos arredondados e borda, e título padronizado. Hoje o **Histórico** está sem borda (removida em ajuste anterior) e o **Radar** está totalmente fora do padrão — sem card/borda e com título maior/mais pesado.

## What Changes

- **Adotar o padrão de Projetados** (`.ds-section` + `.ds-title`) como referência visual das telas de Dividendos para título, card e borda.
- **Histórico**: restaurar a borda do contêiner e alinhar o título ao padrão de Projetados. **(Supera o ajuste anterior `historico-sem-borda`, conforme nova decisão de padronizar pelo Projetados.)**
- **Radar**: envolver o conteúdo no mesmo card (fundo, cantos arredondados, borda, espaçamento) e alinhar o título (tamanho/peso/margem) ao padrão de Projetados.
- **Recebidos/Projetados**: permanecem como estão (já são o padrão de referência).

## Capabilities

### New Capabilities
- `dividendos-telas-padrao-visual`: todas as telas de Dividendos (Histórico, Recebidos, Projetados, Radar) compartilham o mesmo padrão de contêiner em card (fundo, cantos, borda, espaçamento) e de título, tomando Projetados como referência.

### Modified Capabilities
<!-- A capability `historico-sem-borda` (de uma mudança ainda não arquivada) é superada por esta padronização; ver nota no proposal. -->

## Impact

- `src/app/components/dividend-history/dividend-history.scss` — `.dh-section` (restaurar borda) e `.dh-title` (margem).
- `src/app/components/dividends-radar/dividends-radar.scss` — `.radar-section` (card/borda/espaçamento) e `.radar-title` (tamanho/peso/margem).
- Sem mudanças de API, modelos, lógica ou markup (apenas estilos). Recebidos/Projetados (`dividends-summary`) inalterados.
