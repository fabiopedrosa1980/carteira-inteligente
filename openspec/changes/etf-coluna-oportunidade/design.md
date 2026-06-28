## Context

A lista de Meus Ativos (`DashboardComponent`) tem a coluna "Oportunidade" para Ações/FIIs: um badge (`oportunidadeBadge`, ex.: `🟢 −18%` = desconto vs preço-teto) e um tooltip com yield-alvo, preço-teto, preço justo, DPA(12m) e desconto vs teto. A coluna é **oculta para ETF** via três `@if (group !== 'ETF')` (colgroup `cl-hoje`, `<th>` Oportunidade, `<td class="cell-oportunidade">`).

A change anterior (`etf-faixa-desempenho`, arquivada) colore a faixa do ETF pela **posição na banda de 52 semanas** (`pos`, usa mín+máx). O backend já expõe `fifty_two_week_high`/`fifty_two_week_low`, mapeados em `Stock.high52`/`low52`.

## Goals / Non-Goals

**Goals:**
- ETF ganha a coluna "Oportunidade" (badge + tooltip) com racional, espelhando Ações/FIIs.
- Métrica do ETF unificada para **distância da máxima de 52 semanas** (máx = "teto" do ETF); badge e cor da mesma métrica.
- Corrigir o desalinhamento `nth-child` dos cards mobile de ETF (consequência de reativar a coluna).

**Non-Goals:**
- Sem mudança de backend/API (campos já existem).
- Sem alterar Ações/FIIs (badge, tooltip e cores intactos).
- Sem tocar no detalhe do ativo.

## Decisions

### 1. Métrica: distância da máxima de 52 semanas (substitui `pos`)

`desvioTopo = (price − high52) / high52`. Zonas: `> −0,07` → caro; `[−0,15, −0,07]` → justo; `< −0,15` → oportunidade. A máxima de 52 sem vira o "teto" do ETF — paralelo direto ao desconto vs preço-teto das ações. Badge e faixa saem do mesmo número, evitando incoerência.

_Alternativa:_ manter `pos` (banda mín+máx). Rejeitada nesta change por divergir do badge "−X%"; aceito o trade-off de ignorar a mínima.

### 2. Helper ETF dedicado, não no `precoTetoOf`

Adicionar em `DashboardComponent` um helper `etfOportunidade(s): { available, zona, high52, low52, price, desvioTopo }` e reescrever `etfZonaClass` para derivar de `desvioTopo`. `precoTetoOf`/`zonaOf` seguem só para não-ETF.

### 3. Badge e veredito do ETF

`oportunidadeBadge` ganha um ramo ETF: `n/a` quando indisponível; senão `emoji + sinal + |round(desvioTopo*100)|%` (ex.: `🟢 −22%`). Um mapa de veredito ETF por zona: compra → "🟢 Oportunidade — longe do topo"; justo → "🟡 Preço justo / perto"; caro → "🔴 Caro — perto do topo"; na → "⚪ Sem dados de 52 semanas".

### 4. Coluna visível para ETF + tooltip condicional

Remover os três `@if (group !== 'ETF')`. O conteúdo do tooltip passa a ramificar por tipo: ETF mostra mín/máx/atual/distância (via `etfOportunidade`); Ações/FIIs mantêm o grid de preço-teto. Reaproveita as classes `oport-anchor/badge/tooltip/ot-grid/ot-label/ot-value`.

### 5. Correção de mobile como consequência

Com a coluna de volta, ETF volta a 8 `<td>`, realinhando os `td:nth-child(n)` que mapeiam grid-areas/rótulos nos cards mobile (hoje deslocados para ETF). Nenhuma regra de SCSS nova esperada.

## Risks / Trade-offs

- **Distância-do-topo ignora a mínima** → um ETF perto das mínimas com topo pouco acima nunca fica verde. Mitigação: aceito pelo paralelo conceitual; limiares tunáveis.
- **Limiares −7%/−15% arbitrários** → revisáveis; isolados como constantes.
- **Tooltip condicional aumenta o template** → mitigado reaproveitando as classes existentes e ramificando só o conteúdo.
- **Falling knife** (ETF em queda estrutural perto do fundo aparece verde) → disclaimer "não é recomendação" já presente.

## Migration Plan

Frontend apenas; sem migração de dados. Build Angular. Rollback = reverter o commit.

## Open Questions

- Limiares `−7% / −15%` — manter ou calibrar com dados reais?
- O badge deve mostrar distância do topo (`−22%`) ou também a posição na banda? (decisão atual: distância do topo, coerente com a cor.)
