## Why

Na listagem de "Meus Ativos" no mobile, o conjunto de colunas atual (Ativo, Qtde, Variação, Total/Saldo) não é o que o usuário quer ver. Ele prefere acompanhar **Rentabilidade** e **Saldo** ao lado de Ativo e Quantidade, com larguras específicas para caber bem na tela estreita.

## What Changes

- Na tabela `.acoes-list` em mobile (≤640px), exibir **apenas 3 colunas**: **Ativo, Quantidade e Rentabilidade** (ocultar Preço Médio, Hoje, Saldo e Variação).
- Larguras das colunas no mobile: **Ativo 15%**, **Qtde 15%** e **Rentabilidade ~70%**.
- Desktop permanece com todas as colunas.

## Capabilities

### New Capabilities
- `meus-ativos-mobile-colunas`: Define o conjunto e as larguras das colunas da listagem de "Meus Ativos" no mobile (Ativo, Qtde, Rentabilidade, Saldo).

### Modified Capabilities

## Impact

- `src/app/components/dashboard/dashboard.scss` — media query `@media (max-width: 640px)` da `.acoes-list`: colunas ocultas e larguras `.cl-*`.
- Sem mudanças de HTML, TS, API ou modelo de dados.
