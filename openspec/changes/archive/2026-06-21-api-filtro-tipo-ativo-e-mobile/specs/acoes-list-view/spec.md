# acoes-list-view — Delta Spec (api-filtro-tipo-ativo-e-mobile)

## Changes from Base Spec

Move a ocultação da coluna Rentabilidade (%) do breakpoint ≤480px para ≤640px (mobile padrão), deixando visíveis apenas Ativo e Saldo em qualquer tela mobile.

## Modified Requirements

### Requirement: Lista exibe campos de posição em colunas — ajuste mobile ≤640px

**DELTA**: A coluna Rentabilidade (%) — `nth-child(7)` — passa a ser ocultada em ≤640px, junto com Qtd, Preço Médio, Hoje e Variação que já eram ocultos nesse breakpoint.

O bloco `@media (max-width: 480px)` adicionado na change anterior (`meus-ativos-resumo-financeiro`) DEVE ser removido por redundância.

#### Scenario: Lista no mobile ≤640px (alterado)

- **WHEN** a visão em lista é exibida em tela ≤640px
- **THEN** apenas as colunas **Ativo** e **Saldo** são exibidas
- **AND** as colunas Qtd, Preço Médio, Hoje, Variação e Rentabilidade ficam ocultas
- **AND** Ativo ocupa ~60% da largura, Saldo ~40%

#### Scenario: Lista no desktop >640px (sem alteração)

- **WHEN** a visão em lista é exibida em tela >640px
- **THEN** todas as 7 colunas são visíveis: Ativo, Qtd, Preço Médio, Hoje, Saldo, Variação, Rentabilidade
