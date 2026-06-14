## ADDED Requirements

### Requirement: Chave de unicidade não descarta dividendos distintos
O índice único de `Dividend` DEVE ser composto por `(stock_id, ex_date, pay_date, type)`, de forma que dois dividendos distintos do mesmo tipo pagos no mesmo mês NÃO sejam descartados durante a importação.

#### Scenario: Dois dividendos do mesmo tipo no mesmo mês
- **WHEN** o scraper retorna dois registros do tipo "Dividendo" com datas de pagamento diferentes dentro do mesmo mês
- **THEN** ambos são persistidos (nenhum é descartado pelo `OnConflict DoNothing`)

#### Scenario: Reimportação não duplica
- **WHEN** o mesmo ativo é importado novamente e um registro com mesmo `(stock_id, ex_date, pay_date, type)` já existe
- **THEN** o registro existente é mantido e nenhuma duplicata é criada

### Requirement: Tabela de dividendos localizada por id
O scraper DEVE localizar a tabela de dividendos pelo atributo `id="table-dividends-history"` quando presente, com fallback para detecção pelo conteúdo do cabeçalho (tipo/data/valor).

#### Scenario: Tabela encontrada por id
- **WHEN** a página do Investidor10 contém `<table id="table-dividends-history">`
- **THEN** o scraper extrai as linhas dessa tabela, ignorando outras tabelas da página

#### Scenario: Fallback por cabeçalho
- **WHEN** a tabela não possui o id esperado mas existe uma tabela cujo cabeçalho contém "tipo", "data" e "valor"
- **THEN** o scraper usa essa tabela como fonte

### Requirement: Janela de importação de 5 anos por data de pagamento
A importação DEVE incluir todos os dividendos cujo `pay_date` seja maior ou igual a `hoje - 5 anos`, incluindo dividendos já anunciados com data de pagamento futura.

#### Scenario: Registro dentro da janela
- **WHEN** um dividendo tem `pay_date` há 4 anos
- **THEN** ele é incluído na importação

#### Scenario: Registro fora da janela
- **WHEN** um dividendo tem `pay_date` há 6 anos
- **THEN** ele é excluído da importação

#### Scenario: Pagamento futuro anunciado
- **WHEN** um dividendo tem `data com` no passado recente e `pay_date` no futuro
- **THEN** ele é incluído na importação
