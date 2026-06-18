## Why

As telas de Portfólio e Calendário de Dividendos atualmente exibem dados simulados/hardcoded (tickers fixos, padrões de dividendos gerados por seed aleatório e cotações via proxy na porta 3001). A API backend em `http://localhost:8080` já fornece dados reais de portfólio e dividendos mensais, mas as telas ainda não consomem esses endpoints.

## What Changes

- **Portfolio**: A tela de Portfólio passa a carregar a lista de ações diretamente de `GET http://localhost:8080/api/v1/stocks`, substituindo os tickers hardcoded (`INITIAL_TICKERS`) e a geração de dividendos por seed.
- **Calendário**: A tela de Calendário de Dividendos passa a carregar os dados de pagamentos mensais de `GET http://localhost:8080/api/v1/dividends/monthly?year=2025`, substituindo o cálculo derivado dos padrões hardcoded.
- O seletor de ano no Calendário pode passar a chamar o endpoint com o `year` correspondente ao ano selecionado.
- Os serviços `StockDataService` e a lógica de geração de dividendos simulados são refatorados ou substituídos para delegar à nova API.

## Capabilities

### New Capabilities
- `portfolio-api-integration`: Integração da tela de Portfólio com `GET /api/v1/stocks` do backend, mapeando a resposta para o modelo `Stock` existente.
- `dividends-calendar-api-integration`: Integração da tela de Calendário com `GET /api/v1/dividends/monthly?year={year}` do backend, mapeando a resposta para `MonthSummary[]`.

### Modified Capabilities

## Impact

- `carteira-inteligente/src/app/services/stock-data.service.ts` — lógica hardcoded removida; passa a chamar `http://localhost:8080/api/v1/stocks`
- `carteira-inteligente/src/app/services/stock-api.service.ts` — possivelmente adicionado novo método ou novo serviço para `/api/v1/dividends/monthly`
- `carteira-inteligente/src/app/components/dividend-calendar/dividend-calendar.ts` — passa a consumir dados reais do novo endpoint
- `carteira-inteligente/src/app/models/stock.model.ts` — possível ajuste de interfaces para alinhar com o shape da API
- Dependência de `http://localhost:8080` em tempo de execução (requer backend rodando localmente)
