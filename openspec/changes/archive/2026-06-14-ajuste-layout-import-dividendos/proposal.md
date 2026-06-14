## Why

A tabela de histórico de dividendos exibe colunas com largura irregular (dimensionadas pelo conteúdo) e a importação do Investidor10 pode perder registros: o índice único atual `(stock_id, month, year, type)` descarta silenciosamente dois dividendos do mesmo tipo pagos no mesmo mês. É preciso garantir que a janela de 5 anos seja capturada de forma confiável e que os campos (Tipo, Data Com, Pagamento, Valor) sejam exibidos corretamente.

## What Changes

- **Layout da tabela**: aplicar larguras proporcionais às colunas Tipo, Data Com, Data de Pagamento e Valor (via `<colgroup>`), com alinhamento consistente por coluna (Valor à direita)
- **Importação — chave de unicidade**: trocar o índice único de `(stock_id, month, year, type)` para `(stock_id, ex_date, pay_date, type)`, evitando descarte indevido de dividendos distintos do mesmo tipo no mesmo mês
- **Importação — robustez do scraper**: localizar a tabela pelo `id="table-dividends-history"` (com fallback para detecção por cabeçalho), tornando a extração resiliente a outras tabelas da página
- **Janela de 5 anos**: confirmar e documentar que o filtro por data de pagamento captura os últimos 5 anos (registros com `pay_date >= hoje - 5 anos`), incluindo dividendos já anunciados com pagamento futuro
- **Campos exibidos**: garantir Tipo como badge (Dividendo/JCP), datas em `dd/MM/yyyy` e Valor em BRL

## Capabilities

### New Capabilities
- `dividend-import-robustness`: Importação confiável do histórico de dividendos do Investidor10 — seleção da tabela por id, chave de unicidade que não perde registros e janela de 5 anos verificada
- `dividend-table-layout`: Layout proporcional e consistente das colunas da tabela de histórico de dividendos

## Impact

- **Backend** (`carteira-inteligente-api`):
  - `internal/domain/dividend.go`: alterar tags `uniqueIndex` para a nova chave `(stock_id, ex_date, pay_date, type)`
  - `internal/infrastructure/scraper/investidor10.go`: priorizar `id="table-dividends-history"` na busca da tabela
  - Migração: a coluna/índice antigo `idx_dividend_unique` precisa ser recriado (drop + create) no SQLite
  - Testes de dividendo em `*_test.go` podem precisar de ajuste para a nova chave
- **Frontend** (`carteira-inteligente`):
  - `dividend-history.html`: adicionar `<colgroup>` com larguras proporcionais
  - `dividend-history.scss`: ajustar alinhamento por coluna e remover `white-space: nowrap` onde necessário para responsividade
- **Sem breaking change** de API — o JSON de dividendos mantém os mesmos campos
