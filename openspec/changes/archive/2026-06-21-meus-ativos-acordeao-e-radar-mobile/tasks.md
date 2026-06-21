## 1. Remover visão em cards de Meus Ativos

- [x] 1.1 Em `dashboard.ts`, remover o type `ViewMode`, o signal `viewMode` e o método `setView`.
- [x] 1.2 Em `dashboard.html`, remover o `.view-toggle` do `.section-header` (toggle cards/lista).
- [x] 1.3 Em `dashboard.html`, remover o bloco `@if (viewMode() === 'cards')` (grid de `app-stock-card`).
- [x] 1.4 Em `dashboard.html`, transformar o bloco `@if (viewMode() === 'list')` em renderização incondicional.
- [x] 1.5 Se `app-stock-card` não for mais usado no dashboard, remover o import `StockCardComponent` de `dashboard.ts` e do `imports`.
- [x] 1.6 Em `dashboard.scss`, remover estilos órfãos: `.view-toggle`, `.vt-btn`, `.accordion-cards`.

## 2. Botão de adicionar no rodapé do acordeão

- [x] 2.1 Em `dashboard.html`, remover o `button.btn-add-tx` de dentro do `.accordion-header` (manter apenas nome, contagem e chevron).
- [x] 2.2 Em `dashboard.html`, adicionar uma `.add-row` com `.btn-add-inline` ao final do `.accordion-inner` (após tabela e paginação), chamando `openAddTx(group)`, replicando o markup de `my-assets.html`.
- [x] 2.3 Em `dashboard.scss`, portar/garantir os estilos `.add-row` e `.btn-add-inline` (referência: `my-assets.scss`); remover estilo `.btn-add-tx` se órfão.

## 3. Ocultar colunas Hoje e Variação no mobile

- [x] 3.1 Em `dashboard.scss`, dentro de `@media (max-width: 640px)`, ocultar as colunas **Hoje** (4ª) e **Variação** (6ª) da `.acoes-list` (col + th + td), mantendo Ativo, Qtd, Preço Médio, Saldo e Rent.
- [x] 3.2 Comentar no SCSS o mapeamento das colunas (Ativo1, Qtd2, Preço3, Hoje4, Saldo5, Variação6, Rent7) e garantir ausência de rolagem horizontal.

## 4. Rótulos Ganho e Variação no card de Patrimônio

- [x] 4.1 Em `dashboard.html`, reestruturar o `.ps-lucro` em dois itens rotulados: "Ganho" (`lucroTotal()` em R$, sinal/cor) e "Variação" (`lucroPercent()` em %, sinal/cor), exibindo "—" quando `lucroPercent() === null`.
- [x] 4.2 Em `dashboard.scss`, estilizar os rótulos (padrão visual de `.ps-stat-label`/`.ps-stat-value`), preservando `.pos`/`.neg`.

## 5. Habilitar matriz ("batalha naval") do Radar no mobile

- [x] 5.1 Em `dividends-radar.ts`, alterar `effectiveView` para retornar sempre `this.view()` (remover o ramo `isMobile() ? 'cards'`).
- [x] 5.2 Em `dividends-radar.html`, remover `*ngIf="!isMobile()"` do `.radar-view-toggle` para exibir o toggle no mobile.
- [x] 5.3 Validar a matriz em 360–640px (colunas compactas, sem quebrar layout); ajustar `@media` em `dividends-radar.scss` se necessário.

## 6. Verificação

- [x] 6.1 `ng build` sem erros; `npx prettier --write` nos arquivos alterados.
- [x] 6.2 Conferir manualmente: Meus Ativos só em lista, botão Adicionar no rodapé, colunas ocultas no mobile, rótulos no Patrimônio, matriz do Radar acessível no mobile.
- [x] 6.3 `openspec validate meus-ativos-acordeao-e-radar-mobile --strict`.
