## ADDED Requirements

### Requirement: Fechar o modal atualiza a tela chamadora e re-soma os ativos

Ao salvar uma alteração no modal de lançamento (adicionar, editar ou remover) e fechá-lo, a tela "Meus Ativos" SHALL refletir imediatamente a alteração: a contagem da seção, o total da seção e o total geral MUST ser recalculados a partir dos lançamentos atualizados. A carteira agregada (`StockDataService`) MUST ser recarregada para que somatórios e posições derivados também reflitam o novo estado.

#### Scenario: Adicionar lançamento atualiza somas

- **WHEN** o usuário adiciona um lançamento pelo modal e ele é salvo com sucesso
- **THEN** o modal fecha
- **AND** a contagem da seção correspondente aumenta
- **AND** o total da seção e o total geral são recalculados incluindo o novo lançamento

#### Scenario: Editar lançamento reflete novo valor

- **WHEN** o usuário edita a quantidade ou o preço de um lançamento e salva
- **THEN** o modal fecha
- **AND** o total da seção e o total geral refletem o novo valor

#### Scenario: Remover lançamento reduz somas

- **WHEN** o usuário remove um lançamento
- **THEN** a contagem da seção diminui
- **AND** o total da seção e o total geral são recalculados sem o lançamento removido

#### Scenario: Carteira agregada recarregada

- **WHEN** uma alteração de lançamento é confirmada e o modal fecha
- **THEN** a carteira agregada (`StockDataService`) é recarregada
- **AND** somatórios/posições derivados da carteira refletem o novo estado
