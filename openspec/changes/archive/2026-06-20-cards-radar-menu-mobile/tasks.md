## 1. Cards de Minhas Ações (2 por linha, sem scroll)

- [x] 1.1 Em `dashboard.scss`, trocar `.stocks-grid` mobile de `repeat(2, 1fr)` para `repeat(2, minmax(0, 1fr))`, mantendo `> * { min-width: 0 }`.
- [x] 1.2 Revisar `stock-card.scss` no mobile e reforçar a contenção (min-width:0 / overflow-wrap) caso algum conteúdo ainda empurre a coluna.
- [x] 1.3 Validar 2 cards por linha sem rolagem da página nem barra interna no card (≤ 640px e ~320px).

## 2. Radar sem scroll no mobile

- [x] 2.1 Em `dividends-radar.ts`, injetar `ResponsiveService` e expor `isMobile`; criar `effectiveView = computed(() => isMobile() ? 'cards' : view())`.
- [x] 2.2 Em `dividends-radar.html`, usar `effectiveView()` para escolher a visão; ocultar o alternador de visão (e/ou o botão de matriz) quando `isMobile()`.
- [x] 2.3 Garantir que a visão de matriz (`.radar-scroll`) não é renderizada quando `isMobile()`, eliminando o container com `overflow-x`.
- [x] 2.4 Em `dividends-radar.scss`, ajustar `.radar-grid` no `@media (max-width: 480px)` para `repeat(2, minmax(0, 1fr))`.
- [x] 2.5 Validar: no mobile, cards em 2 colunas, sem rolagem horizontal; no desktop, alternador e matriz intactos.

## 3. Menu principal em uma linha rolável

- [x] 3.1 Conferir em `dashboard.scss` que `.tab-nav` (host do `<app-scroll-bar>`) não reintroduz `flex-wrap`/quebra; remover resíduos se houver.
- [x] 3.2 Validar no mobile (≤ 480px): abas em uma única linha, rolando quando não couberem, sem segunda linha nem scroll da página.

## 4. Verificação

- [x] 4.1 `npx prettier --write` nos arquivos alterados e `ng build` para garantir compilação.
- [x] 4.2 Conferência visual nos breakpoints (≤ 640px, ≤ 480px, ~320px) das três telas.
- [x] 4.3 Commit e push seguindo o workflow do CLAUDE.md (stage específico dos arquivos).
