## MODIFIED Requirements

### Requirement: Radar de proventos por mês

A visão de sazonalidade SHALL viver em uma sub-tab chamada "Radar" na tela de Dividendos e SHALL ser apresentada como uma **matriz (estilo batalha naval)**: a primeira coluna lista os **tickers** da carteira (da classe selecionada), uma linha por ativo; as **12 colunas seguintes** representam os meses Jan→Dez na horizontal. A célula (ticker × mês) SHALL ser **marcada** quando aquele ativo teve data-com (ex_date) naquele mês no ano anterior. A **coluna do próximo mês** em relação ao mês atual SHALL receber destaque visual com o sentido "Oportunidade de compra" e um ícone de atenção; a **coluna do mês com mais ativos** SHALL receber destaque com o sentido "Melhor mês". A coluna de tickers SHALL ser fixa e a matriz SHALL permitir rolagem horizontal em telas estreitas. O título NÃO SHALL incluir o ano.

#### Scenario: Matriz ticker × mês
- **WHEN** o Radar é exibido
- **THEN** os tickers aparecem em linhas e os 12 meses em colunas (Jan→Dez na horizontal)

#### Scenario: Célula marcada por data-com
- **WHEN** um ativo teve data-com em determinado mês no ano anterior
- **THEN** a célula correspondente (ticker × mês) aparece marcada; caso contrário, fica vazia

#### Scenario: Coluna do próximo mês destacada
- **WHEN** a matriz é exibida
- **THEN** a coluna do mês seguinte ao atual recebe destaque e um ícone de atenção ("Oportunidade de compra")

#### Scenario: Coluna do mês com mais ativos destacada
- **WHEN** a matriz é exibida
- **THEN** a coluna do mês com mais ativos marcados recebe destaque ("Melhor mês")

#### Scenario: Coluna de tickers fixa e rolagem
- **WHEN** a matriz não cabe na largura da tela
- **THEN** a coluna de tickers permanece visível (fixa) e as colunas de meses podem ser roladas horizontalmente

#### Scenario: Respeita o seletor de classe
- **WHEN** o seletor está em Ações (ou FIIs)
- **THEN** a matriz lista apenas tickers daquela classe
