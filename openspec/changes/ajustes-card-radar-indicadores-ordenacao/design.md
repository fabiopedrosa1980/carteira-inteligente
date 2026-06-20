## Context

Sete ajustes de UI em componentes standalone, sem mudança de serviços/modelos:

- **Card** (`stock-card`): a Nota fica em `.card-top` com `align-self: center`, então em cards de identidade com 2 linhas (ticker + nome) ela aparece centralizada, fora da linha do ticker.
- **Ordenação desktop** (`dashboard`): o rótulo "Ordenar por" é projetado **dentro** do `app-scroll-bar.sort-controls`, cuja `.scroll-track` aplica `mask-image` com fade de 18px nas bordas. Em browsers sem `animation-timeline: scroll()`, o fade fixo corta o início do rótulo.
- **Ordenação inicial** (`dashboard.ts`): `sortField = signal('default')`; o combo mobile tem `<option value="default">Padrão</option>`.
- **Radar** (`dividends-radar`): no card de mês, a tag (`.rc-tag`) fica em linha própria, acima de `.rc-tickers`. O destaque "Oportunidade de compra" usa `nextMonth = ((getMonth()+1)%12)+1`. A legenda diz "Próximo mês — oportunidade de compra".
- **Detalhe** (`stock-details-modal`): já existe ícone "i" condicionado a `describe(label)`; o mapa `DESCRIPTIONS` cobre só parte dos indicadores.
- **Histórico** (`dividend-history`): `.dh-selector` (Ativo) e o filtro de ano (`.dh-years` chips / `.dh-year-combo`) estão em blocos separados, empilhados.

## Goals / Non-Goals

**Goals:** os sete ajustes descritos no proposal, preservando comportamentos atuais (rolagem da barra de ordenação, chips/combo de ano por breakpoint).

**Non-Goals:** mudar lógica de ordenação/cálculos; redesenhar o Radar; alterar a fonte/numérica dos indicadores.

## Decisions

- **Nota na linha do ticker**: trocar `align-self: center` por `align-self: flex-start` em `.card-nota` e alinhar verticalmente ao ticker (ajuste fino de `line-height`/`margin` se necessário). Alternativa: mover a Nota para dentro da linha do ticker no markup — descartada por exigir reestruturação.

- **Rótulo "Ordenar por" fora da máscara**: no desktop, reestruturar para que `.sort-controls` seja um container flex contendo `<span class="sort-label">` **fora** do `app-scroll-bar`, e o `app-scroll-bar` (com apenas os botões) vira `.sort-scroll`. Assim a máscara só afeta os botões. Alternativa: desativar o fade do lado esquerdo — descartada por ser frágil entre browsers.

- **Radar: tag inline com tickers**: mover `.rc-tag` para dentro/junto de `.rc-tickers` na mesma linha (flex com `flex-wrap`), exibindo a tag como um item ao lado dos chips. A tag pode virar um chip com ícone. Manter cores de destaque. Alternativa: manter a tag no topo e só reduzir margem — não atende ao pedido.

- **Radar: oportunidade no mês atual**: trocar a base de `nextMonth` para o mês atual (`getMonth()+1`), renomeando para refletir semântica (ex.: `currentMonth`/`opportunityMonth`), e ajustar a legenda para "Mês atual — oportunidade de compra". `isNextMonth` passa a comparar com o mês atual (mantendo classes `.next` para não mexer no CSS, ou renomeando com cuidado). Decisão: manter as classes CSS `.next` e o método, apenas mudando o valor de origem e os textos, para minimizar a superfície de mudança.

- **Descrições de indicadores**: ampliar o mapa `DESCRIPTIONS` (chaves normalizadas) cobrindo o conjunto comum do Investidor10 (P/EBIT, P/Ativo, PSR, EV/EBIT, ROA, margens, variações de dívida, Patrimônio/Ativos, Passivos/Ativos, Giro de Ativos, CAGR receitas/lucros, etc.). O ícone "i" continua condicionado a `describe()`; com o mapa ampliado, todos os indicadores comuns passam a ter descrição. Alternativa: fallback genérico para rótulos desconhecidos — descartada para não exibir texto vago.

- **Histórico: Ativo + Ano na mesma linha**: envolver `.dh-selector` e o filtro de ano em um container flex (`.dh-controls`) com `align-items: center`, `gap`, `flex-wrap: wrap`. Mantém chips no desktop e combo no mobile; em telas estreitas o conjunto quebra sem rolagem.

- **Ordenação inicial = Nome, sem "Padrão"**: `sortField = signal<SortField>('name')` e remover `<option value="default">Padrão</option>` do combo mobile. O ramo `field === 'default'` em `sortedStocks` permanece inofensivo (não acessível pela UI).

## Risks / Trade-offs

- [Renomear `nextMonth` quebrar referências] → manter o nome do método `isNextMonth` e as classes `.next`, mudando apenas o valor de origem e textos; risco baixo.
- [Tag inline empurrar tickers para fora em meses cheios] → usar `flex-wrap` em `.rc-tickers`/container para refluir sem estourar.
- [Mapa de descrições não cobrir um rótulo raro] → aceitável; cobre o conjunto comum e o ícone só aparece quando há descrição.
- [Ativo + Ano na mesma linha ficarem apertados no mobile] → `flex-wrap: wrap` permite quebra sem rolagem horizontal.
