## Why

Os acordeões da tela "Meus Ativos" têm visual diferente dos acordeões de "Lançamentos" (cabeçalho e corpo são elementos separados, sem animação de colapso). Além disso, ETFs lançados nunca aparecem em "Meus Ativos" porque o `loadAtivos()` não chama nenhum endpoint de ETFs — somente Ações e FIIs são carregados.

## What Changes

- O visual dos acordeões de "Meus Ativos" é padronizado para o mesmo estilo de "Lançamentos": card único por seção (`border-radius: 12px`, `border`), corpo com `border-top` e transição `max-height` ao colapsar.
- A contagem de ativos por grupo passa a ser exibida como badge (estilo `sec-count` com cor accent), igual a "Lançamentos".
- Adicionar o método `getEtfs()` em `BackendApiService` apontando para `/transactions/etfs`.
- Incluir ETFs no `forkJoin` de `loadAtivos()` em `dashboard.ts`, mapeando `sector: 'ETF'`.

## Capabilities

### New Capabilities

Nenhuma.

### Modified Capabilities

- `meus-ativos-grupos`: o visual dos acordeões muda para unificar com "Lançamentos"; ETFs passam a ser exibidos quando o backend retorna posições ETF.

## Impact

- `src/app/services/backend-api.service.ts` — adicionar `getEtfs()`.
- `src/app/components/dashboard/dashboard.ts` — incluir `getEtfs()` no `forkJoin`.
- `src/app/components/dashboard/dashboard.html` — refatorar acordeão para `.accordion` / `.accordion-header` / `.accordion-body` (mesmos nomes do my-assets).
- `src/app/components/dashboard/dashboard.scss` — substituir estilos de `.group-header` / `.group-body` / `.group-arrow` pelos equivalentes do padrão Lançamentos.
