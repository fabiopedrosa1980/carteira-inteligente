## ADDED Requirements

### Requirement: Busca automática de histórico de dividendos ao cadastrar ativo
Ao cadastrar uma ação via `POST /api/v1/stocks`, o sistema SHALL disparar automaticamente a busca do histórico de dividendos dos últimos 5 anos no Investidor10 (`https://investidor10.com.br/acoes/<ticker>/`) e persistir os registros na tabela `dividends`, incluindo os campos `type` (JCP | Dividendo), `ex_date` (Data Com), `pay_date` (Data de Pagamento) e `amount`.

#### Scenario: Scraping bem-sucedido ao cadastrar ação
- **WHEN** o endpoint `POST /api/v1/stocks` recebe um ticker válido (ex: `VALE3`)
- **THEN** o sistema persiste a ação no banco e dispara o scraping de dividendos do Investidor10 em background (goroutine), sem bloquear a resposta HTTP

#### Scenario: Dividendos encontrados são persistidos corretamente
- **WHEN** o scraping do Investidor10 retorna registros de dividendos
- **THEN** cada registro é salvo com `type` ("JCP" ou "Dividendo"), `ex_date`, `pay_date` e `amount` preenchidos, e associado ao `stock_id` correto

#### Scenario: Tipo de proventos mapeado corretamente
- **WHEN** o Investidor10 indica o tipo como "JCP" ou variação equivalente
- **THEN** o campo `type` é persistido como "JCP"; caso contrário como "Dividendo"

#### Scenario: Ticker não encontrado no Investidor10
- **WHEN** o Investidor10 não retorna dados para o ticker informado
- **THEN** a criação da ação continua normalmente e nenhum dividendo é inserido (falha silenciosa em background)

#### Scenario: Apenas os últimos 5 anos são importados
- **WHEN** o Investidor10 retorna dividendos com datas anteriores a 5 anos atrás
- **THEN** esses registros são ignorados; apenas dividendos com `pay_date` nos últimos 5 anos são persistidos

### Requirement: Evitar duplicação de dividendos no reimport
O sistema SHALL verificar duplicatas antes de inserir um dividendo importado pelo scraping, usando a combinação `(stock_id, ex_date, type)` como chave única.

#### Scenario: Reimport do mesmo ativo não duplica registros
- **WHEN** o scraping é executado para um ativo que já possui dividendos cadastrados
- **THEN** registros com a mesma combinação `(stock_id, ex_date, type)` são ignorados (upsert ou check before insert)
