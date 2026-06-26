## Why

A regra que valida o tipo no lançamento ainda decide por **heurística de sufixo** do ticker (`lancamento-ticker-valida-tipo`): sufixo 3–8 → Ações, sufixo 11 → FII/ETF. Essa heurística é ambígua e errada para o sufixo 11 — não distingue FII de ETF e não reconhece que **units de ação também terminam em 11** (TAEE11, SANB11). Agora a API Go expõe o **tipo autoritativo** do ativo (`assetType`, vindo do catálogo `b3_assets`), e mesmo quando o catálogo não conhece o ticker a cotação retorna o **nome**, que classifica o 11 com segurança (FII → "imobiliário/FII"; ETF → "índice/index/ishares"; demais → unit de ação). A validação precisa usar esses dados para permitir registrar cada ativo no seu **tipo correto** (Ações, FIIs e ETFs) e só bloquear divergências reais.

## What Changes

- A validação de tipo no salvamento passa a **resolver o tipo em tiers**, do mais confiável ao menos:
  1. **Catálogo da API Go** (`assetType` da cotação `/quote`) — fonte de verdade. Igual ao tipo escolhido → **permite**; divergente → **bloqueia** com mensagem clara.
  2. **Nome do ativo** (quando o catálogo não conhece o ticker, mas a cotação trouxe nome) — classifica o 11: nome com "imobiliário"/"FII" → FIIs; "índice"/"index"/"ishares"/"ETF" → ETFs; senão → **Ações (unit)**. Sufixo 3–8 → Ações.
  3. **Sufixo do ticker** (sem catálogo nem nome) — só 3–8 → Ações é sinal confiável; **11 fica indeterminado** (pode ser FII, ETF ou unit de ação) e **não bloqueia** nenhum tipo escolhido.
- A mensagem de incompatibilidade em tempo real (aviso ao digitar) usa a mesma resolução em tiers.
- Novo classificador por nome no front (`detectAssetTypeByName`) alimenta os tiers 2.
- **Validação também no backend Go (defesa em profundidade):** o `POST /api/v1/transactions` passa a checar o `asset_type` enviado contra o **catálogo `b3_assets`**. Quando o catálogo conhece o ticker e o tipo diverge → **rejeita** (HTTP 422) com mensagem clara; quando não conhece → aceita (conservador). Garante coerência mesmo que o cliente envie tipo errado.

## Capabilities

### New Capabilities
- `transacao-tipo-validado-backend`: a API Go valida o `asset_type` do lançamento contra o catálogo `b3_assets` na criação da transação, rejeitando divergências confirmadas.

### Modified Capabilities
- `lancamento-ticker-valida-tipo`: a validação de tipo passa a resolver o tipo em tiers (catálogo da API Go → nome do ativo → sufixo), com o catálogo como fonte de verdade e o nome desambiguando tickers 11 fora do catálogo; o sufixo puro só bloqueia ações 3–8.

## Impact

- **`add-transaction-modal.ts`** — `save()` (validação de tipo ~`:296-303`) e o getter de aviso `tickerTypeMismatch` passam a usar a resolução em tiers; guardam o `assetType` e o nome resolvidos da cotação para a checagem.
- **`asset-type.util.ts`** — novo `detectAssetTypeByName(ticker, name)` (tier 2) e um resolvedor em tiers reaproveitável; `detectAssetType` por sufixo permanece como tier 3.
- **`StockApiService` / `StockQuote`** — já expõem `assetType` e `name` (mudança `catalogo-ativos-b3`); sem alteração de contrato.
- **`carteira-inteligente-api` (repo Go)** — `transaction_handler.go`: `CreateTransaction` ganha checagem do `asset_type` contra `b3_assets` (injeta `AssetUseCase`); rejeita 422 em divergência confirmada. `UpdateTransaction` fica fora do escopo (não carrega o ticker no payload). Sem migração de dados.
- **Convive com `catalogo-ativos-b3`** (auto-fill por catálogo) e fecha o ciclo: além de sugerir o tipo, a validação passa a confiar no catálogo e no nome.
- **Não é recomendação de investimento** — apenas classifica e valida coerência ticker × tipo.
