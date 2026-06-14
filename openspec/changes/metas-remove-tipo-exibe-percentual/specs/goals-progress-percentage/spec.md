## ADDED Requirements

### Requirement: Listagem sempre exibe o percentual da meta
Cada card na listagem de metas DEVE exibir sempre o percentual de conclusão da meta, mesmo quando for 0%.

#### Scenario: Meta com progresso parcial
- **WHEN** uma meta tem 37% de progresso
- **THEN** o card exibe "37% concluído" e a barra de progresso preenchida proporcionalmente

#### Scenario: Meta sem progresso
- **WHEN** uma meta tem 0% de progresso (sem posições ou valor atual zero)
- **THEN** o card ainda exibe "0% concluído" e a barra vazia

#### Scenario: Card sem selo de tipo
- **WHEN** o card de uma meta é renderizado
- **THEN** não há selo/etiqueta de tipo; o card mostra nome, valores e percentual
