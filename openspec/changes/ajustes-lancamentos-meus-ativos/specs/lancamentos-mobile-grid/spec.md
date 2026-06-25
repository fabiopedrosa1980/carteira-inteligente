## ADDED Requirements

### Requirement: Ações Editar/Excluir na mesma linha do Total no card mobile

Na aba "Lançamentos", no **card mobile** (largura ≤600px), os botões **Editar** e **Excluir** SHALL ser exibidos **na mesma linha do Total** (e não mais na linha do ticker). O Total e as ações MUST ficar agrupados/alinhados à direita na linha inferior do card, com o Preço Unitário à esquerda na mesma linha. Os demais campos (Ativo, Data, Quantidade) MUST permanecer visíveis com seus rótulos. O card MUST permanecer contido, sem rolagem horizontal, e os botões MUST manter alvo de toque adequado. No desktop a tabela (linhas em grid de colunas) permanece inalterada.

#### Scenario: Ações na linha do Total

- **WHEN** um lançamento é exibido como card em largura ≤600px
- **THEN** os botões Editar e Excluir aparecem na mesma linha do Total
- **AND** não aparecem mais na linha do ticker

#### Scenario: Campos preservados

- **WHEN** um lançamento é exibido como card em largura ≤600px
- **THEN** Ativo, Data, Quantidade, Preço Unitário e Total continuam visíveis com seus rótulos
- **AND** o card permanece contido, sem rolagem horizontal

#### Scenario: Desktop inalterado

- **WHEN** a aba "Lançamentos" é exibida em largura > 600px
- **THEN** a tabela mantém a coluna de ações (Operação) como no layout atual de desktop
