## Why

No modal de lançamento (adição e edição), o seletor de data permite escolher **datas futuras**, o que não faz sentido para uma operação de compra/venda já ocorrida — e ainda dispara cálculos/cotação incoerentes. A data deve ser **no máximo hoje**.

## What Changes

- Limitar o seletor de data do modal (adição e edição) a **no máximo hoje** (`max = hoje`), bloqueando datas futuras no calendário.
- **Validar no salvar**: rejeitar data futura com mensagem de erro, como defesa caso o valor seja digitado/contornado.

## Capabilities

### Added Capabilities
- `lancamento-data-maxima`: a data do lançamento não pode ser futura (limite máximo = hoje), no calendário e na validação.

## Impact

**Frontend (este repo):**
- `src/app/components/add-transaction-modal/add-transaction-modal.html` — atributo `[max]` no input de data.
- `src/app/components/add-transaction-modal/add-transaction-modal.ts` — `maxDate` (hoje, local) e validação de data futura no `save()`.

O mesmo componente serve adição e edição (`isEdit`), então a trava vale para os dois. Sem backend.
