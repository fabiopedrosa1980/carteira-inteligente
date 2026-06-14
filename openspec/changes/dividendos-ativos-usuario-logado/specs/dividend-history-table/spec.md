## MODIFIED Requirements

### Requirement: Tabela de histórico exibe somente ativos do usuário
O seletor de ativos do `DividendHistoryComponent` DEVE ser populado exclusivamente pelas posições retornadas por `GET /transactions/acoes` do usuário autenticado. Cada posição DEVE incluir um campo `stock_id` que aponta para o ID do catálogo de stocks, usado para buscar o histórico via `GET /api/v1/stocks/:id/dividends`.

#### Scenario: Seletor exibe as posições do usuário
- **WHEN** `GET /transactions/acoes` retorna posições para os tickers A, B, C
- **THEN** o dropdown lista exatamente A, B, C na ordem retornada pela API

#### Scenario: Histórico carregado pelo stock_id
- **WHEN** o usuário seleciona um ticker no dropdown
- **THEN** a chamada `GET /api/v1/stocks/:stock_id/dividends` é feita usando o `stock_id` presente no objeto de posição

#### Scenario: Seletor vazio quando sem posições
- **WHEN** `GET /transactions/acoes` retorna array vazio
- **THEN** o dropdown não possui opções e o estado vazio é exibido
