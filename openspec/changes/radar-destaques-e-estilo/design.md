## Context

`DividendsRadarComponent` expõe `months: { month, label, tickers[] }[]` (12) e `year`. Cards em `dividends-radar.{html,scss}`. O `stock-card` define a linguagem visual (borda, hover translateY, perf-bar, tipografia mono/tabular).

## Decisions

**1. Mês com mais ativos (★).** Computar `topMonth = month com max(tickers.length)` (>0; primeiro em empate). No card desse mês, exibir estrela.

**2. Próximo mês.** `nextMonth = (new Date().getMonth()+1)%12 + 1` (mês seguinte ao atual, Dez→Jan). Card recebe classe `.next` com realce (borda accent), como uma "perf-bar"/destaque do stock-card.

**3. Contador.** Cada card mostra `tickers.length` (ex.: badge "N" ou "N ativos").

**4. Título sem ano.** Remover `· {{ year }}` do `radar-title`.

**5. Estilo stock-card.** Aplicar aos `.radar-card` o visual do stock-card: borda, raio, hover `translateY(-3px)` + borda accent, e os chips de ticker já no estilo accent. Manter grid responsivo.

## Risks / Trade-offs

- [Empate no top] → primeiro mês; aceitável.
- [Próximo mês sem proventos] → ainda destacado (indica "olho aqui"); ok.
