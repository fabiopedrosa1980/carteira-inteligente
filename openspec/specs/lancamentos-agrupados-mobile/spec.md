# lancamentos-agrupados-mobile Specification

## Purpose
TBD - created by archiving change lancamentos-agrupados-tabela-mobile. Update Purpose after archive.
## Requirements
### Requirement: Tabela agrupada em colunas no mobile

Na tela de Lançamentos, a visão **agrupada por ticker** SHALL ser exibida como tabela em colunas no mobile (igual à web), e NÃO como cards empilhados. No mobile, a tabela MUST exibir as colunas **Ativo**, **Qtd** e **Total**, ocultando **Preço médio** e **Lançamentos**, e MUST NOT gerar rolagem horizontal da página.

#### Scenario: Tabela em colunas no mobile

- **WHEN** a tela de Lançamentos é exibida em largura ≤ 600px com a opção "Agrupar por ticker" ativa
- **THEN** as linhas agrupadas aparecem como tabela em colunas (não como cards empilhados)
- **AND** são exibidas as colunas Ativo, Qtd e Total
- **AND** as colunas Preço médio e Lançamentos não são exibidas (nem no cabeçalho nem nas linhas)

#### Scenario: Sem rolagem horizontal

- **WHEN** a tabela agrupada é exibida em largura ≤ 600px (incluindo ~320px)
- **THEN** o conteúdo cabe na largura disponível
- **AND** não há rolagem horizontal da página nem da tabela

#### Scenario: Cabeçalho de colunas visível

- **WHEN** a tabela agrupada é exibida no mobile
- **THEN** o cabeçalho de colunas é exibido (Ativo, Qtd, Total), alinhado às colunas

#### Scenario: Desktop inalterado

- **WHEN** a tela de Lançamentos é exibida em largura > 600px com agrupamento ativo
- **THEN** a tabela agrupada mostra todas as colunas (Ativo, Qtd, Preço médio, Total, Lançamentos) como hoje

