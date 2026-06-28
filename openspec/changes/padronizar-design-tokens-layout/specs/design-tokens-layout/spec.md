## ADDED Requirements

### Requirement: Tokens compartilhados de raio de card

A aplicação SHALL definir, em `styles.scss`, tokens de raio de canto para cards: `--radius-card` para o contêiner de tela (card externo) e `--radius-chip` para cards internos (stat/chip). Todos os cards de tela MUST usar `--radius-card` e todos os cards internos MUST usar `--radius-chip`, em vez de valores literais. Tokens não relacionados a card (ex.: `--icon-btn-radius`, pílulas `999px`, raios de ícone) MAY permanecer com seus valores próprios.

#### Scenario: Card de tela usa o token

- **WHEN** um contêiner de card de tela é estilizado
- **THEN** seu `border-radius` referencia `var(--radius-card)`

#### Scenario: Card interno usa o token

- **WHEN** um card interno/stat/chip é estilizado
- **THEN** seu `border-radius` referencia `var(--radius-chip)`

#### Scenario: Sem raios de card divergentes

- **WHEN** as telas são revisadas
- **THEN** nenhum contêiner de card usa um valor literal de raio diferente dos tokens (ex.: 14px/16px/20px avulsos para cards)

### Requirement: Breakpoint mobile canônico

A aplicação SHALL definir uma variável SCSS de breakpoint mobile canônica (`$bp-mobile`) e variáveis nomeadas para os cortes secundários (`$bp-sm`, `$bp-lg`). As telas que alternam para layout mobile ("vira card") MUST usar `$bp-mobile`, garantindo que a transição mobile ocorra na mesma largura entre telas.

#### Scenario: Telas usam o breakpoint canônico

- **WHEN** uma tela define o ponto em que o layout vira mobile
- **THEN** ela usa `$bp-mobile` (não um valor literal divergente)

#### Scenario: Transição mobile consistente

- **WHEN** a viewport cruza `$bp-mobile`
- **THEN** todas as telas que mudam para o layout mobile o fazem na mesma largura

### Requirement: Escala de espaçamento

A aplicação SHALL definir uma escala de espaçamento (ex.: 4/8/12/16/20/24) disponível como tokens/variáveis, e os paddings/margens de card SHOULD referenciar a escala em vez de valores arbitrários e unidades misturadas.

#### Scenario: Padding de card na escala

- **WHEN** um card define padding interno
- **THEN** o valor pertence à escala de espaçamento definida
