## ADDED Requirements

### Requirement: Card "Dividendos Recebidos" com a lógica da tela Recebidos

O card de proventos no resumo de "Meus Ativos" SHALL ser rotulado **"Dividendos Recebidos"** (substituindo "Dividendos Hist.") e o valor exibido MUST ser calculado com a **mesma lógica** da tela Dividendos → Recebidos: considerar apenas proventos do **ano corrente** já pagos (com `pay_date` anterior à data de hoje) e somar, por ativo, `valor do provento × cotas elegíveis`, onde cotas elegíveis são as dos lançamentos cuja data é **anterior ou igual à data-com** (`ex_date`). O total do card MUST ser a soma desses valores entre todos os ativos da carteira.

#### Scenario: Rótulo atualizado

- **WHEN** o resumo de "Meus Ativos" é exibido
- **THEN** o card de proventos mostra o rótulo "Dividendos Recebidos"
- **AND** não há mais o rótulo "Dividendos Hist."

#### Scenario: Valor coincide com a lógica da tela Recebidos

- **WHEN** a carteira possui proventos pagos no ano corrente
- **THEN** o valor do card considera somente proventos do ano corrente com `pay_date` anterior a hoje
- **AND** cada provento é multiplicado pelas cotas elegíveis (lançamentos com data ≤ data-com)
- **AND** o total é a soma desses valores entre os ativos

#### Scenario: Proventos futuros ou de outros anos não entram

- **WHEN** existem proventos com `pay_date` futuro ou de anos anteriores
- **THEN** esses proventos não são somados no card "Dividendos Recebidos"
