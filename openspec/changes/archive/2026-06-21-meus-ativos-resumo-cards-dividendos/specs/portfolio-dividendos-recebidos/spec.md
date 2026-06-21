## ADDED Requirements

### Requirement: Card "Dividendos Recebidos" com a lógica da tela Recebidos

O card de proventos no resumo de "Meus Ativos" SHALL ser rotulado **"Dividendos Recebidos"** (substituindo "Dividendos Hist.") e o valor exibido MUST ser calculado com a **mesma lógica** da tela Dividendos → Recebidos: considerar apenas proventos do **ano corrente** já pagos (com `pay_date` anterior à data de hoje) e somar, por ativo, `valor do provento × cotas elegíveis`, onde cotas elegíveis são as dos lançamentos cuja data é **anterior ou igual à data-com** (`ex_date`). A resolução de ano/mês do provento MUST usar fallback para a data de pagamento quando `year`/`month` não vierem preenchidos (paridade com `yearOf`/`monthOf` da tela).

O total do card MUST corresponder à soma **Recebidos(Ações) + Recebidos(FIIs)** — as duas classes da tela; ETFs ficam de fora. A função de cálculo MUST ser **compartilhada** entre o card e a tela Recebidos (implementação única) para garantir que os valores coincidam.

#### Scenario: Total coincide com Ações + FIIs da tela Recebidos

- **WHEN** o card "Dividendos Recebidos" é exibido e há proventos pagos no ano corrente em Ações e FIIs
- **THEN** o valor do card é igual à soma do total da aba Recebidos com classe "Ações" e do total com classe "FIIs"
- **AND** proventos de ETFs não entram no total

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
