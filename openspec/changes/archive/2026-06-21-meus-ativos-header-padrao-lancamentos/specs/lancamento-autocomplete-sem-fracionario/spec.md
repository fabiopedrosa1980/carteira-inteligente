## ADDED Requirements

### Requirement: Autocomplete de ticker descarta fracionários

No autocomplete de ticker do modal de lançamento, as sugestões SHALL **excluir os ativos do mercado fracionário** — tickers terminados em **"F"** (ex.: `PETR4F`, `MXRF11F`). Apenas os tickers do lote padrão MUST aparecer nas sugestões.

#### Scenario: Fracionário não aparece nas sugestões

- **WHEN** a busca do autocomplete retorna um ticker terminado em "F"
- **THEN** esse ticker fracionário não é exibido na lista de sugestões

#### Scenario: Ticker padrão permanece

- **WHEN** a busca retorna o ticker do lote padrão (ex.: `PETR4`, `MXRF11`)
- **THEN** o ticker padrão aparece normalmente nas sugestões
