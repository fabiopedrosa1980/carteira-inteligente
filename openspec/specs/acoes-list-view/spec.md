# acoes-list-view Specification

## Purpose
Define o comportamento da alternância cards/lista na tela "Meus Ativos" e como cada visão é renderizada dentro dos grupos por tipo de ativo.
## Requirements
### Requirement: Lista e cards renderizados por grupo

A tela "Meus Ativos" SHALL exibir os ativos somente em **lista**. Cada **grupo** (Ações, FIIs, ETFs) SHALL exibir sua própria tabela com os ativos daquele tipo, paginada independentemente. A visão em cards e o toggle de visão NÃO existem mais. A ordenação global (clique nos cabeçalhos de coluna) aplica-se igualmente a todos os grupos.

#### Scenario: Lista por grupo

- **WHEN** a seção Ações está expandida
- **THEN** uma tabela com os ativos do tipo Ações é exibida dentro da seção
- **AND** a seção FIIs exibe sua própria tabela separada

#### Scenario: Sem alternância de visão

- **WHEN** a tela de Meus Ativos é aberta
- **THEN** nenhum toggle cards/lista é exibido no cabeçalho
- **AND** os ativos são exibidos apenas em formato de lista

#### Scenario: Paginação independente por grupo na lista

- **WHEN** o grupo Ações tem mais de 10 ativos
- **THEN** sua tabela é paginada de forma independente das demais seções

### Requirement: Lista exibe campos de posição em colunas

Na visão em lista, cada ativo SHALL ser exibido em uma linha com colunas: **Ativo**, **Quantidade**, **Preço Médio**, **Variação do dia (Hoje)**, **Saldo**, **Variação da posição (R$)** e **Rentabilidade (%)**. A lista MUST permanecer legível no mobile sem rolagem horizontal. No mobile, as colunas **Hoje** (variação do dia) e **Variação** (variação da posição em R$) MUST ser ocultadas, permanecendo visíveis **Ativo**, **Qtd**, **Preço Médio**, **Saldo** e **Rent.**.

#### Scenario: Lista no mobile oculta Hoje e Variação

- **WHEN** a visão em lista é exibida em tela ≤ 640px
- **THEN** as colunas **Hoje** e **Variação** ficam ocultas
- **AND** as colunas **Ativo**, **Qtd**, **Preço Médio**, **Saldo** e **Rent.** permanecem visíveis
- **AND** não há rolagem horizontal

#### Scenario: Lista no desktop exibe todas as colunas

- **WHEN** a visão em lista é exibida em tela larga (desktop)
- **THEN** todas as colunas (Ativo, Qtd, Preço Médio, Hoje, Saldo, Variação, Rent.) são exibidas

