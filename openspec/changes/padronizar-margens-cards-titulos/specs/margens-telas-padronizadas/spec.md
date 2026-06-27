## ADDED Requirements

### Requirement: Recuo horizontal padrão das telas

Todas as telas principais do app (Meus Ativos, Lançamentos, Dividendos, Metas e Importar) SHALL usar o **mesmo recuo horizontal de 16px** para o cabeçalho/título e para a coluna dos cards, em **todos os breakpoints** (desktop e mobile). O recuo MUST ser idêntico entre as telas, de modo que o conteúdo não se desloque horizontalmente ao alternar de aba.

#### Scenario: Mesma coluna ao trocar de aba (desktop)

- **WHEN** o usuário alterna entre as telas em desktop
- **THEN** a borda esquerda do título e dos cards permanece na mesma posição horizontal (recuo 16px) em todas as telas

#### Scenario: Mesma coluna ao trocar de aba (mobile)

- **WHEN** o usuário alterna entre as telas em mobile (≤ 600px)
- **THEN** o recuo horizontal é 16px e idêntico em todas as telas

### Requirement: Telas que usavam 20px alinhadas ao padrão

As telas que usavam 20px de recuo no desktop (Meus Ativos via `$pad-x`, Dividendos via `$dv-pad-x`, Portfolio via `.section-header`/cards do acordeão) SHALL passar a usar 16px, igualando-se a Metas (que já usa 16px). O recuo do cabeçalho/título MUST continuar coincidindo com a margem dos cards na mesma tela.

#### Scenario: Telas de 20px convergem para 16px

- **WHEN** Meus Ativos, Dividendos ou Portfolio são exibidos
- **THEN** o recuo horizontal do título e dos cards é 16px, igual ao de Metas

### Requirement: Importar alinhada à esquerda como as demais

A tela de **Importar** SHALL ser exibida alinhada à esquerda com o recuo horizontal padrão, sem centralização. O `max-width` fixo com `margin: 0 auto` MUST ser removido para que título e card sigam a mesma coluna das outras telas.

#### Scenario: Importar não centralizada

- **WHEN** a tela de Importar é exibida
- **THEN** o título e o card de importação iniciam na mesma coluna das demais telas (recuo padrão), e não centralizados

### Requirement: Título e cards compartilham o recuo na mesma tela

Em cada tela, o início horizontal do título SHALL coincidir com a margem esquerda dos cards exibidos na mesma tela, em desktop e mobile. A padronização MUST NOT alterar tamanho, peso ou tipografia do título — apenas o recuo horizontal.

#### Scenario: Título encostado na coluna dos cards

- **WHEN** uma tela com título e cards é exibida
- **THEN** a borda esquerda do título está alinhada com a borda esquerda dos cards, no mesmo recuo padrão
