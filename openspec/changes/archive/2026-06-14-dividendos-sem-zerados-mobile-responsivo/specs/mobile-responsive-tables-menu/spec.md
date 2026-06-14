## ADDED Requirements

### Requirement: Menu de abas sem scroll horizontal no mobile
O menu de abas (`tab-nav`) NÃO DEVE exigir scroll horizontal em telas de celular; as abas DEVEM se distribuir/quebrar para caber na largura disponível.

#### Scenario: Abas cabem na largura do mobile
- **WHEN** a aplicação é exibida em uma viewport de 360px de largura
- **THEN** todas as abas ficam visíveis sem necessidade de scroll horizontal

### Requirement: Tabela de dividendos adaptada ao mobile
A tabela de histórico de dividendos NÃO DEVE gerar scroll horizontal no mobile; fonte, espaçamento e cabeçalhos DEVEM se adaptar para caber as 4 colunas.

#### Scenario: Tabela de dividendos cabe no mobile
- **WHEN** a tabela de dividendos é exibida em viewport de 360px
- **THEN** as 4 colunas (Tipo, Data Com, Pagamento, Valor) ficam visíveis sem scroll horizontal

### Requirement: Tabela de metas adaptada ao mobile
A tabela de metas NÃO DEVE gerar scroll horizontal no mobile; em telas pequenas a coluna menos essencial (Valor Alvo) PODE ser ocultada para garantir o ajuste.

#### Scenario: Tabela de metas cabe no mobile
- **WHEN** a tabela de metas é exibida em viewport de 360px
- **THEN** as colunas restantes (Meta, Valor Atual, Progresso, Ações) ficam visíveis sem scroll horizontal

#### Scenario: Coluna Valor Alvo visível no desktop
- **WHEN** a tabela de metas é exibida em viewport ampla (desktop)
- **THEN** a coluna Valor Alvo é exibida normalmente
