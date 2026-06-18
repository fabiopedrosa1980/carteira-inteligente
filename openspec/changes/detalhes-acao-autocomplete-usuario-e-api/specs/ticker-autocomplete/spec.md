## ADDED Requirements

### Requirement: Autocomplete de ticker no lançamento

No modal "Adicionar Lançamento", ao digitar 3 ou mais letras no campo de ticker, a aplicação SHALL buscar e exibir uma lista de sugestões de tickers correspondentes. Selecionar uma sugestão SHALL preencher o campo de ticker. A busca SHALL ser debounced para evitar requisições excessivas.

#### Scenario: Sugestões após 3 letras
- **WHEN** o usuário digita ao menos 3 letras no campo de ticker
- **THEN** uma lista de sugestões de tickers correspondentes é exibida abaixo do campo

#### Scenario: Selecionar sugestão
- **WHEN** o usuário clica em uma sugestão
- **THEN** o campo de ticker é preenchido com o ticker escolhido e a lista é fechada

#### Scenario: Menos de 3 letras
- **WHEN** o campo de ticker tem menos de 3 letras
- **THEN** nenhuma sugestão é exibida
