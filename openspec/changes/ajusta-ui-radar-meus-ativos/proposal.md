## Why

Alguns detalhes visuais estão fora do padrão da aplicação: o estado vazio do Radar de proventos usa um texto solto, diferente das demais telas de dividendos (que têm ícone + título + descrição); o card de ativo no mobile da aba "Meus Ativos" tem um realce de fundo na "Variação hoje" que destoa dos demais campos, além de uma linha isolada de quantidade que deixa espaço em branco ocioso; e o ícone do card "Patrimônio Total" é maior que o dos outros cards de resumo, quebrando a coerência visual.

## What Changes

- **Radar — estado vazio padronizado**: substituir o texto solto `Nenhum ativo com proventos no período.` por um bloco de estado vazio com ícone, título e texto descritivo, no mesmo idioma visual usado em "Histórico de dividendos" e "Resumo de dividendos".
- **Card Meus Ativos (mobile) — remover realce da "Variação hoje"**: remover o fundo destacado (pílula colorida) do campo "Variação hoje" para que ele fique no mesmo idioma dos demais campos do card.
- **Card Meus Ativos (mobile) — layout sem espaço em branco**: reorganizar o grid do card para que a quantidade fique **acima da variação** e eliminar a linha isolada de quantidade que ocupa a largura inteira, removendo o espaço em branco ocioso.
- **Resumo da carteira — ícone do Patrimônio Total coerente**: igualar o tamanho do ícone do card "Patrimônio Total" ao dos demais cards de resumo.

## Capabilities

### New Capabilities
- `radar-estado-vazio`: estado vazio do Radar de proventos exibido com ícone, título e texto, no mesmo padrão das demais telas de dividendos.
- `meus-ativos-card-mobile-layout`: layout do card de ativo no mobile sem realce de fundo na "Variação hoje" e com a quantidade posicionada acima da variação, sem espaço em branco ocioso.
- `resumo-icone-patrimonio-coerente`: ícone do card "Patrimônio Total" dimensionado de forma coerente com os demais cards de resumo.

### Modified Capabilities
<!-- Nenhuma capability existente tem seus requisitos alterados; as mudanças são refinamentos visuais isolados. -->

## Impact

- `src/app/components/dividends-radar/dividends-radar.html` — markup do estado vazio.
- `src/app/components/dividends-radar/dividends-radar.scss` — estilos do estado vazio.
- `src/app/components/dashboard/dashboard.scss` — grid do card mobile (`.acoes-row`), estilos da "Variação hoje" e tamanho do ícone do card hero (`.ps-card-hero .ps-card-icon`).
- Sem mudanças de API, modelos ou lógica de dados — apenas template e estilos.
