## 1. Lançamentos — ações na linha do Total (card mobile)

- [x] 1.1 Em `my-assets.scss`, no `@media (max-width: 600px)` da `.table-row`, mudar para `grid-template-columns: 1fr 1fr auto` e `grid-template-areas: 'ticker ticker ticker' / 'data data qtd' / 'preco total actions'`.
- [x] 1.2 Ajustar `.action-cell` no mobile para `grid-area: actions`, `justify-self: end`, alinhado verticalmente com o Total; conferir alvo de toque dos botões.
- [x] 1.3 Conferir que `.ticker-cell`, `.date-cell`, `.qty-cell`, `.price-cell`, `.total-cell` e seus micro-rótulos `::before` continuam corretos no novo grid, sem rolagem horizontal.

## 2. Lançamentos — remover botão "+" do cabeçalho

- [x] 2.1 Em `my-assets.html`, remover o `<span class="btn-add-sec">…</span>` do `.ah-right` (mantendo total e chevron).
- [x] 2.2 Em `my-assets.scss`, remover o bloco `.btn-add-sec` e reverter o `gap` mobile do `.ah-right` de 6px para 8px.
- [x] 2.3 Confirmar que o botão "Adicionar" do rodapé (`.btn-add-inline`) continua chamando `openAdd(sec.id)` com o tipo correto.

## 3. Meus Ativos — olho oculta também a Alocação

- [x] 3.1 Em `allocation-card.ts`, adicionar `@Input() hideValues = false`.
- [x] 3.2 Em `allocation-card.html`, aplicar `[class.values-hidden]="hideValues"` na raiz `.alloc-card`.
- [x] 3.3 Em `allocation-card.scss`, mascarar (`filter: blur(8px); user-select: none`) os valores em R$: `.alloc-total` e os montantes do ledger (`.act.st-abaixo`, `.act.st-acima`), preservando `.num` (percentuais) e `✓ no alvo`.
- [x] 3.4 Em `dashboard.html`, passar `[hideValues]="valoresOcultos()"` ao `<app-allocation-card>`.

## 4. Meus Ativos — fonte reduzida do valor dos cards

- [x] 4.1 Em `dashboard.scss`, reduzir `.ps-card-value` (15px→14px), `.ps-card-hero .ps-card-value` (22px→19px) e o hero no mobile (17px→16px), mantendo o destaque relativo do Patrimônio.

## 5. Histórico de Dividendos — valor sem corte no mobile

- [x] 5.1 Em `dividend-history.scss`, no `@media (max-width: 480px)`, rebalancear as larguras do `<colgroup>` (Tipo menor, Valor maior) e reduzir o padding horizontal das células.
- [x] 5.2 Alinhar a coluna "Valor" à direita e remover `overflow:hidden`/`text-overflow:ellipsis` da célula de valor (mantendo `white-space: nowrap`), garantindo o valor completo.
- [x] 5.3 Validar com valores grandes (ex.: "R$ 12.345,67") em larguras estreitas (até 360px): nada cortado e sem rolagem horizontal.

## 6. Validação

- [x] 6.1 `npx prettier --write` nos arquivos alterados.
- [x] 6.2 `ng build` sem erros.
- [x] 6.3 Conferir no mobile: card de lançamento com ações na linha do Total; sem "+" no cabeçalho; olho oculta resumo + Alocação; valores do Histórico completos. No desktop: fonte do valor reduzida e demais telas inalteradas.
