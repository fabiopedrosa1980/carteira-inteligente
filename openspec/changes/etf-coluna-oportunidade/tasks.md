## 1. Métrica e helpers do ETF (dashboard.ts)

- [x] 1.1 Reescrever `etfZonaClass` para derivar de `desvioTopo = (price − high52) / high52`: `> −0,07` → `zona-caro`; `[−0,15, −0,07]` → `zona-justo`; `< −0,15` → `zona-compra`. Inválido (`high52 ≤ 0` ou `price ≤ 0`) → `zona-na`. Limiares como constantes.
- [x] 1.2 Adicionar helper `etfOportunidade(s)` retornando `{ available, zona, high52, low52, price, desvioTopo }` para alimentar badge e tooltip.
- [x] 1.3 Estender `oportunidadeBadge` com ramo ETF: `n/a` quando indisponível; senão `emoji + sinal + |round(desvioTopo*100)|%` (ex.: `🟢 −22%`).
- [x] 1.4 Adicionar veredito ETF por zona (compra/justo/caro/na) para o topo do tooltip.

## 2. Coluna e tooltip para ETF (dashboard.html)

- [x] 2.1 Remover os três `@if (group !== 'ETF')` (colgroup `cl-hoje`, `<th>` Oportunidade, `<td class="cell-oportunidade">`) para a coluna aparecer no ETF.
- [x] 2.2 Tornar o conteúdo do tooltip condicional: ETF mostra Mínima 52 sem, Máxima 52 sem, Preço atual, Distância do topo + veredito + disclaimer; Ações/FIIs mantêm o grid de preço-teto.
- [x] 2.3 Garantir que o badge do ETF usa o ramo ETF de `oportunidadeBadge` e o veredito ETF.

## 3. Verificação

- [x] 3.1 ETF: longe do topo (verde, badge `−X%`), a meio caminho (amarelo), colado no topo (vermelho), sem 52 sem (n/a, faixa neutra) — desktop. _(Verificado por lógica + build; confirmação visual no navegador pendente.)_
- [x] 3.2 Card mobile (≤600px) do ETF com rótulos corretos (desalinhamento `nth-child` resolvido) e tooltip oculto no mobile como nas demais. _(ETF volta a 8 `<td>` → nth-child realinha; `.oport-tooltip` já tem `display:none` ≤600px. Confirmação visual pendente.)_
- [x] 3.3 Ações e FIIs inalterados (badge de desconto vs teto, tooltip de preço-teto, ordenação). _(Ramo `sector !== 'ETF'` preservado integralmente.)_
- [x] 3.4 `npx prettier --write` nos arquivos alterados e `ng build` sem erros.
