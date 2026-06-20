## Context

Refinamentos mobile reaproveitando peças já existentes: `ResponsiveService` (signal `isMobile()`, ≤ 600px) e `<app-scroll-bar>` (barra rolável). Estado atual:

- **Minhas Ações**: `.stocks-grid` usa `repeat(2, 1fr)` em ≤ 640px (track `1fr` puro, pode estourar) + `> * { min-width: 0 }`.
- **Radar** (`dividends-radar`): duas visões — cards (`.radar-grid`: 4→2→**1** coluna) e matriz (`.radar-scroll` com `overflow-x:auto`, heatmap de 13 colunas). O alternador `setView('cards'|'matrix')` é controlado por signal local `view`.
- **Menu principal**: `.tab-nav` já envolto em `<app-scroll-bar>` (uma linha rolável).

## Goals / Non-Goals

**Goals:**
- Minhas Ações: 2 cards/linha no mobile com `minmax(0,1fr)`, conteúdo contido, zero rolagem.
- Radar: nenhuma rolagem horizontal no mobile; cards em 2 colunas; matriz oculta/desabilitada no mobile.
- Menu: uma linha rolável garantida no mobile (sem wrap).

**Non-Goals:**
- Redesenhar a matriz para caber em telas estreitas (transpor/condensar) — fica fora; preferimos a visão em cards no mobile.
- Mudar o comportamento desktop do radar (matriz e alternador seguem como hoje).
- Tocar em serviços de dados/modelos.

## Decisions

- **Radar no mobile = cards, matriz oculta.** Injetar `ResponsiveService` no `DividendsRadarComponent`. Quando `isMobile()`, a visão efetiva é forçada para `cards` e o alternador de matriz não é exibido. Racional: a matriz tem 13 colunas; comprimir para ~320px prejudica a leitura e ainda assim raspa o limite. A visão em cards já comunica os mesmos destaques (melhor mês / oportunidade) sem rolagem. Alternativa descartada: matriz transposta (meses nas linhas) — mais código e UX inconsistente com o desktop.
  - Implementação: usar uma `effectiveView = computed(() => isMobile() ? 'cards' : view())`. O template passa a checar `effectiveView()` em vez de `isView()`, e o alternador some quando `isMobile()`.
- **Radar cards em 2 colunas no mobile.** Ajustar o breakpoint `@media (max-width: 480px)` de `.radar-grid` de `1fr` para `repeat(2, minmax(0,1fr))`, alinhando com os cards de Minhas Ações. Cards do radar já têm conteúdo flexível (chips que quebram), então 2 colunas cabem.
- **Minhas Ações: `minmax(0,1fr)`.** Trocar `repeat(2, 1fr)` por `repeat(2, minmax(0,1fr))` no grid mobile; manter `min-width:0` nos itens. O `stock-card.scss` já compacta no mobile; reforçar contenção se algo ainda empurrar.
- **Menu: garantir uma linha.** O `<app-scroll-bar>` já mantém `flex-wrap: nowrap`. Verificar que nenhum estilo residual de `.tab-nav` reintroduz wrap; nenhuma mudança estrutural esperada além de confirmação/limpeza.

## Risks / Trade-offs

- [Ocultar a matriz no mobile remove uma funcionalidade nessas telas] → Mitigado: a visão em cards cobre a mesma informação; a matriz volta no desktop. É uma escolha consciente de produto para "não ter scroll".
- [`effectiveView` divergir do toggle ao girar o dispositivo] → Como deriva de `isMobile()` (signal) e do `view()` local, recomputa automaticamente; ao voltar ao desktop, respeita a última escolha do usuário.
- [Radar cards 2-col em telas muito estreitas (~320px)] → Cards têm `min-height` e chips que refluem; 2 colunas de ~150px cabem. Validar em 320px.
