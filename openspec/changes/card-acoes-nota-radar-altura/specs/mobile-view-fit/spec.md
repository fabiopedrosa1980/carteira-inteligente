# mobile-view-fit

## ADDED Requirements

### Requirement: Cards do Radar com altura uniforme no mobile

Na aba Radar no mobile, a grade de cards de mês SHALL exibir todos os cards com a **mesma altura**, dimensionada pelo card com mais tickers (o mais alto). Cards com menos conteúdo MUST ocupar a mesma altura, mantendo a grade regular.

#### Scenario: Todos os cards com a mesma altura

- **WHEN** a aba Radar é exibida no mobile com a visão em cards e os meses têm quantidades diferentes de tickers
- **THEN** todos os cards têm a mesma altura
- **AND** essa altura corresponde à do card com mais tickers

#### Scenario: Grade regular

- **WHEN** há cards com poucos ou nenhum ticker ao lado de cards cheios
- **THEN** os cards menores se esticam para a mesma altura, sem deixar a grade desalinhada
