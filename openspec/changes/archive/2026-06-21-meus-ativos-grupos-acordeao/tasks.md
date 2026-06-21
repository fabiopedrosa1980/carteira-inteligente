## 1. Estado do acordeão e paginação por grupo

- [x] 1.1 Em `dashboard.ts`, definir `readonly groups = ['Ações', 'FII', 'ETF'] as const` e o tipo `AssetGroup`
- [x] 1.2 Adicionar `collapsed = signal<Set<string>>(new Set())` e métodos `toggle(g)` / `isCollapsed(g)`
- [x] 1.3 Adicionar `pages = signal<Record<string, number>>({})` e métodos `pageOf(g)`, `totalPages(g)`, `showPager(g)`, `prevPage(g)`, `nextPage(g)` com PAGE_SIZE = 10
- [x] 1.4 Adicionar computed `stocksForGroup(group: string)` que filtra `sortedStocks()` pelo campo `sector` do grupo
- [x] 1.5 Adicionar `pagedFor(group: string)` que retorna o slice da página atual do grupo

## 2. Template — acordeão na visão em lista

- [x] 2.1 Em `dashboard.html`, substituir a `<table>` única por um `@for (group of groups)` que itera os 3 grupos
- [x] 2.2 Para cada grupo: renderizar cabeçalho clicável `(click)="toggle(group)"` com nome, contagem e seta ↑/↓
- [x] 2.3 Dentro do corpo `*ngIf="!isCollapsed(group) && stocksForGroup(group).length > 0"`: renderizar a `<table>` com `pagedFor(group)` em vez de `sortedStocks()`
- [x] 2.4 Abaixo da tabela de cada grupo: controles de paginação `*ngIf="showPager(group)"` com botões Anterior/Próxima e indicador "Página X de Y"
- [x] 2.5 Ocultar grupos sem ativos: o `@for` só renderiza quando `stocksForGroup(group).length > 0`

## 3. Template — acordeão na visão em cards

- [x] 3.1 No bloco `*ngIf="viewMode() === 'cards'"`, aplicar o mesmo `@for (group of groups)` com cabeçalho e corpo colapsável
- [x] 3.2 Dentro do corpo: renderizar o grid de cards com `pagedFor(group)` e controles de paginação

## 4. Estilos

- [x] 4.1 Em `dashboard.scss`, adicionar `.group-header` (display flex, cursor pointer, hover, seta rotacionável)
- [x] 4.2 Adicionar `.group-body` e estilos de transição de colapso (height/overflow ou display)
- [x] 4.3 Adicionar `.pager` com botões prev/next e label de página
- [x] 4.4 Garantir espaçamento entre grupos (margin-bottom entre seções)
