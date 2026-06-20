## 1. Menu principal como barra inferior no mobile

- [x] 1.1 Em `dashboard.html`, trocar `<app-scroll-bar class="tab-nav">` de volta por `<nav class="tab-nav">` (mantendo botões com ícone + `tab-label`).
- [x] 1.2 Em `dashboard.scss`, no `@media (max-width: 600px)`, fixar `.tab-nav` na parte inferior (`position: fixed; left/right/bottom: 0; z-index`), com `border-top`, fundo e `padding-bottom: env(safe-area-inset-bottom)`.
- [x] 1.3 No mesmo breakpoint, botões em `flex: 1; flex-direction: column; align-items: center`, ícone acima do rótulo, rótulo pequeno (com truncamento se necessário); marcar item ativo com cor de acento.
- [x] 1.4 Definir z-index da barra abaixo da camada de modais (não cobrir diálogos).

## 2. Conteúdo respeita a barra inferior

- [x] 2.1 Em `dashboard.scss`, no mobile, adicionar `padding-bottom` ao `.content` igual à altura da barra + `env(safe-area-inset-bottom)`, para o último conteúdo não ficar encoberto.
- [x] 2.2 Conferir que no desktop nada muda (sem padding extra, abas no topo).

## 3. Submenus de Dividendos sem scroll no mobile

- [x] 3.1 Em `dividends.html`, remover o wrapper `<app-scroll-bar>` de `.dv-asset-toggle` e `.dv-tabs` (voltar a `<div>` com a mesma classe e botões).
- [x] 3.2 Em `dividends.scss`, restaurar o layout flex e, no `@media (max-width: 600px)`, fazer `.dv-tabs` caber sem rolar: `display: flex; .dv-tab { flex: 1; justify-content: center }`, ícone + rótulo compacto.
- [x] 3.3 `.dv-asset-toggle` (Ações/FIIs) cabe sem rolar (pílula com itens `flex: 1` ou largura natural centralizada).
- [x] 3.4 Remover o import/uso de `ScrollBarComponent` em `dividends.ts` se não for mais necessário.

## 4. Verificação

- [x] 4.1 `npx prettier --write` nos arquivos alterados e `ng build` para garantir compilação.
- [x] 4.2 Conferência nos breakpoints (≤ 600px, ~320px): barra inferior fixa com 4 ícones, conteúdo não encoberto, submenus cabendo sem rolar; desktop inalterado.
- [x] 4.3 Commit e push seguindo o workflow do CLAUDE.md (stage específico dos arquivos).
