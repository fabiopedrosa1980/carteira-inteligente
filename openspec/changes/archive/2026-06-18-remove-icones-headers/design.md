## Context

Os títulos de página usam `<span class="page-title-icon">…</span>` dentro de `.page-title` (4 telas). As telas de Dividendos têm títulos internos com ícone próprio: `dividend-history.html` (`.dh-icon` 📋) e `dividends-summary.html` (`.ds-icon` com `icon()` computado por modo). As classes `.page-title-icon` (em `styles.scss`), `.dh-icon` e `.ds-icon` ficam órfãs após a remoção; o `icon` computado em `dividends-summary.ts` também.

É uma mudança puramente de apresentação. Os ícones das abas de navegação (top tabs e sub-tabs) permanecem.

## Goals / Non-Goals

**Goals:**
- Remover os ícones dos 4 títulos de página e dos 3 títulos internos de Dividendos.
- Remover o CSS e o código que ficam sem uso.

**Non-Goals:**
- Remover ícones das abas de navegação ou do logo do app.
- Alterar textos, tamanhos ou layout dos títulos além da remoção do ícone.

## Decisions

**1. Remoção do markup do ícone.** Excluir os `<span class="page-title-icon">…</span>` dos 4 templates de página e os `<span class="dh-icon">`/`<span class="ds-icon">` dos títulos de Dividendos, deixando apenas o texto.

**2. Limpeza de CSS e código.** Remover as regras `.page-title-icon` (`styles.scss`), `.dh-icon` (`dividend-history.scss`) e `.ds-icon` (`dividends-summary.scss`), além do `icon` computado em `dividends-summary.ts`. Verificar que `computed`/imports permaneçam usados por outros membros (ex.: `title`, `subtitle`, `total`).

**3. Espaçamento.** Como o ícone era separado por um espaço/`gap`, conferir que o título sem ícone não fique com recuo estranho; o `gap` do flex em `.page-title` é inofensivo com um único filho.

## Risks / Trade-offs

- [Classe órfã esquecida] → Buscar (`grep`) por `page-title-icon`/`dh-icon`/`ds-icon` após a edição para garantir remoção completa.
- [`icon` computado referenciado em outro lugar] → `grep` por `icon()` no template do summary antes de remover; só há uso no `<span class="ds-icon">`.
