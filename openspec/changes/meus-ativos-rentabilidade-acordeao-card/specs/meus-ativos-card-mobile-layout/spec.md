## ADDED Requirements

### Requirement: Rentabilidade no topo e Variação hoje junto da Variação no card mobile

No card de ativo da aba "Meus Ativos" em mobile (largura ≤640px), a **rentabilidade** SHALL ser exibida **no topo** do card (posição antes ocupada pela "Variação hoje"). A **"Variação hoje"** MUST ser movida para a parte inferior do card, **na mesma linha da "Variação"**. Cada campo MUST permanecer alinhado de forma coerente com sua nova posição (rentabilidade alinhada como os demais campos do topo à direita; "Variação hoje" e "Variação" lado a lado na linha inferior), sem espaço em branco ocioso e sem rolagem horizontal.

#### Scenario: Rentabilidade no topo

- **WHEN** um card de ativo é exibido em largura ≤640px
- **THEN** a rentabilidade aparece no topo do card
- **AND** a "Variação hoje" não aparece mais no topo

#### Scenario: Variação hoje junto da Variação

- **WHEN** um card de ativo é exibido em largura ≤640px
- **THEN** a "Variação hoje" aparece na mesma linha da "Variação", na parte inferior do card
- **AND** o card permanece contido, sem espaço em branco ocioso nem rolagem horizontal
