## ADDED Requirements

### Requirement: Fonte do Saldo igual à do ticker no card mobile

No card de ativo da aba "Meus Ativos" em mobile (largura ≤640px), o valor do **Saldo** SHALL ser exibido com o **mesmo tamanho de fonte do ticker** do card (`.cell-ativo`), em vez de um tamanho maior de "número-herói". O peso (negrito) e o posicionamento do Saldo no grid permanecem inalterados.

#### Scenario: Saldo com a fonte do ticker
- **WHEN** o card de ativo é exibido no mobile (≤640px)
- **THEN** o tamanho da fonte do Saldo é igual ao tamanho da fonte do ticker
- **AND** o Saldo continua em negrito e na mesma posição do grid do card

#### Scenario: Desktop inalterado
- **WHEN** a tabela de ativos é exibida acima de 640px
- **THEN** o tamanho da fonte do Saldo no desktop não é afetado por esta mudança
