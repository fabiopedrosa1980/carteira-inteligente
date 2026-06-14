## Why

A tela de Dividendos exibe apenas os dividendos cadastrados manualmente via painel, sem histórico real do ativo. O usuário precisa ver o histórico completo dos últimos 5 anos automaticamente ao cadastrar uma ação, com tipo (JCP ou Dividendo), datas e valor, em formato de tabela paginada — não em cards isolados.

## What Changes

- **API Go**: ao criar um ativo (`POST /api/v1/stocks`), busca automaticamente o histórico de dividendos dos últimos 5 anos no site Investidor10 e persiste os registros na tabela `dividends`.
- **API Go**: endpoint de listagem de dividendos por ativo (`GET /api/v1/stocks/:id/dividends`) passa a retornar os campos `type` (JCP | Dividendo), `ex_date` (Data Com) e `pay_date` (Data de Pagamento) — já existentes no modelo, porém não populados pelo scraping atual.
- **Angular**: a aba "Dividendos" substitui a exibição em cards por uma tabela com colunas Tipo, Data Com, Data de Pagamento e Valor, com paginação client-side (10 itens por página).

## Capabilities

### New Capabilities

- `dividend-history-scraping`: busca automática do histórico de dividendos do Investidor10 ao cadastrar uma ação, cobrindo os últimos 5 anos, com mapeamento de tipo JCP/Dividendo.
- `dividend-table-paginated`: exibição da tela de Dividendos em tabela paginada com colunas Tipo, Data Com, Data de Pagamento e Valor.

### Modified Capabilities

- (nenhuma — nenhuma spec de requisito existente é alterada)

## Impact

- **Backend Go** (`internal/adapters/http/handler/stock_handler.go`, novo `scraper/investidor10.go` ou similar): adiciona scraping do Investidor10 na criação de ativo.
- **Backend Go** (`internal/infrastructure/persistence/gorm_dividend_repository.go`, `internal/domain/dividend.go`): garante que `type`, `ex_date` e `pay_date` são persistidos e retornados.
- **Angular** (`src/app/components/dividend-calendar/`): substitui renderização em cards por tabela com paginação. Sem mudança de rota ou API — apenas visual.
- **Dependências externas**: scraping do site `investidor10.com.br` (HTML parsing via `golang.org/x/net/html` ou similar).
