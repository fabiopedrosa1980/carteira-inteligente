## 1. Backend — Chave de unicidade dos dividendos

- [x] 1.1 Em `internal/domain/dividend.go`, remover as tags `uniqueIndex:idx_dividend_unique` de `Month`, `Year` e `Type` e aplicar a nova composição `(stock_id, ex_date, pay_date, type)` adicionando `uniqueIndex:idx_dividend_unique` a `StockID`, `ExDate`, `PayDate` e `Type`
- [x] 1.2 Na inicialização do banco (`internal/infrastructure/persistence/database.go`), executar `DROP INDEX IF EXISTS idx_dividend_unique` antes do `AutoMigrate` para forçar a recriação do índice com a nova composição
- [x] 1.3 Verificar que `CreateIfNotExists` (`OnConflict DoNothing`) continua funcionando com a nova chave

## 2. Backend — Robustez do scraper

- [x] 2.1 Em `investidor10.go`, alterar `extractDividendRows` para primeiro procurar `<table>` com `id="table-dividends-history"` (helper `findTableByID`) e usar `tableHasDividendHeaders` apenas como fallback
- [x] 2.2 Confirmar que a ordem das colunas `cells[0]=tipo, cells[1]=data com, cells[2]=pagamento, cells[3]=valor` permanece correta para a tabela por id
- [x] 2.3 Confirmar a janela de 5 anos: `since = time.Now().AddDate(-5, 0, 0)` e filtro `payDate.Before(since)` em `parseRow`

## 3. Backend — Build, testes e deploy

- [x] 3.1 Executar `go build ./...` sem erros
- [x] 3.2 Ajustar testes de dividendo (se houver) para a nova chave e executar `go test ./...`
- [x] 3.3 Commit e push em `carteira-inteligente-api`: `fix: corrige chave de unicidade de dividendos e robustez do scraper investidor10`

## 4. Frontend — Layout proporcional da tabela

- [x] 4.1 Em `dividend-history.html`, adicionar `<colgroup>` com 4 `<col>` de larguras proporcionais (Tipo 16%, Data Com 26%, Data de Pagamento 30%, Valor 28%)
- [x] 4.2 Em `dividend-history.scss`, ajustar alinhamento: cabeçalho/células de Valor à direita; demais à esquerda; revisar `white-space` para permitir layout proporcional sem quebrar datas
- [x] 4.3 Garantir que o badge de Tipo (JCP amarelo / Dividendo verde) e os formatos `dd/MM/yyyy` e BRL continuam corretos

## 5. Frontend — Build e deploy

- [x] 5.1 Executar `npx ng build` sem erros de tipo
- [x] 5.2 Commit e push em `carteira-inteligente`: `style: colunas proporcionais na tabela de historico de dividendos`
- [ ] 5.3 Testar visualmente: recadastrar um ativo, verificar que múltiplos dividendos do mesmo tipo no mesmo mês aparecem, colunas proporcionais e campos formatados
