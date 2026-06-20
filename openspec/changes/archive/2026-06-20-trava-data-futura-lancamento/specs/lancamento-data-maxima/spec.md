## ADDED Requirements

### Requirement: Data do lançamento não pode ser futura

No modal de lançamento (adição e edição), o seletor de data SHALL ter como limite máximo a data de **hoje**, impedindo a seleção de datas futuras. Ao salvar, o sistema SHALL rejeitar uma data futura com uma mensagem de erro.

#### Scenario: Calendário bloqueia datas futuras
- **WHEN** o usuário abre o seletor de data no modal (adição ou edição)
- **THEN** datas posteriores a hoje não podem ser selecionadas

#### Scenario: Validação ao salvar
- **WHEN** a data informada é posterior a hoje
- **THEN** o salvamento é bloqueado com uma mensagem indicando que a data não pode ser futura

#### Scenario: Hoje é permitido
- **WHEN** a data informada é hoje (ou anterior)
- **THEN** o salvamento prossegue normalmente
