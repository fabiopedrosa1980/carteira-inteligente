## ADDED Requirements

### Requirement: Tooltip de oportunidade sem título próprio

O tooltip de oportunidade da tabela Meus Ativos NÃO SHALL exibir um título próprio no topo. O veredito da zona (ex.: "🟢 Zona de compra") SHALL ser o primeiro elemento do tooltip.

#### Scenario: Sem título

- **WHEN** o tooltip de oportunidade é aberto para um ativo com veredito numérico
- **THEN** não há texto de título antes do veredito, e o veredito da zona é o primeiro elemento exibido

#### Scenario: Estados sem veredito continuam claros

- **WHEN** o tooltip é aberto para um ativo "sem-dados" ou ETF
- **THEN** o veredito correspondente (⚪ Sem dados / n/a (ETF)) aparece no topo, sem um título separado acima dele
