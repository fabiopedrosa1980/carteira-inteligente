## 1. Dimensionar colunas por conteúdo (desktop)

- [x] 1.1 Em `my-assets.scss`, substituir `grid-template-columns: repeat(5, minmax(0, 1fr)) 72px` de `.table-header` e `.table-row` por colunas por conteúdo: `max-content` para Ativo, Data, Qtd. e Preço Unit.; `minmax(0,1fr)` para Total; `auto` para Operação.
- [x] 1.2 Garantir que `.table-header` e `.table-row` usem exatamente o mesmo template para manter o alinhamento.
- [x] 1.3 Manter `min-width:0; overflow:hidden; text-overflow:ellipsis; white-space:nowrap` nas células (especialmente Total).

## 2. Ajustar mobile (≤600px)

- [x] 2.1 Na media query `@media (max-width: 600px)` de `.table-header` e `.table-row`, trocar `repeat(3, minmax(0,1fr)) 56px` por `max-content max-content minmax(0,1fr) auto` (Ativo · Qtd · Total · Operação), confirmando que o nº de trilhas casa com as 4 colunas visíveis.
- [x] 2.2 Substituir a largura fixa `56px` da coluna de ações por largura que comporte os dois botões de 30px + gap (usar `auto`), evitando corte.
- [x] 2.3 Conferir que Data (nth-child 2) e Preço (nth-child 4) seguem ocultas via `display:none` e que isso não desalinha o grid.

## 3. Fechar modal: atualizar tela chamadora e re-somar

- [x] 3.1 Em `stock-data.service.ts`, expor método público `reload()` que reexecuta `fetchPortfolioStocks()` (tornar a busca acionável fora do construtor).
- [x] 3.2 Em `my-assets.ts`, injetar `StockDataService` e, em `closeModal()` (ou no callback de salvar), chamar `stockData.reload()` para recarregar a carteira agregada após adicionar/editar.
- [x] 3.3 Em `remove()` (após confirmação e remoção), chamar `stockData.reload()` para refletir a exclusão nas somas derivadas da carteira.
- [x] 3.4 Confirmar que contagem da seção, total por seção e total geral já reagem via signals/computed de `TransactionService` (sem regressão).

## 4. Verificação

- [x] 4.1 Rodar `npx prettier --write "src/app/components/my-assets/my-assets.scss" "src/app/components/my-assets/my-assets.ts" "src/app/services/stock-data.service.ts"`.
- [x] 4.2 `ng build` sem erros.
- [ ] 4.3 Validar no mobile (≤600px) e em ~360px: ticker, Qtd, Total e os dois botões de ação visíveis e completos; sem rolagem horizontal da página; sem estouro de linha.
- [ ] 4.4 Validar no desktop: header e linhas alinhados, Total sem corte.
- [ ] 4.5 Validar fluxo: adicionar/editar/remover lançamento fecha o modal e atualiza contagens, totais por seção e total geral; carteira agregada recarregada.
- [x] 4.6 Commit e push (`fix: dimensiona colunas de Lançamentos pelo conteúdo e re-soma ao fechar modal`).
