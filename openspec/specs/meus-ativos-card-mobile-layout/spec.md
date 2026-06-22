# meus-ativos-card-mobile-layout Specification

## Purpose
TBD - created by archiving change meus-ativos-rentabilidade-acordeao-card. Update Purpose after archive.
## Requirements
### Requirement: Rentabilidade no topo e Variação hoje junto da Variação no card mobile

No card de ativo da aba "Meus Ativos" em mobile (largura ≤640px), a **rentabilidade** SHALL ser exibida **no topo** do card (posição antes ocupada pela "Variação hoje"). A **"Variação hoje"** MUST ser movida para a parte inferior do card, **na mesma linha da "Variação"**. Cada campo MUST permanecer alinhado de forma coerente com sua nova posição (rentabilidade alinhada como os demais campos do topo à direita; "Variação hoje" e "Variação" lado a lado na linha inferior), sem espaço em branco ocioso e sem rolagem horizontal.

#### Scenario: Rentabilidade no topo

- **WHEN** um card de ativo é exibido em largura ≤640px
- **THEN** a rentabilidade aparece no topo do card
- **AND** a "Variação hoje" não aparece mais no topo

#### Scenario: Variação hoje junto da Variação

- **WHEN** um card de ativo é exibido em largura ≤640px
- **THEN** a "Variação hoje" aparece na mesma linha da "Variação", na parte inferior do card
- **AND** o card permanece contido, sem espaço em branco ocioso nem rolagem horizontal

### Requirement: Card de ativo no mobile sem realce de fundo na Variação hoje

No card de ativo da aba "Meus Ativos" em mobile (largura ≤640px), o campo "Variação hoje" SHALL ser exibido **sem fundo destacado** (sem pílula colorida), no mesmo idioma visual dos demais campos do card. A cor do valor MUST continuar refletindo o sinal (positivo/negativo), mas sem aplicar cor de fundo ao campo.

#### Scenario: Variação hoje sem pílula

- **WHEN** um card de ativo é exibido em largura ≤640px
- **THEN** o campo "Variação hoje" é exibido sem fundo destacado
- **AND** o valor mantém a cor que indica alta ou queda

### Requirement: Quantidade posicionada acima da variação sem espaço em branco

No card de ativo da aba "Meus Ativos" em mobile (largura ≤640px), o **Preço médio** e o **Preço atual** SHALL ser exibidos **na mesma linha** do card. A **quantidade** MUST ocupar a posição ao lado do Saldo (onde antes ficava o Preço atual), de forma que a quantidade troque de lugar com o Preço atual. O card MUST permanecer contido, sem rolagem horizontal, sem linha isolada de largura inteira e sem espaço em branco ocioso, com os campos alinhados de forma equilibrada.

#### Scenario: Preços na mesma linha

- **WHEN** um card de ativo é exibido em largura ≤640px
- **THEN** o Preço médio e o Preço atual aparecem na mesma linha
- **AND** a quantidade aparece ao lado do Saldo (posição antes ocupada pelo Preço atual)
- **AND** não há linha isolada ocupando a largura inteira nem espaço em branco ocioso

#### Scenario: Card contido

- **WHEN** um card de ativo é exibido em largura ≤640px
- **THEN** o card permanece contido, sem rolagem horizontal

