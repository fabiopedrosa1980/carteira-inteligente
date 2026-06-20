# screen-header-text Specification

## Purpose
TBD - created by archiving change card-acoes-nota-radar-altura. Update Purpose after archive.
## Requirements
### Requirement: Telas sem texto descritivo abaixo do header

A aba **Radar** e o **modal de Detalhes da ação** SHALL NOT exibir um texto descritivo (hint) abaixo do título. A tela de **Lançamentos** MUST manter seu subtítulo de resumo (quantidade de lançamentos e Total).

#### Scenario: Radar sem hint

- **WHEN** a aba Radar é exibida
- **THEN** não há parágrafo de descrição abaixo do título "Radar de proventos"

#### Scenario: Detalhes da ação sem hint

- **WHEN** o modal de Detalhes da ação é exibido
- **THEN** não há o texto "Passe o mouse no ícone…" abaixo do título da seção de indicadores

#### Scenario: Lançamentos mantém o resumo

- **WHEN** a tela de Lançamentos é exibida
- **THEN** o subtítulo com a quantidade de lançamentos e o Total continua visível abaixo do título

