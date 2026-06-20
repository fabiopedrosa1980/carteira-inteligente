## 1. Dependência e serviço responsivo

- [x] 1.1 Instalar `@angular/cdk@^21` e confirmar que casa com o Angular 21 (`package.json`).
- [x] 1.2 Criar `src/app/services/responsive.service.ts` com `BreakpointObserver` → signals `isMobile()` (≤ 600px) e `isTablet()` (faixa intermediária), via `toSignal`.

## 2. Componente <app-scroll-bar>

- [x] 2.1 Criar `scroll-bar.ts` (standalone) com `<ng-content>` para projetar os itens; aceitar input para sinalizar o item ativo (ou observar a classe ativa).
- [x] 2.2 SCSS: `flex; flex-wrap: nowrap; overflow-x: auto`, scrollbar oculta, `scroll-snap-type: x proximity`, sem impor estilo aos itens projetados.
- [x] 2.3 Fade de borda com `mask-image` (independente de tema), condicional ao overflow/posição via `animation-timeline: scroll()` com degradação graciosa.
- [x] 2.4 Centralizar/trazer o item ativo à vista com `scrollIntoView({ inline: 'nearest' })` ao mudar de ativo.

## 3. Aplicar nos menus

- [x] 3.1 `dashboard.html`: envolver `.tab-nav` com `<app-scroll-bar>`, preservando o visual das abas; remover o CSS de scroll mobile agora redundante.
- [x] 3.2 `dashboard.html`: envolver `.sort-controls` (Ordenar por) com `<app-scroll-bar>`.
- [x] 3.3 `dividends.html`: envolver `.dv-asset-toggle` (pill) e `.dv-tabs` com `<app-scroll-bar>`, mantendo os visuais; limpar CSS de scroll redundante em `dividends.scss`.

## 4. Histórico: chips/combo por isMobile()

- [x] 4.1 `dividend-history.ts`: injetar `ResponsiveService`; adicionar `selectYearFromCombo(value)` (sentinela `'all'` → `null`).
- [x] 4.2 `dividend-history.html`: usar `@if (isMobile())` para renderizar combo de anos (na linha de "Ativo") ou chips via `<app-scroll-bar>` — só uma variante no DOM.
- [x] 4.3 `dividend-history.scss`: remover a alternância chips/combo por `display:none`/media query, agora coberta pelo `@if`.

## 5. Verificação

- [x] 5.1 `npx prettier --write` nos arquivos alterados e `ng build` para garantir compilação.
- [x] 5.2 Validar nos breakpoints (≤ 600px, ≤ 480px): menus em uma linha com rolagem e fade, item ativo visível, combo/chips corretos, sem rolagem horizontal da página.
- [x] 5.3 Commit e push seguindo o workflow do CLAUDE.md (stage específico dos arquivos).
