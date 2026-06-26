# ocultar-valores-global Specification

## Purpose
TBD - created by archiving change ocultar-valores-global-e-msg-alocacao. Update Purpose after archive.
## Requirements
### Requirement: Controle de ocultar valores no menu superior

A aplicação SHALL exibir o controle de **ocultar valores** (ícone de olho) no **menu superior** (`header-actions`), posicionado **logo após o usuário** e junto das demais ações globais (tema, sair). O controle MUST alternar entre ocultar e exibir os valores, refletindo o estado atual no ícone/título acessível.

#### Scenario: Ícone no topo após o usuário

- **WHEN** o usuário autenticado vê o cabeçalho do app
- **THEN** o ícone de ocultar valores aparece no menu superior, após o chip do usuário

#### Scenario: Alterna o estado

- **WHEN** o usuário clica no controle de ocultar valores
- **THEN** o estado de privacidade alterna (ocultar ↔ exibir) e o ícone reflete o novo estado

### Requirement: Ocultar valores aplica-se a todas as telas

Quando a privacidade estiver ativa, a aplicação SHALL mascarar **todos os totais monetários (R$) de todas as telas** — patrimônio e saldos em Meus Ativos, total investido e totais por seção em Lançamentos, totais de Dividendos (recebidos/projetados/mensais) e quaisquer totais em R$ em Metas. Percentuais, contagens e demais dados não-monetários MUST permanecer visíveis. O estado MUST ser compartilhado entre as telas e persistido entre sessões.

#### Scenario: Totais ocultos em todas as telas

- **WHEN** a privacidade está ativa
- **THEN** os totais em R$ de Meus Ativos, Lançamentos, Dividendos e Metas aparecem mascarados

#### Scenario: Percentuais permanecem visíveis

- **WHEN** a privacidade está ativa
- **THEN** percentuais (ex.: rentabilidade, alocação) e contagens continuam visíveis

#### Scenario: Estado persiste entre sessões

- **WHEN** o usuário ativa a privacidade e recarrega o app
- **THEN** os valores continuam ocultos após o reload

#### Scenario: Exibir volta a mostrar os totais

- **WHEN** a privacidade é desativada
- **THEN** todos os totais em R$ voltam a ser exibidos em todas as telas

