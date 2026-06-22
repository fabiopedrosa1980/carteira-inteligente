## 1. Helpers de rótulo no Dashboard

- [x] 1.1 Em `dashboard.ts`, adicionar `descontoLabel(pct)` equivalente ao de `StockDetailsModalComponent` (para "Preço atual vs teto")
- [x] 1.2 Garantir import de `PrecoTetoResult` de `models/preco-teto.util` em `dashboard.ts`

## 2. Markup do tooltip

- [x] 2.1 Em `dashboard.html`, na célula `cell-oportunidade`, computar `@let t = precoTetoOf(stock)` e envolver o badge num contêiner com o tooltip
- [x] 2.2 Renderizar a grade com exatamente cinco campos (rótulo + valor), na formatação da tela de detalhe: "Yield-alvo", "Preço-teto", "Preço justo", "DPA (12m)" (→ "Rendimento (12m)" para FIIs) e "Preço atual vs teto" (via `descontoLabel`)
- [x] 2.3 Não exibir veredito de zona nem P/VP no tooltip
- [x] 2.4 Tratar estados sem veredito: mensagem de histórico insuficiente em `sem-dados` e indicação de "não se aplica" em `na`, omitindo a grade
- [x] 2.5 Garantir que o clique na linha continue abrindo o detalhe (não interceptar o evento no tooltip)

## 3. Estilos

- [x] 3.1 Em `dashboard.scss`, dar `position: relative` à `.cell-oportunidade` e estilizar o popover (posicionamento absoluto, fundo, sombra, espaçamento)
- [x] 3.2 Revelar o tooltip via `:hover`/`:focus-within` e mantê-lo oculto por padrão
- [x] 3.3 Ajustar posicionamento para não ser cortado pela borda da tabela/overflow do contêiner

## 4. Verificação

- [x] 4.1 Rodar `ng build` e validar ausência de erros
- [ ] 4.2 Conferir manualmente: ação com veredito, FII (rótulo "Rendimento (12m)"), ativo "sem-dados" e ETF (n/a) — os cinco campos e seus rótulos coincidem com a tela de detalhe
- [x] 4.3 Rodar `npx prettier --write` nos arquivos alterados
