## ADDED Requirements

### Requirement: Listagem de Meus Ativos exibe 4 colunas no mobile

A tabela de ativos da aba "Meus Ativos" (`.acoes-list`) SHALL exibir, em mobile (largura ≤640px), **exatamente 4 colunas**: **Ativo, Qtde, Variação e Total** (Total = valor da posição, exibido no desktop como "Saldo"). As colunas Preço Médio, Hoje e Rent. MUST ser ocultadas nesse breakpoint. No desktop todas as colunas permanecem visíveis. A tabela MUST permanecer contida, sem rolagem horizontal da página.

#### Scenario: Quatro colunas no mobile

- **WHEN** a listagem de "Meus Ativos" é exibida em largura ≤640px com ativos
- **THEN** apenas as colunas Ativo, Qtde, Variação e Total são exibidas
- **AND** as colunas Preço Médio, Hoje e Rent. ficam ocultas
- **AND** não há rolagem horizontal da página

#### Scenario: Desktop mantém todas as colunas

- **WHEN** a listagem é exibida em largura > 640px
- **THEN** todas as colunas (Ativo, Qtd, Preço Médio, Hoje, Saldo, Variação, Rent.) permanecem visíveis
