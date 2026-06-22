## ADDED Requirements

### Requirement: Coluna de Preço Atual nas tabelas de carteira

As tabelas de ativos das telas "Meus Ativos" (aba `portfolio`) e "Lançamentos" (componente `my-assets`) SHALL exibir uma coluna de **Preço Atual** (cotação corrente do ticker), formatada como moeda BRL. O valor da cotação SHALL vir da carteira já carregada (`StockDataService.stocks()` → campo `price`), sem nova chamada de rede dedicada por linha. Quando não houver cotação válida para o ticker (preço ausente ou igual a zero), a célula SHALL exibir "—".

#### Scenario: Cotação exibida na tela Meus Ativos

- **WHEN** a aba "Meus Ativos" é exibida com posições que possuem cotação atual
- **THEN** cada linha da tabela mostra a coluna "Preço Atual" com a cotação corrente do ticker formatada em BRL
- **AND** a coluna fica posicionada junto às demais colunas de preço (ex.: ao lado de "Preço Médio")

#### Scenario: Cotação exibida na tela Lançamentos

- **WHEN** a aba "Lançamentos" é exibida com lançamentos cujos tickers têm cotação atual na carteira
- **THEN** cada linha da tabela mostra a coluna "Preço Atual" com a cotação corrente do ticker formatada em BRL

#### Scenario: Ticker sem cotação

- **WHEN** um ticker não possui cotação atual válida (preço ausente ou zero)
- **THEN** a célula de Preço Atual exibe "—" sem quebrar o layout da tabela

#### Scenario: Sem chamada de rede adicional por linha

- **WHEN** a coluna de Preço Atual é renderizada
- **THEN** o valor é resolvido a partir da cotação já carregada na carteira, sem disparar uma nova requisição por ticker
