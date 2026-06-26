## Why

O app classifica o tipo de ativo (Ações / FIIs / ETFs) **chutando pelo sufixo do ticker**: em `asset-type.util.ts:49`, tudo que termina em `11` e não está numa lista de ETFs conhecidos vira **FII**. A lógica é binária — não existe saída para "Ação terminada em 11". Mas o sufixo `11` também é usado pelas **units de ações** (TAEE11/Taesa, SANB11/Santander, KLBN11/Klabin, ENGI11/Energisa, SAPR11/Sanepar, BPAC11/BTG, ALUP11/Alupar…). Todas são empresas, e o app as trata como FII.

O estrago não é cosmético nem isolado ao TAEE11: **toda unit de ação terminada em `11` fica impossível de registrar como Ação**. No modal de lançamento, `detectAssetType` roda em três pontos e, como `detected ('FIIs') !== assetType ('Ações')`:
- auto-preenche o tipo como **FIIs** ao digitar (`add-transaction-modal.ts:232`);
- exibe aviso em tempo real *"Ticker é de FIIs, não condiz com Ações"* (`:73-82`);
- **bloqueia o salvamento** em `save()` (`:296-303` → `return` em `:305`).

O bloqueio vale para "Ações" **e** "ETFs" — só passa escolhendo FIIs (o tipo errado). Pior: com o tipo travado por seção (`isAssetTypeLocked`), a validação do `save()` ainda dispara e o usuário não tem nem como corrigir o tipo na tela. Status Invest e Investidor10 não erram nisso porque a categoria vem do cadastro do papel — não é inferida por sufixo.

## What Changes

- **Paliativo imediato (prioridade 1, independe do backend):** a validação travante de tipo no `save()` vira **aviso não-bloqueante**. O usuário sempre consegue salvar com o tipo que escolheu, mesmo que a heurística discorde. Isso destrava **todas** as units de uma vez.
- **Heurística deixa de classificar units como FII:** `detectAssetType` passa a retornar `null` (indeterminado) para sufixo `11` desconhecido, em vez de assumir FII. A lista de ETFs e a detecção de Ações por sufixo `3/4/…` permanecem. Sem `null→FIIs`, não há mais auto-fill nem aviso errados para units.
- **Backend passa a informar o tipo do ativo** no endpoint de cotação (`/quote/:ticker` e `/quotes`) via campo `assetType`, classificado por um **classificador tiered no próprio repo Go** — sem dependência externa nova (decisão na design.md §4):
  - lê `meta.instrumentType` (Yahoo, **já presente no payload, hoje descartado**) → ETF de graça;
  - sufixo `3–8` → Ações;
  - sufixo `11` → `ETF_SET`→ETFs, `UNIT_SET` (~40 units)→Ações, senão FIIs (maioria);
  - demais → `""`. O backend vira a fonte única; o `ETF_TICKERS` do front fica como fallback offline.
- **Frontend usa o tipo informado** pela cotação como fonte de verdade no modal: auto-fill e (eventual) validação passam a usar `quote.assetType` quando presente; `detectAssetType` fica só como fallback offline/legado.

## Capabilities

### New Capabilities
- `backend-quote-asset-type`: contrato do campo `assetType` no endpoint `/quote/:ticker` (e `/quotes`), classificado no repo Go por `instrumentType` (Yahoo) + listas curadas `ETF_SET`/`UNIT_SET` — **sem dependência externa nova**.

### Modified Capabilities
- `classificacao-tipo-ativo`: a validação de tipo no lançamento deixa de bloquear; a heurística por sufixo deixa de classificar units como FII; o tipo informado pela cotação passa a ter prioridade sobre a heurística.

## Impact

- **`add-transaction-modal.ts`** — validação de tipo em `save()` (`:296-303`) deixa de popular `errors.ticker`/bloquear; vira aviso visual via `tickerTypeMismatch` (já existente, `:73-82`). Auto-fill (`:232`) e, quando disponível, a checagem passam a preferir `quote.assetType`.
- **`asset-type.util.ts`** — `detectAssetType` deixa de retornar `FIIs` para `11` desconhecido; retorna `null`. Preserva `ETF_TICKERS` e Ações por sufixo `3/4/5/6/7/8`. Atualizar testes (`preco-teto.util.spec.ts` e afins) se dependerem do retorno antigo.
- **`StockApiService` / `StockQuote`** — novo campo opcional `assetType?: AssetType` no shape da cotação (`stock-api.service.ts`).
- **`carteira-inteligente-api` (repo Go):** `quote_handler.go` — adicionar `InstrumentType` ao struct `chartMeta` (parar de descartar), novo classificador `assettype` com mapas `ETF_SET`/`UNIT_SET`, e campo `AssetType` em `QuoteResponse`. **Sem dependência externa nova** — reaproveita o Yahoo já consultado. **Yahoo `quoteType` sozinho não separa FII de Ação** (ambos `EQUITY`); por isso a `UNIT_SET`. brapi.dev / ingestão B3 ficam como upgrade futuro se "falso-FII" virar reclamação. Enquanto o campo não sobe em produção, o front opera com o paliativo (aviso não-bloqueante) + heurística corrigida.
- **Sem migração de dados** — `asset_type` já é persistido por transação; a correção vale para novos lançamentos. Lançamentos antigos salvos como FII por engano podem ser corrigidos na edição, que deixa de bloquear.
- **Não é recomendação de investimento** — o app apenas classifica e sinaliza divergência.
