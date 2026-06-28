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

### Requirement: Cores neutras na tabela (sem verde de destaque)

Na tabela de lançamentos (desktop), **todos os valores das colunas** (Ativo, Data, Qtd., Preço Unit., Total) SHALL usar **a mesma cor (primária) e o mesmo peso de fonte**, **sem destaque** em nenhuma coluna (sem verde `--accent` e sem negrito/semibold diferenciando colunas). O ticker SHALL ser exibido como texto simples, **sem badge/pílula** colorida. O cabeçalho de coluna **ativo na ordenação** SHALL usar destaque **neutro** (cor primária), **sem verde** — a direção da ordenação é indicada pela seta (↑/↓).

#### Scenario: Valores uniformes sem destaque

- **WHEN** uma linha de lançamento é exibida no desktop
- **THEN** Ativo, Data, Qtd., Preço Unit. e Total aparecem com a mesma cor primária e o mesmo peso de fonte, sem nenhuma coluna destacada (sem verde, sem negrito diferenciado)

#### Scenario: Ticker neutro sem badge

- **WHEN** uma linha de lançamento é exibida no desktop
- **THEN** o ticker aparece como texto simples em cor primária, sem fundo/pílula verde

#### Scenario: Coluna ordenada sem verde

- **WHEN** o investidor clica num cabeçalho de coluna para ordenar
- **THEN** o cabeçalho ativo fica em cor primária (neutra), sem verde, e a seta indica a direção
