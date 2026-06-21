## Why

A tela "Meus Ativos" exibe os acordeões de ativos mas não oferece nenhuma visão consolidada da carteira — o usuário precisa somar mentalmente os valores de cada grupo para entender o estado financeiro do portfólio. O layout mobile da tabela também pode ser comprimido em telas menores.

## What Changes

- Adicionar um **bloco de resumo financeiro** acima dos acordeões com 4 métricas: Patrimônio Total, Valor Investido, Lucro e Dividendos Recebidos.
- O bloco usa layout hierárquico: Patrimônio em destaque (hero), as outras 3 métricas numa sub-linha compacta.
- No mobile (≤480px), a tabela de lista passa a exibir apenas **Ativo** e **Saldo**, ocultando Rent. para evitar compressão em telas pequenas (≤375px).

## Capabilities

### New Capabilities

- `meus-ativos-resumo`: bloco de resumo financeiro acima dos acordeões com Patrimônio, Investido, Lucro e Dividendos.

### Modified Capabilities

- `acoes-list-view`: ajuste de colunas visíveis no mobile (ocultar Rent. em ≤480px).

## Impact

- `src/app/components/dashboard/dashboard.ts` — adicionar computed de `patrimonioTotal`, `valorInvestido`, `lucroTotal`, `dividendosRecebidos`.
- `src/app/components/dashboard/dashboard.html` — inserir bloco `.portfolio-summary` antes das `sections-list`.
- `src/app/components/dashboard/dashboard.scss` — estilos do bloco de resumo + ajuste breakpoint mobile ≤480px para a tabela.
