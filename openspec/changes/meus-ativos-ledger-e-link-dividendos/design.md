## Context

Card de Alocação (`AllocationCardComponent`) usa um ledger onde `.ledger-head` e `.ledger-row` são grids CSS **separados** com `grid-template-columns: 1fr auto auto minmax(0,1.4fr)`. Colunas `auto` se dimensionam por conteúdo dentro de cada grid → cabeçalho e linhas não alinham. Os cards de resumo (`ps-card`) "Dividendos Recebidos"/"a receber" exibem totais mas não navegam. A navegação por abas é por `setActiveTab(id)` no dashboard; `DividendsComponent` tem `activeTab` interno (`historico|recebidos|projetados|radar`).

## Goals / Non-Goals

**Goals:** ledger com colunas alinhadas e estáveis (web + mobile); cards de dividendos navegam para a visão certa.

**Non-Goals:** mudar cálculo de dividendos/alocação; redesenhar a tela de Dividendos.

## Decisions

- **Trilhas explícitas compartilhadas no ledger:** trocar `auto auto` por larguras fixas para Atual/Alvo, idênticas em `.ledger-head` e `.ledger-row`. Ex.: `grid-template-columns: minmax(0, 1fr) 3.25rem 3.25rem minmax(0, 1.6fr)` + `column-gap` consistente. Atual/Alvo `text-align: right` + `tabular-nums`. Como ambos os grids usam a MESMA definição, as colunas alinham. Mobile: `minmax(0,1fr) 3.25rem 3.25rem` com a ação em `grid-column: 1 / -1`.
- **Deep-link dos cards → Dividendos:**
  - Dashboard: novo signal `dividendsTab = signal<'historico'|'recebidos'|'projetados'|'radar'>('historico')`. Método `openDividends(tab)` seta o signal e chama `setActiveTab('calendar')`.
  - `DividendsComponent`: `@Input() initialTab?: DividendsTab` aplicado ao `activeTab` (no setter/`ngOnInit`). O dashboard passa `<app-dividends [initialTab]="dividendsTab()">`.
  - Os dois `ps-card` viram acionáveis: `(click)`, `role="button"`, `tabindex="0"`, `(keydown.enter)`/`(keydown.space)`, com cursor/hover. Recebidos → `openDividends('recebidos')`; a receber → `openDividends('projetados')`.
- **Afford­ância visual:** adicionar estado hover/cursor só nos cards clicáveis (classe modificadora, ex.: `.ps-card.is-link`), preservando os demais cards estáticos.

## Risks / Trade-offs

- [`app-dividends` só renderiza quando `activeTab==='calendar'`] → o `initialTab` é lido na criação do componente; como ele é (re)criado ao abrir a aba, o valor atual do signal vale. OK.
- [Largura fixa de Atual/Alvo] → `3.25rem` cobre "100%"/"-100%"; validar overflow em fontes maiores; usar `minmax` se necessário.

## Migration Plan

UI aditiva; sem migração. Rollback = reverter SCSS do ledger e os handlers/inputs de navegação.

## Open Questions

- Nenhuma — comportamento e mapeamento de cards definidos.
