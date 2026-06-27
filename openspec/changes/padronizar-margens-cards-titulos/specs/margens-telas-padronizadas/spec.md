## ADDED Requirements

### Requirement: Título alinhado à borda esquerda dos cards

Em todas as telas principais (Meus Ativos, Lançamentos, Dividendos, Metas e Importar), a **borda esquerda do título** SHALL coincidir com a **borda esquerda (externa) dos cards/componentes exibidos abaixo dele**, sem recuo extra — o título e o card compartilham a mesma coluna, como na tela de Importar. O conteúdo interno do card permanece com seu próprio espaçamento (padding) e não é alterado.

#### Scenario: Título encostado na borda do card

- **WHEN** uma tela com título e cards é exibida
- **THEN** a borda esquerda do título está alinhada com a borda esquerda do card abaixo dele
- **AND** o conteúdo dentro do card mantém seu espaçamento interno

#### Scenario: Mesmo comportamento da tela Importar

- **WHEN** o usuário compara qualquer tela com a tela de Importar
- **THEN** o alinhamento título × borda do card é o mesmo em todas

### Requirement: Consistência entre telas ao trocar de aba

A coluna onde título e cards começam SHALL ser a mesma em todas as telas (a borda do container de conteúdo), em desktop e mobile, de modo que o conteúdo não se desloque horizontalmente ao alternar de aba.

#### Scenario: Sem deslocamento ao navegar

- **WHEN** o usuário alterna entre Meus Ativos, Lançamentos, Dividendos, Metas e Importar
- **THEN** a borda esquerda do título e dos cards permanece na mesma posição horizontal em todas as telas, em desktop e mobile

### Requirement: Importar alinhada à esquerda como as demais

A tela de **Importar** SHALL ser exibida alinhada à esquerda, sem centralização. O `max-width` fixo com `margin: 0 auto` MUST ser removido para que título e card sigam a mesma coluna (borda do container) das outras telas.

#### Scenario: Importar não centralizada

- **WHEN** a tela de Importar é exibida
- **THEN** o título e o card de importação iniciam na mesma coluna das demais telas, e não centralizados
