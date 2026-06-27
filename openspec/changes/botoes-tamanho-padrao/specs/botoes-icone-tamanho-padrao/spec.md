## ADDED Requirements

### Requirement: Tamanho único dos botões de ícone

Todos os botões só de ícone do app (ações de cabeçalho, fechar modal e ações em linha como editar/excluir) SHALL usar o **mesmo tamanho**: **34×34px no desktop** e **32×32px no mobile (≤600px)**, com **raio 8px** e **ícone (SVG) de 18px**. O tamanho MUST ser idêntico entre os contextos; apenas o estilo de fundo/borda permanece contextual (botão com chip de borda no cabeçalho vs. botão sem fundo nas linhas).

#### Scenario: Mesmo tamanho no desktop

- **WHEN** qualquer botão de ícone é exibido no desktop
- **THEN** ele mede 34×34px, com raio 8px e ícone de 18px

#### Scenario: Mesmo tamanho no mobile

- **WHEN** qualquer botão de ícone é exibido em mobile (≤600px)
- **THEN** ele mede 32×32px, mantendo raio 8px e ícone de 18px

#### Scenario: Consistência entre telas

- **WHEN** o usuário compara o botão de cabeçalho, o de fechar modal e os de editar/excluir em linha
- **THEN** todos têm o mesmo tamanho, raio e tamanho de ícone

### Requirement: Tamanho dos botões de ícone centralizado em tokens

O tamanho, o raio e o tamanho do ícone SHALL ser definidos como **tokens CSS globais** (em `styles.scss`), e a redução para o mobile MUST ocorrer em um único ponto (uma media query sobre os tokens). Os botões de ícone MUST referenciar os tokens, em vez de repetir valores fixos por componente.

#### Scenario: Redução mobile em um único ponto

- **WHEN** o token de tamanho é reduzido no breakpoint mobile
- **THEN** todos os botões de ícone que usam o token são reduzidos juntos, sem overrides por componente

#### Scenario: Novo botão de ícone herda o padrão

- **WHEN** um novo botão de ícone usa os tokens
- **THEN** ele já nasce com o tamanho padrão em web e mobile
