## Context

O frontend infere o tipo do ativo por heurística de sufixo (`asset-type.util.ts`) e descobre nome/cotação por consulta externa ao vivo via Go (`/quote/:ticker`, `/search` → Yahoo). O sufixo `11` é compartilhado por units de ações, FIIs e ETFs, então o chute erra dezenas de papéis (TAEE11, SANB11, KLBN11, BPAC11…). A mudança `taee11-classificacao-tipo-ativo` já entrega um paliativo (validação não-bloqueante + heurística que não chuta FII). Esta mudança entrega a **fonte de verdade definitiva**: o catálogo completo da B3 dentro da base da própria API Go.

Restrições conhecidas:
- A API Go roda no Render (cold start) com Postgres gerenciado; consultas locais a uma tabela pequena (~milhares de linhas) são baratas e estáveis.
- O repo Go é **externo a este workspace** (`carteira-inteligente-api`); aqui planejamos o contrato e adaptamos o front.
- A B3 não expõe uma API REST pública estável e oficial para o catálogo; a coleta precisa de uma fonte concreta a decidir (ver Open Questions).

## Goals / Non-Goals

**Goals:**
- Persistir o catálogo B3 (Ações/FIIs/ETFs) em `b3_assets` via robô idempotente, sob demanda e agendado.
- Resolver ticker e busca a partir do catálogo local, **sem chamada externa** para nome/tipo/setor.
- Tornar o `assetType` da cotação autoritativo via catálogo, mantendo preço vindo do Yahoo.
- Front consome o catálogo como fonte de verdade; heurística vira fallback offline.

**Non-Goals:**
- Não substituir a fonte de **cotação/preço** (continua Yahoo via `/quote`).
- Não incluir fundamentos/indicadores no catálogo (escopo do Investidor10 já existente).
- Não migrar `asset_type` de transações antigas (correção vale para resolução/novos lançamentos; edição já destravada pelo paliativo).
- Não construir UI administrativa do robô (acionamento por endpoint/cron basta).

## Decisions

### 1. Tabela `b3_assets` como fonte única local
Schema mínimo: `ticker TEXT PRIMARY KEY` (maiúsculo), `name TEXT`, `type TEXT CHECK (type IN ('Acoes','FIIs','ETFs'))`, `sector TEXT`, `updated_at TIMESTAMPTZ`. `ticker` como chave natural habilita upsert (`INSERT ... ON CONFLICT (ticker) DO UPDATE`).
- *Alternativa descartada:* arquivo estático versionado no repo Go — não atualiza sozinho e exige redeploy a cada novo papel. Tabela + robô agendado mantém o catálogo vivo.

### 2. Robô de ingestão por segmento da B3
O coletor obtém as três listas por categoria de cada segmento da B3 (Ações, FIIs, ETFs) e grava o `type` a partir do **segmento de origem** — não do sufixo. Cada execução faz upsert de todos os tickers num batch transacional; falha de download aborta sem tocar o catálogo atual.
- *Alternativa descartada:* classificar pós-coleta por `instrumentType` do Yahoo — Yahoo retorna `EQUITY` tanto para ação quanto FII, sem separar; a origem por segmento da B3 já traz a categoria correta.

### 3. Fonte de dados do catálogo: sitemaps por categoria do Investidor10
A coleta consome os **sitemaps por categoria** do Investidor10 (`investidor10.com.br/sitemap-acoes.xml`, `sitemap-fiis.xml`, `sitemap-etfs.xml`), atrás de uma interface/coletor no Go para isolar a parte volátil. Cada sitemap lista **todas** as páginas de papel daquela categoria; o `ticker` sai do slug da URL (`.../acoes/taee11/` → `TAEE11`) e o `type` vem da **categoria do sitemap**. Sondagem real: Ações ≈ 669, FIIs ≈ 730, ETFs ≈ 206 tickers, com TAEE11/SANB11 em `acoes`, MXRF11 em `fiis`, BOVA11 em `etfs`.
- *Rationale:* o sitemap entrega o **catálogo completo** com a categoria correta por seção, sem paginação manual nem parsing de HTML frágil. A listagem renderizada (`/acoes/` etc.) mostra só ~85 cards — insuficiente; o sitemap cobre o universo inteiro. Resolve o problema do site da B3, que lista só o **código-raiz** da empresa (exigindo um detalhe por papel para obter os tickers).
- *Trade-off:* o sitemap traz só a URL — `name`/`sector` ficam vazios no catálogo (preenchidos sob demanda pela cotação no front; enriquecimento futuro opcional). O `type`, que é o objetivo central, vem 100% correto.
- *Atenção de implementação:* respeitar `User-Agent`/headers; validar o slug como ticker B3 (regex `^[A-Z0-9]{4,}[0-9]{1,2}$`) para descartar páginas não-papel; normalizar uppercase.

