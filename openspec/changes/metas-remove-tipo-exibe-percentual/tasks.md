## 1. Backend — Remover tipo do domínio e DTO

- [x] 1.1 Em `internal/domain/goal.go`, remover os campos `Type` e `Ticker` do struct `Goal`
- [x] 1.2 Em `internal/adapters/http/dto/goal_dto.go`, remover `Type` e `Ticker` de `GoalRequest` (incluindo o binding `oneof`) e de `GoalResponse`; ajustar `GoalFromDomain`

## 2. Backend — Simplificar cálculo de progresso

- [x] 2.1 Em `goal_handler.go`, em `buildGoalResponses`, remover o `switch g.Type` e definir `currentValue = patrimonio` para todas as metas
- [x] 2.2 Remover os cálculos não utilizados de `rendaMensal`, `dyMap` e `avgMap` em `buildGoalResponses`
- [x] 2.3 Em `CreateGoal` e `UpdateGoal` (`goal_handler.go`), remover atribuições de `Type`/`Ticker` ao `domain.Goal`
- [x] 2.4 Em `internal/application/goal_service.go`, remover `existing.Type` e `existing.Ticker` de `UpdateGoal`

## 3. Backend — Migração das colunas legadas

- [x] 3.1 Em `internal/infrastructure/persistence/database.go`, após o `AutoMigrate`, executar best-effort `ALTER TABLE goals DROP COLUMN type` e `ALTER TABLE goals DROP COLUMN ticker` (ignorando erros)

## 4. Backend — Build e testes

- [x] 4.1 `go build ./...` sem erros
- [x] 4.2 Ajustar testes de goal que enviem `type`/`ticker` (se houver) e rodar `go test ./...`
- [x] 4.3 Commit e push em `carteira-inteligente-api`: `feat: remove tipo das metas, progresso sempre por patrimonio`

## 5. Frontend — Modelo e serviços

- [x] 5.1 Em `models/meta.model.ts`, remover `type`, `ticker` e o type `MetaType`
- [x] 5.2 Em `services/backend-api.service.ts`, remover `type` e `ticker` da interface `ApiGoal`
- [x] 5.3 Em `services/metas.service.ts`, remover o mapeamento de `type`/`ticker` no `load()`

## 6. Frontend — Componente de metas

- [x] 6.1 Em `goals.ts`, remover `formType`, `formTicker`, `typeOptions`, `iconFor`, `labelFor` e ajustar `openForm`/`saveMeta` (payload só com `name` e `targetValue`)
- [x] 6.2 Em `goals.html`, remover o seletor de Tipo e o campo Ticker do formulário
- [x] 6.3 Em `goals.html`, remover o selo de tipo (`meta-type-tag`) e usar ícone fixo (🎯) no card
- [x] 6.4 Garantir que o percentual de conclusão é sempre exibido no card (label e barra de progresso)
- [x] 6.5 Remover estilos órfãos de `meta-type-tag` em `goals.scss` (se aplicável)

## 7. Frontend — Build e deploy

- [x] 7.1 `npx ng build` sem erros de tipo
- [x] 7.2 Commit e push em `carteira-inteligente`: `feat: metas sem tipo e percentual sempre visivel na listagem`
- [ ] 7.3 Testar visualmente: criar meta só com nome e valor alvo; listagem mostra percentual sem selo de tipo
