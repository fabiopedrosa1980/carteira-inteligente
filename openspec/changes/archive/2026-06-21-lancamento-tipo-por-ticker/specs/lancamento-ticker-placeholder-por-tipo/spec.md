## ADDED Requirements

### Requirement: Placeholder do ticker específico do tipo

No modal de lançamento, o **placeholder** do campo de ticker SHALL refletir o **tipo de ativo selecionado**, mostrando um exemplo coerente: Ações → `Ex: VALE3`; FIIs → `Ex: MXRF11`; ETFs → `Ex: BOVA11`. Quando nenhum tipo estiver selecionado, MAY usar um exemplo genérico.

#### Scenario: Placeholder para Ações

- **WHEN** o tipo selecionado é "Ações"
- **THEN** o placeholder do campo de ticker mostra um exemplo de ação (ex.: `Ex: VALE3`)

#### Scenario: Placeholder para FIIs

- **WHEN** o tipo selecionado é "FIIs"
- **THEN** o placeholder mostra um exemplo de FII (ex.: `Ex: MXRF11`)

#### Scenario: Placeholder para ETFs

- **WHEN** o tipo selecionado é "ETFs"
- **THEN** o placeholder mostra um exemplo de ETF (ex.: `Ex: BOVA11`)

#### Scenario: Sem tipo selecionado

- **WHEN** nenhum tipo está selecionado
- **THEN** o placeholder pode usar um exemplo genérico
