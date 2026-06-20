## ADDED Requirements

### Requirement: Tag de destaque ao lado do mês no card do Radar

No card de mês do Radar de proventos (visão em cards), a tag de destaque ("Melhor mês" ou "Oportunidade") SHALL ser exibida **na mesma linha do nome do mês** (no cabeçalho do card), com a contagem de ativos alinhada à direita. A tag MUST quebrar de linha graciosamente em cards estreitos, permanecendo legível e contida, sem rolagem horizontal. A tag de oportunidade MUST exibir o texto curto "Oportunidade".

#### Scenario: Tag ao lado do mês

- **WHEN** um card de mês do Radar com tag de destaque é exibido
- **THEN** a tag aparece na mesma linha do nome do mês, no cabeçalho do card
- **AND** a contagem de ativos fica alinhada à direita
- **AND** o conteúdo permanece contido no card, sem estourar

### Requirement: Oportunidade de compra destacada no mês atual

No Radar de proventos, o destaque "Oportunidade de compra" SHALL ser aplicado ao **mês atual**, e não ao próximo mês. A legenda correspondente MUST refletir o mês atual.

#### Scenario: Destaque no mês atual

- **WHEN** o Radar de proventos é exibido
- **THEN** o mês atual recebe o destaque/tag "Oportunidade de compra"
- **AND** o próximo mês não recebe mais esse destaque
- **AND** a legenda descreve o destaque como referente ao mês atual
