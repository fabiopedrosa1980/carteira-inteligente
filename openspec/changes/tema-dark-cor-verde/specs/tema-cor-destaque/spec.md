## ADDED Requirements

### Requirement: Cor de destaque verde no tema escuro
O tema escuro SHALL usar a mesma cor de destaque verde do tema claro como cor de destaque principal (`--accent`), em vez de azul.

#### Scenario: Tema escuro ativo
- **WHEN** o aplicativo é exibido no tema escuro
- **THEN** os elementos de destaque (botões de ação, links, bordas em foco, realces) SHALL usar o verde do tema claro, sem azul residual

#### Scenario: Tema claro permanece inalterado
- **WHEN** o aplicativo é exibido no tema claro
- **THEN** a cor de destaque SHALL permanecer o verde já existente, sem alteração

### Requirement: Destaque baseado em variáveis de tema
Os componentes SHALL referenciar a cor de destaque por meio de variáveis de tema (ex.: `var(--accent)`, `var(--shadow-hover)`), em vez de valores de cor fixos, de modo que o destaque acompanhe o tema ativo.

#### Scenario: Sem azul fixo nos componentes
- **WHEN** os estilos dos componentes são aplicados em qualquer tema
- **THEN** nenhum componente SHALL exibir o azul fixo `#63b3ed`/`rgba(99,179,237,…)`; todos os realces de destaque derivam das variáveis de tema

### Requirement: Legibilidade dos botões de destaque no tema escuro
Os botões com fundo de destaque no tema escuro SHALL manter contraste legível entre o texto e o fundo verde.

#### Scenario: Botão de ação no tema escuro
- **WHEN** um botão com fundo de destaque é exibido no tema escuro
- **THEN** a cor do texto do botão SHALL ter contraste suficiente para leitura sobre o verde
