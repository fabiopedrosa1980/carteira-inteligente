## Context

`DividendsRadarComponent` hoje monta `months = signal<MonthCell[]>` (12 itens, cada um com `tickers[]`), a partir de `byMonth: Map<number, Set<string>>` construído de `getStockDividends` (ex_date do ano anterior). Expõe `topMonth` (mês com mais tickers), `nextMonth`, `isTop`/`isNext`. O template é um grid de cards; o SCSS já define `$mono`, perf-bar, hover.

## Goals / Non-Goals

**Goals:**
- Matriz ticker (linhas) × mês (colunas), célula marcada onde houve data-com.
- Coluna fixa de tickers + rolagem horizontal.
- Destaque das colunas do próximo mês e do mês com mais ativos.

**Non-Goals:**
- Mudar a fonte de dados ou o critério (ex_date do ano anterior, por classe).
- Valores/quantias nas células (é presença/ausência, como batalha naval).

## Decisions

**1. Modelo de dados (pivot).** Trocar `MonthCell[]` por linhas por ticker:
```ts
interface TickerRow { ticker: string; marks: boolean[]; } // marks.length === 12
```
No `load()`, construir `byTicker: Map<string, Set<number>>` (mês 1–12) e gerar `rows` ordenadas por ticker, com `marks[i] = set.has(i+1)`. Manter o cálculo de `topMonth` (coluna com mais marcas) e `nextMonth`.

**2. Destaque de coluna.** `isNextCol(i)` = `i+1 === nextMonth`; `isTopCol(i)` = `i+1 === topMonth`. A coluna do próximo mês recebe realce accent/verde + ícone de atenção no cabeçalho (título "Oportunidade de compra"); a do melhor mês recebe realce verde (título "Melhor mês"). Realce aplicado ao cabeçalho e às células da coluna (tint de fundo).

**3. Layout (CSS grid).** Container com `overflow-x: auto`. Grade: `grid-template-columns: minmax(64px, auto) repeat(12, minmax(34px, 1fr))`. Linha de cabeçalho: célula vazia (ou "Ativo") + 12 labels de mês (`$mono`, uppercase). Cada linha: ticker (`$mono`, sticky `left:0`, fundo do card) + 12 células. Célula marcada = ponto/quadrado preenchido accent; vazia = ponto sutil/—.

**4. Marca.** Célula marcada: um disco accent (ex.: `8px`, `border-radius: 50%`, `background: var(--accent)`), centralizado; vazia: ponto `var(--border)` discreto. `title` na célula com "ticker · mês" para acessibilidade.

**5. Estados.** Loading: "Calculando…". Vazio (sem ativos/sem marcas): mensagem coerente. Mantém o título sem ano.

## Risks / Trade-offs

- [Largura] 13 colunas não cabem em telas estreitas → rolagem horizontal + coluna de ticker fixa resolvem; meses ficam estreitos mas legíveis (abreviação 3 letras).
- [Muitos tickers] a matriz cresce na vertical; aceitável (uma linha por ativo). Sem paginação no v1.
- [Perda dos cards] o estilo "card por mês" sai; os destaques de mês migram para colunas, preservando a leitura de "próximo mês" e "melhor mês".
