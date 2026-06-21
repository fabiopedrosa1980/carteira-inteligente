## Context

`DashboardComponent` carrega todos os ativos via `forkJoin([getAcoes(), getFiis()])` e os armazena em um único signal `acoes: Signal<Stock[]>`. O campo `sector` distingue os tipos: `'Ações'`, `'FII'`. ETFs não têm endpoint próprio por enquanto. A visão em lista usa uma única `<table>` e a visão em cards usa um único grid — ambos iteram sobre `sortedStocks()` sem agrupamento.

## Goals / Non-Goals

**Goals:**
- Separar Ações, FIIs e ETFs em seções colapsáveis (acordeão) em ambas as visões.
- Paginação independente por grupo (10 itens/página), compartilhada entre lista e cards dentro do mesmo grupo.
- Cabeçalho de cada seção mostra nome do tipo e contagem; ao colapsar, oculta o conteúdo.
- Grupos sem ativos não são renderizados.

**Non-Goals:**
- Novo endpoint de ETFs ou mudanças no backend.
- Persistência do estado de acordeão entre sessões.
- Alterar colunas ou campos exibidos na lista/cards.

## Decisions

**1 — Estrutura de grupos no componente**

Definir `GROUPS = ['Ações', 'FII', 'ETF'] as const`. Para cada grupo, derivar via `computed`:
- `stocksForGroup(group)` — filtra e ordena `sortedStocks()` por grupo.
- `collapsed: Signal<Set<string>>` — controla quais grupos estão recolhidos.
- `pages: Signal<Record<string, number>>` — página atual por grupo (chave = `'Ações'|'FII'|'ETF'`).
- `pagedFor(group)` — slice de 10 itens da página atual.

**2 — Template acordeão inline no dashboard.html**

`@for (group of groups; ...)` itera os 3 grupos. Dentro: cabeçalho clicável (`toggle(group)`) e corpo condicional (`*ngIf="!isCollapsed(group)"`). Reutiliza a mesma `<table>` e grid de cards já existentes, envolvendo cada um em um bloco de grupo.

Alternativa considerada: componente separado `<app-asset-group>`. Rejeitada — a lógica de sort, paginação e viewMode já vive em `DashboardComponent`; extrair adicionaria complexidade de @Input sem benefício real neste tamanho.

**3 — Paginação por grupo**

`pageSize = 10`. O signal `pages` já existe em `DashboardComponent` com chave por `AssetType` — reutilizar o mesmo padrão. Controles prev/next por grupo abaixo da tabela/grid.

**4 — ETFs**

Não há endpoint de ETFs ainda. A seção de ETFs só aparece se `acoes()` contiver itens com `sector === 'ETF'`. Por ora ficará oculta; ao adicionar endpoint no futuro, basta incluir no `forkJoin`.
