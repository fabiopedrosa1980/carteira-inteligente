# Design

## Contexto e diagnóstico

O tipo de ativo é inferido no front por sufixo do ticker (`asset-type.util.ts`). A função é binária para `11`:

```ts
if (/11$/.test(t)) return ETF_TICKERS.has(t) ? 'ETFs' : 'FIIs';  // sem saída p/ unit
if (/[345678]$/.test(t)) return 'Acoes';
return null;
```

Logo, **toda unit de ação** (XXXX11 que é empresa, não fundo) cai em `FIIs`. No modal de lançamento isso é consumido em três pontos — auto-fill (`:232`), aviso em tempo real (`:73-82`) e validação de `save()` (`:296-303`) — sendo que `save()` faz `return` e **bloqueia** o registro de qualquer unit como Ação ou ETF.

`asset_type` **já é persistido por transação** no backend (`ApiTransaction.asset_type`); `detectAssetType` não decide o tipo dos ativos já salvos, só atrapalha a **entrada** de novos. Portanto a correção é no caminho de entrada + na fonte do tipo, não há migração.

## Decisões

### 1. Validação travante → aviso não-bloqueante (paliativo, sem depender do backend)

O `save()` deixa de gravar `errors.ticker` quando o tipo detectado diverge do escolhido. A divergência continua **visível** via `tickerTypeMismatch` (getter já existente, exibido no template), mas não impede o salvamento. O usuário é a autoridade final sobre o tipo.

Por quê: destrava **todas** as units imediatamente, é reversível e de baixo risco. A heurística era usada como *gate*; passa a ser *hint*.

Alternativa descartada: manter o gate e só expandir uma lista de units conhecidas (como a de ETFs). Rejeitada — mesma dívida de manutenção manual da lista de ETFs, e continua bloqueando units novas/desconhecidas.

### 2. `detectAssetType('…11' desconhecido)` → `null` em vez de `FIIs`

A heurística para de afirmar FII quando não tem certeza. Sufixo `11` fora de `ETF_TICKERS` passa a ser **indeterminado** (`null`). Mantém-se:
- `ETF_TICKERS.has(t)` → `'ETFs'`
- sufixo `3/4/5/6/7/8` → `'Acoes'`
- demais → `null`

Consequência: o auto-fill não seleciona mais um tipo errado para units; ele simplesmente não sugere nada (`if (detected) form.assetType = detected` — `null` não sobrescreve). E `tickerTypeMismatch` não acusa divergência falsa (`detected && detected !== ...` — `null` curto-circuita).

Risco: havia um falso "acerto" — FIIs digitados sem o usuário escolher o tipo eram auto-preenchidos. Após a mudança, FII de sufixo `11` também vira indeterminado e exige escolha manual (ou virá do backend — decisão 3). Trade-off aceitável: melhor não-sugerir do que sugerir errado. A fonte confiável é o backend.

### 3. Tipo vindo da cotação (`quote.assetType`) como fonte de verdade

`StockQuote` ganha `assetType?: AssetType`. O modal já chama `getQuote` ao digitar o ticker; quando a resposta trouxer `assetType`, ele é usado para o auto-fill (prioridade sobre a heurística). `detectAssetType` fica como **fallback** para quando a cotação não resolveu (offline, ticker não encontrado, backend antigo sem o campo).

```
Prioridade de classificação no modal
  quote.assetType (backend)  ──►  se ausente  ──►  detectAssetType (heurística)  ──►  escolha manual
       fonte de verdade                              só Ações/ETFs/null
```

### 4. Fonte do tipo no backend — Yahoo + listas curadas (decidido)

O endpoint `/quote` vive no repo Go (`carteira-inteligente-api`). Ao inspecionar o código, dois sinais de classificação **já chegam nos payloads que o backend busca e são descartados**:

- **`/quote`** consulta `v8/finance/chart/{ticker}.SA`, cujo `meta` traz `instrumentType` (`"EQUITY"|"ETF"|"MUTUALFUND"|…`). A struct `chartMeta` não tem o campo → o valor é jogado fora. Passar a ler é **custo zero** (nenhuma chamada HTTP nova).
- **`/search`** já decodifica `quoteType` por resultado, mas só o usa para filtrar `.SA`.

