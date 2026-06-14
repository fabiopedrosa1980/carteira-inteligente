## Why

A lista de dividendos pode retornar registros com valor zerado, poluindo a tabela. Além disso, no mobile o menu de abas e as tabelas geram scroll horizontal, prejudicando a leitura — o layout precisa se adaptar à largura da tela.

## What Changes

- **Backend**: a listagem de dividendos (`GET /api/v1/stocks/:id/dividends`) passa a excluir registros com `amount <= 0`
- **Frontend — menu de abas**: a `tab-nav` deixa de depender de scroll horizontal; as abas se distribuem/quebram para caber na largura do mobile
- **Frontend — tabela de dividendos**: em telas pequenas, reduz fonte/espaçamento e abrevia cabeçalhos longos para caber sem scroll (4 colunas a 25%)
- **Frontend — tabela de metas**: em telas pequenas, reduz fonte/espaçamento, abrevia cabeçalhos e oculta a coluna menos essencial (Valor Alvo) abaixo de 480px para caber sem scroll

## Capabilities

### New Capabilities
- `dividend-list-nonzero`: A listagem de dividendos exclui valores zerados
- `mobile-responsive-tables-menu`: Menu de abas e tabelas adaptados ao mobile sem scroll horizontal

## Impact

- **Backend** (`carteira-inteligente-api`):
  - `internal/infrastructure/persistence/gorm_dividend_repository.go`: `FindByStockID` e `FindByStockIDAndYear` filtram `amount > 0`
- **Frontend** (`carteira-inteligente`):
  - `dashboard.scss`: `tab-nav` responsiva sem scroll
  - `dividend-history.scss`: breakpoint mobile da tabela; `dividend-history.html`: cabeçalhos abreviados em telas pequenas (via classes utilitárias)
  - `goals.scss`: breakpoint mobile da tabela, ocultar coluna Valor Alvo em telas pequenas
- **Sem mudança de contrato de API** — apenas menos itens na lista
