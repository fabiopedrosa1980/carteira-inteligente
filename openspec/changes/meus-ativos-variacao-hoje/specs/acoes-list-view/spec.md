## MODIFIED Requirements

### Requirement: Lista exibe campos de posição em colunas

Na visão em lista, cada ativo SHALL ser exibido em uma linha com colunas: **Ativo**, **Quantidade**, **Preço Médio**, **Variação do dia**, **Saldo**, **Variação da posição (R$)** e **Rentabilidade (%)**. O cabeçalho da coluna de variação do dia SHALL ter o texto **"Variação hoje"** (antes "Hoje"). A lista MUST permanecer legível no mobile sem rolagem horizontal.

#### Scenario: Cabeçalho da variação do dia no desktop

- **WHEN** a visão em lista é exibida em tela larga (desktop)
- **THEN** o cabeçalho da coluna de variação do dia exibe o texto "Variação hoje"
- **AND** a ordenação por essa coluna continua funcionando ao clicar no cabeçalho

#### Scenario: Lista no desktop exibe todas as colunas

- **WHEN** a visão em lista é exibida em tela larga (desktop)
- **THEN** todas as colunas (Ativo, Qtd, Preço Médio, Variação hoje, Saldo, Variação, Rent.) são exibidas

## ADDED Requirements

### Requirement: Rótulo da variação do dia no card mobile

No card de ativo do mobile, a variação do dia (apresentada como pílula) SHALL exibir um rótulo de texto **"Variação hoje"**, no mesmo idioma visual dos demais micro-rótulos do card (sans em caixa-alta, acima do valor), de modo que o valor não apareça solto/sem identificação.

#### Scenario: Pílula de variação do dia rotulada no mobile

- **WHEN** o card de um ativo é exibido em tela ≤ 640px com variação do dia
- **THEN** a pílula de variação do dia apresenta o rótulo "Variação hoje"
- **AND** o valor percentual permanece formatado e colorido conforme o sinal (positivo/negativo)
