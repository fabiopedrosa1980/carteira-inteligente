## MODIFIED Requirements

### Requirement: Header de página padronizado

As páginas/abas principais SHALL exibir um header de página com título de peso 700 e tamanho 20px, sem ícone. O header NÃO SHALL exibir um subtítulo descritivo, com exceção da tela Meus Ativos, onde a linha abaixo do título carrega dados (contagem de lançamentos e valor total) e SHALL ser mantida. O subtítulo do topo do app (abaixo do logo) também SHALL ser removido.

#### Scenario: Headers sem subtítulo descritivo
- **WHEN** o usuário abre Minhas Ações, Dividendos ou Metas
- **THEN** apenas o título da página é exibido, sem linha de subtítulo abaixo

#### Scenario: Meus Ativos mantém a linha de dados
- **WHEN** a tela Meus Ativos é exibida
- **THEN** a linha abaixo do título com a contagem de lançamentos e o valor total permanece visível

#### Scenario: Topo do app sem subtítulo
- **WHEN** qualquer tela é exibida
- **THEN** o cabeçalho do app mostra apenas o logo, sem o texto "Análise de dividendos · Ações do Ibovespa"
