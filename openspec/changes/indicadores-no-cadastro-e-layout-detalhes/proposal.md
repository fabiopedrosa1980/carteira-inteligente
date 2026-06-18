## Why

Hoje a API Go raspa os indicadores fundamentalistas do Investidor10 **a cada requisição** de `GetAcoes`/`GetFiis` — lento e repetitivo, multiplicando chamadas externas por ticker em toda abertura da tela. O correto é buscar os indicadores **uma vez, no cadastro do ticker** (quando o Stock é criado/importado), persistir e servir do banco. Além disso, a tela de detalhes precisa de um layout mais profissional.

## What Changes

- **Backend Go:** obter os indicadores fundamentalistas no momento do cadastro do ticker (fluxo de criação do Stock / importação) e **persistir** no Stock; o sync periódico também atualiza. `GetAcoes`/`GetFiis` passam a ler os indicadores **do banco**, sem scraping ao vivo por requisição.
- **Frontend:** reformular o layout da tela de detalhes da ação para um visual mais profissional (hierarquia, agrupamento, tipografia e espaçamento), exibindo os indicadores de forma organizada.

## Capabilities

### New Capabilities
<!-- Nenhuma capability nova. -->

### Modified Capabilities
- `status-invest-indicators`: indicadores passam a ser obtidos no cadastro e persistidos, e servidos do banco (não mais scraping por requisição).
- `stock-details-view`: layout mais profissional da tela de detalhes.

## Impact

**Backend Go (`carteira-inteligente-api`):**
- `internal/domain/stock.go` — campo `Indicators []Indicator` persistido (serializer JSON).
- `internal/domain/stock_repository.go` + `gorm_stock_repository.go` — `UpdateIndicators`.
- `internal/application/stock_service.go` — `UpdateIndicators`.
- `internal/adapters/http/handler/stock_handler.go` — buscar/persistir indicadores no fluxo de import (cadastro).
- `internal/adapters/http/handler/transaction_handler.go` — `respondPositions` lê indicadores do catálogo de stocks.
- Mocks/testes que implementam as interfaces de Stock.

**Frontend (este repo):**
- `src/app/components/stock-details-modal/*` — novo layout (HTML/SCSS).
