## MODIFIED Requirements

### Requirement: Radar de proventos por mês

A tela Radar de Dividendos SHALL exibir 12 cards (Jan→Dez) com os tickers da carteira (da classe selecionada) cujos proventos tiveram data-com naquele mês no ano anterior. O card do mês com **mais tickers** SHALL receber um destaque com **estrela (★)**. O **próximo mês em relação ao mês atual** SHALL receber um destaque visual. Cada card SHALL exibir um **contador de ativos**. O título NÃO SHALL incluir o ano. Os cards SHALL usar o mesmo estilo visual dos cards de Minhas Ações (stock-card).

#### Scenario: Mês com mais ativos destacado
- **WHEN** o Radar é exibido
- **THEN** o card do mês com o maior número de tickers exibe uma estrela (★); empate resolve no primeiro mês

#### Scenario: Próximo mês destacado
- **WHEN** o Radar é exibido
- **THEN** o card do mês seguinte ao atual recebe um destaque visual

#### Scenario: Contador por card
- **WHEN** um card é exibido
- **THEN** ele mostra a quantidade de ativos daquele mês

#### Scenario: Título sem ano
- **WHEN** o Radar é exibido
- **THEN** o título não inclui "· 2025" (nem o ano)

#### Scenario: Estilo do stock-card
- **WHEN** os cards do Radar são exibidos
- **THEN** usam o mesmo estilo visual dos cards de Minhas Ações
