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

### Requirement: Nota do ativo no topo do card alinhada ao ticker sem rótulo

No card de ação, a Nota do ativo SHALL ser exibida na mesma linha do ticker, alinhada à direita do card, **sem o rótulo "Nota"**. A Nota MUST deixar de aparecer no `stat-strip` do rodapé. O valor da Nota MUST manter sua cor por faixa (alta/média/baixa) e só aparece quando `nota > 0`.

#### Scenario: Nota ao lado do ticker

- **WHEN** um card de ação com `nota > 0` é exibido em qualquer largura de tela
- **THEN** a Nota aparece no topo do card, na mesma linha do ticker, alinhada à direita
- **AND** nenhum rótulo "Nota" é exibido junto ao valor
- **AND** a Nota não aparece mais no rodapé (`stat-strip`)
- **AND** a cor do valor reflete a faixa da nota (alta/média/baixa)

#### Scenario: Sem nota cadastrada

- **WHEN** um card de ação com `nota = 0` é exibido
- **THEN** nenhum valor de Nota é renderizado no topo nem no rodapé do card

### Requirement: Tela de Metas não corta texto no mobile

Na aba "Minhas Metas" em mobile (largura ≤ 480px), todas as células da tabela (nome da meta, valor atual, progresso e operação) SHALL permanecer legíveis sem que o texto seja cortado de forma a impedir a leitura, e sem gerar rolagem horizontal da página.

#### Scenario: Células legíveis em tela estreita

- **WHEN** a aba Minhas Metas é exibida em largura ≤ 480px com metas cadastradas
- **THEN** os textos das células visíveis não são cortados a ponto de ficarem ilegíveis
- **AND** não há rolagem horizontal da página

### Requirement: Filtro de anos do Histórico vira combo com rótulo "Ano" no mobile

No Histórico, em mobile (largura ≤ 480px), o filtro de anos SHALL ser exibido como um combo (`select`) precedido do rótulo "Ano", em vez de chips. No desktop o filtro pode permanecer em chips. A opção "Todos" MUST continuar disponível no combo, e selecionar um ano MUST aplicar o mesmo filtro que os chips aplicavam.

#### Scenario: Combo de ano no mobile

- **WHEN** o Histórico é exibido em largura ≤ 480px com posições disponíveis
- **THEN** o filtro de anos aparece como um combo com o rótulo "Ano"
- **AND** o combo inclui a opção "Todos" e cada ano disponível
- **AND** selecionar um ano filtra os dividendos exibidos por aquele ano

#### Scenario: Chips no desktop

- **WHEN** o Histórico é exibido em largura > 480px
- **THEN** o filtro de anos é exibido em chips

### Requirement: Nota permanece na mesma linha do ticker sem quebrar

No card de ação, a Nota SHALL permanecer na mesma linha do ticker em qualquer largura de tela, alinhada à direita, **sem quebrar para uma segunda linha** mesmo em cards estreitos no mobile. O nome da empresa MUST truncar com reticências para ceder espaço, em vez de empurrar a Nota para baixo.

#### Scenario: Nota não quebra em card estreito

- **WHEN** um card de ação com `nota > 0` é exibido em mobile com largura estreita (2 cards por linha)
- **THEN** a Nota fica na mesma linha do ticker, alinhada à direita
- **AND** a Nota não quebra para uma linha abaixo do ticker
- **AND** o nome da empresa trunca com reticências quando não há espaço

### Requirement: Coluna "Tipo" do Histórico exibida como texto normal

Na tabela do Histórico, a coluna "Tipo" SHALL exibir o valor (Dividendo/JCP) como **texto normal**, no mesmo estilo visual das demais colunas da listagem, sem badge/pílula colorida. O ajuste MUST manter a tabela legível e contida no mobile (≤480px), sem rolagem horizontal.

#### Scenario: Tipo como texto simples

- **WHEN** a tabela do Histórico é exibida com dividendos
- **THEN** o tipo aparece como texto normal (ex: "Dividendo" ou "JCP"), igual aos demais campos
- **AND** não há badge/pílula colorida ao redor do valor

#### Scenario: Tipo legível no mobile

- **WHEN** a tabela do Histórico é exibida em largura ≤480px
- **THEN** a coluna Tipo permanece legível e contida, sem rolagem horizontal da página

### Requirement: Tabela de Metas oculta coluna adicional no mobile

Na aba "Minhas Metas" em mobile (largura ≤480px), a tabela SHALL ocultar coluna(s) suficientes para que o conteúdo restante caiba sem estourar o layout nem gerar rolagem horizontal, mantendo visíveis ao menos o nome da meta, o progresso e a operação (editar/excluir).

#### Scenario: Metas cabe no mobile após ocultar coluna

- **WHEN** a aba Minhas Metas é exibida em largura ≤480px com metas cadastradas
- **THEN** colunas de valor são ocultadas o quanto necessário para caber
- **AND** nome da meta, progresso e operação permanecem visíveis e legíveis
- **AND** não há rolagem horizontal da página nem estouro do layout