Constraint central: **o Yahoo entrega ETF de graça, mas não separa FII de Ação** — ambos são `EQUITY`/`quoteType:"EQUITY"`. Nenhum parse de Yahoo resolve isso. Logo a única decisão real é a fonte de verdade do `11`.

Insight de contagem que inverte a manutenção: a B3 tem **~700+ FIIs** mas só **~40 units de ação** (XXXX11 que são empresas). Em vez de tentar listar FIIs (inviável) ou aceitar o chute FII (o bug), mantém-se uma **lista de UNITs** pequena e estável, espelho da lista de ETFs — porém no backend, que vira a fonte única.

Classificador (tiered, no Go):

```
classify(ticker, instrumentType):
   instrumentType == "ETF"      → ETFs       # Yahoo, grátis
   suffix ∈ {3,4,5,6,7,8}       → Acoes      # determinístico, nunca fundo
   suffix == 11:
        ticker ∈ ETF_SET        → ETFs
        ticker ∈ UNIT_SET       → Acoes      # as ~40 exceções
        else                    → FIIs       # maioria esmagadora do 11
   else                         → ""         # BDRs, índices, desconhecido
```

| Fonte | Resolve unit vs FII? | Dependência nova | Manutenção |
|-------|----------------------|------------------|------------|
| **Yahoo + listas curadas** ✅ escolhida | via UNIT_SET (~40) | nenhuma (reusa payloads) | lista de units, edição rara |
| brapi.dev (`type: stock\|fund\|bdr`) | nativo B3 | token + rate limit + env | nenhuma, mas SLA externo |
| Ingestão arquivo B3 | autoritativo, todos os tipos | job + storage | automática, build mais pesado |

Escolha: **Yahoo + listas curadas** — sem dependência nova, reaproveita o que já é buscado, a lista de units é minúscula e estável, e o `save()` não-bloqueante (decisão 1) absorve qualquer miss. brapi/B3 ficam como caminho de upgrade se "falso-FII" virar reclamação real. Default `11→FIIs` no backend é seguro porque agora há a UNIT_SET para as exceções **e** o override manual no front.

## Escopo do front vs backend

```
ESTE REPO (Angular)                         REPO GO (carteira-inteligente-api)
─────────────────────                       ─────────────────────────────────
[1] save() não bloqueia (paliativo)         [4] chartMeta.instrumentType (parar de descartar)
[2] detectAssetType: 11 desconhecido→null   [5] classificador tiered + ETF_SET/UNIT_SET
[3] StockQuote.assetType + uso no modal      [6] QuoteResponse.assetType no JSON
   (consome [6] quando existir)
```

Itens 1–3 entregam valor sozinhos (destravam units hoje). Itens 4–6 elevam de "não bloqueia / não chuta" para "classifica certo automaticamente" e tornam o backend a fonte única (o `ETF_TICKERS` do front vira fallback offline puro).

## Testes

- `asset-type.util.spec` (novo/ampliado): `TAEE11`/`SANB11`/`KLBN11` → `null` (não `FIIs`); `BOVA11`/`IVVB11` → `ETFs`; `VALE3`/`ITUB4` → `Acoes`; `MXRF11` → `null` (indeterminado, sem chute).
- Verificar `preco-teto.util.spec.ts` e outros consumidores: garantir que `null` não quebre quem esperava `FIIs`.
- Modal: cenário "digita TAEE11, escolhe Ações, salva" → salva sem erro, com aviso visível; cenário com `quote.assetType='Acoes'` → auto-fill em Ações.
- **Backend (Go):** teste de mesa do classificador — `BOVA11`(instrumentType ETF)→`ETFs`; `TAEE11`(EQUITY, em UNIT_SET)→`Acoes`; `HGLG11`/`MXRF11`(EQUITY, fora das listas)→`FIIs`; `VALE3`→`Acoes`; BDR/índice→`""`. Conferir que `assetType` aparece no JSON de `/quote` e `/quotes`.
