## ADDED Requirements

### Requirement: Histórico de dividendos ordenável por todas as colunas

A tabela do Histórico de dividendos SHALL permitir **ordenar por qualquer coluna**: **Tipo**, **Data Com**, **Data de Pagamento** e **Valor**. Ao clicar no cabeçalho de uma coluna, a tabela MUST ordenar por essa coluna; clicar novamente na mesma coluna MUST alternar entre ascendente e descendente. O cabeçalho ativo MUST exibir um **indicador visual** da coluna e da direção (ascendente/descendente). A ordenação MUST respeitar o filtro de ano vigente e MUST reiniciar a paginação para a primeira página ao mudar de ordenação. A ordenação padrão MUST ser por Data de Pagamento, da mais recente para a mais antiga.

#### Scenario: Ordenar por uma coluna

- **WHEN** o usuário clica no cabeçalho de uma coluna (Tipo, Data Com, Data de Pagamento ou Valor)
- **THEN** as linhas são ordenadas por essa coluna
- **AND** o cabeçalho indica a coluna e a direção ativas

#### Scenario: Alternar direção

- **WHEN** o usuário clica novamente no cabeçalho da coluna já ativa
- **THEN** a direção alterna entre ascendente e descendente

#### Scenario: Ordenação respeita filtro e paginação

- **WHEN** a ordenação é alterada com um filtro de ano aplicado
- **THEN** apenas os dividendos do filtro vigente são ordenados
- **AND** a paginação volta para a primeira página

#### Scenario: Ordenação padrão

- **WHEN** o histórico de um ativo é carregado
- **THEN** as linhas aparecem ordenadas por Data de Pagamento, da mais recente para a mais antiga
