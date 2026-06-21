## ADDED Requirements

### Requirement: Visão em matriz ("batalha naval") disponível no mobile

No Radar de proventos, a visão em **matriz** (heatmap ticker × meses, "batalha naval") SHALL estar disponível também no **mobile**. A visão efetiva MUST respeitar a escolha do usuário em qualquer largura de tela, em vez de forçar a visão em cards no mobile. O alternador de visualização (cards/matriz) MUST ficar visível no mobile, e a matriz MUST permanecer utilizável em telas estreitas (colunas compactas, sem quebrar o layout).

#### Scenario: Alternar para matriz no mobile

- **WHEN** o usuário em uma tela mobile seleciona a visão em matriz no Radar
- **THEN** a matriz (ticker × meses) é exibida
- **AND** a visão não é forçada de volta para cards

#### Scenario: Toggle visível no mobile

- **WHEN** o Radar de proventos é exibido no mobile
- **THEN** o alternador cards/matriz é visível
- **AND** o usuário pode escolher qualquer uma das duas visões

#### Scenario: Escolha lembrada entre sessões

- **WHEN** o usuário seleciona a visão em matriz no mobile e recarrega a página
- **THEN** o Radar reabre na visão em matriz
