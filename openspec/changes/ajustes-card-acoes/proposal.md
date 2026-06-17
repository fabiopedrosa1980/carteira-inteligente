## Why

Os cards de ações cortam nomes de empresas longos cedo demais (20 caracteres), deixando rótulos truncados de forma desnecessária. A nota fica no topo competindo com a identidade do ativo, quando seria mais natural lê-la ao final do card. Além disso, o verde de destaque (`--accent`) da tela Meus Ativos é escuro demais sobre o fundo dark, tornando totais, badges e contadores pouco perceptíveis.

## What Changes

- Aumentar o limite de exibição do nome da empresa no `StockCardComponent` de 20 para 40 caracteres antes de aplicar reticências.
- Reposicionar o badge de nota (`nota-badge`) do topo do card para a parte inferior, junto à faixa de estatísticas.
- Ajustar o token de verde de destaque do tema dark para um tom mais vibrante, melhorando o contraste dos elementos verdes da tela Meus Ativos (contadores, totais, ticker-badge, cabeçalhos ordenáveis ativos).

## Capabilities

### New Capabilities
- `stock-card-display`: Regras de apresentação do card de ação — truncamento do nome da empresa e posicionamento da nota.
- `asset-list-theming`: Contraste do verde de destaque na tela Meus Ativos no tema dark.

### Modified Capabilities
<!-- Nenhuma capability de requisito existente é alterada. -->

## Impact

- `src/app/components/stock-card/stock-card.ts` — limite de caracteres em `displayName`.
- `src/app/components/stock-card/stock-card.html` — movimentação do `nota-badge`.
- `src/app/components/stock-card/stock-card.scss` — estilos do `nota-badge` e da faixa inferior.
- `src/styles.scss` — token de verde (`--accent` e/ou novo token) no tema dark (`:root`).
- A tela Meus Ativos (`my-assets`) consome `--accent`, beneficiando-se automaticamente do ajuste de cor.
