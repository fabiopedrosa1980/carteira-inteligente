## MODIFIED Requirements

### Requirement: Radar de proventos por mês

A sub-tab "Radar" SHALL oferecer um **alternador de visualização** com duas opções: **Cards** e **Matriz**. A visualização padrão SHALL ser a **Matriz** e a escolha do usuário SHALL ser lembrada entre sessões. Ambas as visualizações SHALL respeitar o seletor Ações/FIIs e usar os mesmos dados (tickers da carteira cujos proventos tiveram data-com no mês, no ano anterior). O título NÃO SHALL incluir o ano.

- **Matriz (batalha naval):** primeira coluna com os tickers (uma linha por ativo) e 12 colunas de meses (Jan→Dez); a célula (ticker × mês) é marcada quando houve data-com naquele mês. Coluna de tickers fixa e rolagem horizontal.
- **Cards (Jan→Dez):** 12 cards, um por mês; cada card lista os tickers que tiveram data-com naquele mês e um contador de ativos.

#### Scenario: Alternar entre Cards e Matriz
- **WHEN** o usuário seleciona "Cards" (ou "Matriz") no alternador
- **THEN** o Radar passa a exibir a visualização escolhida com os mesmos dados

#### Scenario: Matriz é o padrão
- **WHEN** o Radar é aberto pela primeira vez
- **THEN** a visualização exibida é a Matriz

#### Scenario: Preferência lembrada
- **WHEN** o usuário escolhe uma visualização e volta ao Radar depois
- **THEN** a visualização escolhida anteriormente é exibida

#### Scenario: Cards por mês
- **WHEN** a visualização Cards está ativa
- **THEN** cada card de mês lista os tickers com data-com naquele mês e um contador

#### Scenario: Respeita o seletor de classe
- **WHEN** o seletor está em Ações (ou FIIs)
- **THEN** ambas as visualizações listam apenas ativos daquela classe
