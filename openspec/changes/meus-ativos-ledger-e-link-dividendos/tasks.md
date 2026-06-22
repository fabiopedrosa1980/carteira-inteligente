## 1. Ledger alinhado (Alocação)

- [x] 1.1 Em `allocation-card.scss`, trocar o `grid-template-columns` de `.ledger-head`/`.ledger-row` por trilhas explícitas compartilhadas (ex.: `minmax(0,1fr) 3.25rem 3.25rem minmax(0,1.6fr)`), garantindo o MESMO valor nos dois seletores; `column-gap` consistente.
- [x] 1.2 Atual/Alvo (`.num`) com `text-align: right` + `tabular-nums`; conferir que cabeçalho e linhas alinham.
- [x] 1.3 Mobile (`max-width: 560px`): trilhas `minmax(0,1fr) 3.25rem 3.25rem` com `.act` em `grid-column: 1 / -1` (ação na própria linha), mantendo alinhamento de Classe/Atual/Alvo.

## 2. Deep-link dos cards de dividendos

- [x] 2.1 `dividends.ts`: adicionar `@Input() initialTab?: DividendsTab` que define `activeTab` na inicialização.
- [x] 2.2 `dashboard.ts`: signal `dividendsTab` + método `openDividends(tab)` que seta o signal e chama `setActiveTab('calendar')`; passar `[initialTab]="dividendsTab()"` ao `<app-dividends>`.
- [x] 2.3 `dashboard.html`: tornar os cards "Dividendos Recebidos" (→ `recebidos`) e "Dividendos a receber" (→ `projetados`) acionáveis: `(click)`, `role="button"`, `tabindex="0"`, `keydown.enter`/`keydown.space`.
- [x] 2.4 `dashboard.scss`: afford­ância dos cards clicáveis (cursor/hover/foco) via modificador, sem afetar os cards estáticos.

## 3. Verificação

- [x] 3.1 `ng build` e validar: ledger alinhado (web + mobile, sem quebra), cards navegam para Recebidos/Projetados (mouse + teclado), demais cards inalterados.
- [x] 3.2 Commit e push (stage de arquivos específicos).
