## MODIFIED Requirements

### Requirement: Radar de proventos por mês

A sub-tab "Radar" SHALL oferecer duas visualizações (Cards e Matriz) com um alternador por ícones, sendo a Matriz o padrão (lembrado entre sessões). Em ambas, o mês com mais ativos SHALL receber um ícone de estrela e o próximo mês SHALL receber "Oportunidade de compra" com ícone de atenção; uma legenda explica os ícones.

Na **visualização em cards**, o ícone de estrela do mês com mais ativos SHALL ser exibido **antes do texto "Melhor mês"** (na própria tag de destaque), e o nome do mês SHALL ser exibido sem a estrela.

#### Scenario: Estrela antes de "Melhor mês" no card
- **WHEN** o card do mês com mais ativos é exibido
- **THEN** a estrela aparece imediatamente antes do texto "Melhor mês", e o nome do mês não exibe a estrela
