## Contexto

A importação de dividendos foi implementada em changes anteriores: o scraper `investidor10.go` busca a tabela por conteúdo de cabeçalho e o handler `importDividends` filtra `pay_date >= hoje - 5 anos`, persistindo via `CreateIfNotExists` (`OnConflict DoNothing`). O índice único atual é `(stock_id, month, year, type)`.

Verificação feita na página real `investidor10.com.br/acoes/vale3/`:
- A tabela `id="table-dividends-history"` é renderizada **server-side** e contém o histórico **completo** (1997→2026, 77 linhas para VALE3). Não há AJAX necessário.
- Colunas na ordem: **tipo, data com, pagamento, valor** (cabeçalhos dentro de `<h3>`).
- A janela de 5 anos via `pay_date` funciona, mas o índice único atual perde registros do mesmo tipo no mesmo mês.

## Metas / Não-Metas

**Metas:**
- Corrigir a chave de unicidade para não perder dividendos distintos
- Tornar a seleção da tabela mais robusta (por id)
- Garantir layout proporcional das colunas no frontend
- Confirmar a janela de 5 anos

**Não-Metas:**
- Mudar a fonte de dados (continua Investidor10, server-side)
- Reimportar automaticamente ativos já cadastrados (continua sob cadastro/recadastro)
- Persistência de dividendos com mais de 5 anos

## Decisões

### D1 — Nova chave de unicidade `(stock_id, ex_date, pay_date, type)`
Cada linha do Investidor10 é unicamente identificada pela combinação data com + pagamento + tipo. Incluir ambas as datas no índice elimina o falso-positivo de dedup do índice atual (`month, year, type`).

**Alternativa descartada:** incluir `amount` na chave — float em índice único é frágil e desnecessário, pois as datas já distinguem as linhas reais.

**Migração SQLite:** GORM `AutoMigrate` não remove índices únicos antigos automaticamente quando a composição muda. Será necessário dropar o índice `idx_dividend_unique` na inicialização (ou recriar a tabela). Como o banco é volátil em alguns ambientes (`file::memory:`), o impacto é baixo; em produção (arquivo persistente) um `DROP INDEX IF EXISTS idx_dividend_unique` antes do `AutoMigrate` garante a recriação correta.

### D2 — Seleção da tabela por id com fallback
No `extractDividendRows`, primeiro procurar `<table>` com atributo `id == "table-dividends-history"`; se não achar, manter o `tableHasDividendHeaders` atual como fallback. Mais resiliente a outras tabelas (balanço, indicadores) na página.

### D3 — `month`/`year` permanecem como colunas
Continuam sendo derivados de `pay_date` e usados pelo filtro de ano do frontend e pelo calendário. Apenas deixam de compor o índice único.

### D4 — Layout com `<colgroup>`
Proporções: **Tipo 16%**, **Data Com 26%**, **Data de Pagamento 30%**, **Valor 28%** (à direita). `<colgroup>` garante proporções estáveis independentemente do conteúdo, sem depender de `white-space: nowrap`.

## Riscos / Trade-offs

- **[Migração do índice em produção]** → Adicionar `DROP INDEX IF EXISTS idx_dividend_unique` antes do `AutoMigrate`, ou documentar recriação. Sem isso, o índice antigo persiste e a nova composição não é aplicada.
- **[Registros já importados com a chave antiga]** → Não são afetados negativamente; novas importações passam a inserir corretamente. Registros perdidos anteriormente só voltam ao recadastrar o ativo.
- **[Datas vazias]** → Quando `ex_date` é vazio, o scraper já usa `pay_date` como fallback, então a chave permanece bem definida.

## Plano de Migração

1. Backend: adicionar `DROP INDEX IF EXISTS idx_dividend_unique` na rotina de inicialização do DB antes do `AutoMigrate`, depois aplicar a nova chave.
2. Deploy backend — `AutoMigrate` recria o índice com a nova composição.
3. Deploy frontend — somente HTML/SCSS, sem risco.
4. Recadastrar ativos cujos dividendos foram perdidos anteriormente (opcional, manual).

## Questões em Aberto

- Recriar a tabela de dividendos do zero em produção vale a pena para limpar registros perdidos? Decisão: não automatizar; recadastro manual cobre os casos.
