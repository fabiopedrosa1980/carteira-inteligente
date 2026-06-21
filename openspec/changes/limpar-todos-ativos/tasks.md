## 1. API Go — limpar todos os lançamentos

- [ ] 1.1 Adicionar handler e rota `DELETE /api/v1/transactions` que remove todos os lançamentos do usuário
- [ ] 1.2 Garantir idempotência (sucesso 2xx mesmo sem lançamentos) e persistência antes da resposta
- [ ] 1.3 Publicar/validar o endpoint no serviço Render (`carteira-inteligente-api.onrender.com`)

## 2. Frontend — serviço de limpeza

- [x] 2.1 Adicionar `deleteAllTransactions(): Observable<void>` em `BackendApiService` chamando `DELETE /transactions`
- [x] 2.2 Adicionar `clearAll()` em `TransactionService`: chama a API, no sucesso faz `_transactions.set([])` e `notifications.show(...)`

## 3. Tela de Lançamentos — botão "Limpar tudo"

- [x] 3.1 Adicionar botão "Limpar tudo" no header de `my-assets.html`, visível só quando `svc.transactions().length > 0`
- [x] 3.2 Adicionar handler `clearAll()` em `MyAssetsComponent` usando `ConfirmService` (mesma confirmação das exclusões individuais)
- [x] 3.3 Ao confirmar, chamar `svc.clearAll()` e `forceReload()`; ao cancelar, não fazer nada
- [x] 3.4 Estilizar o botão em `my-assets.scss` coerente com o header existente

## 4. Acordeão — total do tipo centralizado (web)

- [x] 4.1 Ajustar o cabeçalho do acordeão (`my-assets.html`/`scss`) para layout de 3 zonas: rótulo à esquerda, total ao centro, chevron à direita
- [x] 4.2 Aplicar a centralização apenas no breakpoint web, preservando o layout mobile atual

## 5. Modal — aviso ticker×tipo em tempo real

- [x] 5.1 Adicionar getter `tickerTypeMismatch` em `AddTransactionModalComponent` reutilizando `detectAssetType`/`assetTypeLabel` (tolerando FII×ETF e sufixo desconhecido)
- [x] 5.2 Exibir a mensagem abaixo do campo de ticker em `add-transaction-modal.html` quando houver incompatibilidade
- [x] 5.3 Garantir que a mensagem some ao corrigir ticker ou tipo, sem bloquear a digitação

## 6. Verificação

- [ ] 6.1 Testar limpeza com lançamentos e com carteira vazia (confirmar e cancelar)
- [ ] 6.2 Conferir o total centralizado na web e o layout mobile inalterado
- [ ] 6.3 Conferir o aviso ticker×tipo aparecendo/sumindo em tempo real
- [x] 6.4 Rodar `npx prettier --write` nos arquivos alterados
