## ADDED Requirements

### Requirement: Agrupar lançamentos por ticker

A tela de Lançamentos SHALL oferecer uma opção para **agrupar por ticker**. Quando ativada, cada seção (Ações/FIIs/ETFs) SHALL exibir uma linha por ativo, com a **quantidade somada**, o **preço médio ponderado** (custo total ÷ quantidade total) e o valor total do ativo. Quando desativada, a lista detalhada (uma linha por lançamento) SHALL ser exibida. A escolha SHALL ser lembrada entre sessões.

#### Scenario: Ativar agrupamento
- **WHEN** o usuário ativa "Agrupar por ticker"
- **THEN** cada seção mostra uma linha por ativo com quantidade somada, preço médio e total

#### Scenario: Preço médio ponderado
- **WHEN** um ativo tem vários lançamentos com preços diferentes
- **THEN** o preço médio exibido é a média ponderada pela quantidade (Σ quantidade×preço ÷ Σ quantidade)

#### Scenario: Modo detalhado preservado
- **WHEN** o agrupamento está desativado
- **THEN** a tela mostra a lista detalhada atual, com uma linha por lançamento e ações de editar/remover

#### Scenario: Sem ações por linha no agrupado
- **WHEN** o agrupamento está ativado
- **THEN** as linhas agrupadas não exibem editar/remover nem data (são agregados)

#### Scenario: Preferência lembrada
- **WHEN** o usuário escolhe um modo e volta à tela depois
- **THEN** o modo escolhido anteriormente é exibido
