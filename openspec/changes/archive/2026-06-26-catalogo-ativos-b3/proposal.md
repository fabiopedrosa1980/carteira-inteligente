## Why

Hoje o tipo do ativo (Ações / FIIs / ETFs) é inferido por **heurística de sufixo** no front (`asset-type.util.ts`) e a busca de ticker depende de **consulta externa ao vivo** (Yahoo, via `/quote/:ticker` e `/search`). O sufixo `11` é ambíguo — units de ações (TAEE11, SANB11, KLBN11, BPAC11…), FIIs e ETFs o compartilham — então qualquer chute erra a categoria de dezenas de papéis e não há fonte de verdade local. Além do erro de classificação, depender de site externo a cada digitação é lento, instável (cold start do Render + rate limit do Yahoo) e sem catálogo próprio para autocomplete confiável.

A correção definitiva é o backend Go **ter o catálogo completo da B3** (Ações, FIIs, ETFs) na própria base, populado por um robô, e resolver ticker/busca contra esse dado — sem ir a site externo para descobrir nome, setor e, principalmente, o **tipo** do ativo.

## What Changes

- **Robô de ingestão do catálogo (novo, no repo Go):** um job que coleta **todos** os ativos listados na B3 — Ações, FIIs e ETFs — a partir do **site Investidor10**, com `ticker`, `name`, `type` (e setor quando disponível), e os persiste numa tabela `b3_assets` da base da API. Roda sob demanda e de forma agendada (refresh periódico), com upsert idempotente por ticker.
- **Tipo do ativo vem do catálogo, não de heurística:** cada linha de `b3_assets` carrega o `type` autoritativo (`Acoes` | `FIIs` | `ETFs`) derivado da **categorização do Investidor10** (seção de origem) — acabando com o chute por sufixo `11`.
- **Novo endpoint de resolução por ticker (catálogo local):** `GET /api/v1/assets/:ticker` (e busca `GET /api/v1/assets/search?q=`) respondem a partir da tabela `b3_assets`, **sem chamada externa**. Retornam `ticker`, `name`, `type` e setor.
- **Cotação deixa de descobrir o tipo via site externo:** `/quote/:ticker` e `/quotes` passam a enriquecer o `assetType` consultando `b3_assets` localmente (preço continua vindo do Yahoo; a **classificação** vira local). A busca de autocomplete (`/search`) passa a servir do catálogo.
- **Frontend usa o catálogo como fonte de verdade:** `StockApiService` ganha resolução por catálogo; `quote.assetType`/resposta do catálogo têm prioridade no auto-fill do lançamento; `detectAssetType` fica apenas como **fallback offline**.

## Capabilities

### New Capabilities
- `catalogo-ativos-b3-ingestao`: robô que coleta o catálogo completo da B3 (Ações/FIIs/ETFs) e o persiste em `b3_assets` com upsert idempotente, execução sob demanda e agendada.
- `catalogo-ativos-b3-endpoint`: contrato do endpoint local de resolução/busca de ticker servido de `b3_assets` (`GET /assets/:ticker`, `GET /assets/search`) e do enriquecimento do `assetType` em `/quote`/`/quotes` a partir do catálogo — sem dependência externa para nome/tipo/setor.

### Modified Capabilities
- `lancamento-tipo-por-ticker`: o auto-fill do tipo no lançamento passa a usar a resposta do catálogo (cotação/endpoint) como fonte de verdade; a heurística por sufixo vira fallback offline.

## Impact

- **`carteira-inteligente-api` (repo Go):** nova tabela `b3_assets` (+ migração); job de ingestão (coletor Investidor10 + upsert); handler do novo endpoint `/assets/:ticker` e `/assets/search`; enriquecimento de `assetType` em `quote_handler.go` lendo `b3_assets`; agendamento do refresh.
- **`StockApiService` / `StockQuote`** — novo método de resolução por catálogo e/ou consumo do `assetType` vindo do catálogo; `searchTickers` aponta para o endpoint de catálogo.
- **`add-transaction-modal.ts`** — auto-fill e checagem de tipo preferem a resposta do catálogo; `detectAssetType` só como fallback.
- **`asset-type.util.ts`** — `ETF_TICKERS`/`detectAssetType` rebaixados a fallback offline; deixam de ser a fonte primária.
- **Convive com `taee11-classificacao-tipo-ativo`** (paliativo de validação não-bloqueante): esta mudança entrega a **fonte de verdade** que aquele paliativo antecipou. Sem migração de dados de transações; `asset_type` por transação continua persistido.
- **Não é recomendação de investimento** — o catálogo apenas classifica e identifica o papel.
