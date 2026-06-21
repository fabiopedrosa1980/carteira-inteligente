## Context

`MyAssetsComponent` (aba "Lançamentos") renderiza `.transactions-table` com `.table-header` (cabeçalho ordenável) e `.table-row` por lançamento. Cada linha tem células com classes semânticas: `.ticker-cell` (com `.ticker-badge`), `.date-cell`, `.qty-cell`, `.price-cell`, `.total-cell` e `.action-cell` (botões `.btn-edit`/`.btn-remove`). Hoje, no mobile (≤600px), o grid colapsa para `repeat(3, minmax(0,1fr)) 56px` e oculta Data e Preço.

Já existe um padrão de card no app (cards de "Meus Ativos"/`stock-card`): perf-bar opcional, números em mono, micro-rótulos sans em caixa-alta. Vamos reaproveitar esse idioma para consistência.

## Goals / Non-Goals

**Goals:**
- Mobile: cada lançamento como card/grid com todos os campos + ações.
- Reusar o idioma visual dos cards (mono nos números, micro-rótulos sans).
- Preservar ordenação, paginação, edição (clique) e botão Adicionar.

**Non-Goals:**
- Não mudar o desktop (continua tabela em grid de colunas).
- Não mexer em TS/serviços/modelo.
- Sem reordenar/renomear campos no desktop.

## Decisions

- **Cabeçalho**: ocultar `.table-header` no mobile (`display: none`), pois cada card terá rótulos próprios. Como o header também é o controle de ordenação, a ordenação no mobile segue pela ordenação atual (padrão ticker asc); não adicionamos UI de ordenação nova nesta change.
- **Card**: no mobile, `.table-row` vira `display: grid` com `grid-template-areas`:
  ```
  "ticker  actions"
  "data    qtd"
  "preco   total"
  ```
  - `.ticker-cell` → área `ticker` (badge à esquerda).
  - `.action-cell` → área `actions` (botões no topo direito; já existe com os dois botões).
  - `.date-cell` → `data`; `.qty-cell` → `qtd`; `.price-cell` → `preco`; `.total-cell` → `total`.
  - Reverter o `display:none` de `.date-cell`/`.price-cell` no mobile.
- **Estilo do card**: borda/raio/padding como os demais cards; números em mono; cada célula recebe micro-rótulo via `::before` (sans, caixa-alta, `--text-secondary`): "Data", "Qtd", "Preço unit.", "Total". `.ticker-cell` e `.action-cell` sem rótulo.
- **Total** mantém destaque (cor accent, peso maior) como já é.
- **Container**: `.transactions-table` vira bloco vertical de cards (gap entre cards); como hoje as `.table-row` têm `border-bottom`, no mobile troca para cards com borda + margem.

## Risks / Trade-offs

- Ordenação no mobile: ao ocultar o header, perde-se o acesso aos controles de ordenação no mobile. Aceitável para esta change (padrão atual = ticker asc). Se necessário, uma UI de ordenação mobile pode vir depois.
- `::before` em células de grid: o rótulo é bloco acima do valor; garantir `min-width: 0` para truncar valores longos sem estourar.
- O `.action-cell` no topo do card aumenta a área de toque dos botões — atenção a `stopPropagation` (já existente) para não abrir o modal ao clicar nos botões.
