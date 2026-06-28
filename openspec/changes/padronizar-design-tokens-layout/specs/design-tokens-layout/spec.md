## ADDED Requirements

### Requirement: Tokens compartilhados de raio de card (3 tiers)

A aplicação SHALL definir, em `styles.scss`, tokens de raio de canto em três tiers que refletem o uso de fato: `--radius-card` (contêiner de seção/tela), `--radius-item` (card de item de lista/grid) e `--radius-chip` (card interno de stat/resumo/chip). Cada card MUST usar o token do seu tier, em vez de um valor literal. Elementos que não são card (pílulas/tags `999px`/`20px`, botões com `--icon-btn-radius`, tooltips/popovers flutuantes, raios de ícone) MAY manter seus valores próprios.

#### Scenario: Contêiner de seção usa o token

- **WHEN** um contêiner de seção/tela (ex.: card de alocação, acordeão, seções de Dividendos, painel do detalhe) é estilizado
- **THEN** seu `border-radius` referencia `var(--radius-card)`

#### Scenario: Card de item usa o token

- **WHEN** um card de item de lista/grid (ex.: stock-card, linha-card de lançamento/ativo) é estilizado
- **THEN** seu `border-radius` referencia `var(--radius-item)`

#### Scenario: Card interno/chip usa o token

- **WHEN** um card interno de stat/resumo/chip (ex.: ps-card, card de total, indicador, month-card) é estilizado
- **THEN** seu `border-radius` referencia `var(--radius-chip)`

#### Scenario: Sem raios de card literais divergentes

- **WHEN** as telas são revisadas
- **THEN** nenhum contêiner de card usa um valor literal de raio fora dos tokens (ex.: o `16px` avulso do painel de detalhe é eliminado)

### Requirement: Breakpoint mobile canônico

A aplicação SHALL adotar um único breakpoint "vira card" canônico de **600px**. Todas as telas que alternam para o layout mobile MUST usar `max-width: 600px`, incluindo os grids de Minhas Ações e Radar (que antes usavam 640px), de modo que a transição mobile ocorra na mesma largura em todo o app.

#### Scenario: Telas usam o breakpoint canônico

- **WHEN** uma tela define o ponto em que o layout vira mobile
- **THEN** ela usa `max-width: 600px` (não um valor literal divergente como 640px)

#### Scenario: Transição mobile consistente

- **WHEN** a viewport cruza 600px
- **THEN** todas as telas que mudam para o layout mobile o fazem na mesma largura

### Requirement: Escala de espaçamento

A aplicação SHALL definir uma escala de espaçamento como custom properties (`--space-1: 4px` … `--space-6: 24px`), e os paddings/margens de card SHOULD referenciar a escala em vez de valores arbitrários ou unidades misturadas.

#### Scenario: Padding de card na escala

- **WHEN** um card define padding interno (ex.: contêineres de Dividendos)
- **THEN** o valor referencia um token da escala (ex.: `var(--space-6)`)
