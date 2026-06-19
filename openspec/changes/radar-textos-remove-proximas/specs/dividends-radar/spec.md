## MODIFIED Requirements

### Requirement: Radar de proventos por mês

A visão de sazonalidade SHALL viver em uma sub-tab chamada **"Radar"** na tela de Dividendos. A tela SHALL exibir 12 cards (Jan→Dez) com os tickers da carteira (da classe selecionada) cujos proventos tiveram data-com naquele mês no ano anterior. O card do mês com mais tickers SHALL receber uma estrela (★) e o texto **"Melhor mês, aproveite"**. O card do próximo mês em relação ao mês atual SHALL receber um destaque visual e o texto **"Oportunidade de compra"**. Cada card SHALL exibir um contador de ativos. O título NÃO SHALL incluir o ano. Os cards SHALL usar o mesmo estilo visual dos cards de Minhas Ações (stock-card).

#### Scenario: Sub-tab Radar
- **WHEN** as sub-tabs de Dividendos são exibidas
- **THEN** a aba de sazonalidade se chama "Radar"

#### Scenario: Texto no mês com mais ativos
- **WHEN** o card do mês com mais tickers é exibido
- **THEN** ele mostra a estrela (★) e o texto "Melhor mês, aproveite"

#### Scenario: Texto no próximo mês
- **WHEN** o card do mês seguinte ao atual é exibido
- **THEN** ele mostra o destaque visual e o texto "Oportunidade de compra"

#### Scenario: Contador por card
- **WHEN** um card é exibido
- **THEN** ele mostra a quantidade de ativos daquele mês
