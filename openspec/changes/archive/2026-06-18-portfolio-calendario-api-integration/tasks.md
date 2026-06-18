## 1. Criar BackendApiService

- [x] 1.1 Criar `carteira-inteligente/src/app/services/backend-api.service.ts` com `HttpClient` apontando para `http://localhost:8080/api/v1`
- [x] 1.2 Definir interface `ApiStock` com os campos retornados por `GET /api/v1/stocks`
- [x] 1.3 Implementar método `getStocks(): Observable<ApiStock[]>` com `catchError` retornando array vazio
- [x] 1.4 Definir interface `ApiMonthSummary` com os campos retornados por `GET /api/v1/dividends/monthly`
- [x] 1.5 Implementar método `getDividendsMonthly(year: number): Observable<ApiMonthSummary[]>` com `catchError` retornando array vazio

## 2. Migrar StockDataService para usar a API de portfólio

- [x] 2.1 Injetar `BackendApiService` no `StockDataService`
- [x] 2.2 Remover `buildInitialStocks()`, `INITIAL_TICKERS`, `DIVIDEND_PATTERNS` e a função `generateDividends()`
- [x] 2.3 Substituir `fetchPortfolioQuotes()` por chamada a `BackendApiService.getStocks()`
- [x] 2.4 Mapear `ApiStock` para o modelo `Stock` (usar `ticker` como fallback para `name`, zero para campos numéricos ausentes)
- [x] 2.5 Garantir que `_loading` é setado para `false` tanto no sucesso quanto no erro

## 3. Migrar DividendCalendarComponent para usar a API de dividendos

- [x] 3.1 Injetar `BackendApiService` no `DividendCalendarComponent`
- [x] 3.2 Criar método privado `loadCalendar(year: number)` que chama `BackendApiService.getDividendsMonthly(year)` e mapeia `ApiMonthSummary[]` para `MonthSummary[]`
- [x] 3.3 Chamar `loadCalendar(2025)` na inicialização do componente (substituir o `effect` atual que dependia do signal de stocks)
- [x] 3.4 Conectar o seletor de ano para chamar `loadCalendar(year)` ao mudar o ano selecionado
- [x] 3.5 Remover dependência de `StockDataService` no `DividendCalendarComponent` (se não for mais necessária após a migração)

## 4. Ajustar modelos e interfaces

- [x] 4.1 Verificar se `Stock.dividends: DividendRecord[]` ainda é necessário após a migração (usado em `getMonthSummaries` e `getBestMonthAnalysis`)
- [x] 4.2 Ajustar ou tornar `dividends` opcional no modelo `Stock` se o backend não retornar esse campo

## 5. Verificação e limpeza

- [x] 5.1 Verificar se `getMonthSummaries()` e `getBestMonthAnalysis()` em `StockDataService` ainda funcionam corretamente com o novo shape de `Stock`
- [x] 5.2 Remover imports não utilizados (ex: funções de geração de dividendos, `seededRand`)
- [ ] 5.3 Testar manualmente a tela de Portfólio com o backend rodando em `http://localhost:8080`
- [ ] 5.4 Testar manualmente a tela de Calendário com troca de ano e verificar que a chamada HTTP é feita com o `year` correto
- [ ] 5.5 Testar comportamento com backend indisponível (lista vazia, sem crash)
