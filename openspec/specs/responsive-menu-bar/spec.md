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

A barra rolável reutilizável `<app-scroll-bar>` SHALL ser usada pelos chips de ordenação de Minhas Ações **apenas no desktop**. A navegação principal, os submenus de Dividendos e o filtro de anos do Histórico NÃO usam a barra rolável. No mobile, a ordenação de Minhas Ações usa um **combo** (campo) mais um **botão de direção** (↑/↓), em vez de chips roláveis.

#### Scenario: Ordenação por combo + direção no mobile

- **WHEN** Minhas Ações é exibida em largura ≤ 600px
- **THEN** a ordenação é exibida como um combo `<select>` de campo (incluindo a opção "Padrão") e um botão que alterna ascendente/descendente
- **AND** os controles cabem em uma linha, sem rolagem horizontal
- **AND** os chips de ordenação não estão presentes no DOM

#### Scenario: Ordenação por chips no desktop

- **WHEN** Minhas Ações é exibida em largura > 600px
- **THEN** a ordenação é exibida como chips (Nome, Preço, Variação, DY, Nota), cada um alternando a direção ao ser clicado
- **AND** o combo de ordenação não está presente no DOM

#### Scenario: Submenus de Dividendos cabem sem rolar no mobile

- **WHEN** o seletor de classe de ativo (Ações/FIIs) e as abas internas de Dividendos são exibidos em largura ≤ 600px
- **THEN** cada submenu distribui seus itens em colunas de largura igual que cabem na tela
- **AND** não há rolagem horizontal do submenu nem da página

### Requirement: Filtro de anos alterna chips/combo por estado responsivo

No Histórico de dividendos, o filtro de anos SHALL ser exibido sempre como **chips** de ano (incluindo a opção "Todos"), em todos os tamanhos de tela, posicionados na linha abaixo do seletor de "Ativo". No mobile, os chips MUST quebrar de linha (`flex-wrap`) quando não couberem, sem rolagem horizontal e sem usar combo `<select>`.

#### Scenario: Chips em todos os tamanhos

- **WHEN** o Histórico é exibido com posições visíveis, em qualquer largura de viewport
- **THEN** o filtro de anos aparece como chips (anos + "Todos"), abaixo do seletor de "Ativo"
- **AND** nenhum combo `<select>` de anos é renderizado

#### Scenario: Chips quebram de linha no mobile sem rolagem

- **WHEN** o Histórico é exibido em largura estreita e os chips de ano não cabem em uma linha
- **THEN** os chips quebram para a(s) linha(s) abaixo
- **AND** não há rolagem horizontal dos chips nem da página

#### Scenario: Selecionar um ano filtra a tabela

- **WHEN** o usuário toca em um chip de ano (ou em "Todos")
- **THEN** a tabela de dividendos é filtrada por aquele ano (ou mostra todos)

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

### Requirement: Combo de ordenação reflete e controla o estado de ordenação

No mobile, o combo de ordenação e o botão de direção SHALL refletir e alterar o estado de ordenação compartilhado (mesmo campo/direção usados pelos chips do desktop), de modo que a ordem da lista seja idêntica para o mesmo estado, independente da variante exibida.

#### Scenario: Selecionar campo no combo ordena a lista

- **WHEN** o usuário escolhe um campo no combo de ordenação no mobile
- **THEN** a lista de Minhas Ações é reordenada por aquele campo
- **AND** ao escolher "Padrão", a lista volta à ordem padrão

#### Scenario: Botão de direção alterna asc/desc

- **WHEN** há um campo de ordenação ativo e o usuário toca no botão de direção
- **THEN** a ordem alterna entre ascendente e descendente
- **AND** o botão indica a direção atual (↑/↓)

#### Scenario: Direção desabilitada sem campo

- **WHEN** o campo de ordenação é "Padrão"
- **THEN** o botão de direção fica desabilitado (não há direção a alternar)

