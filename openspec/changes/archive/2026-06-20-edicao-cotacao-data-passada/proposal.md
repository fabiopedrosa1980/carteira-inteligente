## Why

No modal, o preenchimento do preço pela cotação histórica (data anterior a hoje) só funciona ao **adicionar** um lançamento. Na **edição**, está bloqueado (`onDateChange` retorna cedo quando `isEdit`), para preservar o preço registrado. Mas o usuário quer, ao **editar** um lançamento e mudar a data para uma **data passada**, que o preço seja buscado na cotação **daquela data** — útil ao corrigir a data de uma operação antiga.

## What Changes

- No modal de **edição**, ao alterar a data para uma **data anterior a hoje**, buscar a cotação de fechamento daquela data e preencher o preço (mesmo fluxo já usado na adição, via `?date=`).
- Manter a proteção de **edição manual**: se o usuário digitou um preço à mão, a cotação não o sobrescreve.
- Para data **igual a hoje ou futura** em modo edição, **não** alterar o preço automaticamente (preserva o registrado).
- Indicar a data de referência da cotação ("Cotação de DD/MM/AAAA"), como na adição.

## Capabilities

### Modified Capabilities
- `lancamento-preco-na-data`: o modo edição passa a buscar/preencher o preço pela data quando a data informada é anterior a hoje (antes, edição nunca auto-preenchia).

## Impact

**Frontend (este repo):**
- `src/app/components/add-transaction-modal/add-transaction-modal.ts` — `onDateChange` deixa de retornar cedo em `isEdit`; em edição, dispara a busca apenas para data passada.

Sem mudança de backend (o endpoint `?date=` já existe).
