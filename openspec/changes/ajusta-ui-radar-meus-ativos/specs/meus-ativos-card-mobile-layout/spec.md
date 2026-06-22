## ADDED Requirements

### Requirement: Card de ativo no mobile sem realce de fundo na Variação hoje

No card de ativo da aba "Meus Ativos" em mobile (largura ≤640px), o campo "Variação hoje" SHALL ser exibido **sem fundo destacado** (sem pílula colorida), no mesmo idioma visual dos demais campos do card. A cor do valor MUST continuar refletindo o sinal (positivo/negativo), mas sem aplicar cor de fundo ao campo.

#### Scenario: Variação hoje sem pílula

- **WHEN** um card de ativo é exibido em largura ≤640px
- **THEN** o campo "Variação hoje" é exibido sem fundo destacado
- **AND** o valor mantém a cor que indica alta ou queda

### Requirement: Quantidade posicionada acima da variação sem espaço em branco

No card de ativo da aba "Meus Ativos" em mobile (largura ≤640px), a **quantidade** SHALL ser posicionada **acima da variação** no layout do card. A linha isolada de quantidade ocupando a largura inteira MUST ser eliminada, de forma que o card não apresente espaço em branco ocioso. O card MUST permanecer contido, sem rolagem horizontal, e com os campos alinhados de forma equilibrada.

#### Scenario: Quantidade acima da variação

- **WHEN** um card de ativo é exibido em largura ≤640px
- **THEN** a quantidade aparece acima da variação
- **AND** não há linha isolada de quantidade ocupando a largura inteira
- **AND** o card não apresenta espaço em branco ocioso
