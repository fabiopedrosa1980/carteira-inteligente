## ADDED Requirements

### Requirement: Cabeçalho de seção sem texto descritivo
Os cabeçalhos das seções de tipos de ativo (Lançamentos de Ações, FIIs e ETFs) na tela Meus Ativos SHALL NOT exibir o texto descritivo auxiliar sob o título.

#### Scenario: Exibição das seções em Meus Ativos
- **WHEN** o usuário abre a tela Meus Ativos
- **THEN** cada seção SHALL exibir apenas o ícone, o título (ex.: "Lançamentos de Ações") e a contagem de lançamentos
- **AND** o texto descritivo (ex.: "Ações de empresas negociadas na bolsa (ex.: PETR4, VALE3)") SHALL NOT ser exibido
