## ADDED Requirements

### Requirement: Colunas da tabela com largura igual
As 4 colunas da tabela de dividendos (Tipo, Data Com, Data de Pagamento, Valor) DEVEM ter largura igual de 25% cada, somando 100%.

#### Scenario: Larguras iguais aplicadas
- **WHEN** a tabela de dividendos é renderizada
- **THEN** cada uma das 4 colunas ocupa 25% da largura, independentemente do conteúdo das linhas

#### Scenario: Largura estável com qualquer conteúdo
- **WHEN** a tabela exibe linhas com conteúdos de tamanhos diferentes
- **THEN** as proporções de 25% por coluna são mantidas (table-layout fixo)
