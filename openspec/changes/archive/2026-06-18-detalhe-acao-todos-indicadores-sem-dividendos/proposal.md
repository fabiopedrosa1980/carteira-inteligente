## Why

A tela de detalhes da ação hoje mostra apenas 5 indicadores (P/L, P/VP, DY, ROE, Payout) e uma seção de histórico de dividendos. O usuário quer ver **todos** os indicadores fundamentalistas disponíveis e **não** quer a seção de dividendos ali. Para suportar "todos", o backend precisa devolver o conjunto completo de indicadores do Investidor10 — uma lista genérica de rótulo/valor é mais fiel e robusta do que campos fixos.

## What Changes

- **Backend Go:** o scraper do Investidor10 passa a extrair **todos** os indicadores fundamentalistas da página do ativo como uma **lista ordenada de `{label, value}`** (valor já formatado como exibido), em vez de 5 campos fixos. O payload de ação/FII expõe `indicators` como essa lista.
- **Frontend:** o modelo `indicators` vira uma lista `{ label, value }[]`; a tela de detalhes exibe **todos** os indicadores em um grid, e a **seção de histórico de dividendos é removida** dela.

## Capabilities

### New Capabilities
<!-- Nenhuma capability nova. -->

### Modified Capabilities
- `status-invest-indicators`: indicadores passam a ser uma lista completa de rótulo/valor (Investidor10), não mais 5 campos fixos.
- `stock-details-view`: a tela exibe todos os indicadores e não exibe mais o histórico de dividendos.

## Impact

**Frontend (este repo):**
- `src/app/models/stock.model.ts` — `StockIndicators` vira lista `{ label, value }[]` (ou `indicators?: IndicatorItem[]`).
- `src/app/services/stock-api.service.ts` e `backend-api.service.ts` — tipo de `indicators` atualizado.
- `src/app/components/stock-details-modal/*` — exibir todos os indicadores; remover a seção de dividendos e a busca de `getStockDividends`.
- `src/app/components/dashboard/dashboard.ts` — mapping de `indicators` no `loadAcoes`.

**Backend Go (`carteira-inteligente-api`):**
- `internal/domain/transaction.go` — `Indicators` vira `[]Indicator{Label,Value}`.
- `internal/infrastructure/scraper/investidor10.go` — `FetchIndicators` extrai todos os indicadores.
