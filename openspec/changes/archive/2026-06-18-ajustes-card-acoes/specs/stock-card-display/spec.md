## ADDED Requirements

### Requirement: Truncamento do nome da empresa

O card de ação SHALL exibir o nome da empresa por extenso até 40 caracteres. Quando o nome exceder 40 caracteres, o card SHALL truncá-lo em 40 caracteres e anexar reticências (`…`).

#### Scenario: Nome curto exibido por completo
- **WHEN** o nome da empresa tem 40 caracteres ou menos
- **THEN** o card exibe o nome completo sem reticências

#### Scenario: Nome longo truncado em 40 caracteres
- **WHEN** o nome da empresa tem mais de 40 caracteres
- **THEN** o card exibe os primeiros 40 caracteres seguidos de `…`

#### Scenario: Nome ausente ou igual ao ticker
- **WHEN** o nome da empresa é igual ao ticker (ou indisponível)
- **THEN** o card exibe um marcador neutro (`—`) em vez do nome

### Requirement: Posicionamento da nota no card

O card de ação SHALL exibir o badge de nota na parte inferior do card, e não no topo junto à identidade do ativo. O badge SHALL continuar oculto quando a nota for zero.

#### Scenario: Nota positiva exibida na base
- **WHEN** a ação possui nota maior que zero
- **THEN** o badge de nota é renderizado na região inferior do card, abaixo do preço e das estatísticas

#### Scenario: Nota zerada não exibe badge
- **WHEN** a ação possui nota igual a zero
- **THEN** nenhum badge de nota é renderizado
