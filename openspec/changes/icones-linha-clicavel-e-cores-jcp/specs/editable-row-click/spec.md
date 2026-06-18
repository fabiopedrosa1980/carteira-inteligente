## ADDED Requirements

### Requirement: Linha clicável para editar

Nas tabelas com edição (lançamentos em Meus Ativos e lista de Minhas Metas), clicar em qualquer parte da linha (exceto nos botões de ação) SHALL abrir a edição do item. Os botões de ação (editar/excluir) SHALL impedir a propagação do clique para não disparar a edição da linha de forma duplicada nem conflitante.

#### Scenario: Clique na linha abre edição
- **WHEN** o usuário clica em uma linha da tabela de lançamentos ou de metas (fora dos botões)
- **THEN** o formulário/modal de edição do item correspondente é aberto

#### Scenario: Botão de excluir não abre edição
- **WHEN** o usuário clica no botão de excluir de uma linha
- **THEN** apenas a ação de excluir é executada, sem abrir a edição da linha

#### Scenario: Affordance de clique
- **WHEN** o ponteiro passa sobre uma linha editável
- **THEN** a linha indica que é clicável (cursor pointer / realce de hover)
