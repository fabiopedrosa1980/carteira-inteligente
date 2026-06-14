## 1. Dividendos — anos em ordem decrescente

- [x] 1.1 Em `dividend-history.ts`, alterar `availableYears` para gerar os anos do maior para o menor: `Array.from({ length: 5 }, (_, i) => currentYear - i)`.
- [x] 1.2 Verificar no `dividend-history.html` que o `*ngFor` dos chips reflete a nova ordem e que "Todos" permanece primeiro (sem mudança de template esperada).

## 2. Metas — truncar nome com reticências

- [x] 2.1 Em `goals.ts`, adicionar método `truncateName(name: string): string` que retorna `name.length > 15 ? name.slice(0, 15) + '…' : name`.
- [x] 2.2 Em `goals.html` (linha do `meta-name-cell`), exibir `{{ truncateName(meta.name) }}` e adicionar `title="{{ meta.name }}"` para o tooltip com o nome completo.

## 3. Minhas Ações — variação diária real-time

- [x] 3.1 Em `dashboard.ts`, injetar `StockApiService`.
- [x] 3.2 Em `loadAcoes()`, após receber os `ApiAcaoItem[]`, chamar `getBulkQuotes(tickers)` e fazer merge: usar `quote.changePercent` quando `found`, senão manter `item.change_percent`.
- [x] 3.3 Garantir fallback em caso de falha da cotação (preservar valores originais) e que `sortedStocks`/`maxChange`/`topChangeStock` usem o valor corrigido.

## 4. Validação

- [x] 4.1 Rodar `ng build` para garantir compilação sem erros.
- [ ] 4.2 Conferir manualmente: ordem dos anos, truncamento da meta com tooltip, e variação alinhada ao Investidor10/Finance.
- [x] 4.3 Rodar `npx prettier --write` nos arquivos alterados e commitar com prefixo `feat:`/`fix:` por escopo.
