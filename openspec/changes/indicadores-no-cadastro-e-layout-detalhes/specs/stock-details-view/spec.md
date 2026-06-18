## MODIFIED Requirements

### Requirement: Detalhes da ação ao clicar no card

Na tela Minhas Ações, clicar em um card de ação SHALL abrir uma visualização de detalhes em tela cheia (in-page), com um **layout profissional**: hierarquia visual clara (ticker/nome e preço em destaque, variação em realce), métricas de posição agrupadas e os indicadores fundamentalistas organizados em um grid legível. A tela NÃO SHALL exibir histórico de dividendos e SHALL oferecer "Voltar".

#### Scenario: Layout profissional
- **WHEN** a tela de detalhes é exibida
- **THEN** o cabeçalho destaca ticker/nome e preço, a variação aparece em realce, e os indicadores são exibidos em um grid organizado e legível

#### Scenario: Indicadores organizados
- **WHEN** o ativo possui indicadores
- **THEN** eles são exibidos em cartões/células consistentes (rótulo + valor), com bom espaçamento e responsividade

#### Scenario: Voltar para a lista
- **WHEN** o usuário aciona "Voltar"
- **THEN** a lista de ações é exibida novamente
