## ADDED Requirements

### Requirement: Menu principal em uma linha no mobile

O menu principal (abas do app) SHALL caber em uma única linha no mobile, adaptando tamanho de padding/fonte/ícone à largura, sem quebrar em duas linhas.

#### Scenario: Uma linha no mobile
- **WHEN** o app é exibido em tela estreita
- **THEN** as abas do menu principal ficam em uma única linha (encolhendo ou rolando), sem quebrar em duas

### Requirement: Minhas Ações com 2 cards por linha no mobile

No mobile, o grid de cards de Minhas Ações SHALL exibir 2 cards por linha.

#### Scenario: Dois por linha
- **WHEN** Minhas Ações é exibida em tela estreita
- **THEN** os cards aparecem em 2 colunas por linha

### Requirement: Skeleton de carregamento em Lançamentos

A tela de Lançamentos SHALL exibir um efeito de skeleton nas 3 seções (Ações/FIIs/ETFs) enquanto a carteira está carregando.

#### Scenario: Skeleton durante o carregamento
- **WHEN** os lançamentos estão carregando
- **THEN** cada seção mostra placeholders de skeleton no lugar da tabela

### Requirement: Menus de Dividendos em uma linha no mobile

As sub-tabs de Dividendos SHALL caber em uma única linha no mobile (sem quebrar em duas).

#### Scenario: Sub-tabs em uma linha
- **WHEN** Dividendos é exibida em tela estreita
- **THEN** as sub-tabs ficam em uma linha (encolhendo ou rolando)

### Requirement: Anos do Histórico em uma linha no mobile

Os chips de anos do Histórico (5 anos + "Todos") SHALL caber em uma única linha no mobile.

#### Scenario: Chips de anos em uma linha
- **WHEN** o Histórico é exibido em tela estreita
- **THEN** os chips de anos ficam em uma linha (rolando horizontalmente se não couber)
