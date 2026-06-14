## Why

A aba de Dividendos aparece mesmo quando o usuário não tem nenhuma ação cadastrada, e o combo de ativo usa o catálogo de stocks (`GET /api/v1/stocks`) em vez do endpoint de posições do usuário logado (`GET /transactions/acoes`), tornando a seleção desconectada da carteira real do usuário.

## What Changes

- O backend expõe `stock_id` em cada item de `GET /transactions/acoes`, permitindo que o frontend use esse endpoint como fonte única para o combo de ativos e para carregar dividendos por ID
- A aba Dividendos (e seu conteúdo) só é renderizada quando o usuário tem ao menos uma posição em `GET /transactions/acoes`
- `DividendHistoryComponent` troca `StockDataService.portfolioRefs()` (catálogo) por `BackendApiService.getAcoes()` (posições reais do usuário) como fonte do combo de ativos
- Quando não há posições, a aba exibe um estado vazio orientando o usuário a cadastrar ativos

## Capabilities

### New Capabilities
- `dividend-history-user-filter`: Exibição condicional da aba de dividendos e combo de ativos baseado nas posições reais do usuário logado

### Modified Capabilities
- `dividend-history-table`: Fonte do combo de ativos muda de `portfolioRefs` (catálogo) para `getAcoes()` (posições do usuário), usando `stock_id` retornado pela API

## Impact

- **Backend** (`carteira-inteligente-api`): adicionar `StockID uint json:"stock_id"` ao struct `domain.AcaoItem`; em `GetAcoes`, popula o campo via lookup no mapa `ticker → stockID` já construído para `historyReady`
- **Frontend** (`carteira-inteligente`): `DividendHistoryComponent` chama `getAcoes()` em vez de usar `portfolioRefs`; tab só renderiza quando `acoes().length > 0`; usa `stock_id` para chamar `getStockDividends`
- **Sem breaking changes** — `portfolioRefs` continua existindo no `StockDataService` para outros usos futuros
