## Why

Os títulos de página variam entre as abas: o ícone de Metas é 22px (vs. 20px nas demais), as margens dos títulos divergem (4px / 6px / 0) e a aba Dividendos não tem título de página — vai direto para as sub-tabs. Isso quebra a consistência visual. Além disso, o resumo da tela Minhas Ações mostra apenas Maior Alta e Destaque; falta visibilidade para a maior queda do dia e para a ação melhor avaliada.

## What Changes

- Padronizar o header de todas as páginas no mesmo padrão da aba Meus Ativos (referência): título 20px/700, ícone do mesmo tamanho do título (20px), `gap` 8px, subtítulo 13px e margens iguais.
- Corrigir o ícone de Minhas Metas (22px → padrão) e alinhar as margens dos títulos de Minhas Ações e Metas ao padrão.
- Adicionar um header de página à aba Dividendos (`📅 Dividendos` + subtítulo), acima das sub-tabs, seguindo o mesmo padrão.
- Adicionar dois pills ao resumo da tela Minhas Ações:
  - **Maior Baixa**: menor variação percentual do dia (em vermelho quando negativa).
  - **Maior Nota**: maior nota entre as ações, exibindo o valor e o ticker da ação correspondente.

## Capabilities

### New Capabilities
- `page-header-standardization`: padrão único de header de página (título + ícone + subtítulo) compartilhado por todas as abas.
- `portfolio-summary-stats`: pills de resumo da tela Minhas Ações, incluindo Maior Baixa e Maior Nota.

### Modified Capabilities
<!-- Nenhuma capability de requisito existente é alterada. -->

## Impact

- `src/styles.scss` — classes utilitárias globais de header de página (`.page-header`/`.page-title`/`.page-title-icon`/`.page-subtitle`) para padronização.
- `src/app/components/my-assets/my-assets.{html,scss}` — adotar o padrão (referência).
- `src/app/components/dashboard/dashboard.{html,ts,scss}` — header de Minhas Ações no padrão; novos computeds `minChange`, `maxNota`, `topNotaStock`; pills Maior Baixa e Maior Nota.
- `src/app/components/dividends/dividends.{html,scss}` — novo header de página acima das sub-tabs.
- `src/app/components/goals/goals.{html,scss}` — header no padrão (corrigir ícone 22px).
