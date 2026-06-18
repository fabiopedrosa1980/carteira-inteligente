## ADDED Requirements

### Requirement: Radar de proventos por mês

A tela de Dividendos SHALL oferecer uma sub-tab "Radar" que exibe 12 cards (Janeiro a Dezembro). Cada card SHALL listar os tickers da carteira (da classe selecionada, Ações ou FIIs) cujos proventos tiveram **data-com (ex_date) naquele mês no ano anterior** (`anoAtual - 1`). O Radar SHALL respeitar o seletor de classe e tratar meses sem proventos exibindo o card vazio (sem tickers).

#### Scenario: Cards por mês com tickers
- **WHEN** o usuário abre a sub-tab Radar
- **THEN** vê 12 cards (Jan→Dez); cada um lista os tickers com data-com naquele mês no ano anterior

#### Scenario: Respeita Ações/FIIs
- **WHEN** o usuário alterna o seletor de classe
- **THEN** o Radar recarrega com os tickers daquela classe

#### Scenario: Mês sem proventos
- **WHEN** um mês não teve proventos no ano anterior
- **THEN** o card do mês aparece sem tickers (estado vazio)
