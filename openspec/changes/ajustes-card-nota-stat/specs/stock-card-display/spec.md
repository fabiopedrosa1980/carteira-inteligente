## MODIFIED Requirements

### Requirement: Truncamento do nome da empresa

O card de ação SHALL exibir o nome da empresa por extenso até 30 caracteres. Quando o nome exceder 30 caracteres, o card SHALL truncá-lo em 30 caracteres e anexar reticências (`…`).

#### Scenario: Nome curto exibido por completo
- **WHEN** o nome da empresa tem 30 caracteres ou menos
- **THEN** o card exibe o nome completo sem reticências

#### Scenario: Nome longo truncado em 30 caracteres
- **WHEN** o nome da empresa tem mais de 30 caracteres
- **THEN** o card exibe os primeiros 30 caracteres seguidos de `…`

#### Scenario: Nome ausente ou igual ao ticker
- **WHEN** o nome da empresa é igual ao ticker (ou indisponível)
- **THEN** o card exibe um marcador neutro (`—`) em vez do nome

### Requirement: Posicionamento da nota no card

O card de ação SHALL exibir a nota como um item de estatística dentro da faixa de estatísticas (`stat-strip`), ao lado de Hoje e DY, com o mesmo estilo dos demais itens: rótulo "Nota" acima e o valor abaixo. O valor da nota SHALL ser colorido por faixa (alto/médio/baixo). A nota SHALL permanecer oculta quando for zero.

#### Scenario: Nota positiva exibida como stat
- **WHEN** a ação possui nota maior que zero
- **THEN** a faixa de estatísticas exibe um item "Nota" ao lado de Hoje e DY, com o mesmo layout de rótulo/valor

#### Scenario: Estilo de valor por faixa
- **WHEN** a nota é exibida
- **THEN** seu valor usa a cor da faixa correspondente (alto, médio ou baixo), de forma consistente com os demais valores da faixa

#### Scenario: Nota zerada não é exibida
- **WHEN** a ação possui nota igual a zero
- **THEN** nenhum item de nota é renderizado na faixa de estatísticas
