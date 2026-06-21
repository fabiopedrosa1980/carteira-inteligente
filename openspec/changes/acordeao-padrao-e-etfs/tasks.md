## 1. Backend API — suporte a ETFs

- [ ] 1.1 Em `backend-api.service.ts`, adicionar `getEtfs(): Observable<ApiAcaoItem[]>` chamando `/transactions/etfs` com `catchError(() => of([]))`

## 2. Carregamento de ETFs em dashboard.ts

- [ ] 2.1 Em `dashboard.ts`, alterar `loadAtivos()` para `forkJoin([getAcoes(), getFiis(), getEtfs()])` e mapear ETFs com `sector: 'ETF'`

## 3. Template — acordeão unificado em dashboard.html

- [ ] 3.1 Substituir `<div class="asset-group">` + `<button class="group-header">` pela estrutura `<div class="accordion"> <button class="accordion-header">` igual à usada em `my-assets.html`
- [ ] 3.2 No cabeçalho: usar `.ah-left` com `.sec-label` + `.sec-count` (badge) e `.ah-right` com `<span class="chevron">›</span>`
- [ ] 3.3 Substituir `@if (!isCollapsed(group))` pelo padrão animado: `<div class="accordion-body" [class.collapsed]="isCollapsed(group)">` com `<div class="accordion-inner">`
- [ ] 3.4 Mover a `acoes-list-wrap` / `stocks-grid` para dentro do `accordion-inner`; o paginador também fica dentro de `accordion-inner`
- [ ] 3.5 A condição de exibição do grupo muda: o `@for` DEVE mostrar todos os grupos sempre (removendo o `@if stocksForGroup > 0` externo) — a ocultação agora fica na lógica visual do `accordion-body`. **EXCEÇÃO**: `@if (stocksForGroup(group).length === 0)` oculta o `<div class="accordion">` inteiro (não renderiza o card quando vazio)

## 4. Estilos — dashboard.scss

- [ ] 4.1 Remover estilos de `.group-header`, `.group-body`, `.group-arrow`, `.group-title`, `.group-count`, `.pager` do `dashboard.scss`
- [ ] 4.2 Adicionar estilos de `.accordion`, `.accordion-header`, `.ah-left`, `.sec-label`, `.sec-count`, `.ah-right`, `.chevron`, `.accordion-body`, `.accordion-inner` idênticos (ou quase) ao `my-assets.scss`
- [ ] 4.3 Adicionar estilo de `.ma-pagination` para o paginador dentro dos grupos (reutilizar ou replicar de `my-assets.scss`)
