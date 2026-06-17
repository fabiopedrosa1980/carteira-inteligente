## ADDED Requirements

### Requirement: Contraste do verde de destaque no tema dark

No tema dark, os elementos de destaque verde da tela Meus Ativos (contador de seção, total de seção, ticker-badge, total da linha e cabeçalhos ordenáveis ativos) SHALL usar um tom de verde com contraste suficiente para serem claramente legíveis sobre o fundo escuro dos cards.

#### Scenario: Verde legível no tema dark
- **WHEN** a tela Meus Ativos é exibida no tema dark
- **THEN** os totais, contadores e badges verdes aparecem em um verde vibrante e claramente distinguível do fundo

#### Scenario: Tema light preservado
- **WHEN** a tela Meus Ativos é exibida no tema light
- **THEN** o verde de destaque permanece com a aparência atual, sem regressão de contraste
