## Context

A tabela de Lançamentos (`my-assets.scss`) usa, no desktop:
- `.ticker-badge` — pílula verde: `background: color-mix(--accent 12%)`, `color: var(--accent)`, `border-radius: 6px`, `padding: 3px 8px`. No mobile já vira texto (mas em `--accent`).
- `.total-cell` — `color: var(--accent)`, `font-weight: 700`. No mobile já é `--text-primary`.
- Bloco `@media (min-width: 601px)` — alinha à direita as colunas 3–6 do cabeçalho (`.table-header > span:nth-child(3..6)`) e as células `.qty-cell`, `.price-cell`, `.total-cell`, além de `justify-content: flex-end` no `.action-cell`.

A lista de Meus Ativos (`dashboard.scss` `.acoes-list`) já é o padrão-alvo: `th { text-align: left }`, `td` à esquerda, ticker como texto simples (`.ca-ticker`, sem badge), valores em cor primária.

## Goals / Non-Goals

**Goals:**
- Lançamentos visualmente alinhado a Meus Ativos: ticker neutro, Total neutro, colunas à esquerda.

**Non-Goals:**
- Não alterar Meus Ativos (já é o alvo).
- Não mexer nos cards mobile de Lançamentos (layout próprio em grid).
- Não mexer no cabeçalho de seção do acordeão (linha-resumo com Total à direita — elemento de header, não coluna).
- Sem mudança de dados/comportamento.

## Decisions

### 1. Cores → neutras

`.total-cell` desktop: `color: var(--accent)` → `var(--text-primary)`. Mantém `font-weight: 700` (segue sendo o total da linha; o pedido é remover o verde, não a ênfase de peso). `.ticker-badge` desktop: remover `background` e `color: var(--accent)`, virando texto simples em `var(--text-primary)` (e remover padding/border-radius do "pílula"). No mobile o ticker que hoje é `--accent` também passa a `--text-primary`, encerrando o override de tema claro que existia só para isso.

### 2. Alinhamento → esquerda

Remover (ou neutralizar) o bloco `@media (min-width: 601px)` que força `text-align: right`/`justify-content: flex-end` nas colunas numéricas e em Operação. Com isso, cabeçalho (`.table-header > span`) e células voltam ao padrão à esquerda. Preservar `font-variant-numeric: tabular-nums` nos números (manter as casas alinhadas verticalmente mesmo à esquerda).

### 3. Escopo desktop

Mobile usa cards em grid com áreas próprias (Qtd/Total com `justify-self: end`), espelhando os cards de Meus Ativos mobile — fora do escopo. A mudança é cirúrgica no caminho desktop (`min-width: 601px`).

## Risks / Trade-offs

- **Números à esquerda dificultam comparar magnitudes** (à direita as casas alinham naturalmente) → Mitigação: `tabular-nums` preserva o alinhamento das casas; e o objetivo é consistência com Meus Ativos, que já é à esquerda.
- **Total sem cor perde um pouco de destaque** → Mitigação: mantém `font-weight: 700`; o destaque do "total" forte fica no cabeçalho de seção e na faixa de resumo.

## Migration Plan

CSS apenas; sem migração. Build Angular. Rollback = reverter o commit.

## Open Questions

- A coluna **Operação** (ícones editar/remover) deve ficar à esquerda como as demais, ou pode permanecer compactada? (decisão atual: segue o alinhamento à esquerda como o restante.)
