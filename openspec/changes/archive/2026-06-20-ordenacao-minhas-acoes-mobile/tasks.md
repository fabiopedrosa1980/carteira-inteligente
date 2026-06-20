## 1. Lógica de ordenação no componente

- [x] 1.1 Em `dashboard.ts`, injetar `ResponsiveService` e expor `isMobile`.
- [x] 1.2 Adicionar `toggleSortDir()` que faz `sortAsc.update(v => !v)` (sem alterar o campo).
- [x] 1.3 Confirmar que o combo pode reutilizar `setSort(field)` (o `(change)` só dispara em troca de valor, então não haverá toggle indevido).

## 2. Template: combo + direção no mobile, chips no desktop

- [x] 2.1 Em `dashboard.html`, envolver a ordenação em `@if (isMobile()) { ... } @else { ... }`.
- [x] 2.2 Mobile: rótulo "Ordenar por" + `<select class="sort-select">` com opção "Padrão" + `sortOptions` (bind `[value]="sortField()"`, `(change)="setSort($any($event.target).value)"`) + botão de direção (`(click)="toggleSortDir()"`, texto ↑/↓, `[disabled]="sortField() === 'default'"`).
- [x] 2.3 Desktop (`@else`): manter `<app-scroll-bar class="sort-controls">` com os chips atuais.

## 3. Estilos

- [x] 3.1 Em `dashboard.scss`, estilizar `.sort-select` (referência: `.dh-select`) e o botão de direção compacto, em uma linha no mobile, sem rolagem; garantir que cabem no `.section-header` (que vira coluna ≤ 640px).

## 4. Verificação

- [x] 4.1 `npx prettier --write` nos arquivos alterados e `ng build` para garantir compilação.
- [x] 4.2 Conferir no mobile (≤ 600px): combo + botão de direção em uma linha, sem rolagem; trocar campo reordena; "Padrão" reseta; direção desabilitada no padrão. Desktop com chips inalterado.
- [x] 4.3 Commit e push seguindo o workflow do CLAUDE.md (stage específico dos arquivos).
