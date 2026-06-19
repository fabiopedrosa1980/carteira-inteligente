## Why

O Radar de proventos já mostra os tickers por mês, mas falta hierarquia visual: identificar de relance o mês com mais pagamentos, o próximo mês de oportunidade e a quantidade por card. Também o título traz "· 2025" desnecessário, e o estilo dos cards destoa do restante da app.

## What Changes

- **Destacar com uma estrela (★)** o mês com **mais tickers** no Radar.
- **Remover o "· 2025"** do título.
- Adicionar um **indicador de quantidade** (nº de ativos) em cada card.
- **Destacar o próximo mês** em relação ao mês atual (oportunidade mais próxima).
- Aplicar o **mesmo estilo dos cards de Minhas Ações** (stock-card) aos cards do Radar.

## Capabilities

### Modified Capabilities
- `dividends-radar`: destaques (estrela no mês com mais ativos, próximo mês), contador por card, título sem ano e estilo alinhado ao stock-card.

## Impact

**Frontend (este repo):**
- `src/app/components/dividends-radar/*` — lógica de destaque (mês top, próximo mês), contador; HTML/SCSS no estilo do `stock-card`.
