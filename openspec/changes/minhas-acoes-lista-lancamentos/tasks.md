## 1. Minhas Ações — padrão lista

- [x] 1.1 Em `dashboard.ts`, alterar `signal<ViewMode>('cards')` para `signal<ViewMode>('list')`

## 2. Minhas Ações — layout mobile da tabela lista

- [x] 2.1 Em `dashboard.scss`, no breakpoint `@media (max-width: 640px)` do `.acoes-list`, ajustar as larguras das classes `.cl-ativo`, `.cl-saldo` e `.cl-rent` para que as 3 colunas caibam em ~360px sem rolagem horizontal

## 3. Lançamentos — remover agrupamento (lógica)

- [x] 3.1 Em `my-assets.ts`, remover interface `GroupedRow`
- [x] 3.2 Em `my-assets.ts`, remover constante `GROUPED_KEY` e método `readGrouped()`
- [x] 3.3 Em `my-assets.ts`, remover signal `grouped`, método `toggleGrouped()`
- [x] 3.4 Em `my-assets.ts`, remover método `groupRows()` e computed `groupedData`
- [x] 3.5 Em `my-assets.ts`, remover método `pagedGrouped()`
- [x] 3.6 Em `my-assets.ts`, simplificar `rowsCount()` para retornar apenas `sectionData()[sec].length`

## 4. Lançamentos — remover agrupamento (template)

- [x] 4.1 Em `my-assets.html`, remover o botão `ma-group-toggle` do cabeçalho
- [x] 4.2 Em `my-assets.html`, remover o bloco `<div class="transactions-table grouped" *ngIf="grouped()...">` inteiro

## 5. Lançamentos — remover agrupamento (estilos)

- [x] 5.1 Em `my-assets.scss`, remover bloco `.ma-group-toggle` (com todo o CSS interno)
- [x] 5.2 Em `my-assets.scss`, remover bloco `.transactions-table.grouped` (com todo o CSS interno)

## 6. Arquivar specs e verificar

- [x] 6.1 Verificar que a app compila sem erros (`ng build` ou `npm start`)
- [x] 6.2 Confirmar visualmente que "Minhas Ações" abre em lista por padrão
- [x] 6.3 Confirmar que a tabela lista não gera rolagem horizontal em mobile (~360px)
- [x] 6.4 Confirmar que a tela de Lançamentos não exibe mais o botão "Agrupar por ticker"
