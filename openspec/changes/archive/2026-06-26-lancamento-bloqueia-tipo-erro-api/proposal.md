## Why

A API Go já rejeita lançamentos com tipo incompatível com o catálogo (`POST /api/v1/transactions` → **HTTP 422**, mudança `lancamento-valida-tipo-catalogo`). Mas o frontend **não trata o erro**: `TransactionService.add()`/`update()` não têm handler de `error` no `subscribe`. Resultado: quando a API rejeita (ex.: adicionar um FII na seção de Ações, ou um ticker que o catálogo do front ainda não resolveu por causa de cotação lenta), o spinner do modal trava, o modal não fecha e **nada é mostrado** ao usuário. Nas seções de Lançamentos (tipo travado pela seção), isso é o caminho mais comum de erro, e hoje ele falha em silêncio.

## What Changes

- **Tratar o erro da API no envio do lançamento:** `TransactionService.add()`/`update()` passam a propagar o erro (`HttpErrorResponse`) por um callback `onError(msg)`, extraindo a mensagem do corpo (`{"error": "..."}`) da resposta 422.
- **Modal surfaceia o erro e mantém aberto:** ao receber `onError`, o modal para o spinner (`saving=false`), exibe a mensagem em `errors.ticker` (campo já renderizado) e **não fecha**, deixando o usuário corrigir.
- **Validar o ticker antes de enviar nas seções (tipo travado):** ao informar o ticker numa seção com tipo travado, o modal consulta o ticker (cotação/catálogo) e, se o tipo resolvido divergir do tipo da seção, **bloqueia o salvamento** com mensagem clara — o 422 da API vira a rede de segurança para corridas (cotação ainda não resolvida).

## Capabilities

### New Capabilities
- `lancamento-erro-tipo-api`: o lançamento trata o erro da API (422 de tipo incompatível), exibindo a mensagem no modal e mantendo-o aberto; nas seções com tipo travado, a validação por ticker bloqueia antes do envio.

### Modified Capabilities
<!-- nenhuma (evita colidir com a delta ainda não arquivada de lancamento-ticker-valida-tipo) -->

## Impact

- **`transaction.service.ts`** — `add()`/`update()` ganham `onError?: (msg: string) => void` e handler `error` no `subscribe`; helper para extrair a mensagem do `HttpErrorResponse`.
- **`add-transaction-modal.ts`** — `save()` passa `onError` para `svc.add/update`: `saving=false`, `errors.ticker = msg`, modal permanece aberto. Garante que a validação por ticker (resolução em tiers já existente) rode também nas seções travadas.
- **`backend-api.service.ts`** — `createTransaction`/`updateTransaction` já retornam o `Observable` que emite erro em 422; sem mudança de contrato (apenas consumir o erro).
- **Sem mudança no backend Go** — o 422 já existe.
- **Não é recomendação de investimento** — apenas valida coerência ticker × tipo e comunica o erro.
