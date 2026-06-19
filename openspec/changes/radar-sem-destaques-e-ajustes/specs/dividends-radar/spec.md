## MODIFIED Requirements

### Requirement: Radar de proventos por mês

A visão de sazonalidade SHALL viver em uma sub-tab chamada "Radar" na tela de Dividendos e SHALL ser apresentada como uma matriz (estilo batalha naval): a primeira coluna lista os tickers da carteira (da classe selecionada), uma linha por ativo; as 12 colunas seguintes representam os meses Jan→Dez na horizontal. A célula (ticker × mês) SHALL ser marcada quando aquele ativo teve data-com (ex_date) naquele mês no ano anterior. A matriz NÃO SHALL exibir destaques de coluna (sem realce de "melhor mês" ou "próximo mês" e sem ícone de atenção). Em telas estreitas (mobile), o cabeçalho de meses SHALL exibir apenas a **primeira letra** do mês; em telas maiores, a abreviação de três letras. A coluna de tickers SHALL ser fixa e a matriz SHALL permitir rolagem horizontal. O título NÃO SHALL incluir o ano.

#### Scenario: Matriz sem destaques
- **WHEN** a matriz é exibida
- **THEN** nenhuma coluna recebe realce de destaque nem ícone de atenção

#### Scenario: Mês como inicial no mobile
- **WHEN** a matriz é exibida em tela estreita (mobile)
- **THEN** o cabeçalho de cada mês mostra apenas a primeira letra (J, F, M, …)

#### Scenario: Mês abreviado em telas maiores
- **WHEN** a matriz é exibida em tela larga
- **THEN** o cabeçalho mostra a abreviação de três letras (Jan, Fev, …)

#### Scenario: Célula marcada por data-com
- **WHEN** um ativo teve data-com em determinado mês no ano anterior
- **THEN** a célula correspondente (ticker × mês) aparece marcada; caso contrário, fica vazia
