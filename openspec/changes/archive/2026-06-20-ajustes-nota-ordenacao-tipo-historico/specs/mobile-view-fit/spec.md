## ADDED Requirements

### Requirement: Nota permanece na mesma linha do ticker sem quebrar

No card de ação, a Nota SHALL permanecer na mesma linha do ticker em qualquer largura de tela, alinhada à direita, **sem quebrar para uma segunda linha** mesmo em cards estreitos no mobile. O nome da empresa MUST truncar com reticências para ceder espaço, em vez de empurrar a Nota para baixo.

#### Scenario: Nota não quebra em card estreito

- **WHEN** um card de ação com `nota > 0` é exibido em mobile com largura estreita (2 cards por linha)
- **THEN** a Nota fica na mesma linha do ticker, alinhada à direita
- **AND** a Nota não quebra para uma linha abaixo do ticker
- **AND** o nome da empresa trunca com reticências quando não há espaço

### Requirement: Coluna "Tipo" do Histórico exibida como texto normal

Na tabela do Histórico, a coluna "Tipo" SHALL exibir o valor (Dividendo/JCP) como **texto normal**, no mesmo estilo visual das demais colunas da listagem, sem badge/pílula colorida. O ajuste MUST manter a tabela legível e contida no mobile (≤480px), sem rolagem horizontal.

#### Scenario: Tipo como texto simples

- **WHEN** a tabela do Histórico é exibida com dividendos
- **THEN** o tipo aparece como texto normal (ex: "Dividendo" ou "JCP"), igual aos demais campos
- **AND** não há badge/pílula colorida ao redor do valor

#### Scenario: Tipo legível no mobile

- **WHEN** a tabela do Histórico é exibida em largura ≤480px
- **THEN** a coluna Tipo permanece legível e contida, sem rolagem horizontal da página

### Requirement: Tabela de Metas oculta coluna adicional no mobile

Na aba "Minhas Metas" em mobile (largura ≤480px), a tabela SHALL ocultar coluna(s) suficientes para que o conteúdo restante caiba sem estourar o layout nem gerar rolagem horizontal, mantendo visíveis ao menos o nome da meta, o progresso e a operação (editar/excluir).

#### Scenario: Metas cabe no mobile após ocultar coluna

- **WHEN** a aba Minhas Metas é exibida em largura ≤480px com metas cadastradas
- **THEN** colunas de valor são ocultadas o quanto necessário para caber
- **AND** nome da meta, progresso e operação permanecem visíveis e legíveis
- **AND** não há rolagem horizontal da página nem estouro do layout
