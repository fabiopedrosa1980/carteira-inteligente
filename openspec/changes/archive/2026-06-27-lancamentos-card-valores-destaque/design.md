## Context

No card mobile de Lançamentos (`my-assets.scss`, `@media (max-width:600px)`):
- Os rótulos são pseudo-elementos `::before` de `.date-cell`, `.qty-cell`, `.price-cell`, `.total-cell`, com `color: var(--text-secondary)` explícito (linha ~496).
- Os valores: `.ticker` e `.total-cell` já usam `var(--text-primary)`; porém `.date-cell`, `.qty-cell`, `.price-cell` são forçados a `var(--text-secondary)` no bloco mobile (linhas ~518-523), deixando o dado com baixo contraste.

Variáveis de tema: `--text-primary` = `#e6edf3` (escuro) / `#1f2328` (claro); `--text-secondary` = `#7d8590` / `#656d76`.

## Goals / Non-Goals

**Goals:**
- Valores de Data/Qtd/Preço unit. em cor primária (branca no escuro), rótulos em secundária.

**Non-Goals:**
- Mudar tamanho/peso de fonte ou layout do card.
- Alterar o desktop/tabela.
- Usar `#fff` fixo (quebraria o tema claro).

## Decisions

### Decisão: Usar `--text-primary` para os valores (não `#fff`)
- **Escolha**: No bloco mobile, trocar `color: var(--text-secondary)` por `color: var(--text-primary)` em `.date-cell, .qty-cell, .price-cell`. Os `::before` mantêm `var(--text-secondary)` explícito, então os rótulos não mudam.
- **Alternativa**: `color: #fff` literal — rejeitada porque ficaria ilegível no tema claro.
- **Rationale**: `--text-primary` é branco/near-white no escuro (atende ao pedido "em branco") e escuro no claro (mantém legibilidade), com hierarquia rótulo×valor consistente.

## Risks / Trade-offs

- **`::before` herdar a cor do valor** → não ocorre: o `::before` já define `color: var(--text-secondary)` explicitamente, prevalecendo sobre a cor do elemento.

## Migration Plan

1. Ajustar a cor dos valores no bloco mobile do `my-assets.scss`.
2. `ng build` e validar contraste no card (escuro e claro).

**Rollback**: Reverter o commit (mudança isolada de cor).
