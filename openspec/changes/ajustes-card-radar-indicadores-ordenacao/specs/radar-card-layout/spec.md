## ADDED Requirements

### Requirement: Tag de destaque na mesma linha dos tickers no card do Radar

No card de mês do Radar de proventos (visão em cards), a tag de destaque ("Melhor mês" ou "Oportunidade de compra") SHALL ser exibida **na mesma linha dos chips de ticker**, e não em uma linha própria acima deles. O layout MUST permanecer legível e contido no card, sem rolagem horizontal.

#### Scenario: Tag inline com os tickers

- **WHEN** um card de mês do Radar com tag de destaque e ao menos um ticker é exibido
- **THEN** a tag aparece na mesma linha dos chips de ticker
- **AND** o conteúdo permanece contido no card, sem estourar

### Requirement: Oportunidade de compra destacada no mês atual

No Radar de proventos, o destaque "Oportunidade de compra" SHALL ser aplicado ao **mês atual**, e não ao próximo mês. A legenda correspondente MUST refletir o mês atual.

#### Scenario: Destaque no mês atual

- **WHEN** o Radar de proventos é exibido
- **THEN** o mês atual recebe o destaque/tag "Oportunidade de compra"
- **AND** o próximo mês não recebe mais esse destaque
- **AND** a legenda descreve o destaque como referente ao mês atual
