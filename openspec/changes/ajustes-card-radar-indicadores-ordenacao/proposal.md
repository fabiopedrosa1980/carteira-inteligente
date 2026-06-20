## Why

Sete ajustes de UI corrigem alinhamentos, cortes de texto e melhoram a clareza: a Nota do card de Minhas Ações não fica na linha do ticker; o rótulo "Ordenar por" é cortado pela máscara de fade no desktop; no Radar a tag de destaque fica em linha própria e o destaque de "oportunidade de compra" aponta para o próximo mês quando deveria ser o mês atual; nem todos os indicadores fundamentalistas têm descrição no detalhe da ação; a ordenação no mobile inicia em "Padrão" (opção desnecessária); e no Histórico o filtro de ano fica em linha separada do seletor de ativo.

## What Changes

- **Card de Minhas Ações — Nota**: alinhar a Nota à **linha do ticker** (topo), em vez de centralizada verticalmente entre ticker e nome.
- **Ordenação (web) — rótulo cortado**: tirar o rótulo "Ordenar por" de dentro da área com máscara de fade do `app-scroll-bar`, para não ser cortado.
- **Radar — tag ao lado do mês**: exibir a tag de destaque ("Melhor mês"/"Oportunidade") na **mesma linha do nome do mês** (cabeçalho do card), com a contagem à direita.
- **Radar — oportunidade no mês atual**: mover o destaque "Oportunidade de compra" do **próximo mês para o mês atual** (ajustar legenda correspondente).
- **Detalhe da ação — descrições**: garantir o ícone "i" com descrição para **todos** os indicadores fundamentalistas (ampliar o mapa de descrições).
- **Ordenação (mobile)**: iniciar com **"Nome"** selecionado e **remover a opção "Padrão"** do combo.
- **Histórico — filtros na mesma linha**: posicionar o **filtro de ano na mesma linha do seletor de Ativo**.

## Capabilities

### New Capabilities
- `radar-card-layout`: posição da tag de destaque no card do Radar (ao lado do mês) e mês destacado como "oportunidade".
- `stock-indicator-descriptions`: ícone "i" com descrição para todos os indicadores fundamentalistas no detalhe da ação.
- `historico-filtros-layout`: seletor de Ativo e filtro de Ano dispostos na mesma linha no Histórico.

### Modified Capabilities
- `stock-card-stat-layout`: a Nota passa a ser alinhada à linha do ticker no topo do card.
- `acoes-sort-layout`: rótulo "Ordenar por" não é cortado no desktop; no mobile inicia em "Nome" e sem opção "Padrão".

## Impact

- `src/app/components/stock-card/stock-card.scss` — alinhamento da Nota.
- `src/app/components/dashboard/dashboard.html` e `dashboard.scss` — rótulo de ordenação fora da máscara; `dashboard.ts` — campo de ordenação inicial.
- `src/app/components/dividends-radar/dividends-radar.html`, `.scss` e `.ts` — tag ao lado dos tickers; oportunidade no mês atual.
- `src/app/components/stock-details-modal/stock-details-modal.ts` — ampliar `DESCRIPTIONS`.
- `src/app/components/dividend-history/dividend-history.html` e `.scss` — Ativo + Ano na mesma linha.
- Sem mudanças de API, modelos ou serviços.
