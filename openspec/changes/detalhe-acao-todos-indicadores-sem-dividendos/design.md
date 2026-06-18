## Context

- Backend Go: `domain.StockIndicators` tem 5 campos (PL, PVP, DY, ROE, Payout); `scraper.FetchIndicators(ticker, fii)` casa cada rótulo por regex e retorna esse struct; `transaction_handler.respondPositions` anexa em `AcaoItem.Indicators`.
- Frontend: `Stock.indicators?: StockIndicators` (5 campos); `StockDetailsModalComponent` exibe os 5 e também busca `getStockDividends` para um histórico de dividendos.

## Goals / Non-Goals

**Goals:**
- Indicadores como lista completa (rótulo/valor) do Investidor10.
- Tela de detalhes exibe todos os indicadores e remove a seção de dividendos.

**Non-Goals:**
- Manter os 5 campos tipados (substituídos pela lista).
- Alterar o restante da tela (preço, posição, nota) além dos indicadores/dividendos.

## Decisions

**1. Modelo de indicadores como lista (backend).**
Redefinir em `domain`: `type Indicator struct { Label string \`json:"label"\`; Value string \`json:"value"\` }` e `AcaoItem.Indicators []Indicator \`json:"indicators,omitempty"\``. O `value` é a string já formatada como no site (ex.: `"12,34"`, `"8,50%"`), evitando perdas de formatação/unidade.

**2. Scraper extrai todos os indicadores (Investidor10).**
Reescrever `FetchIndicators` para localizar a seção de indicadores fundamentalistas da página (container de "cells"/cards) e extrair cada par rótulo→valor via navegação no HTML (`golang.org/x/net/html`, reaproveitando `nodeText`). Cada card costuma ter um rótulo curto e um valor; coletar todos em ordem de documento, ignorando entradas vazias/duplicadas. Best-effort: falha → lista vazia/nil. Alternativa considerada: regex por rótulo fixo — descartada porque não captura "todos".

**3. Frontend genérico.**
`Stock.indicators?: { label: string; value: string }[]`. No `StockDetailsModalComponent`: remover `getStockDividends`, o signal `dividends`/`loadingDividends` e a seção de histórico; renderizar `*ngFor` sobre `stock.indicators` num grid. `dashboard.loadAcoes` apenas repassa `item.indicators` (já lista). Ajustar tipos em `backend-api.service`/`stock-api.service` se referenciam o struct antigo.

## Risks / Trade-offs

- [Scraping genérico pode capturar rótulos/valores fora da seção de indicadores] → Restringir à seção/container de indicadores fundamentalistas; validar contra a página real e ajustar o seletor.
- [Quebra de contrato com o struct antigo de 5 campos] → Nenhum consumidor além da tela de detalhes; ajustar tudo na mesma mudança.
- [Ordem/qtde de indicadores varia entre ações e FIIs] → A lista é flexível; o frontend renderiza o que vier.
