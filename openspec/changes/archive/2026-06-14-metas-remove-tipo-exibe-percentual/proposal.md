## Why

O conceito de "tipo" de meta (patrimônio / renda mensal / preço médio) adiciona complexidade desnecessária à tela de metas. O usuário quer uma experiência simples: toda meta acompanha o progresso do patrimônio total da carteira, exibindo sempre o percentual concluído na listagem.

## What Changes

- **BREAKING (API)**: removidos os campos `type` e `ticker` das metas no modelo, DTO e banco. Toda meta passa a calcular progresso como `patrimônio total ÷ valor alvo`
- Backend: `buildGoalResponses` deixa de ramificar por tipo — `currentValue` é sempre o patrimônio total; removidos os cálculos de renda mensal e preço médio
- Frontend: formulário de meta perde o seletor de Tipo e o campo Ticker; a listagem perde o selo de tipo
- A listagem de metas **sempre** exibe o percentual de conclusão de cada meta de forma destacada
- Migração: colunas legadas `type`/`ticker` da tabela `goals` são removidas de forma best-effort para não quebrar inserts (coluna `type` era `NOT NULL`)

## Capabilities

### New Capabilities
- `goals-without-type`: Metas sem tipo — progresso sempre baseado no patrimônio total da carteira, sem campos de tipo/ticker na UI e na API
- `goals-progress-percentage`: A listagem de metas exibe sempre o percentual de conclusão de cada meta

## Impact

- **Backend** (`carteira-inteligente-api`):
  - `internal/domain/goal.go`: remove campos `Type` e `Ticker`
  - `internal/adapters/http/dto/goal_dto.go`: remove `Type`/`Ticker` de `GoalRequest`/`GoalResponse` e `GoalFromDomain`
  - `internal/adapters/http/handler/goal_handler.go`: `buildGoalResponses` usa sempre patrimônio; `CreateGoal`/`UpdateGoal` sem type/ticker
  - `internal/application/goal_service.go`: `UpdateGoal` sem atribuição de type/ticker
  - `internal/infrastructure/persistence/database.go`: drop best-effort das colunas legadas `type`/`ticker`
- **Frontend** (`carteira-inteligente`):
  - `models/meta.model.ts`: remove `type`/`ticker` e `MetaType`
  - `services/backend-api.service.ts`: remove `type`/`ticker` de `ApiGoal`
  - `services/metas.service.ts`: remove mapeamento de type/ticker
  - `components/goals/goals.ts` e `goals.html`: remove seletor de tipo, campo ticker, selo de tipo; ícone fixo; percentual sempre visível
