# responsive-menu-bar

## ADDED Requirements

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

As cinco tiras de menu — navegação principal, seletor de classe de ativo e abas internas de Dividendos, chips de ano do Histórico e controles de ordenação de Minhas Ações — SHALL usar `<app-scroll-bar>` para o comportamento de rolagem, mantendo cada uma seu visual atual (abas, pills, chips).

#### Scenario: Navegação principal rola no mobile

- **WHEN** a navegação principal por abas é exibida em largura ≤ 480px e os itens não cabem
- **THEN** as abas ficam em uma linha rolável com fade de borda, sem quebrar o layout da página

#### Scenario: Submenus de Dividendos rolam no mobile

- **WHEN** o seletor de classe de ativo e as abas internas de Dividendos são exibidos em largura estreita
- **THEN** cada submenu rola horizontalmente dentro de sua própria barra, preservando o visual (pill e abas)

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
