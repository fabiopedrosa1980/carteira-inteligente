## Why

Com o novo header `📅 Dividendos`, os títulos internos ("Histórico de Dividendos", "Dividendos Recebidos", "Dividendos Projetados") ficaram redundantes — devem ser encurtados para Histórico, Recebidos e Projetados. O toast de confirmação de operação está pequeno e pouco legível. A fonte base da aplicação (14px) é modesta para leitura em mobile e web. E a faixa de pills antes do header em Minhas Ações polui o topo da tela.

## What Changes

- Encurtar os títulos das telas de Dividendos para **Histórico**, **Recebidos** e **Projetados** — tanto nos rótulos das sub-tabs quanto nos títulos internos das seções.
- Aumentar a fonte e o tamanho do toast de confirmação de operação (padding, max-width e font-size maiores).
- Aumentar a fonte base da aplicação para melhorar a leitura em mobile e web (14px → 15px), sem quebrar o layout.
- Remover a faixa de pills (`portfolio-stats`: Ações, Maior Alta, Maior Baixa, Destaque, Maior Nota) que aparece antes do header em Minhas Ações, incluindo os estilos e computeds que ficam sem uso.

## Capabilities

### New Capabilities
- `dividends-view-titles`: títulos curtos das telas de Dividendos (Histórico, Recebidos, Projetados).
- `ui-readability`: tamanho da fonte base da aplicação e dimensionamento do toast de confirmação.

### Modified Capabilities
- `portfolio-summary-stats`: remoção da faixa de pills de resumo da tela Minhas Ações.

## Impact

- `src/app/components/dividends/dividends.ts` — rótulos das sub-tabs.
- `src/app/components/dividend-history/dividend-history.html` — título interno.
- `src/app/components/dividends-summary/dividends-summary.ts` — título computado por modo.
- `src/app/components/toast/toast.scss` — fonte e dimensões do toast.
- `src/styles.scss` — fonte base global.
- `src/app/components/dashboard/dashboard.{html,ts,scss}` — remoção da faixa `portfolio-stats`, estilos `.stat-pill`/`.sp-*` e computeds `maxChange`/`topChangeStock`/`minChange`/`maxNota`/`topNotaStock`.
