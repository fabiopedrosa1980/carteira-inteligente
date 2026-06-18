## 1. Formatação dos indicadores (≤2 casas)

- [x] 1.1 Em `stock-details-modal.ts`, adicionar `formatValue(value: string): string` que arredonda números BR (com sufixo opcional) para ≤2 casas e preserva valores não numéricos.
- [x] 1.2 Em `stock-details-modal.html`, aplicar `{{ formatValue(ind.value) }}` no valor do indicador.

## 2. Layout: 4 cards por linha + posicionamento

- [x] 2.1 Em `stock-details-modal.scss`, definir `.indicators-grid` com 4 colunas (`repeat(4, minmax(0, 1fr))`) e breakpoints responsivos (3 e 2 colunas).
- [x] 2.2 Refinar posicionamento/alinhamento (baseline rótulo/valor, eixo do preço/variação, espaçamentos, foco visível) sem overflow horizontal.

## 3. Teste de componente (Playwright CT)

- [ ] 3.1 Adicionar devDependencies (`@playwright/experimental-ct-angular`, `@playwright/test`) e configurar `playwright-ct.config.ts` + `playwright/index.{html,ts}`; script `test:ct`.
- [ ] 3.2 Criar o spec do `StockDetailsModalComponent` com stock mock: valida cabeçalho/resumo/grid (4 colunas), formatação ≤2 casas e ausência de overflow horizontal.

## 4. Verificação e entrega

- [ ] 4.1 `npx prettier --write`, `ng build` e rodar o teste de componente (`npm run test:ct`).
- [ ] 4.2 Commit e push (frontend).
