## MODIFIED Requirements

### Requirement: Alternância entre visão em Cards e visão em Lista

A tela de "Meus Ativos" SHALL oferecer alternância entre visão em cards e visão em lista. A visão em **lista** MUST ser o padrão. O toggle de visão fica no cabeçalho da tela. A visão selecionada aplica-se a **todos os grupos** simultaneamente.

#### Scenario: Padrão é lista

- **WHEN** a tela de Meus Ativos é aberta
- **THEN** a visão em lista é exibida em cada grupo expandido

#### Scenario: Alternar para cards aplica-se a todos os grupos

- **WHEN** o usuário clica no ícone de cards
- **THEN** todos os grupos exibem seus ativos em formato de cards paginados

### Requirement: Lista e cards renderizados por grupo

Na visão em lista, cada **grupo** (Ações, FIIs, ETFs) SHALL exibir sua própria tabela com os ativos daquele tipo, paginada independentemente. Na visão em cards, cada grupo exibe seu próprio grid paginado. A ordenação global (clique nos cabeçalhos de coluna) aplica-se igualmente a todos os grupos.

#### Scenario: Lista por grupo

- **WHEN** a visão em lista está ativa e a seção Ações está expandida
- **THEN** uma tabela com os ativos do tipo Ações é exibida dentro da seção
- **AND** a seção FIIs exibe sua própria tabela separada

#### Scenario: Cards por grupo

- **WHEN** a visão em cards está ativa
- **THEN** cada grupo exibe um grid de cards com seus próprios ativos
- **AND** a paginação de cada grupo é independente
