## ADDED Requirements

### Requirement: Fonte reduzida no valor dos cards de resumo

Na aba "Meus Ativos", o **valor** exibido em cada card de resumo (`.ps-card-value`) SHALL usar uma **fonte reduzida** em relação ao tamanho atual, para um equilíbrio visual melhor entre rótulo e valor, mantendo o destaque relativo do card de Patrimônio Total (que continua maior que os demais). A redução MUST preservar a legibilidade e o layout (sem quebra de linha indevida nem rolagem horizontal), no desktop e no mobile.

#### Scenario: Valor com fonte reduzida

- **WHEN** a aba "Meus Ativos" é exibida com ativos na carteira
- **THEN** o valor de cada card de resumo é exibido com fonte menor que a anterior
- **AND** o card de Patrimônio Total continua com valor visualmente maior que os demais

#### Scenario: Legibilidade e layout preservados

- **WHEN** os cards de resumo são exibidos no desktop e no mobile
- **THEN** os valores permanecem legíveis
- **AND** não há quebra de linha indevida nem rolagem horizontal
