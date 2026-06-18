## Context

Este repo é o frontend Angular. O backend Go é um serviço separado (`carteira-inteligente-api.onrender.com/api/v1`) consumido por `BackendApiService` (`/stocks`, `/stocks/:id/dividends`, `/dividends/monthly`, `/transactions`, `/transactions/acoes`, `/goals`) e `StockApiService` (`/quote/:ticker`, `/quotes`). Não há endpoint de busca de ticker nem indicadores fundamentais; os proventos hoje fluem por ações.

- O modal `add-transaction-modal` já faz debounce(600) + `length>=3` chamando `getQuote(ticker)` para resolver o nome — base pronta para evoluir para sugestões.
- `stock-card` tem `cursor: pointer` mas sem ação de clique para detalhes.
- `AuthService.user()` expõe `{ name, email, picture, sub }` após login.
- `dividend-history`/`dividends-summary` calculam a partir de `getAcoes()` (ações).

Decisão geral (alinhada com o usuário): **documentar o contrato dos endpoints Go** e **implementar o consumo no frontend**; não alterar o backend neste repo.

## Goals / Non-Goals

**Goals:**
- Autocomplete de ticker no lançamento (frontend) sobre um endpoint de busca documentado.
- Modal de detalhes da ação ao clicar no card (frontend).
- Exibir indicadores do Status Invest no detalhe quando a API fornecer (frontend) + contrato.
- Identificar o usuário no header (frontend).
- Incluir FIIs nas telas de Dividendos (frontend) + contrato.

**Non-Goals:**
- Implementar o backend Go (Status Invest, busca, FIIs) — fora deste repo.
- Persistir dados novos no frontend.

## Decisions

**1. Autocomplete de ticker.** Adicionar `searchTickers(q: string): Observable<TickerSuggestion[]>` em `StockApiService`, consumindo `GET /api/v1/search?q=<query>`. No modal, criar um segundo fluxo (debounce ~300ms, `length>=3`, `switchMap`) que popula um `signal` de sugestões exibidas num dropdown; clicar preenche `form.ticker`. Manter o `getQuote` atual para resolver o nome do ticker final.

**2. Detalhes da ação.** Criar `StockDetailsModalComponent` (standalone) que recebe um `Stock` e busca o histórico de dividendos via `BackendApiService.getStockDividends(id)` (ou usa `stock.dividends`). O `DashboardComponent` controla a abertura: `stock-card` emite `(click)`/`@Output() select`; o dashboard guarda `selectedStock` e renderiza o modal. Exibe preço, variação, DY, nota, setor, histórico e, se presentes, indicadores.

**3. Indicadores Status Invest (contrato).** Estender o payload de ação/quote com um objeto opcional `indicators`. Contrato sugerido:
```
GET /api/v1/quote/:ticker  (ou /stocks)
{ ..., "indicators": { "pl": number, "pvp": number, "dy": number, "roe": number, "payout": number } }
```
Frontend: tipo `StockIndicators` opcional no modelo; exibir no detalhe quando presente. Origem no backend: scraping do Status Invest por ticker (responsabilidade do repo Go).

**4. Identidade do usuário.** No `dashboard.html`, exibir `auth.user()?.picture` (avatar) e `auth.user()?.name` no `header-actions`, antes dos botões de tema/logout. Injetar `AuthService` no dashboard (já injetado). Fallback: iniciais/avatar padrão se `picture` ausente.

**5. Dividendos de FIIs (contrato + frontend).** Contrato: o endpoint de dividendos retorna também proventos de FIIs (type `rendimento`), e/ou um `GET /api/v1/transactions/fiis` análogo a `/acoes`. Frontend: generalizar `dividend-history`/`dividends-summary` para consumir ações + FIIs (incluir as posições de FIIs no cálculo). Manter `type` `rendimento` já previsto em `DividendRecord`.

## Risks / Trade-offs

- [Endpoints de backend ainda não existem] → Frontend implementado de forma defensiva: autocomplete trata lista vazia/erro; indicadores e FIIs são opcionais e não quebram as telas se ausentes.
- [Escopo amplo em uma só mudança] → Tarefas agrupadas por feature; itens de backend ficam como contrato documentado (não bloqueiam o frontend).
- [Detalhe da ação x dados disponíveis] → Reusar `Stock` + `getStockDividends`; indicadores só quando a API enviar.
- [Busca de ticker sem endpoint] → Até o backend existir, o dropdown fica vazio; o campo manual continua funcionando como hoje.
