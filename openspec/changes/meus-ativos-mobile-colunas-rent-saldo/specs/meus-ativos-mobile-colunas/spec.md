## ADDED Requirements

### Requirement: Colunas e larguras da listagem de Meus Ativos no mobile

A tabela de ativos da aba "Meus Ativos" (`.acoes-list`) SHALL exibir, em mobile (largura ≤640px), **exatamente 3 colunas**: **Ativo, Quantidade e Rentabilidade**. As colunas Preço Médio, Hoje, Saldo e Variação MUST ser ocultadas nesse breakpoint. As larguras MUST ser: **Ativo 15%**, **Quantidade 15%** e **Rentabilidade ~70%**. No desktop todas as colunas permanecem visíveis. A tabela MUST permanecer contida, sem rolagem horizontal da página.

#### Scenario: Três colunas no mobile

- **WHEN** a listagem de "Meus Ativos" é exibida em largura ≤640px com ativos
- **THEN** apenas as colunas Ativo, Quantidade e Rentabilidade são exibidas
- **AND** as colunas Preço Médio, Hoje, Saldo e Variação ficam ocultas
- **AND** não há rolagem horizontal da página

#### Scenario: Larguras das colunas no mobile

- **WHEN** a listagem é exibida em largura ≤640px
- **THEN** Ativo e Quantidade ocupam ~15% da largura cada
- **AND** Rentabilidade ocupa ~70% da largura

#### Scenario: Desktop mantém todas as colunas

- **WHEN** a listagem é exibida em largura > 640px
- **THEN** todas as colunas (Ativo, Qtd, Preço Médio, Hoje, Saldo, Variação, Rent.) permanecem visíveis

#### Scenario: Saldo oculto no mobile

- **WHEN** a listagem é exibida em largura ≤640px
- **THEN** a coluna Saldo não é exibida
