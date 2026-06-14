## 1. Backend — Scraper Investidor10

- [x] 1.1 Inspecionar o HTML de `https://investidor10.com.br/acoes/VALE3/` e identificar o seletor CSS/id da tabela de dividendos (confirmar estrutura antes de implementar)
- [x] 1.2 Adicionar `golang.org/x/net/html` às dependências do backend (`go get golang.org/x/net/html`)
- [x] 1.3 Criar `internal/infrastructure/scraper/investidor10.go` com função `FetchDividends(ticker string, since time.Time) ([]ScrapedDividend, error)` que faz HTTP GET, parseia o HTML e retorna slice de `{Type, ExDate, PayDate, Amount}`
- [x] 1.4 Mapear tipos do Investidor10 para `domain.DividendType` (JCP → `DividendTypeJCP`, demais → `DividendTypeDividendo`)
- [x] 1.5 Filtrar registros com `pay_date` anterior a `since` (5 anos atrás)

## 2. Backend — Persistência e Unicidade

- [x] 2.1 Adicionar unique index `(stock_id, ex_date, type)` ao struct `domain.Dividend` via GORM tag `uniqueIndex:"idx_dividend_unique"`
- [x] 2.2 Adicionar método `CreateIfNotExists(d *Dividend) error` (ou upsert com `clause.OnConflict{DoNothing: true}`) no `GormDividendRepository`
- [x] 2.3 Atualizar interface `DividendRepository` em `domain/dividend_repository.go` com o novo método

## 3. Backend — Integração no StockHandler

- [x] 3.1 Atualizar `StockHandler` para receber `DividendService` como segundo parâmetro no construtor (`NewStockHandler`)
- [x] 3.2 Em `StockHandler.CreateStock`, após criação bem-sucedida, disparar goroutine que chama o scraper e persiste cada dividendo via `DividendService`
- [x] 3.3 Atualizar `cmd/api/main.go` para passar `dividendService` ao `NewStockHandler`
- [x] 3.4 Verificar que `GET /api/v1/stocks/:id/dividends` retorna `type`, `ex_date` e `pay_date` no JSON (confirmar DTO `dividend_dto.go`)

## 4. Backend — Build e Testes

- [x] 4.1 `go build ./...` sem erros
- [x] 4.2 `go vet ./...` sem erros nas packages alteradas
- [x] 4.3 Corrigir o teste pré-existente quebrado em `stock_handler_test.go:36` (SetupRouter espera 5 handlers, teste passa 3) para que `go test ./...` compile
- [x] 4.4 Commit e push no repo `carteira-inteligente-api`: `feat: importa historico de dividendos do investidor10 ao cadastrar ativo`

## 5. Frontend — DividendHistoryComponent

- [x] 5.1 Criar `src/app/components/dividend-history/dividend-history.ts` (standalone) com `@Input() portfolioStocks: { id: number; ticker: string }[]`
- [x] 5.2 Criar `src/app/components/dividend-history/dividend-history.html` com `<select>` de ticker e tabela com colunas: Tipo, Data Com, Data de Pagamento, Valor
- [x] 5.3 Criar `src/app/components/dividend-history/dividend-history.scss` com estilos da tabela e badges Tipo (JCP = amarelo, Dividendo = verde)
- [x] 5.4 Implementar paginação client-side: `signal<number>` para página atual, computed para slice de 10 itens, botões Anterior/Próxima, ocultar controles quando ≤ 10 registros
- [x] 5.5 Exibir estado vazio ("Nenhum dividendo encontrado") quando lista vazia após seleção de ativo
- [x] 5.6 Formatar coluna Valor com pipe `currency:'BRL':'symbol':'1.2-2'` e datas com `date:'dd/MM/yyyy'`

## 6. Frontend — Integração no Dashboard

- [x] 6.1 Em `dashboard.ts`, construir `portfolioStocks` a partir de `StockDataService.getStocks()` mapeando `{ id: stock.id, ticker: stock.ticker }`
- [x] 6.2 Adicionar `DividendHistoryComponent` aos imports do `DashboardComponent`
- [x] 6.3 No template `dashboard.html`, adicionar `<app-dividend-history [portfolioStocks]="portfolioStocks">` na aba `calendar` (abaixo do `<app-dividend-calendar>`)

## 7. Frontend — Build e Deploy

- [x] 7.1 `npx ng build` sem erros de tipo
- [ ] 7.2 Testar visualmente: selecionar um ativo que tenha dividendos importados, verificar tabela, paginação, badges e formatação
- [ ] 7.3 Commit e push no repo `carteira-inteligente`: `feat: tabela paginada de historico de dividendos por ativo`
