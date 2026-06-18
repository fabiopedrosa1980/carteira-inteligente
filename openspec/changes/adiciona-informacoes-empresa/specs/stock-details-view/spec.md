## MODIFIED Requirements

### Requirement: Detalhes da ação ao clicar no card

Na tela Minhas Ações, clicar em um card de ação SHALL abrir uma visualização de detalhes em tela cheia (in-page), com layout profissional. A tela SHALL exibir: cabeçalho (ticker/nome + preço/variação), a seção **Indicadores Fundamentalistas** (grid de 4 cards por linha, valores ≤2 casas) e a seção **Informações sobre a empresa** (pares rótulo/valor, em grid adequado a valores mais largos). A tela NÃO SHALL exibir histórico de dividendos e SHALL oferecer "Voltar"; sem overflow horizontal.

#### Scenario: Duas seções distintas
- **WHEN** a tela de detalhes é exibida com dados disponíveis
- **THEN** os Indicadores Fundamentalistas e as Informações sobre a empresa aparecem em seções separadas e rotuladas

#### Scenario: Valores largos das informações
- **WHEN** uma informação tem valor largo (ex.: "R$ 528,46 Bilhões")
- **THEN** ela é exibida sem overflow, com o grid usando menos colunas que o de indicadores

#### Scenario: Seções opcionais
- **WHEN** uma das seções não tem dados
- **THEN** apenas a seção com dados é exibida, sem erro
