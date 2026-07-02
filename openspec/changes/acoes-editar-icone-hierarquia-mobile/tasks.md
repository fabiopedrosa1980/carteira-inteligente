# Tasks

## A — Editar (Alocação) → botão-ícone no cabeçalho

- [x] 1. Em `allocation-card.html`, adicionar botão-ícone de lápis em `.alloc-head`, à direita do `.alloc-title`, com `*ngIf="!editing()"`, `(click)="openEdit()"` e `aria-label="Editar alocação"`.
- [x] 2. Remover o botão de texto "Editar" de `.alloc-actions` (manter só Cancelar/Salvar, envoltos por `*ngIf="editing()"`).
- [x] 3. Em `allocation-card.scss`, estilizar o ícone do header reusando `--icon-btn-size`/`--icon-btn-radius`/`--icon-btn-icon` e o tint `--btn-edit-fg` (`color-mix` 12%/22%), com `:focus-visible` (ring em `currentColor`). Ajustar `.alloc-head` para alinhar o ícone à direita (`justify-content: space-between` / `margin-left: auto`).

## B1 — Cancelar/Salvar lado a lado com hierarquia (mobile)

- [x] 4. `allocation-card.scss` — no `@media (max-width: 600px)`, `.alloc-actions`: remover `flex-direction: column` + `width: 100%`; manter row, `Cancelar` (`.ghost`) `flex: 0 0 auto`, primário `flex: 1`, `min-height: 44px`, gap `--space-2`.
- [x] 5. `goals.scss` — no `@media (max-width: 600px)`, `.form-actions`: remover `flex-direction: column-reverse` + `.btn { width: 100% }`; row com `Cancelar` (`.btn--ghost`) `flex: 0 0 auto` e primário `flex: 1`, primário à direita, `min-height: 44px`.
- [x] 6. `add-transaction-modal.scss` — no `@media (max-width: 480px)`, `.modal-footer`: mesmo tratamento (row com hierarquia em vez de coluna full-width).
- [x] 7. `add-stock-modal.scss` — `.modal-footer` no breakpoint mobile: mesmo tratamento.

## Verificação

- [x] 8. Confirmar que "Adicionar" (empty state e rodapé de seção em Meus Ativos) permanece full-width — não deve ser alterado.
- [x] 9. `ng build` sem erros; conferir contraste do ícone de lápis (≥ 4.5:1) nos temas claro e escuro.
- [x] 10. Verificar nos viewports 320px e 390px: sem rolagem horizontal, alvos de toque ≥ 44px, rótulos sem quebra indevida, foco visível em todos os botões.
