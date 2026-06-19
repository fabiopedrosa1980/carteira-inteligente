## MODIFIED Requirements

### Requirement: Radar de proventos por mês

A visão de sazonalidade SHALL viver em uma **sub-tab própria** chamada "Radar de proventos" na tela de Dividendos (separada da faixa de próximas datas-com). A tela SHALL exibir 12 cards (Jan→Dez) com os tickers da carteira (da classe selecionada) cujos proventos tiveram data-com naquele mês no ano anterior. O card do mês com mais tickers SHALL receber uma estrela (★). O próximo mês em relação ao mês atual SHALL receber um destaque visual. Cada card SHALL exibir um contador de ativos. O título NÃO SHALL incluir o ano. Os cards SHALL usar o mesmo estilo visual dos cards de Minhas Ações (stock-card).

#### Scenario: Sub-tab dedicada
- **WHEN** o usuário seleciona a sub-tab "Radar de proventos"
- **THEN** somente o grid de 12 meses é exibido (sem a faixa de próximas datas-com)

#### Scenario: Mês com mais ativos destacado
- **WHEN** o Radar é exibido
- **THEN** o card do mês com o maior número de tickers exibe uma estrela (★); empate resolve no primeiro mês

#### Scenario: Próximo mês destacado
- **WHEN** o Radar é exibido
- **THEN** o card do mês seguinte ao atual recebe um destaque visual

#### Scenario: Contador por card
- **WHEN** um card é exibido
- **THEN** ele mostra a quantidade de ativos daquele mês
