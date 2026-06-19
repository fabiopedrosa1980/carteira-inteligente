## MODIFIED Requirements

### Requirement: Radar de proventos por mês

A visão de sazonalidade SHALL viver em uma sub-tab chamada "Radar" na tela de Dividendos. A tela SHALL exibir 12 cards (Jan→Dez) com os tickers da carteira (da classe selecionada) cujos proventos tiveram data-com naquele mês no ano anterior. O card do mês com mais tickers SHALL receber uma estrela (★) e o texto "Melhor mês, aproveite". O card do próximo mês em relação ao mês atual SHALL receber um destaque visual, o texto "Oportunidade de compra" e um **ícone de atenção**. Os textos de destaque SHALL aparecer na **parte superior do card, junto ao contador de ativos**. Cada card SHALL exibir um contador de ativos. O título NÃO SHALL incluir o ano. Os cards SHALL usar o mesmo estilo visual dos cards de Minhas Ações (stock-card).

#### Scenario: Textos de destaque no topo do card
- **WHEN** um card de destaque (mês com mais ativos ou próximo mês) é exibido
- **THEN** o texto correspondente aparece na parte superior do card, encostando no contador de ativos

#### Scenario: Ícone de atenção no próximo mês
- **WHEN** o card do próximo mês ao atual é exibido
- **THEN** ele mostra um ícone de atenção junto ao texto "Oportunidade de compra"

#### Scenario: Texto no mês com mais ativos
- **WHEN** o card do mês com mais tickers é exibido
- **THEN** ele mostra a estrela (★) e o texto "Melhor mês, aproveite"

#### Scenario: Contador por card
- **WHEN** um card é exibido
- **THEN** ele mostra a quantidade de ativos daquele mês
