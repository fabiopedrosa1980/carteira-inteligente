## 1. Backend — Expor `stock_id` no endpoint de posições

- [x] 1.1 Adicionar campo `StockID uint` com tag `json:"stock_id"` ao struct `domain.AcaoItem` em `internal/domain/transaction.go`
- [x] 1.2 Em `transaction_handler.go`, na função `GetAcoes`, construir o mapa `stockIDByTicker map[string]uint` junto ao mapa `historyReadyByTicker` (usando o mesmo loop sobre os stocks do catálogo)
- [x] 1.3 Ao construir cada `AcaoItem` na goroutine, preencher `StockID: stockIDByTicker[p.Ticker]`
- [x] 1.4 Executar `go build ./...` e `go test ./...` sem erros
- [x] 1.5 Commit e push em `carteira-inteligente-api`: `feat: expoe stock_id no endpoint de acoes do usuario`

## 2. Frontend — Atualizar tipo `ApiAcaoItem`

- [x] 2.1 Em `backend-api.service.ts`, adicionar `stock_id: number` ao tipo `ApiAcaoItem`

## 3. Frontend — `DividendHistoryComponent` usa posições do usuário

- [x] 3.1 Em `dividend-history.ts`, remover a injeção de `StockDataService` e substituir por chamada a `BackendApiService.getAcoes()` em `ngOnInit`
- [x] 3.2 Criar sinal local `readonly positions = signal<ApiAcaoItem[]>([])` e `readonly loadingPositions = signal(true)` para armazenar o resultado de `getAcoes()`
- [x] 3.3 Atualizar `anyProcessing` para usar `positions()` em vez de `portfolioRefs()`
- [x] 3.4 Atualizar o seletor de ativo no template para iterar sobre `positions()` exibindo `p.ticker` e usando `p.stock_id` como valor
- [x] 3.5 Atualizar `selectStock` para receber `stockId: number` diretamente (sem mudança na chamada `getStockDividends`)
- [x] 3.6 Tratar posições com `stock_id === 0` ocultando-as do dropdown (ticker sem catálogo correspondente)

## 4. Frontend — Renderização condicional no Dashboard

- [x] 4.1 Em `dashboard.html`, envolver `<app-dividend-history>` com `*ngIf="acoes().length > 0"`
- [x] 4.2 Adicionar bloco `*ngIf="acoes().length === 0"` com estado vazio: mensagem "Cadastre ativos na aba Meus Ativos para ver o histórico de dividendos" e ícone orientativo

## 5. Frontend — Build e deploy

- [x] 5.1 Executar `npx ng build` e corrigir eventuais erros de tipo
- [x] 5.2 Commit e push em `carteira-inteligente`: `feat: exibe historico de dividendos somente para ativos do usuario logado`
- [ ] 5.3 Testar visualmente: sem posições → estado vazio na aba Dividendos; com posições → combo carregado da API de posições, histórico exibido corretamente
