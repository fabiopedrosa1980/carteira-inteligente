# responsive-mobile-layout

## ADDED Requirements

### Requirement: Cabeçalho empilha logo e ações no mobile

O cabeçalho do dashboard SHALL, em telas estreitas (largura ≤ 600px), exibir o logo com o título "Carteira Inteligente" na primeira linha e mover os ícones de ação (chip do usuário, alternar tema e sair) para a linha imediatamente abaixo, alinhados à direita. Em telas largas, logo e ações MUST permanecer na mesma linha como hoje.

#### Scenario: Ações descem para a linha abaixo no mobile

- **WHEN** o cabeçalho é renderizado com largura de viewport ≤ 600px
- **THEN** o logo e o título ocupam a primeira linha em largura total
- **AND** o grupo de ações (chip do usuário, alternar tema, sair) aparece na linha de baixo alinhado à direita
- **AND** nenhum elemento do cabeçalho transborda horizontalmente

#### Scenario: Layout em linha única no desktop

- **WHEN** o cabeçalho é renderizado com largura de viewport > 600px
- **THEN** o logo e o grupo de ações permanecem na mesma linha, com as ações alinhadas à direita

### Requirement: Cards de Minhas Ações não estouram o grid mobile

O grid de "Minhas Ações" SHALL exibir 2 cards por linha em telas estreitas (largura ≤ 640px) sem que o conteúdo interno de qualquer card cause transbordo horizontal do layout. Cada card MUST conter seu conteúdo dentro da largura da coluna.

#### Scenario: Dois cards por linha sem overflow

- **WHEN** a aba de Minhas Ações é exibida com largura de viewport ≤ 640px e existem ações na carteira
- **THEN** os cards são dispostos em 2 colunas de largura igual
- **AND** preço, ticker, nome e estatísticas de cada card permanecem contidos na coluna, sem empurrar a largura nem gerar rolagem horizontal da página

### Requirement: Menus e submenus se ajustam ao mobile

A navegação principal por abas e os submenus da área de Dividendos (seletor de classe de ativo e abas internas) SHALL permanecer utilizáveis em telas estreitas, cabendo na largura disponível ou rolando horizontalmente sem quebrar o layout da página.

#### Scenario: Abas principais cabem ou rolam no mobile

- **WHEN** a navegação principal por abas é exibida com largura de viewport ≤ 480px
- **THEN** as abas se ajustam para caber na largura disponível ou rolam horizontalmente
- **AND** nenhuma aba transborda o container nem gera rolagem horizontal da página

#### Scenario: Submenus de Dividendos cabem ou rolam no mobile

- **WHEN** a área de Dividendos é exibida com largura de viewport ≤ 480px
- **THEN** o seletor de classe de ativo e as abas internas se ajustam para caber ou rolam horizontalmente dentro de seus containers
- **AND** nenhum submenu gera rolagem horizontal da página

### Requirement: Filtro de anos como combo ao lado de Ativo no mobile

Na tela de Histórico de dividendos, em telas estreitas (largura ≤ 480px), o filtro de anos SHALL ser apresentado como um combo (`<select>`) posicionado na mesma linha que o seletor de "Ativo". Em telas largas, o filtro de anos MUST continuar sendo exibido como chips de ano.

#### Scenario: Anos viram combo ao lado de Ativo no mobile

- **WHEN** o Histórico de dividendos é exibido com largura de viewport ≤ 480px e há posições visíveis
- **THEN** os anos disponíveis (incluindo a opção "Todos") aparecem em um combo `<select>`
- **AND** esse combo é exibido na mesma linha que o seletor de "Ativo"
- **AND** selecionar um ano no combo filtra a tabela do mesmo modo que os chips de ano

#### Scenario: Chips de ano mantidos no desktop

- **WHEN** o Histórico de dividendos é exibido com largura de viewport > 480px
- **THEN** o filtro de anos é exibido como chips de ano, como hoje
- **AND** o combo de anos não é exibido
