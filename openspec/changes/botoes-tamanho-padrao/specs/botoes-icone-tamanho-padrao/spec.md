## ADDED Requirements

### Requirement: Altura única de todos os botões (ícone e texto)

Todos os botões do app — só de ícone (cabeçalho, fechar modal, editar/excluir em linha) **e** de texto (Adicionar, Salvar, Cancelar, Editar, Limpar tudo, Importar, Nova meta, etc.) — SHALL ter a **mesma altura**: **36px no desktop** e **34px no mobile (≤600px)**, com **raio 8px** e **fonte 13px/700**. Botões de ícone são quadrados (36×36 / 34×34) com ícone de 18px; botões de texto usam a mesma altura com padding horizontal de 16px. Apenas o estilo de cor/fundo/borda permanece contextual (primário verde, secundário contorno, destrutivo vermelho).

#### Scenario: Mesma altura no desktop

- **WHEN** qualquer botão (ícone ou texto) é exibido no desktop
- **THEN** ele tem 36px de altura, raio 8px e fonte 13px/700; ícones medem 18px

#### Scenario: Mesmo tamanho no mobile

- **WHEN** qualquer botão é exibido em mobile (≤600px)
- **THEN** ele tem 34px de altura, mantendo raio 8px (ícones 34×34, 18px)

#### Scenario: Consistência entre telas

- **WHEN** o usuário compara botões de ícone (cabeçalho, fechar modal, editar/excluir) e de texto (Adicionar, Salvar, Cancelar, Importar)
- **THEN** todos têm a mesma altura e raio

### Requirement: Estilo contextual por tipo de ação

A altura/raio/tipografia SHALL ser uniformes, mas a cor MUST refletir o tipo de ação: **primário** verde (`--accent`), **secundário** contorno, **destrutivo** vermelho. O botão **Limpar tudo** MUST ser destrutivo (vermelho). O botão **Importar** MUST exibir um ícone (o mesmo do menu Importar) à esquerda do texto.

#### Scenario: Limpar tudo vermelho

- **WHEN** o botão "Limpar tudo" é exibido em Meus Ativos
- **THEN** ele aparece em vermelho (estilo destrutivo), com a altura/raio padrão

#### Scenario: Importar com ícone

- **WHEN** o botão "Importar e sobrepor" é exibido
- **THEN** ele mostra um ícone (igual ao do menu Importar) seguido do texto

### Requirement: Tamanho dos botões de ícone centralizado em tokens

O tamanho, o raio e o tamanho do ícone SHALL ser definidos como **tokens CSS globais** (em `styles.scss`), e a redução para o mobile MUST ocorrer em um único ponto (uma media query sobre os tokens). Os botões de ícone MUST referenciar os tokens, em vez de repetir valores fixos por componente.

#### Scenario: Redução mobile em um único ponto

- **WHEN** o token de tamanho é reduzido no breakpoint mobile
- **THEN** todos os botões de ícone que usam o token são reduzidos juntos, sem overrides por componente

#### Scenario: Novo botão de ícone herda o padrão

- **WHEN** um novo botão de ícone usa os tokens
- **THEN** ele já nasce com o tamanho padrão em web e mobile
