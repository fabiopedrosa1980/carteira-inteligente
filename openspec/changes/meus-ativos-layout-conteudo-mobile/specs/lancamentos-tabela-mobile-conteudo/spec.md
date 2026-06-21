## ADDED Requirements

### Requirement: Colunas da tabela dimensionadas pelo conteúdo

A tabela de Lançamentos (header e linhas) SHALL dimensionar suas colunas de acordo com o conteúdo de cada campo, em vez de usar frações iguais (`1fr`). Colunas de conteúdo curto e previsível (Ativo, Data, Qtd., Preço Unit., Operação) MUST receber largura ajustada ao seu conteúdo, e a coluna de maior variação (Total) MUST receber o espaço flexível restante. O header e as linhas MUST compartilhar exatamente o mesmo template de colunas, mantendo o alinhamento.

#### Scenario: Largura por conteúdo no desktop

- **WHEN** a tabela de Lançamentos é exibida no desktop com ativos
- **THEN** cada coluna ocupa a largura adequada ao seu conteúdo
- **AND** header e linhas permanecem alinhados na mesma grade

#### Scenario: Total recebe o espaço flexível

- **WHEN** há valores de Total longos em BRL
- **THEN** a coluna Total acomoda o valor sem cortá-lo
- **AND** as colunas de conteúdo curto não são esticadas desnecessariamente

### Requirement: Ações e valores cabem no mobile sem corte

No mobile (largura ≤600px), a tabela de Lançamentos SHALL exibir Ativo, Qtd. e Total e a coluna de Operação com largura suficiente para os dois botões (editar e remover) sem cortá-los. O badge do ticker e o valor do Total em BRL MUST permanecer legíveis e contidos, sem gerar rolagem horizontal da página nem estouro da linha. As colunas Data e Preço Unit. MUST permanecer ocultas no mobile, como já ocorre.

#### Scenario: Dois botões de ação visíveis no mobile

- **WHEN** a tabela é exibida em largura ≤600px com lançamentos
- **THEN** os botões editar e remover aparecem completos na coluna de Operação
- **AND** nenhum dos botões é cortado pela borda da coluna

#### Scenario: Total e ticker legíveis no mobile

- **WHEN** uma linha com Total longo em BRL é exibida em largura ≤600px
- **THEN** o valor do Total e o badge do ticker permanecem legíveis e contidos
- **AND** não há rolagem horizontal da página nem estouro da linha

#### Scenario: Data e Preço ocultos no mobile

- **WHEN** a tabela é exibida em largura ≤600px
- **THEN** as colunas Data e Preço Unit. não são renderizadas
- **AND** o template de colunas do header coincide com o das linhas
