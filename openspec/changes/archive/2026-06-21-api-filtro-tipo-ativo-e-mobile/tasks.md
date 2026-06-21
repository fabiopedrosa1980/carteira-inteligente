# Tasks: api-filtro-tipo-ativo-e-mobile

## Go API — `carteira-inteligente-api`

### domain/transaction_repository.go

- [x] Adicionar `GetEtfsPositions(userID string) ([]*AcoesPosition, error)` à interface `TransactionRepository`

### application/transaction_service.go

- [x] Adicionar `GetEtfsPositions(userID string) ([]*domain.AcoesPosition, error)` à interface `TransactionUseCase`
- [x] Implementar `GetEtfsPositions` em `TransactionService`: `return s.repo.GetEtfsPositions(userID)`

### infrastructure/persistence/gorm_transaction_repository.go

- [x] Adicionar método `GetEtfsPositions(userID string) ([]*domain.AcoesPosition, error)` que chama `r.aggregatePositions(userID, domain.AssetTypeETFs)`

### adapters/http/handler/transaction_handler.go

- [x] Adicionar handler `GetEtfs` que chama `h.respondPositions(c, h.service.GetEtfsPositions)`

### adapters/http/router/router.go

- [x] Adicionar rota `transactions.GET("/etfs", transactionHandler.GetEtfs)` após a rota `/fiis`

## Frontend Angular — `carteira-inteligente`

### dashboard.scss

- [x] No bloco `@media (max-width: 640px)` da `.acoes-list`, adicionar ocultação de `th:nth-child(7), td:nth-child(7)` e `width: 0` para `.cl-rent`, ajustando `.cl-ativo: 60%` e `.cl-saldo: 40%`
- [x] Remover o bloco `@media (max-width: 480px)` adicionado na change `meus-ativos-resumo-financeiro` (torna-se redundante)
