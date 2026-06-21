# api-etfs-posicoes Specification

## Purpose

Define o endpoint `GET /api/v1/transactions/etfs` que retorna as posições ETF agregadas do usuário, enriquecidas com cotação em tempo real e nota calculada, no mesmo formato dos endpoints de Ações e FIIs.

## Requirements

### Requirement: Endpoint retorna posições ETF do usuário autenticado

`GET /api/v1/transactions/etfs` SHALL retornar um array JSON de objetos `AcaoItem` com as posições ETF do usuário. Requer autenticação (mesmo middleware de `/acoes` e `/fiis`). Posições com quantidade total ≤ 0 MUST ser excluídas.

#### Scenario: Usuário com ETFs cadastrados

- **WHEN** o usuário autenticado tem transações com `asset_type = "ETFs"`
- **THEN** o endpoint retorna 200 com array de posições agregadas por ticker
- **AND** cada posição tem `ticker`, `total_quantity`, `avg_price`, `current_price`, `change_percent`, `dividend_yield`, `nota`, `history_ready`, `stock_id`, `transaction_count`
- **AND** tickers com `SUM(quantity) = 0` (compra e venda zerada) são omitidos

#### Scenario: Usuário sem ETFs cadastrados

- **WHEN** o usuário autenticado não tem transações com `asset_type = "ETFs"`
- **THEN** o endpoint retorna 200 com array vazio `[]`

#### Scenario: Requisição sem autenticação

- **WHEN** a requisição não tem token de autenticação válido
- **THEN** o endpoint retorna 401

### Requirement: Posições enriquecidas com cotação Yahoo Finance

Para cada posição, o handler SHALL consultar Yahoo Finance (ticker + `.SA`) em paralelo para obter `current_price`, `change_percent` e `dividend_yield`. Falhas na consulta Yahoo MUST resultar em `current_price: 0`, `change_percent: 0`, `dividend_yield: 0` sem abortar o request.

#### Scenario: ETF com cobertura no Yahoo Finance

- **WHEN** o ticker existe no Yahoo Finance (ex.: BOVA11, IVVB11)
- **THEN** a posição retorna com preço atual e variação do dia preenchidos

#### Scenario: ETF sem cobertura no Yahoo Finance

- **WHEN** o ticker não tem dados no Yahoo Finance
- **THEN** a posição retorna com `current_price: 0`, `change_percent: 0`, `dividend_yield: 0`
- **AND** o request não falha

### Requirement: Nota calculada por normalização min-max

O endpoint SHALL aplicar `computeNotas` ao conjunto de posições ETF retornadas, calculando nota de 1 a 10 por normalização min-max de rentabilidade e DY, igual ao comportamento de `/acoes` e `/fiis`.

#### Scenario: Múltiplos ETFs com dados de preço

- **WHEN** retornam 3 posições ETF com preços válidos
- **THEN** cada posição tem campo `nota` entre 1.0 e 10.0

#### Scenario: Único ETF ou todos com mesmos dados

- **WHEN** há apenas 1 posição ETF, ou todas têm mesmos rendimento e DY
- **THEN** `nota` é 5.5 (normalização min-max com max == min)
