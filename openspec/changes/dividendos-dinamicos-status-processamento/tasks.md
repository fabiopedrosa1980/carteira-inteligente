## 1. Backend — Campo `history_ready` no modelo Stock

- [x] 1.1 Adicionar campo `HistoryReady bool` ao struct `domain.Stock` em `internal/domain/stock.go` com tag GORM `gorm:"default:false"`
- [x] 1.2 Verificar que `AutoMigrate` em `cmd/api/main.go` inclui o modelo `Stock` para que a coluna seja criada no banco de dados SQLite existente
- [x] 1.3 Adicionar método `UpdateHistoryReady(id uint, ready bool) error` ao `StockRepository` (interface em `domain/stock_repository.go` e implementação em `persistence/gorm_stock_repository.go`)

## 2. Backend — Goroutine de scraping atualiza `history_ready`

- [x] 2.1 Em `stock_handler.go`, após o loop de `CreateIfNotExists` na função `importDividends` completar sem erro, chamar `h.stockService.UpdateHistoryReady(stockID, true)`
- [x] 2.2 Atualizar `StockUseCase` (interface em `application/stock_service.go`) com o método `UpdateHistoryReady(id uint, ready bool) error` e implementar no `StockService`

## 3. Backend — Expor `history_ready` nas respostas da API

- [x] 3.1 Adicionar campo `HistoryReady bool json:"history_ready"` ao DTO `ApiStock` em `adapters/http/dto/stock_dto.go` e mapear de `domain.Stock.HistoryReady`
- [x] 3.2 Adicionar campo `HistoryReady bool json:"history_ready"` ao struct `domain.AcaoItem` em `internal/domain/transaction.go`
- [x] 3.3 Em `transaction_handler.go` na função `GetAcoes`, ao construir cada `AcaoItem`, buscar o stock pelo ticker para obter `HistoryReady` e populá-lo no item

## 4. Backend — Build e testes

- [x] 4.1 Executar `go build ./...` e corrigir eventuais erros de compilação
- [x] 4.2 Executar `go test ./...` e garantir que os testes existentes continuam passando
- [x] 4.3 Commit e push no repositório `carteira-inteligente-api`: `feat: adiciona campo history_ready ao stock e atualiza apos scraping de dividendos`

## 5. Frontend — Atualizar tipos e sinal `portfolioRefs`

- [x] 5.1 Em `backend-api.service.ts`, adicionar `history_ready: boolean` ao tipo `ApiStock` e ao tipo `ApiAcaoItem`
- [x] 5.2 Em `stock-data.service.ts`, alterar o tipo do sinal `_portfolioRefs` de `{ id: number; ticker: string }[]` para `{ id: number; ticker: string; historyReady: boolean }[]`
- [x] 5.3 Em `fetchPortfolioStocks()`, mapear `historyReady: s.history_ready ?? false` ao construir o array `portfolioRefs`

## 6. Frontend — Banner de processamento no `DividendHistoryComponent`

- [x] 6.1 Em `dividend-history.ts`, atualizar o tipo do `@Input() portfolioStocks` para incluir `historyReady: boolean`
- [x] 6.2 Adicionar `readonly anyProcessing = computed(() => this.portfolioStocks.some(s => !s.historyReady))` ao componente
- [x] 6.3 Em `dividend-history.html`, adicionar banner condicional `*ngIf="anyProcessing()"` com a mensagem "Hist��rico de dividendos da sua carteira está em processamento"
- [x] 6.4 Estilizar o banner em `dividend-history.scss` (fundo amarelo âmbar suave, ícone ⏳, texto secundário)

## 7. Frontend — Anos dinâmicos no `DividendHistoryComponent`

- [x] 7.1 Adicionar `readonly availableYears = computed(...)` que gera os últimos 5 anos a partir do ano atual (ex.: 2022–2026 quando hoje é 2026)
- [x] 7.2 Adicionar `readonly selectedYear = signal<number>(new Date().getFullYear())` como filtro de ano ativo
- [x] 7.3 Adicionar `readonly currentMonth = computed(() => new Date().getMonth() + 1)` para limitar meses no ano atual
- [x] 7.4 Atualizar `pageItems` para filtrar `dividends()` pelo `selectedYear()` antes de paginar (respeitando o limite de mês no ano corrente)
- [x] 7.5 Em `dividend-history.html`, adicionar `<select>` de ano ligado a `selectedYear` ao lado do seletor de ativo existente
- [x] 7.6 Resetar `page` para `0` ao trocar de ativo ou de ano para evitar paginação fora de alcance

## 8. Frontend — Build e deploy

- [x] 8.1 Executar `npx ng build` e corrigir eventuais erros de tipo
- [ ] 8.2 Commit e push no repositório `carteira-inteligente`: `feat: banner de processamento e filtro de anos dinamicos no historico de dividendos`
- [ ] 8.3 Testar visualmente: cadastrar novo ativo, verificar que o banner aparece e desaparece após o scraping concluir, verificar seletor de ano e filtro por mês corrente
