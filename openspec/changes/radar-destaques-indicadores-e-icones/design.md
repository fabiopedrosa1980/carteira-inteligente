## Context

**Radar** (`DividendsRadarComponent`): `rows` (matriz ticker×marks[12]) e `monthCards` (12 cards derivados de `rows`); `view` (cards|matrix) por `localStorage`, com toggle de botões de texto "Cards | Matriz". Os destaques de mês (`topMonth`/`nextMonth`/`isTopCol`/`isNextCol`) foram removidos numa change anterior. **Ver ativo** (`StockDetailsModalComponent`): já marca `.indicator.key` via `isKeyIndicator()` (fundo/borda/label accent) — destaque existe, mas discreto.

## Goals / Non-Goals

**Goals:**
- Destaques de mês (estrela no top, atenção + "Oportunidade de compra" no próximo) nas duas visões do radar.
- Toggle de visão por ícones.
- Reforço visual dos indicadores-chave em ver ativo.

**Non-Goals:**
- Mudar dados/critério do radar; mudar a lista `KEY_INDICATORS`.

## Decisions

**1. Cálculo dos destaques (radar.ts).**
- `nextMonth = (new Date().getMonth() + 1) % 12 + 1` (Dez→Jan).
- `topMonth = computed`: mês (1–12) com mais tickers marcados (de `monthCards`); 0 se nenhum; empate no primeiro.
- Helpers: `isTopMonth(m)` e `isNextMonth(m)`; para a matriz, coluna índice `i` → mês `i+1`.

**2. Ícones (SVG inline, `currentColor`).**
- **Estrela** (top): `M12 2l2.9 6.3 6.9.7-5.1 4.6 1.4 6.8L12 17.8 5.9 21.4l1.4-6.8L2.2 9l6.9-.7Z`.
- **Atenção** (próximo): triângulo já usado antes — `M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z` + `M12 9v4` + `M12 17h.01`.

**3. Matriz.** No cabeçalho do mês: ícone de estrela quando `isTopMonth`, ícone de atenção quando `isNextMonth`; classe `.top`/`.next` aplica tint no cabeçalho e nas células daquela coluna (verde p/ top, accent p/ próximo). `title` no cabeçalho: "Mês com mais ativos" / "Oportunidade de compra".

**4. Cards.** No card do mês: estrela + realce verde + tag "Melhor mês" quando top; ícone de atenção + realce accent + tag "Oportunidade de compra" quando próximo. Tags na faixa do cabeçalho do card.

**5. Legenda.** Abaixo do toggle, uma linha discreta: "★ Mês com mais ativos · ⚠ Próximo mês — oportunidade de compra". Vale para as duas visões.

**6. Toggle por ícones.** Substituir o texto dos botões por SVGs: **cards** (grade 2×2 de quadrados) e **matriz** (grade de linhas/colunas). Manter `[class.active]`, `aria-pressed`, e adicionar `title`/`aria-label` ("Ver em cards" / "Ver em matriz").

**7. Ver ativo (remover destaque + ícone "i" com descrição).**
- Remover o realce: tirar `[class.key]` do template, o estilo `.indicator.key` (SCSS) e a lógica `isKeyIndicator`/`KEY_INDICATORS` (TS). Todos os indicadores passam a ter o mesmo visual. Ajustar o `section-hint` (não fala mais em "em destaque").
- Adicionar um **ícone "i"** (SVG círculo com "i", `currentColor`, discreto) ao lado do rótulo de cada indicador **que tenha descrição conhecida**. O tooltip vem de `[title]="describe(ind.label)"` (nativo), mostrando a descrição ao passar o mouse.
- `describe(label)`: mapa normalizado (reusa o `normLabel`) rótulo→descrição para os indicadores comuns (P/L, P/VP, DY, ROE, ROIC, margem líquida, EV/EBITDA, dívida líquida/EBITDA, LPA, VPA, payout, etc.). Sem descrição conhecida → sem ícone (ou ícone omitido).

## Risks / Trade-offs

- [Espaço no cabeçalho da matriz] ícone + label de mês em coluna estreita; no mobile já mostramos só a inicial — o ícone fica como marcador pequeno; legenda cobre o significado.
- [Excesso de cor] dois realces (verde/accent) + ícones podem competir; mitigado por tints suaves e legenda. "Gastar a ousadia" nos ícones e manter o resto quieto.
- [Card top e próximo simultâneos] mostra os dois marcadores; wrap evita estouro.
