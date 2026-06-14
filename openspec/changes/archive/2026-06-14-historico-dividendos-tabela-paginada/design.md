## Context

A tela "Dividendos" (`DividendCalendarComponent`) exibe um grid mensal de resumos agregados por ano, usando o endpoint `GET /api/v1/dividends/monthly`. Não há visualização de registros individuais de dividendos por ativo. O modelo `Dividend` no backend já possui os campos `type`, `ex_date` e `pay_date`, mas esses dados não são populados porque o fluxo de criação de ativo (`POST /api/v1/stocks`) não faz scraping de histórico — os dividendos são inseridos manualmente via painel ou seeds.

```
ESTADO ATUAL
─────────────────────────────────────────────────
POST /api/v1/stocks ──► cria ativo (sem dividendos)
GET /api/v1/dividends/monthly ──► resumo mensal agregado
GET /api/v1/stocks/:id/dividends ──► lista dividendos (campos type/ex_date/pay_date não populados)

ESTADO ALVO
─────────────────────────────────────────────────
POST /api/v1/stocks ──► cria ativo + dispara scraping Investidor10 (goroutine)
GET /api/v1/stocks/:id/dividends ──► retorna histórico completo (type, ex_date, pay_date, amount)
Angular: DividendCalendarComponent mantém o calendário mensal
         + novo DividendHistoryComponent abaixo: seletor de ativo + tabela paginada
```

## Goals / Non-Goals

**Goals:**
- Ao cadastrar ativo, importar automaticamente dividendos dos últimos 5 anos do Investidor10 em background.
- Expor `type`, `ex_date` e `pay_date` corretamente no endpoint `GET /api/v1/stocks/:id/dividends`.
- Adicionar, na aba Dividendos, uma tabela paginada (10/pág) com colunas Tipo, Data Com, Data de Pagamento e Valor.
- Badges visuais distintos para JCP vs Dividendo.

**Non-Goals:**
- Substituir o calendário mensal existente (ele permanece).
- Atualizar dividendos automaticamente de forma recorrente/cron.
- Scraping de outros provedores além do Investidor10.
- Scraping do histórico de FIIs ou ETFs nesta iteração.

## Decisions

### D1 — Scraping no handler via goroutine, não no service layer
O scraping é disparado em goroutine dentro de `StockHandler.CreateStock` logo após o `h.service.CreateStock(stock)` retornar sem erro. O `DividendService.CreateDividend` já existe e é reutilizado para persistir cada registro.

**Alternativa considerada:** criar um `ScrapeService` independente com interface. Descartado por complexidade desnecessária — o handler conhece os dois services (stock e dividend) e a lógica é de infraestrutura, não de domínio.

**Consequência:** `StockHandler` precisa receber `DividendService` além de `StockService`.

### D2 — Scraping HTML do Investidor10 com `golang.org/x/net/html`
URL padrão: `https://investidor10.com.br/acoes/<TICKER>/`
A tabela de dividendos está no HTML estático da página (não requer JS).  Parse com o pacote `golang.org/x/net/html` (já transitivamente disponível via dependências Go comuns; adicionar se ausente). Extrair linhas da tabela `#dividendos` ou equivalente.

**Alternativa considerada:** API pública do Investidor10. Não existe documentação pública; o scraping é o único método viável.

**Fallback:** se a requisição falhar ou a estrutura do HTML mudar, log de erro e zero dividendos inseridos — criação da ação não é afetada.

### D3 — Upsert por (stock_id, ex_date, type) para evitar duplicatas
Ao reimportar (e.g., ativo deletado e recriado), a combinação `(stock_id, ex_date, type)` identifica unicidade. Implementação: `INSERT OR IGNORE` via GORM `Clauses(clause.OnConflict{DoNothing: true})`.

Requer unique index em `dividends(stock_id, ex_date, type)` — adicionado via GORM AutoMigrate na struct.

### D4 — Novo `DividendHistoryComponent` abaixo do calendário existente
A aba "Dividendos" mantém `DividendCalendarComponent` no topo. Abaixo, um novo `DividendHistoryComponent` (standalone) recebe `@Input() stocks: Stock[]` e faz:
1. Seletor `<select>` com os tickers do portfólio.
2. Ao selecionar, chama `BackendApiService.getStockDividends(stockId)`.
3. Renderiza tabela paginada — paginação client-side via `signal<number>` para página atual.

**Alternativa considerada:** tabela global de todos os dividendos sem filtro por ativo. Descartado: endpoint `GET /stocks/:id/dividends` requer ID, não há endpoint de listagem global. Uma query global exigiria N chamadas paralelas — overhead desnecessário.

### D5 — `DividendHistoryComponent` recebe lista de ativos via `@Input`
O `DashboardComponent` já tem `acoes` (posições do usuário com `ticker`) e `svc.getStocks()` (ativos do portfólio). O `DividendHistoryComponent` recebe `@Input() portfolioStocks` do tipo `{ id: number; ticker: string }[]`, construído no dashboard a partir de `StockDataService`. Isso evita acoplamento direto ao `StockDataService`.

## Risks / Trade-offs

- **Fragilidade do scraping HTML** → Mitigação: falha silenciosa em background; log detalhado. Se o Investidor10 mudar o DOM, o pior caso é zero dividendos importados, não quebra da feature.
- **Latência do scraping** → Mitigação: goroutine em background; resposta do `POST /stocks` é imediata.
- **Abas do dashboard renderizam `DividendCalendarComponent` sempre** → o `DividendHistoryComponent` só dispara a chamada quando o usuário seleciona um ativo; sem autoload na montagem.
- **Unique index em `dividends`** → O schema atual não tem essa constraint; a migration automática do GORM adicionará o índice. Se a tabela já tiver duplicatas, a migration pode falhar — considerar limpar duplicatas antes em produção.

## Migration Plan

1. Backend: adicionar índice único `(stock_id, ex_date, type)` ao struct `Dividend` (GORM tag `uniqueIndex`). AutoMigrate o aplica na inicialização.
2. Backend: adicionar `golang.org/x/net/html` às dependências se ausente (`go get`).
3. Backend: implementar `scraper/investidor10.go` com função `FetchDividends(ticker string, sinceYear int) ([]domain.Dividend, error)`.
4. Backend: alterar `StockHandler` para injetar `DividendService`; ajustar `main.go` e `NewStockHandler`.
5. Frontend: criar `DividendHistoryComponent` com seletor + tabela paginada.
6. Frontend: adicionar `<app-dividend-history>` no template da aba "Dividendos" do dashboard.

**Rollback:** remover goroutine de scraping do handler é uma linha; o `DividendHistoryComponent` pode ser removido do template sem impacto no resto.

## Open Questions

- O Investidor10 retorna dividendos de FIIs com o mesmo formato de tabela? (não crítico para esta iteração — escopo limitado a ações)
- A tabela `#dividendos` do Investidor10 tem id/classe estável? Confirmar antes da implementação inspecionando o HTML de um ativo (ex: VALE3).
