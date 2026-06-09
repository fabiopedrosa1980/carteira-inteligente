## Context

A aplicação Angular "Carteira Inteligente" possui dois dados atualmente simulados:

1. **Portfólio**: lista de ações definida em `INITIAL_TICKERS` no `StockDataService`, com cotações buscadas via proxy local na porta 3001 (`/api/quote/:ticker`, `/api/quotes`).
2. **Calendário de Dividendos**: dividendos calculados por `generateDividends()` usando padrões hardcoded (`DIVIDEND_PATTERNS`), apresentados no `DividendCalendarComponent`.

O backend em `http://localhost:8080` já expõe:
- `GET /api/v1/stocks` — retorna a lista de ações do portfólio real com seus dados (ticker, nome, setor, preço, DY etc.)
- `GET /api/v1/dividends/monthly?year={year}` — retorna o resumo mensal de dividendos para o ano informado

## Goals / Non-Goals

**Goals:**
- Substituir a lista hardcoded de tickers e os padrões de dividendos simulados por dados reais da API em `http://localhost:8080`
- Fazer o Portfólio renderizar os stocks vindos de `GET /api/v1/stocks`
- Fazer o Calendário renderizar os meses vindos de `GET /api/v1/dividends/monthly?year={year}`, com o seletor de ano disparando nova chamada
- Manter a experiência atual da UI (loading state, cards de ação, grid mensal)

**Non-Goals:**
- Alterar a aparência visual das telas
- Implementar persistência local (cache, IndexedDB)
- Modificar o backend
- Mudar a lógica do proxy da porta 3001 para cotações em tempo real (fora do escopo)

## Decisions

### 1. Novo serviço dedicado para a API do backend (`BackendApiService`)
**Decisão**: Criar `backend-api.service.ts` para encapsular chamadas a `http://localhost:8080/api/v1/`.  
**Alternativa considerada**: Reutilizar `StockApiService`. Descartado porque `StockApiService` aponta para `http://localhost:3001` e tem contratos diferentes.  
**Rationale**: Separação de responsabilidades; facilita troca da URL base e mock em testes.

### 2. Refatorar `StockDataService` para usar o backend real no portfólio
**Decisão**: `StockDataService` chama `BackendApiService.getStocks()` ao invés de usar `buildInitialStocks()` + `fetchPortfolioQuotes()`.  
**Rationale**: O serviço já centraliza o estado reativo com signals; basta substituir a fonte de dados.

### 3. Novo método `getDividendsMonthly(year)` no `BackendApiService` para o calendário
**Decisão**: `DividendCalendarComponent` injeta `BackendApiService` diretamente e chama `getDividendsMonthly(year)` quando o usuário muda o ano selecionado.  
**Alternativa considerada**: Adicionar o método em `StockDataService`. Descartado para evitar acoplamento — dividendos mensais do backend não dependem do estado de stocks.  
**Rationale**: Componente do calendário passa a ser dono do seu dado, com reatividade simples por RxJS.

### 4. Mapeamento de interface da API para o modelo interno
**Decisão**: O `BackendApiService` retorna tipos próprios (`ApiStock`, `ApiMonthSummary`) e o serviço/componente faz o mapeamento para `Stock` e `MonthSummary`.  
**Rationale**: Isola o contrato da API de mudanças no modelo interno do Angular.

### 5. Seletor de ano no Calendário dispara nova chamada HTTP
**Decisão**: Quando o usuário troca o ano selecionado, o componente chama `getDividendsMonthly(year)` novamente.  
**Rationale**: O endpoint é parametrizado por ano; não há razão para buscar todos os anos de uma vez.

## Risks / Trade-offs

- **[Risco] Backend indisponível** → O componente exibe estado de erro/vazio; não trava a aplicação. Implementar `catchError` nos observables retornando array vazio.
- **[Risco] Shape da resposta da API diferente do esperado** → Definir interfaces `ApiStock` e `ApiMonthSummary` com base na OpenAPI spec disponível em `openspec/`; ajustar mapeamento se divergir.
- **[Trade-off] Remoção da geração de dividendos simulados** → Dados históricos hardcoded (2021–2024) deixam de existir; o calendário exibe apenas o que o backend retornar. Aceitável pois o objetivo é usar dados reais.
- **[Risco] `getMonthSummaries()` e `getBestMonthAnalysis()` em `StockDataService` dependem de `stock.dividends[]`** → Com a migração, `dividends` pode vir vazio do backend. A tela "Melhor Mês" pode ficar sem dados — está fora do escopo desta mudança, mas deve ser documentado.
