## 1. Template: chips sempre, sem combo nem scroll-bar

- [x] 1.1 Em `dividend-history.html`, remover o bloco do combo `<select>` de anos (`@if (isMobile())`) de dentro de `.dh-selector`.
- [x] 1.2 Substituir o bloco `@if (!isMobile()) { <app-scroll-bar class="dh-years"> ... }` por um único `<div class="dh-years" *ngIf="visiblePositions().length > 0">` com os chips (anos + "Todos"), sem condicional de viewport.

## 2. Estilos: chips quebram de linha

- [x] 2.1 Em `dividend-history.scss`, `.dh-years` volta a `display: flex; flex-wrap: wrap; gap; margin-bottom`, deixando de ser host de `<app-scroll-bar>`.
- [x] 2.2 Remover a regra `.dh-year-select` (combo não existe mais).

## 3. Limpeza de lógica no componente

- [x] 3.1 Em `dividend-history.ts`, remover `selectYearFromCombo()` e o campo `isMobile`.
- [x] 3.2 Remover a injeção de `ResponsiveService` e o import de `ScrollBarComponent` se não forem usados em nenhum outro ponto do componente; manter `selectYear()`.

## 4. Verificação

- [x] 4.1 `npx prettier --write` nos arquivos alterados e `ng build` para garantir compilação.
- [x] 4.2 Conferir no mobile (≤ 600px): chips abaixo de "Ativo", quebrando de linha, sem combo e sem rolagem; seleção de ano filtra a tabela.
- [x] 4.3 Commit e push seguindo o workflow do CLAUDE.md (stage específico dos arquivos).
