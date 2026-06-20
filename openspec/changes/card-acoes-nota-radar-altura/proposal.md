## Why

Dois ajustes visuais: (1) no card de Minhas Ações no desktop, a faixa de estatísticas (Hoje · DY · Nota · setor) não cabe em cards estreitos e a **Nota é cortada/quebra** — o texto deveria aparecer inteiro; (2) na aba Radar no mobile, os cards de mês têm **alturas diferentes** conforme o número de tickers, deixando a grade irregular — devem ter **altura uniforme**, definida pelo card mais cheio.

## What Changes

- **Card de Minhas Ações (desktop)**: a faixa de estatísticas passa a **quebrar de linha** quando não couber, em vez de cortar/clipar a Nota e o setor. Nenhum texto é cortado.
- **Cards do Radar (mobile)**: a grade de cards passa a ter **altura de linha uniforme** (`grid-auto-rows: 1fr`), de modo que todos os cards fiquem do mesmo tamanho, dimensionados pelo card com mais tickers.
- **Remover textos descritivos abaixo do header**: remover o hint do Radar ("Tickers da carteira com data-com…") e o hint do modal de Detalhes da ação ("Passe o mouse no ícone…"). O subtítulo de Lançamentos (com o Total) é **mantido**.

## Capabilities

### New Capabilities
- `stock-card-stat-layout`: comportamento da faixa de estatísticas do card de ação — nunca corta os textos (Hoje/DY/Nota/setor), quebrando de linha quando necessário.
- `screen-header-text`: quais textos descritivos aparecem abaixo dos títulos das telas (Radar e Detalhes não exibem hint; Lançamentos mantém o resumo).

### Modified Capabilities
- `mobile-view-fit`: acrescenta que os cards do Radar no mobile têm altura uniforme.

## Impact

- `src/app/components/stock-card/stock-card.scss` — `.stat-strip` ganha `flex-wrap: wrap` (+ `row-gap`) para não cortar a Nota/setor no desktop.
- `src/app/components/dividends-radar/dividends-radar.scss` — `.radar-grid` no mobile ganha `grid-auto-rows: 1fr` (cards com altura igual à do mais cheio).
- `src/app/components/dividends-radar/dividends-radar.html` — remover o `<p class="radar-hint">`.
- `src/app/components/stock-details-modal/stock-details-modal.html` — remover o `<p class="section-hint">`.
- Estilos + remoção de markup; sem mudança em serviços, modelos ou API. O subtítulo de Lançamentos (`my-assets`) permanece.
