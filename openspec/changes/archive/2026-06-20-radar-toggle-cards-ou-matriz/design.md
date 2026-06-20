## Context

`DividendsRadarComponent` monta `rows = signal<TickerRow[]>` (`{ ticker, marks[12] }`) a partir dos dividendos (ex_date do ano anterior), e renderiza a matriz (`.radar-matrix`, `display:grid` com `.rm-row{display:contents}`, coluna de ticker sticky, células marcadas). Já tem `monthLabels`, `monthInitials`, `skelRows`/`skelCols` e o skeleton da matriz. A visão de cards (12 meses) existiu antes e foi removida ao migrar para a matriz.

## Goals / Non-Goals

**Goals:**
- Alternador Cards | Matriz no Radar, com a Matriz como padrão.
- Visão de cards: 12 meses, cada um com os tickers daquele mês + contador.
- Persistir a escolha; ambas com skeleton e respeitando a classe.

**Non-Goals:**
- Mudar a matriz atual ou a fonte/critério de dados.
- Reintroduzir destaques de "melhor mês"/"próximo mês" (foram removidos a pedido).

## Decisions

**1. Estado da visualização.** `view = signal<'cards' | 'matrix'>(...)`, inicializado de `localStorage` (`radar-view`), default `'matrix'`. `setView(v)` atualiza o signal e persiste. Método helper `isView(v)`.

**2. Dados dos cards (derivado, sem novo fetch).** `monthCards = computed(() => MONTHS.map((label, i) => ({ month: i+1, label, tickers: rows().filter(r => r.marks[i]).map(r => r.ticker) })))`. Reaproveita exatamente os mesmos dados da matriz — zero chamada extra.

**3. Alternador (UI).** Segmented control no topo do Radar (abaixo do hint), com dois botões "Cards" e "Matriz", `aria-pressed`. Estilo discreto coerente com os toggles existentes do app (ex.: `dv-asset-toggle`).

**4. Render condicional.**
- `view==='cards'` → grid de 12 `.radar-card`: `.rc-month` (label) + `.rc-count` (nº) + chips de ticker; "—" quando vazio. Skeleton: 12 cards `.skeleton`.
- `view==='matrix'` → a matriz atual, intacta. Skeleton atual da matriz.
- Cada bloco com `fade-in`.

**5. Estilos dos cards.** Reintroduzir um grid simples (`.radar-grid`, 4/2/1 colunas responsivo) e `.radar-card` no padrão do app (borda, raio 14px, hover leve), chips de ticker accent e contador mono — sem os rótulos/estrela antigos.

## Risks / Trade-offs

- [Duas visões para manter] o componente passa a ter dois templates; mitiga-se compartilhando os dados (`rows`/`monthCards`) e o skeleton/estilo base.
- [Persistência simples] `localStorage` por chave fixa; se o usuário usar duas classes, a preferência de modo é global (aceitável — é só o formato, não o filtro).
