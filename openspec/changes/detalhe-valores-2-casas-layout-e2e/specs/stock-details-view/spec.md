## MODIFIED Requirements

### Requirement: Detalhes da ação ao clicar no card

Na tela Minhas Ações, clicar em um card de ação SHALL abrir uma visualização de detalhes em tela cheia (in-page), com layout profissional e bem posicionado. Os valores dos **indicadores fundamentalistas** SHALL ser exibidos com **no máximo 2 casas decimais**, preservando sufixos/unidades (ex.: `%`), e dispostos em um grid de **4 cards por linha** (responsivo, reduzindo o número de colunas em telas estreitas). A tela NÃO SHALL exibir histórico de dividendos e SHALL oferecer "Voltar". O layout SHALL permanecer íntegro (sem overflow horizontal) e ser coberto por um teste automatizado.

#### Scenario: Indicadores com no máximo 2 casas decimais
- **WHEN** um indicador tem valor numérico com mais de 2 casas decimais (ex.: "12,3456")
- **THEN** ele é exibido com no máximo 2 casas (ex.: "12,35"), mantendo o sufixo quando houver (ex.: "8,50%")

#### Scenario: Quatro cards por linha
- **WHEN** a tela de detalhes exibe os indicadores em tela larga
- **THEN** os cards de indicadores aparecem dispostos em 4 por linha

#### Scenario: Valores não numéricos preservados
- **WHEN** um indicador tem valor não numérico (ex.: texto ou faixa)
- **THEN** o valor é exibido como recebido, sem quebrar

#### Scenario: Layout coberto por teste
- **WHEN** o teste de componente do detalhe é executado com dados de exemplo
- **THEN** valida elementos essenciais (cabeçalho, resumo, grid de indicadores em 4 colunas), a formatação de 2 casas e a ausência de overflow horizontal
