## MODIFIED Requirements

### Requirement: Detalhes da ação ao clicar no card

Na tela Minhas Ações, clicar em um card de ação SHALL abrir uma visualização de detalhes em tela cheia (in-page), com layout profissional. Os **indicadores fundamentalistas** SHALL ser exibidos em um grid de 4 cards por linha (responsivo), com valores em ≤2 casas decimais (preservando sufixos como `%`) e **rótulos que possam quebrar em até 2 linhas** quando longos, sem corte abrupto. A tela NÃO SHALL exibir histórico de dividendos e SHALL oferecer "Voltar"; sem overflow horizontal.

#### Scenario: Rótulos longos legíveis
- **WHEN** um indicador tem rótulo longo (ex.: "Dív. líquida/Patrimônio")
- **THEN** o rótulo é exibido por completo, quebrando em até 2 linhas, sem cortar o texto de forma abrupta

#### Scenario: Quatro cards por linha
- **WHEN** a tela exibe os indicadores em tela larga
- **THEN** os cards aparecem em 4 por linha, com bom espaçamento e sem overflow
