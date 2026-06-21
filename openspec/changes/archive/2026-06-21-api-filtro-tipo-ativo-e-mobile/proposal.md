## Why

O endpoint `GET /api/v1/transactions/etfs` não existe no backend Go — `GetEtfsPositions` não foi implementado no repositório, serviço, handler nem no router. Com isso a seção ETFs do portfólio só exibe dados via fallback no frontend (sem preço atual, sem DY). Além disso, na visão em lista no mobile (≤640px) ainda aparece a coluna Rentabilidade, tornando a tela congestionada.

## What Changes

- **Go API**: adicionar `GET /api/v1/transactions/etfs` com o mesmo comportamento de `/acoes` e `/fiis` — agrega posições ETF do usuário, enriquece com cotação em tempo real via Yahoo Finance e calcula nota.
- **Go API**: propagar `GetEtfsPositions` por todas as camadas (repositório → serviço → handler → router).
- **Frontend**: sem mudança nas chamadas — `getEtfs()` já aponta para `/transactions/etfs`; a remoção do fallback `deriveEtfPositions` é opcional (pode ser mantido como segurança).
- **Mobile CSS**: ocultar coluna Rentabilidade (7ª) também no breakpoint ≤640px, deixando apenas Ativo e Saldo visíveis no mobile padrão.

## Capabilities

### New Capabilities

- `api-etfs-posicoes`: endpoint `GET /transactions/etfs` que retorna posições ETF do usuário com preço atual e nota, no mesmo formato de `/acoes` e `/fiis`.

### Modified Capabilities

- `acoes-list-view`: coluna Rentabilidade passa a ser ocultada em ≤640px (não apenas ≤480px como antes), alinhando o comportamento mobile padrão com a intenção de "mostrar só Ativo e Saldo no mobile".

## Impact

- `carteira-inteligente-api/internal/domain/transaction_repository.go` — interface
- `carteira-inteligente-api/internal/application/transaction_service.go` — interface + implementação
- `carteira-inteligente-api/internal/infrastructure/persistence/gorm_transaction_repository.go` — método `GetEtfsPositions`
- `carteira-inteligente-api/internal/adapters/http/handler/transaction_handler.go` — handler `GetEtfs`
- `carteira-inteligente-api/internal/adapters/http/router/router.go` — rota `GET /etfs`
- `carteira-inteligente/src/app/components/dashboard/dashboard.scss` — breakpoint ≤640px oculta nth-child(7)
