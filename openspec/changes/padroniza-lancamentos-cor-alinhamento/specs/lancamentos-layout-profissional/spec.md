## MODIFIED Requirements

### Requirement: Alinhamento numérico das colunas da tabela

Na tabela de lançamentos (desktop), **todas** as colunas SHALL ser alinhadas **à esquerda**, padronizando com a lista de Meus Ativos: as colunas numéricas (Qtd., Preço Unit., Total) e a coluna Operação deixam de ser alinhadas à direita e passam a alinhar à esquerda, mantendo `font-variant-numeric: tabular-nums` nos números para preservar a leitura das casas. As colunas de texto (Ativo, Data) permanecem à esquerda.

#### Scenario: Colunas alinhadas à esquerda

- **WHEN** a tabela de uma seção é exibida no desktop
- **THEN** os cabeçalhos e os valores de Ativo, Data, Qtd., Preço Unit., Total e Operação ficam alinhados à esquerda
- **AND** os números mantêm `font-variant-numeric: tabular-nums`

#### Scenario: Consistência com Meus Ativos

- **WHEN** o usuário compara a tabela de Lançamentos com a lista de Meus Ativos no desktop
- **THEN** ambas usam o mesmo alinhamento à esquerda das colunas

## ADDED Requirements

### Requirement: Cor neutra do Total e do ticker na tabela

Na tabela de lançamentos, o **valor da coluna Total** e o **ticker** (coluna Ativo) SHALL usar cor neutra (cor primária do texto), **sem destaque verde** (`--accent`), padronizando com a lista de Meus Ativos. O ticker SHALL ser exibido como texto simples, **sem badge/pílula** colorida.

#### Scenario: Total sem verde

- **WHEN** uma linha de lançamento é exibida
- **THEN** o valor da coluna Total aparece em cor primária (neutra), sem o verde de destaque

#### Scenario: Ticker neutro sem badge

- **WHEN** uma linha de lançamento é exibida no desktop
- **THEN** o ticker aparece como texto simples em cor primária, sem fundo/pílula verde
