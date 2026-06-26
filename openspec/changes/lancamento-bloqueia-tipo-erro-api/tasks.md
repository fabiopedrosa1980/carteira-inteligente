## 1. Tratamento de erro no serviço

- [x] 1.1 Adicionar `onError?: (msg: string) => void` a `TransactionService.add()` e `update()`
- [x] 1.2 Adicionar o ramo `error` no `subscribe` de ambos, chamando `onError` com a mensagem extraída
- [x] 1.3 Criar helper `extractApiError(err)` (tenta `error.error.error` → `error.message` → fallback genérico)

## 2. Surface no modal

- [x] 2.1 Em `save()`, passar `onError` para `svc.add/update`: `saving.set(false)`, `errors.ticker = msg`, não emitir `close`
- [x] 2.2 Garantir que o sucesso (`onDone`) continua fechando o modal
- [x] 2.3 Confirmar que a validação por ticker (resolução em tiers) já bloqueia nas seções de tipo travado antes do envio

## 3. Verificação

- [ ] 3.1 Verificar no app: abrir pela seção "Ações", informar MXRF11 → bloqueio local (sem chamar API)
- [ ] 3.2 Simular 422 (ex.: corrida) → mensagem da API aparece e o modal permanece aberto
- [ ] 3.3 Verificar que um lançamento válido continua salvando e fechando o modal
- [x] 3.4 `npx prettier --write` nos arquivos alterados e `ng build` sem erros
