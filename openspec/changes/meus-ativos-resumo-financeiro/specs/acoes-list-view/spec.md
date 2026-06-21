# acoes-list-view — Delta Spec (meus-ativos-resumo-financeiro)

## Changes from Base Spec

Ajuste do comportamento de visibilidade de colunas no mobile da tabela lista, adicionando um breakpoint mais restrito para telas muito pequenas.

## Modified Requirements

### Requirement: Lista exibe campos de posição em colunas — ajuste mobile

**DELTA**: Adiciona breakpoint `≤480px` com comportamento mais restrito que o ≤640px existente.

A coluna **Rentabilidade (%)** — `nth-child(7)` — SHALL ser ocultada em viewports ≤480px, deixando visíveis apenas **Ativo** e **Saldo**.

O comportamento ≤640px permanece inalterado: Ativo, Saldo e Rent. visíveis; Qtd, Preço Médio, Hoje e Variação ocultos.

#### Scenario: Lista no mobile ≤640px (sem alteração)

- **WHEN** a visão em lista é exibida em tela ≤640px e >480px
- **THEN** apenas as colunas Ativo, Saldo e Rentabilidade são exibidas
- **AND** as colunas Qtd, Preço Médio, Hoje e Variação (R$) ficam ocultas

#### Scenario: Lista no mobile muito pequeno ≤480px (novo)

- **WHEN** a visão em lista é exibida em tela ≤480px
- **THEN** apenas as colunas Ativo e Saldo são exibidas
- **AND** a coluna Rentabilidade também fica oculta
- **AND** as colunas Qtd, Preço Médio, Hoje e Variação permanecem ocultas
