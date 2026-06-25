## ADDED Requirements

### Requirement: Faixa de resumo no cabeçalho com Total em destaque

A tela de Lançamentos SHALL apresentar, no cabeçalho, uma faixa de resumo onde o **total investido** (soma de quantidade × preço de todos os lançamentos) aparece como número de destaque, com uma legenda curta, e a contagem de lançamentos aparece como informação secundária (meta). A ação "Limpar tudo" SHALL permanecer disponível, porém com ênfase visual reduzida frente ao total e ao título.

#### Scenario: Total em destaque com lançamentos presentes
- **WHEN** existem lançamentos cadastrados
- **THEN** o cabeçalho exibe o título "Lançamentos", o total investido como valor em destaque com legenda, e a contagem de lançamentos como texto secundário
- **AND** o valor do total usa numerais tabulares (`tabular-nums`)

#### Scenario: Ação destrutiva discreta
- **WHEN** existe ao menos um lançamento
- **THEN** o botão "Limpar tudo" é exibido com tratamento discreto (não compete visualmente com o título nem com o total)

#### Scenario: Sem lançamentos
- **WHEN** não há nenhum lançamento cadastrado
- **THEN** o botão "Limpar tudo" não é exibido
- **AND** a faixa de resumo não destaca um total maior que zero

### Requirement: Alinhamento numérico das colunas da tabela

Na tabela de lançamentos (desktop), as colunas numéricas (Qtd., Preço Unit., Total) SHALL ser alinhadas à direita, com numerais tabulares, tanto no cabeçalho quanto nas linhas; as colunas de texto (Ativo, Data) SHALL permanecer alinhadas à esquerda; a coluna Operação SHALL ficar à direita.

#### Scenario: Colunas numéricas à direita
- **WHEN** a tabela de uma seção é exibida no desktop
- **THEN** os cabeçalhos e os valores de Qtd., Preço Unit. e Total ficam alinhados à direita
- **AND** os números usam `font-variant-numeric: tabular-nums` para alinhar as casas verticalmente

#### Scenario: Colunas de texto à esquerda
- **WHEN** a tabela de uma seção é exibida no desktop
- **THEN** os cabeçalhos e os valores de Ativo e Data permanecem alinhados à esquerda

### Requirement: Ritmo de espaçamento consistente

A tela SHALL aplicar um ritmo de espaçamento consistente entre os blocos: o gap entre seções, o respiro interno dos cabeçalhos de seção, o padding das linhas/cabeçalho da tabela, o rodapé "Adicionar" e a paginação SHALL seguir um mesmo passo de espaçamento, sem paddings divergentes entre blocos equivalentes.

#### Scenario: Paddings equivalentes alinhados
- **WHEN** a tela de Lançamentos é renderizada
- **THEN** o rodapé "Adicionar", a paginação e as linhas da tabela compartilham o mesmo padding horizontal das bordas do card de seção
- **AND** o espaçamento vertical entre seções é uniforme

### Requirement: Cabeçalho de seção como linha-resumo

Cada cabeçalho de seção (Ações/FIIs/ETFs) SHALL ler como uma linha-resumo coerente: rótulo da seção e badge de contagem à esquerda; métrica "Total" da seção (legenda + valor) e chevron à direita, com o valor em numerais tabulares alinhado à direita.

#### Scenario: Cabeçalho de seção com total
- **WHEN** uma seção possui ao menos um lançamento
- **THEN** o cabeçalho exibe rótulo + badge de contagem à esquerda e a métrica "Total" (legenda sobre valor) à direita, antes do chevron
- **AND** o valor do total da seção usa numerais tabulares e fica alinhado à direita

### Requirement: Estado vazio por seção

Quando uma seção não possui lançamentos e o carregamento já terminou, a seção SHALL exibir um estado vazio centrado, composto por ícone, mensagem curta e um CTA "Adicionar", em vez de uma linha de texto solta.

#### Scenario: Seção sem lançamentos
- **WHEN** uma seção não tem lançamentos e `loading` é falso
- **THEN** a seção exibe um estado vazio centrado com ícone, mensagem e um botão "Adicionar"
- **AND** o botão "Adicionar" do estado vazio abre o modal já com o tipo da seção pré-selecionado

#### Scenario: Seção com lançamentos não mostra estado vazio
- **WHEN** uma seção tem ao menos um lançamento
- **THEN** o estado vazio não é exibido e a tabela da seção é mostrada normalmente
