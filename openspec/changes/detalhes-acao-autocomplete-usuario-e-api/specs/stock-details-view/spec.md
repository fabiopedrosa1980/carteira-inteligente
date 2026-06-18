## ADDED Requirements

### Requirement: Detalhes da ação ao clicar no card

Na tela Minhas Ações, clicar em um card de ação SHALL abrir uma visualização de detalhes da ação, exibindo no mínimo: ticker, nome, preço, variação do dia, dividend yield, nota e setor, além do histórico de dividendos da ação. A visualização SHALL poder ser fechada, retornando à lista.

#### Scenario: Abrir detalhes
- **WHEN** o usuário clica em um card de ação
- **THEN** uma visualização de detalhes da ação é aberta com seus dados principais e histórico de dividendos

#### Scenario: Fechar detalhes
- **WHEN** o usuário fecha a visualização de detalhes
- **THEN** a visualização é encerrada e a lista de ações permanece visível

#### Scenario: Indicadores quando disponíveis
- **WHEN** a ação possui indicadores fundamentais retornados pela API
- **THEN** os indicadores são exibidos na visualização de detalhes
