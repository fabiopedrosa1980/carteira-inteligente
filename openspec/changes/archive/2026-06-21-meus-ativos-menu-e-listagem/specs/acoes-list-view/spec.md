## MODIFIED Requirements

### Requirement: Alternância entre visão em Cards e visão em Lista

A tela de **"Meus Ativos"** (anteriormente "Minhas Ações") SHALL oferecer alternância entre **visão em cards** e **visão em lista**, controlada por ícones (cards/lista). A visão em **lista** MUST ser o padrão inicial. Os ícones de alternância MUST ficar no cabeçalho da seção, à direita. Não há controles globais de "Ordenar por" no cabeçalho — a ordenação é feita pelos cabeçalhos de coluna na visão em lista.

#### Scenario: Padrão é lista

- **WHEN** a tela de Meus Ativos é aberta
- **THEN** a visão em lista é exibida por padrão
- **AND** os ícones de alternância cards/lista aparecem à direita do cabeçalho
- **AND** não há controles de "Ordenar por" no cabeçalho da seção

#### Scenario: Alternar para cards

- **WHEN** o usuário clica no ícone de cards
- **THEN** os ativos passam a ser exibidos em formato de cards
- **AND** a ordenação atual é preservada

#### Scenario: Alternar para lista

- **WHEN** o usuário clica no ícone de lista
- **THEN** os ativos passam a ser exibidos em formato de lista
- **AND** a ordenação atual é preservada

### Requirement: Tela exibe todos os tipos de ativo da carteira

A tela de "Meus Ativos" SHALL exibir todos os ativos cadastrados na carteira do usuário, incluindo **Ações, FIIs e ETFs**. Os ativos MUST ser carregados da mesma fonte de dados (backend) independentemente do tipo.

#### Scenario: FIIs e ETFs aparecem na listagem

- **WHEN** o usuário tem FIIs ou ETFs cadastrados na carteira
- **THEN** esses ativos aparecem na tela de Meus Ativos
- **AND** são listados junto com as ações na mesma tabela ou grid

#### Scenario: Tela vazia sem ativos

- **WHEN** o usuário não tem nenhum ativo cadastrado
- **THEN** a mensagem de portfólio vazio é exibida

### Requirement: Lista com ordenação por coluna

Na visão em lista, cada ativo SHALL ser exibido em uma linha com colunas para: **Ativo**, **Quantidade**, **Preço atual**, **Variação do dia (Hoje)**, **Saldo**, **Variação da posição (R$)** e **Rentabilidade (%)**. Os cabeçalhos de coluna MUST ser clicáveis para ordenar a lista pelo campo correspondente. Clicar no mesmo cabeçalho novamente inverte a direção (asc/desc). Uma seta indicativa (↑/↓) MUST aparecer no cabeçalho ativo. Os valores derivados MUST usar a mesma regra de cálculo do card. A lista MUST permanecer legível no mobile, sem rolagem horizontal da página.

#### Scenario: Clique no cabeçalho de coluna ordena a lista

- **WHEN** o usuário clica em um cabeçalho de coluna (ex.: "Ativo", "Saldo", "Rent.")
- **THEN** a lista é reordenada por aquele campo em ordem ascendente
- **AND** o cabeçalho clicado exibe a seta ↑

#### Scenario: Segundo clique inverte a direção

- **WHEN** o usuário clica novamente no cabeçalho já ativo
- **THEN** a direção inverte para descendente
- **AND** o cabeçalho exibe a seta ↓

#### Scenario: Linha da lista

- **WHEN** a visão em lista é exibida com ativos na carteira
- **THEN** cada linha mostra Ativo, Qtd, Preço, Hoje, Saldo, Variação (R$) e Rentabilidade (%)
- **AND** variação e rentabilidade indicam sinal/cor positivo/negativo

#### Scenario: Lista no mobile

- **WHEN** a visão em lista é exibida em tela ≤ 640px
- **THEN** apenas as colunas Ativo, Saldo e Rentabilidade são exibidas
- **AND** o conteúdo cabe na largura disponível sem rolagem horizontal (incluindo ~360px)
- **AND** as colunas Qtd, Preço, Hoje e Variação (R$) ficam ocultas
