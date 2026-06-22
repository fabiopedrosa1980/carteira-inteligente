## ADDED Requirements

### Requirement: Cards de dividendos linkam para a tela de Dividendos

Os cards de resumo **"Dividendos Recebidos"** e **"Dividendos a receber"** na aba Meus Ativos SHALL ser clicáveis e, ao serem acionados, abrir a tela de **Dividendos** já na visão correspondente: "Recebidos" para o card de recebidos e "Projetados" para o card a receber. Os cards MUST ter afford­ância de elemento acionável (cursor, hover) e ser operáveis por teclado (foco + Enter/Espaço), com semântica de botão/link.

#### Scenario: Card Recebidos abre a visão Recebidos

- **WHEN** o usuário clica no card "Dividendos Recebidos"
- **THEN** a aba Dividendos é aberta na visão "Recebidos"

#### Scenario: Card a receber abre a visão Projetados

- **WHEN** o usuário clica no card "Dividendos a receber"
- **THEN** a aba Dividendos é aberta na visão "Projetados"

#### Scenario: Acionável por teclado

- **WHEN** o card está focado e o usuário pressiona Enter ou Espaço
- **THEN** a navegação ocorre como no clique
