## Why

A visão em lista da tela "Minhas Ações" já existe mas não é o padrão — o usuário precisa alternar manualmente a cada sessão. No mobile, a tabela lista ainda exibe colunas desnecessárias. Na tela de Lançamentos, o toggle "Agrupar por ticker" adiciona complexidade de UI que não é mais necessária dado o foco no fluxo de registro de transações.

## What Changes

- A visão em **lista** passa a ser o padrão inicial na tela "Minhas Ações" (era cards).
- O layout mobile da tabela lista de "Minhas Ações" é ajustado: colunas reproporcionadas e padding compacto para caber sem rolagem horizontal em telas ~360px.
- O toggle **"Agrupar por ticker"** é removido da tela de Lançamentos, junto com toda a lógica e UI de agrupamento (GroupedRow, groupedData, pagedGrouped, GROUPED_KEY, tabela grouped).

## Capabilities

### New Capabilities

*(nenhuma)*

### Modified Capabilities

- `acoes-list-view`: o padrão inicial muda de cards para lista; ajustes de layout mobile da tabela lista.
- `lancamentos-agrupados-mobile`: **BREAKING** — funcionalidade de agrupamento removida inteiramente; spec aposentada.

## Impact

- `src/app/components/dashboard/dashboard.ts` — mudar `viewMode` de `'cards'` para `'list'`
- `src/app/components/dashboard/dashboard.scss` — ajustes de breakpoint/colunas mobile para `.acoes-list`
- `src/app/components/my-assets/my-assets.ts` — remover `grouped`, `groupRows`, `groupedData`, `pagedGrouped`, `readGrouped`, `toggleGrouped`, `GROUPED_KEY`, `GroupedRow`, `rowsCount` (simplificado)
- `src/app/components/my-assets/my-assets.html` — remover botão `ma-group-toggle` e bloco `grouped` da tabela
- `src/app/components/my-assets/my-assets.scss` — remover estilos `.ma-group-toggle` e `.transactions-table.grouped`
