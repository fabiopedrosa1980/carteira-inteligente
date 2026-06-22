## ADDED Requirements

### Requirement: Estado vazio usa o ícone do sub-menu de cada tela

Nos estados vazios das telas de dividendos, o ícone exibido SHALL ser o **mesmo ícone do sub-menu (aba)** correspondente à tela, em vez de um ícone genérico de calendário. O mapeamento MUST ser: **Histórico** → ícone de Histórico; **Recebidos** → ícone de Recebidos; **Projetados** → ícone de Projetados; **Radar** → ícone de Radar. A tela de Resumo (que atende Recebidos e Projetados) MUST escolher o ícone conforme o modo exibido. O restante do estado vazio (título e texto) permanece inalterado.

#### Scenario: Ícone do Histórico

- **WHEN** o estado vazio da tela de Histórico é exibido
- **THEN** o ícone do estado vazio é o ícone da aba "Histórico"

#### Scenario: Ícone de Recebidos e Projetados

- **WHEN** o estado vazio da tela de Recebidos é exibido
- **THEN** o ícone é o da aba "Recebidos"
- **AND** quando o estado vazio de Projetados é exibido, o ícone é o da aba "Projetados"

#### Scenario: Ícone do Radar

- **WHEN** o estado vazio do Radar é exibido
- **THEN** o ícone do estado vazio é o ícone da aba "Radar"
