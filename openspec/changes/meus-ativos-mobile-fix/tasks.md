# Tasks: meus-ativos-mobile-fix

## dashboard.html — remover .acoes-list-wrap

- [ ] Na visão em lista (dentro de `@if (viewMode() === 'list')`), remover o `<div class="acoes-list-wrap">` que envolve o `<table class="acoes-list">`, deixando a tabela diretamente dentro de `<div class="accordion-inner">`

## dashboard.scss — ajustar estilos

- [ ] Remover (ou esvaziar) as regras de `.acoes-list-wrap` — borda, border-radius e overflow passam a ser desnecessários pois o accordion já os provê
- [ ] Garantir que `.acoes-list` tem `width: 100%` e adicionar `display: block; overflow-x: hidden` como salvaguarda mobile

## Verificação

- [ ] Abrir http://localhost:4200, autenticar, ir para aba "Meus Ativos" em visão lista
- [ ] Redimensionar para 375px via DevTools e confirmar que nenhuma coluna transborda e o layout é idêntico ao de Lançamentos
- [ ] Testar também em 640px (breakpoint boundary) e desktop (>640px) sem regressão
