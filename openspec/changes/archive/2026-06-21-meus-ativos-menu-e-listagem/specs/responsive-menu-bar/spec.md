## MODIFIED Requirements

### Requirement: Menus do app usam a barra rolável

A barra rolável reutilizável `<app-scroll-bar>` SHALL ser usada pelos chips de ordenação de Meus Ativos **apenas no desktop**. A navegação principal, os submenus de Dividendos e o filtro de anos do Histórico NÃO usam a barra rolável. No mobile, a ordenação de Meus Ativos usa um **combo** (campo) mais um **botão de direção** (↑/↓), em vez de chips roláveis.

**Nota**: Com a remoção dos controles de ordenação global (ver spec `acoes-sort-layout`), o `<app-scroll-bar>` deixa de ser usado na seção de Meus Ativos. A barra rolável permanece disponível como componente reutilizável, mas não é instanciada nesta tela enquanto a ordenação global não existir.

#### Scenario: Ordenação por combo + direção no mobile

- **WHEN** Meus Ativos é exibida em largura ≤ 600px
- **THEN** não há controles de ordenação global na área de cabeçalho
- **AND** a ordenação é feita pelos cabeçalhos de coluna na visão em lista

#### Scenario: Ordenação por chips no desktop

- **WHEN** Meus Ativos é exibida em largura > 600px
- **THEN** não há chips de ordenação global na área de cabeçalho
- **AND** a ordenação é feita pelos cabeçalhos de coluna na visão em lista

#### Scenario: Submenus de Dividendos cabem sem rolar no mobile

- **WHEN** o seletor de classe de ativo (Ações/FIIs) e as abas internas de Dividendos são exibidos em largura ≤ 600px
- **THEN** cada submenu distribui seus itens em colunas de largura igual que cabem na tela
- **AND** não há rolagem horizontal do submenu nem da página

### Requirement: Navegação principal como barra inferior no mobile

No mobile (`ResponsiveService.isMobile()` verdadeiro / largura ≤ 600px), a navegação principal SHALL ser exibida como uma barra fixa na parte inferior da viewport, com os itens (ícone acima do rótulo) distribuídos igualmente e sem rolagem. No desktop, a navegação principal permanece como abas horizontais no topo. A área de conteúdo MUST reservar espaço inferior para não ser encoberta pela barra. O primeiro item da navegação SHALL ser **"Meus Ativos"** (anteriormente "Minhas Ações").

#### Scenario: Barra inferior fixa no mobile

- **WHEN** o app é exibido em largura ≤ 600px
- **THEN** a navegação principal aparece fixa na parte inferior da tela
- **AND** cada item exibe ícone acima de um rótulo curto, com os 4 itens ocupando larguras iguais
- **AND** o primeiro item exibe o rótulo "Meus Ativos"
- **AND** a barra não rola horizontalmente

#### Scenario: Conteúdo não fica encoberto

- **WHEN** a barra inferior está visível no mobile
- **THEN** a área de conteúdo tem espaçamento inferior suficiente (incluindo a safe-area inferior do dispositivo) para que o último conteúdo não fique sob a barra

#### Scenario: Abas no topo no desktop

- **WHEN** o app é exibido em largura > 600px
- **THEN** a navegação principal permanece como abas horizontais no topo
- **AND** a primeira aba exibe o rótulo "Meus Ativos"

#### Scenario: Item ativo destacado

- **WHEN** uma aba está ativa na barra inferior
- **THEN** seu ícone e rótulo recebem o destaque de cor de acento, diferenciando-a das demais
