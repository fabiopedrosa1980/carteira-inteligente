# radar-alternador-sem-dados Specification

## Purpose
TBD - created by archiving change dividendos-radar-icones-e-ordenacao. Update Purpose after archive.
## Requirements
### Requirement: Radar oculta o alternador de visualização no estado vazio

Na tela de Radar de proventos, quando não houver dados para mostrar (estado vazio, após o carregamento), o **alternador de visualização** (ícones de **cards** e de **matriz / batalha naval**) SHALL ser ocultado. O alternador MUST permanecer visível quando houver dados e durante o carregamento (skeleton).

#### Scenario: Sem dados oculta o alternador

- **WHEN** o Radar termina de carregar e não há dados para mostrar
- **THEN** os ícones de visualização em cards e em matriz não são exibidos

#### Scenario: Com dados mantém o alternador

- **WHEN** o Radar tem dados para mostrar
- **THEN** o alternador de visualização (cards/matriz) é exibido normalmente

#### Scenario: Durante o carregamento mantém o alternador

- **WHEN** o Radar está carregando (skeleton)
- **THEN** o alternador de visualização permanece visível

