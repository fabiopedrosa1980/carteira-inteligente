## MODIFIED Requirements

### Requirement: Indicadores fundamentais via Investidor10

A API (backend Go) SHALL fornecer **todos os indicadores fundamentalistas** disponíveis por ticker, obtidos do Investidor10, como uma **lista ordenada de pares rótulo/valor** (`indicators: [{ label, value }]`), com o valor já formatado como exibido. O frontend SHALL exibir todos os indicadores recebidos. Na ausência de indicadores, o frontend SHALL exibir os detalhes sem eles, sem erro.

#### Scenario: Lista completa de indicadores
- **WHEN** a API busca os indicadores de um ticker no Investidor10
- **THEN** retorna a lista completa de indicadores fundamentalistas como pares rótulo/valor

#### Scenario: Frontend exibe a lista
- **WHEN** o payload de uma ação/FII inclui a lista de indicadores
- **THEN** a tela de detalhes exibe todos os pares rótulo/valor

#### Scenario: Indicadores ausentes
- **WHEN** o Investidor10 não retorna indicadores para o ticker
- **THEN** o campo `indicators` vem vazio/ausente e a tela não quebra
