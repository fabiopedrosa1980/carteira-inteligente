# radar-card-layout Specification

## Purpose
TBD - created by archiving change ajustes-card-radar-indicadores-ordenacao. Update Purpose after archive.
## Requirements
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

### Requirement: Sem destaques de Melhor mês e Oportunidade para FIIs

No Radar de proventos, quando o tipo de ativo for **FIIs**, os destaques "Melhor mês" e "Oportunidade" SHALL NOT ser exibidos (nem nos cards, nem na matriz, nem na legenda), pois FIIs costumam pagar mensalmente e esses destaques não são informativos nesse contexto. Para Ações, os destaques permanecem como descrito.

#### Scenario: FIIs sem destaques

- **WHEN** o Radar é exibido com `assetType = 'FIIs'`
- **THEN** nenhum mês recebe a tag/destaque "Melhor mês" ou "Oportunidade"
- **AND** a legenda desses destaques não é exibida

#### Scenario: Ações mantêm destaques

- **WHEN** o Radar é exibido com `assetType = 'Acoes'`
- **THEN** os destaques "Melhor mês" (verde) e "Oportunidade" (amarelo) são exibidos normalmente

