## ADDED Requirements

### Requirement: Grid de cards de Minhas Ações responsivo sem scroll

O grid de cards de Minhas Ações SHALL adaptar o número de colunas à largura da tela, do desktop ao mobile, sem gerar **scroll horizontal**. Em telas muito estreitas, SHALL exibir uma única coluna. O conteúdo de cada card SHALL caber sem estourar (sem rolagem interna nem horizontal).

#### Scenario: Sem scroll horizontal no mobile
- **WHEN** a tela de Minhas Ações é exibida em uma tela estreita (ex.: 320–414px)
- **THEN** os cards se ajustam à largura (até uma coluna) e não há scroll horizontal

#### Scenario: Adapta colunas por largura
- **WHEN** a largura da tela aumenta
- **THEN** o grid acomoda mais colunas automaticamente, preenchendo o espaço

#### Scenario: Conteúdo cabe no card
- **WHEN** um card é exibido em qualquer largura suportada
- **THEN** ticker, preço e estatísticas cabem sem estourar (com quebra/elipse quando necessário)
