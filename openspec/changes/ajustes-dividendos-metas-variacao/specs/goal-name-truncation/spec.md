## ADDED Requirements

### Requirement: Truncamento do nome da meta
Na listagem de metas, o nome de cada meta DEVE ser truncado com reticências (`...`) quando ultrapassar 15 caracteres, e o nome completo DEVE permanecer acessível via atributo `title` (tooltip).

#### Scenario: Nome longo é truncado
- **WHEN** uma meta com nome de mais de 15 caracteres é exibida na tabela
- **THEN** o texto exibido é cortado em 15 caracteres seguido de `...`

#### Scenario: Nome curto não é alterado
- **WHEN** uma meta com nome de 15 caracteres ou menos é exibida
- **THEN** o nome é exibido por completo, sem reticências

#### Scenario: Nome completo no tooltip
- **WHEN** o usuário passa o mouse sobre um nome truncado
- **THEN** o nome completo da meta é exibido como tooltip (`title`)
