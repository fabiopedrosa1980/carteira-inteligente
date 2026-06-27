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

Quando a privacidade estiver ativa, a aplicação SHALL mascarar **todos os totais e valores monetários (R$) de todas as telas**. Isso inclui, explicitamente e por linha:

- **Meus Ativos** (Dashboard): patrimônio, totais por seção e o **Saldo de cada ativo** na tabela/cards.
- **Lançamentos**: total investido (cabeçalho), totais por seção e o **Total de cada lançamento** (total da operação = qtd × preço) na tabela/cards.
- **Dividendos**: totais (recebidos/projetados/mensais).
- **Metas**: quaisquer totais em R$.

Percentuais, contagens, datas e demais dados não-monetários MUST permanecer visíveis. O mascaramento MUST preservar o layout (sem mudança de tamanho nem rolagem) e valer tanto no desktop quanto no mobile (cards). O estado MUST ser compartilhado entre as telas e persistido entre sessões.

#### Scenario: Totais ocultos em todas as telas

- **WHEN** a privacidade está ativa
- **THEN** os totais em R$ de Meus Ativos, Lançamentos, Dividendos e Metas aparecem mascarados

#### Scenario: Saldo por ativo mascarado em Meus Ativos

- **WHEN** a privacidade está ativa e a tabela "Meus Ativos" do Dashboard é exibida
- **THEN** a coluna/célula **Saldo** de cada ativo aparece mascarada (incluindo o card mobile)

#### Scenario: Total da operação mascarado em Lançamentos

- **WHEN** a privacidade está ativa e a tela "Lançamentos" é exibida
- **THEN** a coluna/célula **Total** de cada lançamento aparece mascarada (incluindo o card mobile)

#### Scenario: Percentuais permanecem visíveis

- **WHEN** a privacidade está ativa
- **THEN** percentuais (ex.: rentabilidade, alocação) e contagens continuam visíveis

#### Scenario: Estado persiste entre sessões

- **WHEN** o usuário ativa a privacidade e recarrega o app
- **THEN** os valores continuam ocultos após o reload

#### Scenario: Exibir volta a mostrar os totais

- **WHEN** a privacidade é desativada
- **THEN** todos os totais e valores em R$ (incluindo Saldo por ativo e Total por lançamento) voltam a ser exibidos

