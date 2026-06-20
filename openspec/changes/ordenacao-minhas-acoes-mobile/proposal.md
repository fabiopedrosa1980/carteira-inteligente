## Why

Em Minhas Ações, os controles de ordenação ("Ordenar por" + chips Nome/Preço/Variação/DY/Nota) **rolam horizontalmente** no mobile. É menos prático que o padrão da web: um **combo** para escolher o campo e um **botão de direção** (↑/↓) — compacto, em uma linha, sem rolagem.

## What Changes

- **Mobile**: a ordenação passa a ser um **combo `<select>`** (campo de ordenação, incluindo "Padrão") + um **botão ↑/↓** que alterna ascendente/descendente. Cabe em uma linha, sem rolagem.
- **Desktop**: mantém os chips atuais (Nome, Preço, Variação, DY, Nota) com o toggle de direção em cada chip.
- Alternância chips/combo por `ResponsiveService.isMobile()`, com apenas a variante ativa no DOM.

## Capabilities

### New Capabilities
<!-- Nenhuma capability nova; ajusta comportamento já versionado em responsive-menu-bar. -->

### Modified Capabilities
- `responsive-menu-bar`: os controles de ordenação de Minhas Ações deixam de rolar no mobile — passam a usar combo + botão de direção; o `<app-scroll-bar>` segue nos chips de ordenação apenas no desktop.

## Impact

- `src/app/components/dashboard/dashboard.ts` — injetar `ResponsiveService` (`isMobile`); adicionar `toggleSortDir()` (e reuso de `setSort()` pelo combo). `sortField`, `sortAsc`, `sortOptions` e `sortedStocks` permanecem.
- `src/app/components/dashboard/dashboard.html` — `@if (isMobile())` para combo + botão de direção; `@else` mantém os chips no `<app-scroll-bar>`.
- `src/app/components/dashboard/dashboard.scss` — estilos do combo + botão de direção no mobile.
- Reutiliza `ResponsiveService` e `<app-scroll-bar>` existentes; nenhuma dependência nova. Sem mudança em serviços de dados, modelos ou API.
