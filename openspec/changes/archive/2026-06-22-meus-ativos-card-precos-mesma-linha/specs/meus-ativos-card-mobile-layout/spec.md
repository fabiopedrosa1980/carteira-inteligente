## MODIFIED Requirements

### Requirement: Quantidade posicionada acima da variação sem espaço em branco

No card de ativo da aba "Meus Ativos" em mobile (largura ≤640px), o **Preço médio** e o **Preço atual** SHALL ser exibidos **na mesma linha** do card. A **quantidade** MUST ocupar a posição ao lado do Saldo (onde antes ficava o Preço atual), de forma que a quantidade troque de lugar com o Preço atual. O card MUST permanecer contido, sem rolagem horizontal, sem linha isolada de largura inteira e sem espaço em branco ocioso, com os campos alinhados de forma equilibrada.

#### Scenario: Preços na mesma linha

- **WHEN** um card de ativo é exibido em largura ≤640px
- **THEN** o Preço médio e o Preço atual aparecem na mesma linha
- **AND** a quantidade aparece ao lado do Saldo (posição antes ocupada pelo Preço atual)
- **AND** não há linha isolada ocupando a largura inteira nem espaço em branco ocioso

#### Scenario: Card contido

- **WHEN** um card de ativo é exibido em largura ≤640px
- **THEN** o card permanece contido, sem rolagem horizontal
