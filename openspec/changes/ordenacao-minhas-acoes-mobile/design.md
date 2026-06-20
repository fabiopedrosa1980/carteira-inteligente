## Context

A ordenação de Minhas Ações vive no `DashboardComponent`: `sortField` (signal, inclui `'default'`), `sortAsc` (signal), `sortOptions` (Nome/Preço/Variação/DY/Nota → name/price/change/dy/nota) e `sortedStocks` (computed). `setSort(field)` alterna a direção se o campo é o mesmo, senão troca o campo definindo a direção padrão (decrescente para change/dy/nota). No template, os controles estão em `<app-scroll-bar class="sort-controls">` (rolam no mobile). `ResponsiveService.isMobile()` já existe, mas o Dashboard ainda não o injeta.

## Goals / Non-Goals

**Goals:**
- Mobile: combo `<select>` de campo (com "Padrão") + botão ↑/↓ de direção, em uma linha, sem rolagem.
- Desktop: chips atuais inalterados.
- Combo/botão e chips compartilham o mesmo estado (`sortField`/`sortAsc`), sem duplicar lógica.

**Non-Goals:**
- Mudar a lógica de ordenação ou os campos disponíveis.
- Remover o `<app-scroll-bar>` (continua nos chips do desktop).
- Alterar o cabeçalho/section-header além do necessário.

## Decisions

- **Alternância por `@if (isMobile())`, só uma variante no DOM.** O Dashboard injeta `ResponsiveService`. No template, `@if (isMobile())` renderiza o combo + botão; `@else` mantém `<app-scroll-bar class="sort-controls">` com os chips. Racional: evita CSS de show/hide e mantém o DOM enxuto, padrão já usado no Histórico.
- **Combo reaproveita `setSort()`.** O `(change)` do `<select>` chama `setSort(value)`. Como o evento só dispara quando o valor muda, o campo será sempre diferente do atual → `setSort` troca o campo com a direção padrão (sem o comportamento de toggle). A opção "Padrão" mapeia para o campo `'default'`. Não é preciso novo método para o campo.
- **Botão de direção: `toggleSortDir()`.** Novo método simples que faz `sortAsc.update(v => !v)`; `sortedStocks` recomputa. O botão exibe ↑ (asc) / ↓ (desc) e fica **desabilitado quando `sortField() === 'default'`** (não há ordenação a inverter). Mantém consistência com os chips (que também não ordenam no estado padrão).
- **Estilos do combo no mobile.** Reusar o visual de `<select>` já existente no app (ex.: `.dh-select` do Histórico como referência) para um `.sort-select`, e um botão de direção compacto ao lado, ambos em uma linha dentro do `.section-header` (que já vira coluna no mobile).

## Risks / Trade-offs

- [Combo e chips divergirem] → Ambos derivam de `sortField`/`sortAsc` e usam `setSort`/`toggleSortDir`; o `<select>` reflete `sortField()` via `[value]`. Sem estado duplicado.
- [Opção "Padrão" no combo vs. ausência de chip padrão no desktop] → No desktop, "padrão" é simplesmente nenhum chip ativo; no combo é uma opção explícita — comportamento equivalente, com reset mais visível no mobile.
- [Regressão de spec] → Modifica `responsive-menu-bar`; o sync ao arquivar reescreve o requisito dos controles de ordenação.
