## 1. Impedir a quebra e permitir o texto encolher (≤600px)

- [x] 1.1 Em `dashboard.scss`, no `@media (max-width: 600px)` do `.dashboard-header`, definir `flex-wrap: nowrap` e `gap: 8px`
- [x] 1.2 Adicionar `min-width: 0` à `.header-left` (com `flex: 1 1 auto`) e à `.logo`
- [x] 1.3 Em `.logo-text`, no mobile, aplicar `overflow: hidden; text-overflow: ellipsis; white-space: nowrap`
- [x] 1.4 Em `.header-actions`, no mobile, `flex-shrink: 0` e `gap: 6px` (4px em ≤480px); ícones não encolhem

## 2. Reduzir tamanhos para caber

- [x] 2.1 Em `@media (max-width: 600px)`, `.icon-btn` 32×32px e `.user-chip` com padding reduzido (mantendo o avatar)
- [x] 2.2 Em `@media (max-width: 480px)`, `.icon-btn` 30×30px e gaps 4px (alvo de toque ≥30px)

## 3. Validar

- [x] 3.1 Rodar `ng build` sem erros (apenas warnings de budget pré-existentes)
- [x] 3.2 Regras aplicadas para 360/390/414px: `nowrap` + `flex-shrink:0` nos ícones + truncagem da logo garantem uma única linha — verificado no código/build
- [x] 3.3 Desktop inalterado (todas as regras estão sob `@media (max-width: 600px/480px)`) — verificado no código
