## Context

No `DividendHistoryComponent`, o filtro de anos hoje: combo `<select>` no mobile (dentro de `.dh-selector`, ao lado de "Ativo") via `@if (isMobile())`, e chips no desktop dentro de `<app-scroll-bar class="dh-years">` via `@if (!isMobile())`. O componente injeta `ResponsiveService` e importa `ScrollBarComponent` só para isso. Os chips (`.dh-year-chip`) e o método `selectYear()` já existem.

## Goals / Non-Goals

**Goals:**
- Exibir sempre os chips de ano (experiência da web), abaixo do seletor de "Ativo".
- No mobile, chips quebram de linha (`flex-wrap`), sem rolagem horizontal e sem combo.
- Remover a lógica e dependências que existiam só para a alternância chips/combo.

**Non-Goals:**
- Remover `ResponsiveService` ou `<app-scroll-bar>` do projeto (são usados em outras telas).
- Mudar o seletor de "Ativo", a tabela ou a paginação do Histórico.

## Decisions

- **Render único de chips, sem condicional de viewport.** O template passa a ter um só bloco `<div class="dh-years" *ngIf="visiblePositions().length > 0">` com os chips (`*ngFor` dos anos + botão "Todos"), sem `@if (isMobile())`/`@if (!isMobile())` e sem `<app-scroll-bar>`. Racional: o comportamento desejado é idêntico em todos os tamanhos (chips que quebram), então não há motivo para ramificar. Alternativa descartada: manter scroll-bar só no desktop — desnecessário, os chips cabem/quebram naturalmente.
- **`.dh-years` volta a `flex-wrap: wrap`.** Em `dividend-history.scss`, `.dh-years` deixa de ser host de scroll-bar (`display: block; --scroll-gap`) e volta a `display: flex; flex-wrap: wrap; gap`. Remover a regra `.dh-year-select` (combo não existe mais). Os chips quebram para a linha de baixo no mobile sem rolagem.
- **Limpeza no `.ts`.** Remover `selectYearFromCombo()`, o campo `isMobile`, a injeção de `ResponsiveService` e o import de `ScrollBarComponent` do `DividendHistoryComponent` (não usados em outro ponto do componente). `selectYear()` permanece.

## Risks / Trade-offs

- [Muitos anos podem ocupar 2+ linhas no mobile] → Aceitável e é o pedido ("joga para linha de baixo"); são poucos chips (5 anos + "Todos").
- [Remover `isMobile` do componente] → Verificar que nenhum outro trecho do template/TS usa `isMobile()` antes de remover; hoje é usado só pelo filtro de anos.
- [Regressão de spec] → Modifica `responsive-menu-bar`; ao arquivar, o sync reescreve o requisito do filtro de anos para "sempre chips".
