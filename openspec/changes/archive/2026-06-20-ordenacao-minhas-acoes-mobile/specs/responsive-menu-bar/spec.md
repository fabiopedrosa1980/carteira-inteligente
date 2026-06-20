# responsive-menu-bar

## MODIFIED Requirements

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

## ADDED Requirements

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
