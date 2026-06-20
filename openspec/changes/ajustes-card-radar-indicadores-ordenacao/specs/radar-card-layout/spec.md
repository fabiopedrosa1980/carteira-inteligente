## ADDED Requirements

### Requirement: Tag de destaque ao lado do mês no card do Radar

No card de mês do Radar de proventos (visão em cards), a tag de destaque ("Melhor mês" ou "Oportunidade") SHALL ser exibida **na mesma linha do nome do mês** (no cabeçalho do card), com a contagem de ativos alinhada à direita. A tag MUST quebrar de linha graciosamente em cards estreitos, permanecendo legível e contida, sem rolagem horizontal. A tag de oportunidade MUST exibir o texto curto "Oportunidade".

#### Scenario: Tag ao lado do mês

- **WHEN** um card de mês do Radar com tag de destaque é exibido
- **THEN** a tag aparece na mesma linha do nome do mês, no cabeçalho do card
- **AND** a contagem de ativos fica alinhada à direita
- **AND** o conteúdo permanece contido no card, sem estourar

### Requirement: Oportunidade de compra destacada no próximo mês

No Radar de proventos, o destaque "Oportunidade" SHALL ser aplicado ao **próximo mês** (mês seguinte ao atual; Dezembro→Janeiro). A legenda correspondente MUST refletir o próximo mês.

#### Scenario: Destaque no próximo mês

- **WHEN** o Radar de proventos é exibido
- **THEN** o próximo mês (seguinte ao atual) recebe o destaque/tag "Oportunidade"
- **AND** a legenda descreve o destaque como referente ao próximo mês
