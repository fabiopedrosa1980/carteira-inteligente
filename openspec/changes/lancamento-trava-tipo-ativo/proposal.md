## Why

Na tela de Lançamentos, o "+ Adicionar" é sempre acionado **dentro de uma seção** (Ações/FIIs/ETFs), que pré-define o tipo do ativo. Mas o select de **Tipo de Ativo** continua editável: o usuário pode trocá-lo e o lançamento acaba aparecendo na **seção errada**. O tipo deve ficar **travado** quando já está definido pelo contexto.

## What Changes

- **Desabilitar o select "Tipo de Ativo"** no modal quando o tipo já está definido pelo contexto:
  - ao **adicionar a partir de uma seção** (tipo pré-definido), e
  - ao **editar** um lançamento existente (mudar o tipo o moveria de seção).
- O valor permanece visível (apenas não-editável). Indicação sutil de que o tipo vem da seção.

## Capabilities

### Added Capabilities
- `lancamento-tipo-travado`: o tipo de ativo do lançamento fica travado quando definido pelo contexto (seção de origem ou edição), evitando que o ativo caia na área errada.

## Impact

**Frontend (este repo):**
- `src/app/components/add-transaction-modal/add-transaction-modal.ts` — getter `isAssetTypeLocked` (`isEdit` ou `defaultAssetType` definido).
- `src/app/components/add-transaction-modal/add-transaction-modal.html` — `[disabled]` no select de tipo + nota.
- `src/app/components/add-transaction-modal/add-transaction-modal.scss` — estilo de select desabilitado (se necessário).

Sem backend.
