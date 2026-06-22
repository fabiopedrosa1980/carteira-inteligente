## ADDED Requirements

### Requirement: Cotação atual no card de ativo no mobile

Na aba "Meus Ativos", em mobile (largura ≤640px), o card de cada ativo SHALL exibir o **Preço Atual** (cotação corrente do ticker, `stock.price`), com **rótulo próprio** que o identifique (ex.: "Preço atual"), posicionado junto ao **Preço Médio** para permitir comparação. O valor MUST ser formatado em moeda BRL e exibir "—" quando a cotação estiver ausente ou for zero. O card MUST permanecer contido, sem rolagem horizontal da página. No desktop a coluna "Preço Atual" já existente permanece inalterada.

#### Scenario: Preço atual visível no card mobile

- **WHEN** a aba "Meus Ativos" é exibida em mobile (≤640px) com um ativo que possui cotação atual
- **THEN** o card do ativo mostra o Preço Atual formatado em BRL, com rótulo próprio
- **AND** ele aparece junto ao Preço Médio, permitindo comparar custo e cotação

#### Scenario: Ticker sem cotação no mobile

- **WHEN** um ativo não possui cotação atual válida (preço ausente ou zero)
- **THEN** o card exibe "—" no Preço Atual, sem quebrar o layout

#### Scenario: Desktop inalterado

- **WHEN** a aba "Meus Ativos" é exibida no desktop (>640px)
- **THEN** a coluna "Preço Atual" continua exibida na tabela como antes, sem alteração
