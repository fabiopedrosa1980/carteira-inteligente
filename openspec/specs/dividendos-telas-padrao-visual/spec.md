# dividendos-telas-padrao-visual Specification

## Purpose
TBD - created by archiving change dividendos-padrao-visual-projetados. Update Purpose after archive.
## Requirements
### Requirement: Telas de Dividendos seguem o padrão visual de Projetados

Todas as telas de Dividendos (Histórico, Recebidos, Projetados e Radar) SHALL apresentar o **mesmo padrão visual de contêiner e título**, tomando a tela de **Projetados** (`.ds-section` / `.ds-title`) como referência. O contêiner de cada tela MUST ser um **card** com **fundo** (`--card-bg`), **cantos arredondados** (12px), **borda** (1px na cor `--border`) e **espaçamento interno** (padding) equivalentes ao de Projetados, com o mesmo espaçamento superior. O **título** de cada tela MUST usar o mesmo tamanho, peso e margem do título de Projetados.

#### Scenario: Histórico no padrão

- **WHEN** a tela de Histórico é exibida
- **THEN** seu contêiner aparece como card com fundo, cantos arredondados e borda equivalentes ao de Projetados
- **AND** seu título usa o mesmo tamanho, peso e margem do título de Projetados

#### Scenario: Radar no padrão

- **WHEN** a tela de Radar é exibida
- **THEN** seu contêiner aparece como card com fundo, cantos arredondados, borda e espaçamento equivalentes ao de Projetados
- **AND** seu título usa o mesmo tamanho, peso e margem do título de Projetados

#### Scenario: Recebidos e Projetados mantêm o padrão

- **WHEN** as telas de Recebidos e Projetados são exibidas
- **THEN** elas continuam exibindo o card e o título de referência, sem regressão visual

