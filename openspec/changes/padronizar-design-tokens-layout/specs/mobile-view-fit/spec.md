## MODIFIED Requirements

### Requirement: Cards de Minhas Ações cabem 2 por linha sem rolagem

No mobile (no breakpoint canônico do app, `$bp-mobile`), o grid de "Minhas Ações" SHALL exibir 2 cards por linha em colunas que encolhem (`minmax(0, 1fr)`), e o conteúdo de cada card MUST permanecer contido na coluna, sem gerar rolagem horizontal da página nem rolagem interna do card. O corte usado MUST ser `$bp-mobile` (não um valor literal próprio), para que a transição mobile coincida com a das demais telas.

#### Scenario: Dois cards por linha sem overflow

- **WHEN** a aba Minhas Ações é exibida abaixo de `$bp-mobile` com ações na carteira
- **THEN** os cards são dispostos em 2 colunas de largura igual que encolhem conforme a viewport
- **AND** preço, ticker, nome e estatísticas permanecem contidos na coluna
- **AND** não há rolagem horizontal da página nem barra de rolagem dentro do card

#### Scenario: Mesmo breakpoint das demais telas

- **WHEN** a viewport cruza `$bp-mobile`
- **THEN** o grid de Minhas Ações alterna para o layout mobile na mesma largura em que as outras telas alternam