### 4. Endpoints novos `/assets/:ticker` e `/assets/search`
Servem 100% de `b3_assets`. `/assets/search` casa por prefixo de `ticker` e `name` (ILIKE), limitado a N resultados. `quote_handler.go` passa a fazer um lookup em `b3_assets` para preencher `assetType`; ausência → `""`.
- *Alternativa descartada:* reaproveitar `/search` atual mudando só a origem — preferimos endpoint novo `/assets/*` explícito (catálogo) e migrar o front para ele, deixando o `/search` legado intacto até a transição concluir.

### 5. Front: catálogo prioritário, heurística como fallback
`StockApiService` ganha consumo do `assetType` da cotação e/ou método de resolução por catálogo. `add-transaction-modal` usa `quote.assetType`/catálogo no auto-fill; `detectAssetType` só roda quando o catálogo não respondeu (offline/erro). `searchTickers` aponta para `/assets/search`.

## Risks / Trade-offs

- **Fonte de catálogo instável/sem API oficial** → adaptador `CatalogSource` isolado (decisão 3); se uma fonte cair, troca-se a implementação sem mexer em schema/contrato; última ingestão permanece servindo.
- **Catálogo desatualizado (IPO/novo papel recém-listado)** → refresh agendado periódico; front mantém fallback por heurística para tickers ainda ausentes; `assetType: ""` não bloqueia (paliativo já garante salvar).
- **Cold start do Render na primeira ingestão** → job desacoplado do request path; endpoints de leitura nunca disparam coleta, só leem a tabela.
- **Divergência transitória entre `/search` legado e `/assets/search`** → migrar o front num passo só e validar paridade antes de aposentar o legado.
- **Lookup extra por cotação** → consulta indexada por PK em tabela pequena; custo desprezível, sem chamada de rede.

## Migration Plan

1. Criar tabela `b3_assets` + migração no repo Go.
2. Implementar `CatalogSource` + robô de upsert; rodar ingestão inicial manualmente (sob demanda) e validar contagem por tipo.
3. Subir `/assets/:ticker` e `/assets/search` lendo da tabela.
4. Enriquecer `assetType` em `/quote` e `/quotes` via lookup no catálogo.
5. Agendar refresh periódico.
6. Adaptar o front: consumir `assetType`/catálogo no auto-fill e apontar `searchTickers` para `/assets/search`; rebaixar `detectAssetType`/`ETF_TICKERS` a fallback.
7. **Rollback:** front mantém fallback offline; basta ignorar `assetType` vazio e o app volta ao comportamento do paliativo. Remoção dos endpoints não quebra o front (degrada para heurística).

## Open Questions

- Mapear a marcação/listagem exata do Investidor10 por seção (`/acoes/`, `/fiis/`, `/etfs/`), incluindo paginação e se há endpoint interno (JSON) por trás da tabela. É o detalhe interno de `CatalogSource`.
- Cadência do refresh agendado (diário? semanal?) e mecanismo (cron interno do Go, Render Cron Job, ou endpoint admin acionado externamente).
- O acionamento sob demanda é endpoint autenticado (`POST /admin/catalog/refresh`) ou comando CLI? Necessidade de proteção de acesso.
- `sector` será populado pela mesma fonte do catálogo ou continua vindo da cotação? (catálogo é preferível para consistência).
