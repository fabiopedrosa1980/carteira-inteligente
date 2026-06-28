## MODIFIED Requirements

### Requirement: Telas de Dividendos seguem o padrão visual de Projetados

Todas as telas de Dividendos (Histórico, Recebidos, Projetados e Radar) SHALL apresentar o **mesmo padrão visual de contêiner e título**. O contêiner de cada tela MUST ser um **card** com **fundo** (`--card-bg`), **cantos arredondados** via `--radius-card`, **borda** (1px na cor `--border`) e **espaçamento interno** da escala de espaçamento do app, com o mesmo espaçamento superior. O **título** de cada tela MUST usar o **padrão de título do app** (`.section-title`/`.page-title`: 20px, peso 700), em **px** — não mais `1.1rem` — de modo que o tamanho do título de seção em Dividendos coincida com o das demais telas.

#### Scenario: Histórico no padrão

- **WHEN** a tela de Histórico é exibida
- **THEN** seu contêiner aparece como card com fundo, cantos arredondados (`--radius-card`) e borda
- **AND** seu título usa o padrão do app (20px/700), igual ao das demais telas

#### Scenario: Radar no padrão

- **WHEN** a tela de Radar é exibida
- **THEN** seu contêiner aparece como card com fundo, cantos arredondados (`--radius-card`), borda e espaçamento da escala
- **AND** seu título usa o padrão do app (20px/700)

#### Scenario: Recebidos e Projetados mantêm o padrão

- **WHEN** as telas de Recebidos e Projetados são exibidas
- **THEN** elas exibem o card e o título no padrão do app, sem regressão visual

#### Scenario: Consistência de título entre Dividendos e o resto do app

- **WHEN** o usuário navega de uma tela de Dividendos para outra tela com título de seção
- **THEN** os títulos de seção têm o mesmo tamanho e peso (20px/700)
