## Why

Na tela de Lançamentos, a tabela detalhada hoje não tem ordenação padrão (`sortField = null`), exibindo os lançamentos na ordem que vêm da API. O usuário quer que os ativos venham **sempre ordenados por ticker** por padrão, facilitando achar um ativo.

## What Changes

- Definir a **ordenação padrão da tabela de Lançamentos por ticker (A→Z)**: `sortField` inicia em `'ticker'` (ascendente).
- O usuário continua podendo reordenar por outras colunas (Data, Qtd, Preço, Total); a única mudança é o estado inicial.
- A visão agrupada já é ordenada por ticker — sem mudança.

## Capabilities

### Modified Capabilities
- `lancamentos-agrupar-ticker`: a tabela de Lançamentos passa a ter ordenação padrão por ticker (A→Z).

## Impact

**Frontend (este repo):**
- `src/app/components/my-assets/my-assets.ts` — `sortField` inicia `'ticker'` (em vez de `null`).

Mudança de uma linha; `sortRows` já trata o caso `'ticker'`. Sem backend.
