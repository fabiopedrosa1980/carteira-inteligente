## Why

Dois pontos quebram a consistência visual:

1. O tooltip de oportunidade (Meus Ativos) tem um título "Oportunidade" redundante — a coluna já se chama "Oportunidade" e o veredito (🟢 Zona de compra) já funciona como cabeçalho natural.
2. O card "Total recebido / Total projetado" (telas Recebidos e Projetados) usa um wash verde hardcoded (`rgba(26,127,75,…)`) e valor em verde, fugindo da linguagem de cards do app. Todos os demais cards de métrica (resumo do dashboard) usam superfície neutra, rótulo uppercase secundário, valor-herói em `--text-primary` e tinta de accent restrita a um tile de ícone.

## What Changes

- Remover o título "Oportunidade" (`.ot-title`) do topo do tooltip de oportunidade; o veredito da zona passa a ser o primeiro elemento.
- Realinhar o card de total (Recebidos/Projetados) à linguagem dos cards de resumo (`.ps-card`): superfície `var(--card-bg)` + `var(--border)`, rótulo uppercase em `--text-secondary`, valor-herói em `--text-primary` com `tabular-nums`, e a cor de accent expressa apenas por um tile de ícone (não pelo fundo nem pelo número).
- Sem mudança de dados, cálculos ou comportamento — apenas apresentação.

## Capabilities

### New Capabilities
- `oportunidade-tooltip-sem-titulo`: o tooltip de oportunidade não exibe título próprio.
- `dividendos-total-identidade-visual`: o card de total recebido/projetado segue a linguagem visual dos cards de métrica do app.

### Modified Capabilities
<!-- Nenhuma capability arquivada é alterada. -->

## Impact

- `src/app/components/dashboard/dashboard.html` — remove `<span class="ot-title">`.
- `src/app/components/dashboard/dashboard.scss` — remove a regra `.ot-title` (agora órfã).
- `src/app/components/dividends-summary/dividends-summary.html` — markup do `.ds-total-card` (adiciona tile de ícone + estrutura rótulo/valor).
- `src/app/components/dividends-summary/dividends-summary.scss` — re-estiliza `.ds-total-card` para os tokens neutros do app.
- Sem mudanças de TS, backend ou dependências. Sem breaking changes.
