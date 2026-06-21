## MODIFIED Requirements

### Requirement: Cabeçalho da seção exibe nome do tipo e contagem

O cabeçalho de cada seção SHALL exibir o **nome do tipo** (Ações, FIIs, ETFs) e a **contagem total** de ativos naquele tipo como um **badge** com cor accent. Um indicador visual (chevron) MUST animar suavemente ao expandir/colapsar (rotação CSS).

#### Scenario: Cabeçalho com contagem em badge

- **WHEN** a seção de Ações está expandida e contém 5 ativos
- **THEN** o cabeçalho mostra o label "Ações" à esquerda e um badge "5" com fundo accent ao lado
- **AND** o chevron à direita está rotacionado indicando estado aberto (seta para baixo)

#### Scenario: Indicador de estado com animação

- **WHEN** o usuário clica no cabeçalho de uma seção expandida
- **THEN** o corpo da seção colapsa com transição suave (max-height)
- **AND** o chevron roda para a posição colapsada

### Requirement: Acordeão unificado com card único por seção

Cada seção SHALL ser renderizada como um **card único** (border-radius, border) que engloba cabeçalho e corpo. Ao colapsar, o corpo desaparece com animação `max-height`; o card continua visível mostrando apenas o cabeçalho.

#### Scenario: Card único expandido

- **WHEN** a seção está expandida
- **THEN** cabeçalho e corpo formam um único card com `border-top` separando-os

#### Scenario: Card único colapsado

- **WHEN** a seção está colapsada
- **THEN** apenas o cabeçalho é visível como card; o corpo está oculto com animação de colapso

### Requirement: ETFs carregados como posições de carteira

A tela "Meus Ativos" SHALL carregar posições ETF do backend (`/transactions/etfs`) em paralelo com Ações e FIIs. Se o endpoint não existir, a seção ETFs MUST ficar vazia e oculta sem erro.

#### Scenario: ETFs exibidos quando há posições

- **WHEN** o usuário tem lançamentos de ETFs e o backend retorna posições ETF
- **THEN** a seção "ETFs" aparece em "Meus Ativos" com as posições agregadas

#### Scenario: ETFs ausentes quando endpoint não retorna dados

- **WHEN** o backend retorna lista vazia para ETFs
- **THEN** a seção "ETFs" não é renderizada em "Meus Ativos"
