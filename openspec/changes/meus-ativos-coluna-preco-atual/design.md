## Context

A carteira tem duas telas com acordeões por tipo de ativo:

- **"Meus Ativos"** (aba `portfolio`, renderizada inline em `dashboard.html` / `dashboard.ts`): tabela `acoes-list` com colunas Ativo, Qtd, Preço Médio, Hoje, Saldo, Variação, Rent.; cabeçalho do acordeão já exibe total (`groupSaldo`) e rentabilidade (`groupRentabilidade`) à direita; cards de Patrimônio incluem Patrimônio Total, Investido, Ganho, Variação e Dividendos Recebidos.
- **"Lançamentos"** (componente `my-assets`): tabela por lançamento (Ativo, Data, Qtd, Preço Unit., Total, Operação); cabeçalho do acordeão exibe só o total (`sec-total`) centralizado, sem rótulo e sem rentabilidade.

Dados disponíveis sem novas chamadas de rede:
- `StockDataService.stocks()` → `Stock` com `price` (cotação atual), `avgPrice`, `quantity`, `dividends`.
- `DividendsSummaryComponent` (modo `projected`) já calcula os dividendos a receber do ano (pay_date >= hoje × cotas atuais).
- `dashboard.ts` já tem `dividendosRecebidos` usando `receivedForTicker` de `dividends-received.util.ts`, e helpers `saldo`/`custo`/`rentabilidade`.

Restrições: standalone components, signals API, sem alterações de backend, manter responsividade mobile (sem rolagem horizontal da página).

## Goals / Non-Goals

**Goals:**
- Exibir a cotação atual (`price`) por ticker como coluna nas duas tabelas, resolvida da carteira já carregada.
- Padronizar os cabeçalhos dos acordeões: total rotulado e alinhado à direita + rentabilidade do tipo nas duas telas; rótulos descritivos em "Meus Ativos".
- Adicionar o card "Dividendos a receber" em "Meus Ativos" reaproveitando a lógica de Projetados, garantindo paridade de valor com a tela Dividendos → Projetados.

**Non-Goals:**
- Nenhuma mudança de contrato de API ou backend.
- Não reescrever o cálculo de rentabilidade existente em "Meus Ativos" (apenas reutilizar para Lançamentos).
- Não alterar a tela Dividendos → Projetados em si.

## Decisions

### 1. Fonte da cotação atual: `StockDataService.stocks()`
Usar o `price` de `StockDataService.stocks()`, indexado por ticker normalizado (UPPER/trim), em vez de novas chamadas a `StockApiService.getQuote`. `my-assets` já injeta `StockDataService` (`stockData`); basta um `computed` mapa `ticker → price`. Em "Meus Ativos" o `Stock` da linha já tem `price`.
- *Alternativa descartada*: buscar cotação por linha via `getQuote` — geraria N requisições e inconsistência com o resto da carteira.

### 2. Coluna de Preço Atual
- "Meus Ativos": inserir `<col class="cl-preco-atual">`, novo `<th>` ("Preço Atual", ordenável opcional) e `<td>` com `stock.price` formatado em BRL; "—" quando `price` ausente/0. Posicionar ao lado de "Preço Médio".
- "Lançamentos": adicionar header e célula `price-atual-cell` com `currentPriceFor(t.ticker)`; "—" quando sem cotação.

### 3. Cabeçalho do acordeão de Lançamentos — paridade com Meus Ativos
Reestruturar o header de `my-assets.html` movendo o `sec-total` para dentro de um bloco `ah-right`, com rótulo "Total" e o valor alinhado à direita, e acrescentar `sec-rent` (rentabilidade do tipo). A rentabilidade do tipo = (saldo total − custo total) / custo total, onde saldo usa `price × quantidade` e custo usa `avgPrice × quantidade` por ticker do tipo. Como `my-assets` lida com lançamentos (não posições agregadas), calcular saldo/custo do tipo a partir de `StockDataService.stocks()` filtrado pelos tickers presentes naquele tipo (ou agregando por ticker). Reaproveitar o padrão visual/classes (`ah-right`, `sec-total`, `sec-rent`, `pos`/`neg`) já usados em `dashboard.html`.
- *Alternativa descartada*: calcular rentabilidade a partir do preço unitário dos lançamentos — divergiria do preço médio/saldo usados no resto do app.

### 4. Rótulos no cabeçalho de Meus Ativos
Adicionar rótulos curtos ("Total", "Rent.") junto aos valores existentes em `dashboard.html`, sem alterar o cálculo. Manter compactos para não quebrar o mobile (possível rótulo visualmente discreto via classe dedicada).

### 5. Card "Dividendos a receber" — reuso da lógica de Projetados
Extrair a lógica de projeção hoje embutida em `DividendsSummaryComponent.computeProjected` para um util compartilhado `projectedForTicker(dividends, currentShares, todayStr, currentYear)` em `dividends-received.util.ts`, espelhando `receivedForTicker`. Em `dashboard.ts`, criar `dividendosAReceber = computed(...)` somando `projectedForTicker` sobre os tickers de Ações + FIIs (mesmo escopo/normalização de `dividendosRecebidos`), e adicionar o card em `dashboard.html` ao lado de "Dividendos Recebidos".
- *Alternativa descartada*: duplicar a lógica no dashboard — risco de divergência com a tela Projetados. O util compartilhado garante paridade.

## Risks / Trade-offs

- **Divergência de valor entre o card e a tela Projetados** → Mitigar extraindo util único usado por ambos; refatorar `DividendsSummaryComponent.computeProjected` para consumir o util.
- **Cabeçalho do acordeão estourar no mobile** com rótulo + total + rentabilidade → Mitigar com rótulos curtos/discretos e revalidar ≤600px (sem rolagem horizontal), seguindo o que já funciona em "Meus Ativos".
- **Cotação ausente/0 para alguns tickers** → Tratar com fallback "—" nas células e omitir rentabilidade quando sem custo válido.
- **Escopo de tipos** (ETFs entram na rentabilidade do acordeão de Lançamentos, mas ficam fora do card de dividendos) → Manter consistência: card de dividendos = Ações + FIIs (igual a Recebidos); rentabilidade do acordeão = todos os tipos exibidos.

## Migration Plan

Mudança puramente de frontend, sem migração de dados. Deploy via build/serve padrão. Rollback = reverter os commits. Sem feature flag necessária.

## Open Questions

- O rótulo do cabeçalho deve ser textual ("Total"/"Rent.") ou apenas um tooltip/aria? Decisão default: rótulo textual curto e discreto, validado no mobile.
- A nova coluna "Preço Atual" deve ser ordenável em "Meus Ativos"? Default: seguir o padrão das demais colunas (ordenável) se for trivial; caso contrário, apenas exibição.
