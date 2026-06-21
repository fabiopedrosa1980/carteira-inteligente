## 1. Agregação por tipo

- [x] 1.1 Em `dashboard.ts`, adicionar `groupSaldo(g)` (Σ `saldo` das posições do grupo, null→0).
- [x] 1.2 Adicionar `groupCusto(g)` (Σ `custo`) e `groupRentabilidade(g)` = (saldoTotal − custoTotal)/custoTotal×100, retornando `null` quando custo ≤ 0.

## 2. Cabeçalho do acordeão (HTML)

- [x] 2.1 Em `dashboard.html`, no `.ah-right` de cada grupo, adicionar `.sec-total` com `R$ {{ groupSaldo(group) | number:'1.2-2' }}` (quando `groupSaldo(group) > 0`).
- [x] 2.2 Adicionar `.sec-rent` com a rentabilidade do grupo (`±%`, `number:'1.1-1'`), `[class.pos]/[class.neg]` pelo sinal, exibido quando `groupRentabilidade(group) !== null`; reutilizar `abs()`.
- [x] 2.3 Manter o `.chevron` por último no `.ah-right`.

## 3. Estilos

- [x] 3.1 Em `dashboard.scss`, estilizar `.sec-total` (discreto) e `.sec-rent` (cor por sinal via `.pos`/`.neg`).
- [x] 3.2 Ajuste responsivo (≤600px): reduzir `font-size`/`gap` do `.ah-right`; ocultar `.sec-count` se necessário para caber total+rent sem rolagem horizontal.

## 4. Verificação

- [x] 4.1 `npx prettier --write "src/app/components/dashboard/dashboard.html" "src/app/components/dashboard/dashboard.ts" "src/app/components/dashboard/dashboard.scss"`.
- [x] 4.2 `ng build` sem erros.
- [ ] 4.3 Desktop: cada cabeçalho de tipo mostra total e rentabilidade (cor por sinal), inclusive colapsado.
- [ ] 4.4 Mobile (≤600px): cabeçalho cabe sem rolagem horizontal.
- [ ] 4.5 Conferir que a rentabilidade do tipo bate com (saldo total − custo total)/custo total.
- [x] 4.6 Commit e push.
