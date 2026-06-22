## MODIFIED Requirements

### Requirement: Resumo da carteira exibido em múltiplos cards

A aba "Meus Ativos" SHALL exibir o resumo da carteira como **cards de estatística separados**, em vez de um único bloco. Os cards MUST cobrir, no mínimo: Patrimônio Total, Investido, Ganho (R$), Variação (%) e Dividendos Recebidos. O Patrimônio Total MUST ter destaque visual (maior). Os cards MUST se organizar em um grid responsivo, exibindo **3 cards por linha no desktop e 2 cards por linha no mobile**, sem rolagem horizontal da página.

#### Scenario: Cards de resumo no desktop

- **WHEN** a aba "Meus Ativos" é exibida com ativos na carteira
- **THEN** o resumo aparece como cards separados (Patrimônio Total, Investido, Ganho, Variação, Dividendos Recebidos)
- **AND** o card de Patrimônio Total tem destaque visual em relação aos demais

#### Scenario: Ganho e Variação com cor por sinal

- **WHEN** o ganho/variação da carteira é positivo ou negativo
- **THEN** o valor do card correspondente é exibido com a cor de positivo (verde) ou negativo (vermelho)

#### Scenario: Três por linha no desktop

- **WHEN** a aba "Meus Ativos" é exibida no desktop (largura > 640px)
- **THEN** os cards de resumo são exibidos 3 por linha
- **AND** não há rolagem horizontal da página

#### Scenario: Dois por linha no mobile

- **WHEN** a aba "Meus Ativos" é exibida em largura ≤640px
- **THEN** os cards de resumo são exibidos 2 por linha
- **AND** não há rolagem horizontal da página
