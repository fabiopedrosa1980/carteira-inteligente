## MODIFIED Requirements

### Requirement: Ordenação padrão dos lançamentos por ticker

Na tela de Lançamentos, a tabela detalhada SHALL ser ordenada por **ticker (A→Z)** por padrão. O usuário SHALL poder reordenar por outras colunas; apenas o estado inicial é por ticker.

#### Scenario: Ordem padrão por ticker
- **WHEN** a tela de Lançamentos é aberta
- **THEN** os lançamentos de cada seção aparecem ordenados por ticker em ordem crescente

#### Scenario: Reordenação manual preservada
- **WHEN** o usuário clica em outra coluna para ordenar
- **THEN** a ordenação muda conforme a coluna escolhida
