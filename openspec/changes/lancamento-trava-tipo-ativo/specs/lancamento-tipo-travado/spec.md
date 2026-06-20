## ADDED Requirements

### Requirement: Tipo de ativo travado quando definido pelo contexto

No modal de lançamento, o campo **Tipo de Ativo** SHALL ficar desabilitado quando o tipo já é definido pelo contexto: ao **adicionar a partir de uma seção** (tipo pré-definido) ou ao **editar** um lançamento existente. O valor SHALL permanecer visível. Em um fluxo de adição sem tipo pré-definido, o campo SHALL permanecer editável.

#### Scenario: Adicionar a partir de uma seção
- **WHEN** o usuário abre o modal de adição a partir de uma seção (Ações/FIIs/ETFs)
- **THEN** o tipo de ativo aparece preenchido com o da seção e o campo fica desabilitado

#### Scenario: Editar um lançamento
- **WHEN** o usuário edita um lançamento existente
- **THEN** o tipo de ativo fica desabilitado (não pode ser alterado)

#### Scenario: Valor visível
- **WHEN** o campo de tipo está desabilitado
- **THEN** o tipo selecionado continua visível no campo
