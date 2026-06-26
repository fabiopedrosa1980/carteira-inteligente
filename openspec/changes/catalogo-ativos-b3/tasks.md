## 1. Esquema e migração (repo Go)

- [x] 1.1 Criar migração da tabela `b3_assets` (`ticker` PK uppercase, `name`, `type` com CHECK em `Acoes|FIIs|ETFs`, `sector`, `updated_at`)
- [x] 1.2 Adicionar índice para busca por prefixo de `name` (e confirmar PK para `ticker`)
- [x] 1.3 Criar camada de acesso (repository) com `Upsert(asset)`, `GetByTicker(ticker)` e `Search(prefix, limit)`

## 2. Robô de ingestão a partir do Investidor10 (repo Go)

- [x] 2.1 Definir interface `CatalogSource` (retorna ativos com `ticker`, `name`, `type`, `sector`)
- [x] 2.2 Mapear a listagem do Investidor10 por seção (`/acoes/`, `/fiis/`, `/etfs/`): estrutura HTML/cards, paginação e eventual endpoint interno (JSON) por trás
- [x] 2.3 Implementar coletor de **Ações** (`/acoes/`) → `type: Acoes`, paginando até o fim
- [x] 2.4 Implementar coletor de **FIIs** (`/fiis/`) → `type: FIIs`
- [x] 2.5 Implementar coletor de **ETFs** (`/etfs/`) → `type: ETFs`
- [x] 2.6 Extrair `ticker` (+ `name`/`sector` quando disponível), normalizar (uppercase, sem espaço/acentos) e consolidar as três listas
- [x] 2.7 Persistir via upsert transacional por ticker; abortar sem corromper o catálogo em caso de falha de download
- [x] 2.8 Logar contagem por tipo ao final de cada execução

## 3. Acionamento sob demanda e agendado (repo Go)

- [x] 3.1 Expor acionamento sob demanda da ingestão (endpoint admin protegido `POST /admin/catalog/refresh` ou comando)
- [x] 3.2 Agendar refresh periódico do catálogo (cron interno ou Render Cron Job)
- [x] 3.3 Garantir que falha em execução agendada não derruba a API (catálogo anterior permanece servindo)
- [x] 3.4 Rodar a ingestão inicial e validar contagem por tipo no banco

## 4. Endpoints de catálogo (repo Go)

- [x] 4.1 Implementar `GET /api/v1/assets/:ticker` lendo só de `b3_assets` (404/ausência quando não existir, sem chamada externa)
- [x] 4.2 Implementar `GET /api/v1/assets/search?q=` (prefixo por `ticker`/`name`, lista vazia sem match)
- [x] 4.3 Enriquecer `assetType` em `quote_handler.go` (`/quote/:ticker` e `/quotes`) via lookup em `b3_assets`; `""` quando ausente
- [x] 4.4 Garantir que os endpoints de leitura nunca disparam coleta (só leem a tabela)

## 5. Adaptação do frontend (este repo)

- [x] 5.1 Adicionar `assetType?: AssetType` ao shape `StockQuote` e mapear o campo da cotação em `stock-api.service.ts`
- [x] 5.2 Adicionar resolução por catálogo em `StockApiService` (`getAsset(ticker)` consumindo `/assets/:ticker`)
- [x] 5.3 Apontar `searchTickers` para `GET /assets/search`
- [x] 5.4 No `add-transaction-modal`, usar `quote.assetType`/catálogo como fonte de verdade no auto-fill, com `detectAssetType` só como fallback offline
- [x] 5.5 Rebaixar `asset-type.util.ts` (`ETF_TICKERS`/`detectAssetType`) a fallback offline e ajustar comentários

## 6. Verificação

- [x] 6.1 Validar via API que TAEE11/SANB11/KLBN11 retornam `type/assetType: Acoes`
- [x] 6.2 Validar que um FII (ex.: MXRF11) e um ETF (ex.: BOVA11) retornam os tipos corretos pelo catálogo
- [ ] 6.3 Validar no app que o auto-fill do lançamento preenche o tipo a partir do catálogo e permite override
- [ ] 6.4 Validar fallback: com catálogo indisponível, o app degrada para a heurística sem quebrar
- [x] 6.5 `npx prettier --write` nos arquivos TS alterados e `ng build` sem erros
