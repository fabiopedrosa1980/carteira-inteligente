## 1. Backend — Excluir dividendos zerados

- [x] 1.1 Em `gorm_dividend_repository.go`, adicionar `AND amount > 0` à query de `FindByStockID`
- [x] 1.2 Adicionar `AND amount > 0` à query de `FindByStockIDAndYear`
- [x] 1.3 `go build ./...` e `go test ./...` sem erros
- [x] 1.4 Commit e push em `carteira-inteligente-api`: `fix: exclui dividendos zerados da listagem`

## 2. Frontend — Menu de abas responsivo

- [x] 2.1 Em `dashboard.scss`, ajustar `.tab-nav` no mobile: `flex-wrap: wrap`, botões `flex: 1 1 auto`, padding/fonte reduzidos, sem depender de `overflow-x: auto`

## 3. Frontend — Tabela de dividendos no mobile

- [x] 3.1 Em `dividend-history.html`, prover cabeçalhos com versões longa/curta (spans `.th-full` / `.th-short`) para "Data Com" e "Data de Pagamento"
- [x] 3.2 Em `dividend-history.scss`, breakpoint `≤480px`: reduzir fonte/padding das células; exibir `.th-short` e ocultar `.th-full`; garantir que a tabela caiba sem scroll

## 4. Frontend — Tabela de metas no mobile

- [x] 4.1 Em `goals.scss`, breakpoint `≤480px`: reduzir fonte/padding; ocultar a coluna "Valor Alvo" (`col`, `th`, `td` via `nth-child`) mantendo Meta / Valor Atual / Progresso / Ações

## 5. Build e deploy

- [x] 5.1 `npx ng build` sem erros de tipo
- [x] 5.2 Commit e push em `carteira-inteligente`: `feat: menu e tabelas responsivos no mobile sem scroll horizontal`
- [ ] 5.3 Testar visualmente em viewport mobile (~360px): abas sem scroll; tabelas de dividendos e metas sem scroll horizontal
