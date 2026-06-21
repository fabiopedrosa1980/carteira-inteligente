## 1. Card/grid no mobile

- [x] 1.1 Em `my-assets.scss`, na media query ≤600px, ocultar `.table-header` (`display: none`).
- [x] 1.2 Converter `.table-row` (≤600px) em `display: grid` com `grid-template-areas` (ticker/actions, data/qtd, preco/total); atribuir `grid-area` a `.ticker-cell`, `.action-cell`, `.date-cell`, `.qty-cell`, `.price-cell`, `.total-cell`.
- [x] 1.3 Reverter o `display: none` de `.date-cell` e `.price-cell` no mobile.
- [x] 1.4 Estilo de card: borda, `border-radius`, padding, espaçamento entre cards (margin/gap); números em mono; manter destaque do Total.
- [x] 1.5 Micro-rótulos via `::before` (sans, caixa-alta, `--text-secondary`): "Data", "Qtd", "Preço unit.", "Total"; sem rótulo em ticker e ações.
- [x] 1.6 `.action-cell` posicionada no topo direito do card; garantir truncamento (`min-width: 0`) nas células de valor.

## 2. Verificação

- [x] 2.1 `npx prettier --write "src/app/components/my-assets/my-assets.scss" "src/app/components/my-assets/my-assets.html"`.
- [x] 2.2 `ng build` sem erros.
- [ ] 2.3 Mobile (≤600px): cada lançamento é um card com Ativo, Data, Qtd, Preço unit. e Total + botões Editar/Remover; sem rolagem horizontal.
- [ ] 2.4 Clique no card abre edição; botões Editar/Remover funcionam sem abrir o modal indevidamente; paginação/adicionar ok.
- [ ] 2.5 Desktop: tabela inalterada.
- [x] 2.6 Commit e push.
