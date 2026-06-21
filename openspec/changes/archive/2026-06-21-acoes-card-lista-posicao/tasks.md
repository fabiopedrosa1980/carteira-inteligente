## 1. Cálculos de posição (reusáveis)

- [x] 1.1 Criar `src/app/models/position.util.ts` com funções puras: `saldo(stock)`, `custo(stock)`, `variacaoPosicao(stock)`, `rentabilidade(stock)`, com guardas para `quantity <= 0` / `avgPrice <= 0`.

## 2. Card de Minhas Ações — campos de posição

- [x] 2.1 Em `stock-card.ts`, expor saldo, variação (R$) e rentabilidade (%) via getters usando as funções de `position.util.ts`.
- [x] 2.2 Em `stock-card.html`, exibir Quantidade e Saldo (linha de posição) e Variação (R$) + Rentabilidade (%) com sinal/cor; manter "Hoje" (variação do dia) e o preço-herói.
- [x] 2.3 Em `stock-card.scss`, estilizar a linha de posição e as cores positivo/negativo, sem estourar o budget de CSS.
- [x] 2.4 Validar: ativo com lucro mostra valores positivos; com prejuízo, negativos; sem quantidade/preço médio, oculta os derivados.

## 3. Visão em Lista + toggle

- [x] 3.1 Em `dashboard.ts`, adicionar `viewMode = signal<'cards' | 'list'>('cards')` e método para alternar.
- [x] 3.2 Em `dashboard.html`, adicionar o grupo de ícones cards/lista no `.section-header`, à direita, junto aos controles de "Ordenar por" (espelhando `.radar-view-toggle`).
- [x] 3.3 Em `dashboard.html`, renderizar o grid de cards quando `viewMode() === 'cards'` e a lista (tabela) quando `'list'`, iterando `sortedStocks()` (ordenação compartilhada).
- [x] 3.4 Na lista, exibir colunas Ativo, Qtd, Preço, Hoje, Saldo, Variação (R$) e Rentabilidade (%), usando as funções de `position.util.ts`.
- [x] 3.5 Em `dashboard.scss`, estilizar a lista e o toggle; no mobile, `table-layout: fixed` + ocultar/reproporcionar colunas, sem rolagem horizontal.
- [x] 3.6 Validar: cards é o padrão; alternar para lista preserva a ordenação; lista legível no mobile.

## 4. Verificação e entrega

- [x] 4.1 Rodar `npx prettier --write` nos arquivos alterados e `ng build` (atenção aos budgets de CSS).
- [x] 4.2 Commit e push por área (prefixos `feat:`/`style:`), staged por arquivo específico.
