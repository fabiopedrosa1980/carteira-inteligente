# responsive-menu-bar Specification

## Purpose
TBD - created by archiving change menus-responsivos-cdk. Update Purpose after archive.
## Requirements
### Requirement: Detecção responsiva reativa via CDK

O app SHALL expor um `ResponsiveService` que publica o estado de viewport como signals (`isMobile()` para largura ≤ 600px e `isTablet()` para faixa intermediária), alimentado pelo `BreakpointObserver` do `@angular/cdk`. Componentes MUST poder reagir a mudanças de largura sem registrar listeners de `resize` próprios.

#### Scenario: isMobile reflete a largura do viewport

- **WHEN** a largura do viewport é ≤ 600px
- **THEN** `ResponsiveService.isMobile()` retorna `true`
- **AND** quando a largura passa para > 600px, `isMobile()` retorna `false` sem recarregar a página

#### Scenario: Atualização ao redimensionar

- **WHEN** o usuário redimensiona a janela cruzando o breakpoint mobile
- **THEN** os signals do `ResponsiveService` atualizam e os componentes que os consomem refletem o novo estado reativamente

### Requirement: Barra de menu rolável reutilizável

O app SHALL prover um componente `<app-scroll-bar>` que envolve um conjunto de itens de menu e os mantém em uma única linha com rolagem horizontal quando não couberem, sem quebrar de linha. O componente MUST preservar o conteúdo e o visual dos itens projetados (não impõe estilo próprio aos botões).

#### Scenario: Itens não quebram de linha

- **WHEN** os itens de menu projetados excedem a largura disponível
- **THEN** eles permanecem em uma única linha
- **AND** a área rola horizontalmente para revelar os itens ocultos
- **AND** não há rolagem horizontal da página, apenas dentro da barra

#### Scenario: Indicação visual de conteúdo oculto

- **WHEN** há itens fora da área visível por overflow
- **THEN** a borda correspondente exibe um fade (esmaecimento) sinalizando que há mais conteúdo
- **AND** o fade funciona igualmente nos temas claro e escuro

#### Scenario: Item ativo permanece visível

- **WHEN** um item passa a ser o ativo e está fora da área visível
- **THEN** a barra rola para trazer o item ativo para a área visível

#### Scenario: Sem overflow não há fade nem rolagem

- **WHEN** todos os itens cabem na largura disponível
- **THEN** nenhum fade de borda é exibido e a barra não rola

### Requirement: Menus do app usam a barra rolável

A barra rolável reutilizável `<app-scroll-bar>` SHALL ser usada pelos controles de ordenação de Minhas Ações e pelos chips de ano do Histórico (no desktop). A navegação principal e os submenus de Dividendos NÃO usam mais a barra rolável: a navegação principal vira barra inferior fixa no mobile (ver requisito próprio) e os submenus de Dividendos cabem sem rolar no mobile.

#### Scenario: Controles de ordenação rolam no mobile

- **WHEN** os controles de ordenação de Minhas Ações são exibidos em largura estreita e não cabem
- **THEN** eles ficam em uma linha rolável dentro de sua própria barra, sem rolagem horizontal da página

#### Scenario: Submenus de Dividendos cabem sem rolar no mobile

- **WHEN** o seletor de classe de ativo (Ações/FIIs) e as abas internas de Dividendos são exibidos em largura ≤ 600px
- **THEN** cada submenu distribui seus itens em colunas de largura igual que cabem na tela
- **AND** não há rolagem horizontal do submenu nem da página

### Requirement: Filtro de anos alterna chips/combo por estado responsivo

No Histórico de dividendos, o filtro de anos SHALL ser renderizado condicionalmente conforme `ResponsiveService.isMobile()`: combo (`<select>`) no mobile e chips no desktop, com apenas a variante ativa presente no DOM (sem duplicação por `display:none`).

#### Scenario: Combo no mobile

- **WHEN** o Histórico é exibido com `isMobile()` verdadeiro e há posições visíveis
- **THEN** o filtro de anos aparece como combo `<select>` (incluindo a opção "Todos")
- **AND** os chips de ano não estão presentes no DOM
- **AND** selecionar um ano no combo filtra a tabela igual aos chips

#### Scenario: Chips no desktop

- **WHEN** o Histórico é exibido com `isMobile()` falso
- **THEN** o filtro de anos aparece como chips
- **AND** o combo de anos não está presente no DOM

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

