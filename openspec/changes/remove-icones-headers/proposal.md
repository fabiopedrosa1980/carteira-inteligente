## Why

Os ícones (emojis) nos títulos das páginas e nos títulos das sub-seções de Dividendos poluem visualmente os headers. Removê-los deixa as telas mais limpas e sóbrias, mantendo apenas o texto do título.

## What Changes

- Remover os ícones dos títulos de página em todas as telas: 📊 Meus Ativos, 💼 Minhas Ações, 📅 Dividendos, 🎯 Minhas Metas.
- Remover os ícones dos títulos internos das telas de Dividendos: 📋 Histórico, 💰 Recebidos, 📈 Projetados.
- Limpar os estilos e o código que ficam sem uso (`.page-title-icon`, `.dh-icon`, `.ds-icon` e o `icon` computado do summary).
- Manter os ícones das abas de navegação (top tabs e sub-tabs de Dividendos) — apenas os títulos/headers perdem o ícone.

## Capabilities

### New Capabilities
<!-- Nenhuma capability nova. -->

### Modified Capabilities
- `page-header-standardization`: o header de página passa a não ter ícone.
- `dividends-view-titles`: os títulos internos de Dividendos passam a não ter ícone.

## Impact

- `src/app/components/my-assets/my-assets.html`, `dashboard/dashboard.html`, `dividends/dividends.html`, `goals/goals.html` — remover `<span class="page-title-icon">`.
- `src/app/components/dividend-history/dividend-history.html` — remover `<span class="dh-icon">`.
- `src/app/components/dividends-summary/dividends-summary.html` — remover `<span class="ds-icon">`.
- `src/app/components/dividends-summary/dividends-summary.ts` — remover o `icon` computado.
- `src/styles.scss`, `dividend-history.scss`, `dividends-summary.scss` — remover regras órfãs `.page-title-icon`/`.dh-icon`/`.ds-icon`.
