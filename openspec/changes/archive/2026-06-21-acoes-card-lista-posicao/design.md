## Context

A seção "Minhas Ações" (dashboard, aba `portfolio`) renderiza `app-stock-card` para cada item de `sortedStocks()`, derivado de `acoes()`. `acoes()` vem de `BackendApiService.getAcoes()` → `ApiAcaoItem`, mapeado para `Stock` no `dashboard.ts:194` incluindo `quantity` (`total_quantity`), `avgPrice` (`avg_price`) e `price` (`current_price`). O modelo `Stock` já possui `quantity?` e `avgPrice?`.

O cabeçalho da seção (`.section-header`) já tem o título e os controles de ordenação (`.sort-controls` no desktop, `.sort-mobile` no mobile). O Radar já tem um padrão de toggle de visão por ícones (`.radar-view-toggle`).

Conclusão importante: **todos os dados necessários já chegam do backend** — nenhuma mudança na API Go.

## Goals / Non-Goals

**Goals:**
- Card mostra quantidade, preço atual (dia), saldo, variação da posição (R$) e rentabilidade (%).
- Visão em lista com os mesmos campos em colunas; toggle Cards/Lista (cards padrão) no cabeçalho à direita.
- Cálculos derivados no frontend, reusados por card e lista.

**Non-Goals:**
- Alterar a API Go ou os serviços.
- Cotação intraday ao vivo via `getBulkQuotes()` (fica como ressalva futura).
- Persistir a preferência de visão entre sessões.

## Decisions

- **Cálculos de posição reutilizáveis**: criar funções puras (ex.: em `src/app/models/position.util.ts`) — `saldo(stock)`, `custo(stock)`, `variacaoPosicao(stock)` e `rentabilidade(stock)` — usadas tanto pelo `stock-card` quanto pela lista, evitando duplicação e facilitando teste. Guardas: retornar `null`/`0` quando `quantity <= 0` ou `avgPrice <= 0`.
  - `saldo = quantity × price`
  - `custo = quantity × avgPrice`
  - `variacaoPosicao = saldo − custo`
  - `rentabilidade = avgPrice > 0 ? (price − avgPrice) / avgPrice × 100 : null`

- **Card**: adicionar uma linha de posição (Qtd + Saldo) e variação/rentabilidade. Reaproveitar classes de cor positiva/negativa já usadas (`pos`/`neg`). A variação do dia ("Hoje") permanece. Cuidar do budget de CSS do `stock-card.scss`.

- **Visão em lista**: estado `viewMode = signal<'cards' | 'list'>('cards')` no `dashboard.ts`. No template, `@if (viewMode() === 'cards')` renderiza o grid de cards atual; senão, uma tabela/lista iterando `sortedStocks()`. As colunas usam as funções puras de posição. Reusa o mesmo `sortedStocks()`, então a ordenação vale para as duas visões.

- **Toggle no cabeçalho (à direita, com "Ordenar por")**: adicionar um grupo de ícones (cards/lista) dentro do `.section-header`, ao lado dos controles de ordenação, espelhando `.radar-view-toggle`. No mobile, acompanha o empilhamento do cabeçalho. Alternativa: à esquerda do título ou em linha própria — descartadas (usuário escolheu à direita junto à ordenação).

- **Lista no mobile**: tabela com `table-layout: fixed`; ocultar/reproporcionar colunas menos críticas em telas estreitas (ex.: priorizar Ativo, Saldo, Rentabilidade), sem rolagem horizontal — mesmo princípio já aplicado em `goals`/`my-assets`.

## Risks / Trade-offs

- [Excesso de informação no card] → agrupar posição em uma linha compacta (Qtd · Saldo) e variação/rentabilidade em outra; manter hierarquia (preço-herói no topo).
- [`current_price` de `getAcoes()` eventualmente defasado] → aceitável; documentado como ressalva (poderia atualizar via `getBulkQuotes()` no futuro).
- [Budget de CSS do `stock-card.scss`/`dashboard.scss`] → manter as adições enxutas; já houve estouro de budget no `dashboard.scss` antes.
- [Lista no mobile estourar] → `table-layout: fixed` + ocultar colunas, sem scroll horizontal.
