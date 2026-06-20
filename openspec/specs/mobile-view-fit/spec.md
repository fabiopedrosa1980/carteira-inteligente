# mobile-view-fit Specification

## Purpose
TBD - created by archiving change cards-radar-menu-mobile. Update Purpose after archive.
## Requirements
### Requirement: Cards de Minhas Ações cabem 2 por linha sem rolagem

No mobile (largura ≤ 640px), o grid de "Minhas Ações" SHALL exibir 2 cards por linha em colunas que encolhem (`minmax(0, 1fr)`), e o conteúdo de cada card MUST permanecer contido na coluna, sem gerar rolagem horizontal da página nem rolagem interna do card.

#### Scenario: Dois cards por linha sem overflow

- **WHEN** a aba Minhas Ações é exibida em largura ≤ 640px com ações na carteira
- **THEN** os cards são dispostos em 2 colunas de largura igual que encolhem conforme a viewport
- **AND** preço, ticker, nome e estatísticas permanecem contidos na coluna
- **AND** não há rolagem horizontal da página nem barra de rolagem dentro do card

### Requirement: Radar sem rolagem horizontal no mobile

Na aba Radar, em mobile (`ResponsiveService.isMobile()` verdadeiro), a visão em **cards** (Jan→Dez) SHALL ser a visualização apresentada, exibida em 2 colunas, e a visão em **matriz** (heatmap largo) MUST NOT ser exibida, eliminando o container com rolagem horizontal. No desktop, ambas as visões e o alternador permanecem disponíveis.

#### Scenario: Cards em 2 colunas no mobile, sem scroll

- **WHEN** a aba Radar é exibida com `isMobile()` verdadeiro e há ativos no período
- **THEN** a visão em cards é exibida em 2 colunas
- **AND** não há container com rolagem horizontal visível na tela

#### Scenario: Matriz indisponível no mobile

- **WHEN** a aba Radar é exibida com `isMobile()` verdadeiro
- **THEN** o alternador de visão de matriz não é exibido (ou está desabilitado)
- **AND** a visão de matriz (heatmap de 13 colunas) não é renderizada

#### Scenario: Desktop mantém matriz e alternador

- **WHEN** a aba Radar é exibida com `isMobile()` falso
- **THEN** o alternador entre cards e matriz é exibido
- **AND** a visão de matriz continua disponível, com rolagem horizontal própria quando necessário

### Requirement: Menu principal em uma linha rolável no mobile

A navegação principal por abas SHALL permanecer em uma única linha no mobile, rolando horizontalmente quando os itens não couberem (padrão `<app-scroll-bar>`), sem quebrar para uma segunda linha.

#### Scenario: Abas em uma linha que rola

- **WHEN** o menu principal é exibido em largura ≤ 480px e os itens não cabem
- **THEN** as abas permanecem em uma única linha
- **AND** a barra rola horizontalmente para revelar as abas ocultas
- **AND** nenhuma aba quebra para uma segunda linha nem gera rolagem horizontal da página

