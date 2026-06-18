## ADDED Requirements

### Requirement: Barra superior profissional

A barra superior da app (header com marca + controles, e a navegação por abas) SHALL usar ícones vetoriais (SVG), sem emojis, com controles visualmente consistentes, estados de hover e foco visíveis, e comportamento responsivo. O header SHALL permanecer fixo no topo ao rolar (sticky).

#### Scenario: Sem emojis no topo
- **WHEN** a app é exibida
- **THEN** logo, toggle de tema e ícones das abas usam SVG (nenhum emoji na barra superior)

#### Scenario: Controles consistentes
- **WHEN** o usuário vê os botões de tema e sair
- **THEN** eles têm o mesmo tamanho/estilo de botão-ícone, com hover e foco visíveis

#### Scenario: Header fixo
- **WHEN** o usuário rola o conteúdo
- **THEN** a barra superior permanece visível no topo

#### Scenario: Responsivo
- **WHEN** a largura é de mobile
- **THEN** a barra e as abas se ajustam sem overflow, preservando a legibilidade
