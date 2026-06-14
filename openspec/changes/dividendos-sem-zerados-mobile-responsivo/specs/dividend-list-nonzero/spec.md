## ADDED Requirements

### Requirement: Listagem de dividendos exclui valores zerados
A listagem de dividendos por ativo DEVE retornar apenas registros com `amount` maior que zero.

#### Scenario: Registro com valor zero é excluído
- **WHEN** existe um dividendo com `amount = 0` para o ativo
- **THEN** ele não aparece na resposta de `GET /api/v1/stocks/:id/dividends`

#### Scenario: Registros com valor positivo são mantidos
- **WHEN** o ativo possui dividendos com `amount > 0`
- **THEN** todos eles são retornados normalmente

#### Scenario: Filtro por ano também exclui zerados
- **WHEN** a listagem é filtrada por ano (`?year=YYYY`)
- **THEN** apenas registros daquele ano com `amount > 0` são retornados
