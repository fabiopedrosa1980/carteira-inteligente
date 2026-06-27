## 1. Parser (`internal/infrastructure/b3import`)

- [x] 1.1 Adicionar campo `Natureza` em `Position`
- [x] 1.2 Incluir `Empréstimos` nas abas processadas; extrair o ticker da coluna `Produto` (parte antes de `" - "`), com `Quantidade` e `Preço de Fechamento`
- [x] 1.3 Preencher `Natureza` (coluna `Natureza`) nas posições da aba `Empréstimos`; manter `Tesouro Direto` ignorado
- [x] 1.4 Testes do parser: aba `Empréstimos` lida, ticker via `Produto`, natureza preenchida; validar contra o arquivo real

## 2. Handler de importação (`transaction_handler.go`)

- [x] 2.1 Filtrar posições de `Empréstimos`: incluir apenas `Natureza == Doador` (case-insensitive), ignorar `Tomador`
- [x] 2.2 Substituir a deduplicação por ticker por agregação: somar `Quantity` por ticker, preço = primeiro fechamento > 0, classificação única
- [x] 2.3 Classificar posições de `Empréstimos` pelo catálogo (Acoes/FIIs), via `classifyPosition`
- [x] 2.4 Atualizar/expandir o teste e2e do endpoint cobrindo Doador incluído, Tomador ignorado e soma por ticker em duas abas

## 3. Verificação e fechamento

- [x] 3.1 `go vet ./...` e `go test ./...` sem erros
- [x] 3.2 Validar com `posicao-2026-06-27-...xlsx`: resumo passa a incluir BBSE3/CSMG3/ITUB3 (10 Ações + 1 ETF)
- [x] 3.3 Commit e push no repo `carteira-inteligente-api`
