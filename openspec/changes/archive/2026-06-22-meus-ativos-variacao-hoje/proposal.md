## Why

Na tela "Meus Ativos", a coluna que mostra a variação do dia é rotulada apenas como **"Hoje"**, o que não deixa claro que se trata de uma variação percentual. No card do mobile esse mesmo valor aparece como uma pílula solta no topo direito, sem rótulo, dificultando a leitura. Tornar o rótulo explícito ("Variação hoje") melhora a clareza tanto no desktop quanto no mobile.

## What Changes

- Renomear o cabeçalho da coluna **"Hoje"** para **"Variação hoje"** na tabela de Meus Ativos (desktop).
- No card do mobile, adicionar um rótulo **"Variação hoje"** à pílula de variação do dia (hoje sem rótulo / "valor solto"), no mesmo idioma visual dos demais micro-rótulos do card.

## Capabilities

### New Capabilities

(nenhuma)

### Modified Capabilities

- `acoes-list-view`: o rótulo da coluna de variação do dia passa a ser "Variação hoje" (antes "Hoje"), e a pílula de variação do dia no card mobile passa a exibir esse rótulo.

## Impact

- `src/app/components/dashboard/dashboard.html` — texto do cabeçalho da coluna "Hoje".
- `src/app/components/dashboard/dashboard.scss` — rótulo (`::before content`) da pílula de variação do dia no card mobile.
- Sem mudança de dados, API ou lógica de cálculo; apenas rotulagem/apresentação.
