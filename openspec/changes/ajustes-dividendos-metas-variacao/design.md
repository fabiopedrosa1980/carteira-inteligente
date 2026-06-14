## Context

Repositório frontend-only (Angular 21, standalone, signals). Três ajustes pontuais:

1. `DividendHistoryComponent.availableYears` (`dividend-history.ts:28`) gera os anos com `currentYear - 4 + i`, resultando em ordem crescente; o template itera `*ngFor="let y of availableYears()"`.
2. `goals.html:73` exibe `{{ meta.name }}` sem limite de comprimento.
3. `DashboardComponent.loadAcoes()` (`dashboard.ts:102`) mapeia `change_percent` do endpoint `/transactions/acoes` direto para `changePercent`. Esse valor está divergente do real. Existe `StockApiService.getBulkQuotes(tickers)` que retorna `changePercent` real-time (Yahoo) via `/quotes?tickers=...`.

## Goals / Non-Goals

**Goals:**
- Anos do filtro de dividendos em ordem decrescente, "Todos" primeiro.
- Nome de meta truncado em 15 chars com `...` e tooltip com nome completo.
- "Variação Hoje" das Minhas Ações usando variação real-time, com fallback ao valor original.

**Non-Goals:**
- Nenhuma mudança no backend (não está neste repo).
- Não alterar cálculo de preço, DY ou nota das ações.
- Não mexer na ordenação/paginação de dividendos além da ordem dos chips.

## Decisions

- **Anos decrescentes**: inverter a geração em `availableYears` (`currentYear - i`, `i` de 0 a 4) ou aplicar `.reverse()`. Preferir gerar já decrescente: `Array.from({length:5},(_,i)=>currentYear-i)`. Sem mudança no template.
- **Truncamento de meta**: feito no template para manter `meta.name` intacto no model. Usar atributo `title="{{ meta.name }}"` na célula e exibir o texto via um método helper `truncate(name, 15)` em `goals.ts` (retorna `name.length > 15 ? name.slice(0,15) + '…' : name`). Alternativa puramente CSS (`text-overflow: ellipsis`) foi descartada porque o requisito é limite por nº de caracteres (15), não por largura.
- **Variação real-time**: em `loadAcoes()`, após obter os `ApiAcaoItem[]`, chamar `StockApiService.getBulkQuotes(tickers)` e fazer merge: para cada ação, se houver quote `found` correspondente, usar `quote.changePercent`; caso contrário manter `item.change_percent`. Injetar `StockApiService` no `DashboardComponent`. Manter a atualização das demais propriedades como está. As computeds `sortedStocks`, `maxChange`, `topChangeStock` passam a usar o valor corrigido automaticamente.

## Risks / Trade-offs

- **Chamada extra de rede** (`/quotes`) no carregamento das Minhas Ações: aceitável; é uma única chamada em lote. Em caso de falha, `catchError` no service já devolve quotes vazias e o fallback preserva os valores originais.
- **Divergência residual**: a base Yahoo pode diferir levemente do Investidor10 em horários de fechamento, mas é a fonte real-time já usada na busca de ticker, então fica consistente dentro do app.
- **Truncamento por caracteres** pode cortar no meio de palavra; aceitável dado o requisito explícito de 15 chars. Tooltip garante leitura do nome completo.
