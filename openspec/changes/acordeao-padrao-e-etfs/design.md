## Context

`DashboardComponent` tem dois problemas independentes: (1) o acordeão de "Meus Ativos" usa elementos separados (`.group-header` / `.group-body`) com colapso instantâneo via `@if`, enquanto `MyAssetsComponent` usa `.accordion` / `.accordion-body` com transição `max-height` e card unificado. (2) `loadAtivos()` faz `forkJoin([getAcoes(), getFiis()])` mas não chama nenhum endpoint de ETFs — o resultado é que qualquer ativo lançado como ETF nunca aparece na aba "Meus Ativos".

## Goals / Non-Goals

**Goals:**
- Unificar visual dos acordeões de "Meus Ativos" com o padrão de "Lançamentos" (card único, badge de contagem, animação de colapso).
- Carregar posições ETF via `BackendApiService.getEtfs()` e incluí-las no `forkJoin`.

**Non-Goals:**
- Alterar o backend — assumir que `/transactions/etfs` existe ou será criado; usar `catchError(() => of([]))` defensivo igual ao `getFiis()`.
- Alterar colunas ou campos exibidos na lista/cards.
- Alterar a lógica de paginação (PAGE_SIZE = 10 permanece).

## Decisions

**1 — Reutilizar classes CSS de MyAssets no Dashboard**

Usar os mesmos nomes `.accordion`, `.accordion-header`, `.accordion-body`, `.accordion-inner`, `.ah-left`, `.ah-right`, `.sec-label`, `.sec-count`, `.chevron` no template do Dashboard. Remover `.group-header`, `.group-body`, `.group-arrow`, `.group-title`, `.group-count` do `dashboard.scss`.

Alternativa considerada: criar um componente `<app-accordion-section>` compartilhado. Rejeitada — adiciona @Input bindings sem benefício real; os dois contextos têm conteúdos muito diferentes (transações vs. lista/cards de posições).

**2 — Animação de colapso via `max-height` + CSS class**

Usar a mesma estratégia de `my-assets.scss`: `.accordion-body { max-height: 2000px; transition: max-height 0.35s ease; } .accordion-body.collapsed { max-height: 0; }`. O `@if` atual que remove o nó do DOM impede a animação; substituir por `[class.collapsed]="isCollapsed(group)"`.

Efeito colateral: grupos vazios agora precisam ser ocultados via condição no `@for`, não pela remoção do DOM do corpo.

**3 — `getEtfs()` defensivo em BackendApiService**

```ts
getEtfs(): Observable<ApiAcaoItem[]> {
  return this.http
    .get<ApiAcaoItem[]>(`${this.baseUrl}/transactions/etfs`)
    .pipe(catchError(() => of([])));
}
```

Incluir no `forkJoin` do `dashboard.ts`:
```ts
forkJoin([this.api.getAcoes(), this.api.getFiis(), this.api.getEtfs()])
  .subscribe({ next: ([acoes, fiis, etfs]) => { ... } })
```
ETFs mapeados com `sector: 'ETF'` (igual ao filtro do `groups` array).

## Risks / Trade-offs

- [Endpoint inexistente] Se `/transactions/etfs` não existir no backend → `catchError` retorna `[]`, seção ETF fica vazia e oculta. Sem impacto visível para o usuário.
- [max-height animation] Para listas muito grandes a animação pode ficar lenta (valor fixo 2000px). Aceitável — a paginação limita o conteúdo visível a ≤10 itens.
