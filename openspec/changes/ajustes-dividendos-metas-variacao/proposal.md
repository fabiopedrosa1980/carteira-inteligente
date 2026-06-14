## Why

Três ajustes de usabilidade e correção de dado: os chips de ano na tela de dividendos aparecem do menor para o maior, dificultando achar o ano corrente; nomes longos de metas quebram o layout da tabela; e a "Variação Hoje" das Minhas Ações diverge do valor real visto no Investidor10/Finance, passando informação incorreta ao usuário.

## What Changes

- **Dividendos**: ordenar os chips de ano do maior para o menor (ano mais recente primeiro), mantendo "Todos" no início.
- **Metas**: truncar o nome da meta com reticências (`...`) quando ultrapassar 15 caracteres, exibindo o nome completo via `title`/tooltip.
- **Minhas Ações**: corrigir o valor de "Variação Hoje", que hoje vem do campo `change_percent` do endpoint `/transactions/acoes` e está divergente. Passar a usar a variação real-time do endpoint de cotação (`StockApiService`, base Yahoo Finance) para sobrescrever a variação exibida.

## Capabilities

### New Capabilities
- `dividend-year-order`: ordem decrescente dos chips de ano no filtro de dividendos.
- `goal-name-truncation`: truncamento com reticências do nome da meta na listagem.
- `daily-change-accuracy`: variação diária das Minhas Ações alinhada à cotação real-time.

### Modified Capabilities
- (nenhuma — os comportamentos existentes em specs arquivadas não têm seus requisitos alterados a nível de spec ativa)

## Impact

- `src/app/components/dividend-history/dividend-history.ts` — `availableYears` (ordenação).
- `src/app/components/goals/goals.html` (e/ou `goals.ts`/`goals.scss`) — truncamento do nome.
- `src/app/components/dashboard/dashboard.ts` — `loadAcoes()` passa a enriquecer a variação com cotação real-time.
- `src/app/services/stock-api.service.ts` — consumo de `getBulkQuotes` para obter `changePercent` correto.
- Sem mudanças de backend (repositório é somente frontend).
