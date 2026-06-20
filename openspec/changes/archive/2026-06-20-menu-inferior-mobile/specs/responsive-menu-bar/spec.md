# responsive-menu-bar

## MODIFIED Requirements

### Requirement: Menus do app usam a barra rolável

A barra rolável reutilizável `<app-scroll-bar>` SHALL ser usada pelos controles de ordenação de Minhas Ações e pelos chips de ano do Histórico (no desktop). A navegação principal e os submenus de Dividendos NÃO usam mais a barra rolável: a navegação principal vira barra inferior fixa no mobile (ver requisito próprio) e os submenus de Dividendos cabem sem rolar no mobile.

#### Scenario: Controles de ordenação rolam no mobile

- **WHEN** os controles de ordenação de Minhas Ações são exibidos em largura estreita e não cabem
- **THEN** eles ficam em uma linha rolável dentro de sua própria barra, sem rolagem horizontal da página

#### Scenario: Submenus de Dividendos cabem sem rolar no mobile

- **WHEN** o seletor de classe de ativo (Ações/FIIs) e as abas internas de Dividendos são exibidos em largura ≤ 600px
- **THEN** cada submenu distribui seus itens em colunas de largura igual que cabem na tela
- **AND** não há rolagem horizontal do submenu nem da página

## ADDED Requirements

### Requirement: Navegação principal como barra inferior no mobile

No mobile (`ResponsiveService.isMobile()` verdadeiro / largura ≤ 600px), a navegação principal SHALL ser exibida como uma barra fixa na parte inferior da viewport, com os itens (ícone acima do rótulo) distribuídos igualmente e sem rolagem. No desktop, a navegação principal permanece como abas horizontais no topo. A área de conteúdo MUST reservar espaço inferior para não ser encoberta pela barra.

#### Scenario: Barra inferior fixa no mobile

- **WHEN** o app é exibido em largura ≤ 600px
- **THEN** a navegação principal aparece fixa na parte inferior da tela
- **AND** cada item exibe ícone acima de um rótulo curto, com os 4 itens ocupando larguras iguais
- **AND** a barra não rola horizontalmente

#### Scenario: Conteúdo não fica encoberto

- **WHEN** a barra inferior está visível no mobile
- **THEN** a área de conteúdo tem espaçamento inferior suficiente (incluindo a safe-area inferior do dispositivo) para que o último conteúdo não fique sob a barra

#### Scenario: Abas no topo no desktop

- **WHEN** o app é exibido em largura > 600px
- **THEN** a navegação principal permanece como abas horizontais no topo, não como barra inferior

#### Scenario: Item ativo destacado

- **WHEN** uma aba está ativa na barra inferior
- **THEN** seu ícone e rótulo recebem o destaque de cor de acento, diferenciando-a das demais
