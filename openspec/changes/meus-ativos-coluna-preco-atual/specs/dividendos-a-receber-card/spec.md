## ADDED Requirements

### Requirement: Card de Dividendos a receber em Meus Ativos

Nos cards de Patrimônio da aba "Meus Ativos", o sistema SHALL exibir um card **"Dividendos a receber"** com o total de proventos **ainda a receber no ano corrente**. O valor SHALL usar a mesma lógica da tela Dividendos → Projetados: para cada ticker da carteira (Ações + FIIs), somar `amount × cotas atuais` dos proventos do ano corrente cuja **data de pagamento seja de hoje em diante** (`pay_date >= hoje`). O card MUST seguir o mesmo padrão visual dos demais cards de Patrimônio (ex.: "Dividendos Recebidos") e MUST exibir o valor formatado em moeda BRL. Quando não houver proventos projetados, o valor exibido SHALL ser `R$ 0,00`.

#### Scenario: Total a receber exibido

- **WHEN** a aba "Meus Ativos" é exibida e há proventos do ano corrente com pagamento de hoje em diante
- **THEN** o card "Dividendos a receber" mostra a soma de `amount × cotas atuais` desses proventos, formatada em BRL

#### Scenario: Paridade com a tela Projetados

- **WHEN** o valor do card é calculado
- **THEN** ele coincide com o total apresentado na tela Dividendos → Projetados para o mesmo escopo de ativos (Ações + FIIs)

#### Scenario: Apenas proventos futuros do ano

- **WHEN** um provento do ano corrente já teve a data de pagamento no passado (`pay_date < hoje`)
- **THEN** esse provento NÃO entra no total de "Dividendos a receber"

#### Scenario: Sem proventos projetados

- **WHEN** não há proventos do ano corrente a receber
- **THEN** o card exibe `R$ 0,00` sem quebrar o layout dos cards de Patrimônio
