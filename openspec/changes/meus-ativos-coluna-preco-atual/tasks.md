## 1. Coluna de Preço Atual — Meus Ativos (portfolio)

- [x] 1.1 Em `dashboard.html`, adicionar `<col class="cl-preco-atual" />` no `colgroup` e o `<th>` "Preço Atual" ao lado de "Preço Médio" na tabela `acoes-list`.
- [x] 1.2 Adicionar a `<td>` exibindo `stock.price` formatado em BRL, com fallback "—" quando ausente/0.
- [x] 1.3 (Opcional) Tornar a coluna ordenável seguindo o padrão `th-sortable`/`setSort` — adicionado `precoAtual` ao `SortField` e ao `sortedStocks`.
- [x] 1.4 Ajustar `dashboard.scss` — colunas shiftadas no card mobile; Preço Atual oculto no mobile (redundante com o Saldo), visível no desktop.

## 2. Coluna de Preço Atual — Lançamentos (my-assets)

> DESCOPADO a pedido do usuário: a coluna de Preço Atual NÃO entra na tela de Lançamentos (mantida apenas em "Meus Ativos").

- [x] 2.1 ~~Helper de cotação por ticker em `my-assets`~~ — não aplicável (descopado).
- [x] 2.2 ~~Coluna "Preço Atual" na tabela de Lançamentos~~ — não aplicável (descopado).
- [x] 2.3 ~~Ajuste de grid/responsividade~~ — `my-assets.scss` mantido no layout original (5 colunas + ações).

## 3. Cabeçalho do acordeão de Lançamentos — total rotulado

> DESCOPADO a pedido do usuário: a rentabilidade NÃO entra no cabeçalho de Lançamentos. Mantido apenas o total rotulado e alinhado à direita.

- [x] 3.1 ~~Helpers de saldo/custo/rentabilidade em `my-assets`~~ — não aplicável (descopado).
- [x] 3.2 Em `my-assets.html`, mover o `sec-total` para o bloco `ah-right`, adicionar rótulo "Total" e alinhar o valor à direita (padrão "label e valor" do acordeão de Meus Ativos).
- [x] 3.3 ~~`sec-rent` (rentabilidade do tipo)~~ — não aplicável (descopado).
- [x] 3.4 Ajustar `my-assets.scss` — cabeçalho em flex com total à direita; `sec-metric`/`sec-cap` para o par rótulo+valor; mobile sem rolagem horizontal.

## 4. Rótulos no cabeçalho de Meus Ativos

- [x] 4.1 Em `dashboard.html`, envolver `sec-total`/`sec-rent` em `sec-metric` com rótulos "Total" e "Rent.", sem alterar o cálculo.
- [x] 4.2 Ajustar `dashboard.scss` (`sec-metric`/`sec-cap`) — rótulos compactos, cabeçalho contido no mobile, contagem visível.

## 5. Card "Dividendos a receber" — Meus Ativos

- [x] 5.1 Em `dividends-received.util.ts`, criar `projectedByMonth`/`projectedForTicker` (ano corrente, `pay_date >= hoje`, `amount × cotas`).
- [x] 5.2 Refatorar `DividendsSummaryComponent.computeProjected` para consumir `projectedByMonth`, garantindo paridade.
- [x] 5.3 Em `dashboard.ts`, criar `dividendosAReceber = computed(...)` somando `projectedForTicker` sobre os tickers de Ações + FIIs.
- [x] 5.4 Em `dashboard.html`, adicionar o card "Dividendos a receber" ao lado de "Dividendos Recebidos" nos `ps-cards`.

## 6. Ajustes adicionais (solicitados durante a implementação)

- [x] 6.1 Em `dashboard.scss`, exibir os cards de indicadores (`ps-cards`) em **3 por linha no web** (`repeat(3, 1fr)`).
- [x] 6.2 Em `my-assets.html`, manter o rótulo "Operação" no cabeçalho da tabela de Lançamentos (coluna de edição/exclusão).

## 7. Verificação

- [x] 7.1 `npx prettier --write` nos arquivos alterados e `ng build` sem erros.
- [ ] 7.2 Validar visualmente as duas telas no desktop e mobile (≤600px): coluna de Preço Atual em Meus Ativos, cabeçalhos com total rotulado/alinhado, 3 cards por linha, sem rolagem horizontal.
- [ ] 7.3 Conferir que o card "Dividendos a receber" coincide com o total da tela Dividendos → Projetados.
