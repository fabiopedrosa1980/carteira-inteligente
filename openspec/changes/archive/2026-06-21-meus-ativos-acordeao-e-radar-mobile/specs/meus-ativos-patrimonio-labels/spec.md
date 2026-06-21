## ADDED Requirements

### Requirement: Rótulos para Ganho e Variação no card de Patrimônio

No card de **Patrimônio** de "Meus Ativos", os valores de **Ganho** (lucro/prejuízo em R$) e **Variação** (percentual) SHALL ser exibidos com **rótulos próprios** que os identifiquem ("Ganho" e "Variação"), em vez de apenas os números justapostos. Os valores MUST manter a cor positiva/negativa conforme o sinal e exibir "—" quando não houver dado.

#### Scenario: Rótulos exibidos com valores positivos

- **WHEN** o card de Patrimônio é exibido com lucro positivo
- **THEN** o valor em R$ aparece sob/junto ao rótulo "Ganho"
- **AND** o percentual aparece sob/junto ao rótulo "Variação"
- **AND** ambos são exibidos com a cor positiva

#### Scenario: Rótulos com valores negativos

- **WHEN** o card de Patrimônio é exibido com prejuízo
- **THEN** os valores de Ganho e Variação aparecem com a cor negativa
- **AND** os rótulos "Ganho" e "Variação" continuam visíveis

#### Scenario: Sem dados de variação

- **WHEN** não há base de cálculo (valor investido igual a zero)
- **THEN** os valores exibem "—"
- **AND** os rótulos "Ganho" e "Variação" continuam visíveis
