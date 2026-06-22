## 1. Cálculo (util puro)

- [x] 1.1 Criar `src/app/models/allocation.util.ts` com `allocationByClass(stocks)` → saldo e % por classe (Acoes/FIIs/ETFs), usando `saldo()` e desconsiderando posições sem saldo válido.
- [x] 1.2 Adicionar `deviations(atual, alvos, patrimonio, tolerancia)` → por classe: desvio (pp), montante R$ para convergir, status `abaixo|acima|no-alvo`. Aporte e venda com peso igual (sem IR).
- [x] 1.3 Adicionar `concentrations(stocks, patrimonio, limite)` → ativos com `saldoPct > limite`, com percentual.
- [x] 1.4 Cobrir o util com testes (%/classe, soma 100, carteira vazia, desvios abaixo/acima/no-alvo, concentração presente/ausente).

## 2. Configuração (alvos + limite, backend)

- [x] 2.1 `BackendApiService`: adicionar `getAllocation()` e `updateAllocation(payload)` contra `GET/PUT /api/v1/allocation` (`{ targets:{Acoes,FIIs,ETFs}, concentrationLimit }`), com `catchError` para degradar a defaults.
- [x] 2.2 Criar `AllocationService` (signals): `targets` + `concentrationLimit`; `load()` (GET, aplica defaults em erro/vazio), `save()` (PUT). Defaults: Ações 50 / FIIs 40 / ETF 10; limite 20; tolerância 2pp.

## 3. Exibição — card de Alocação

- [x] 3.1 Criar o card "Alocação" no topo da aba Meus Ativos (dashboard): barras por classe (% atual + marca do alvo), desvio + R$ para rebalancear, chips de status (aportar/reduzir/no-alvo). Estado vazio quando sem saldo.
- [x] 3.2 Adicionar o bloco de **concentração**: lista de ativos acima do limite com percentual; oculto quando não há concentração.
- [x] 3.3 Edição dos alvos por classe e do limite (inline/modal); ao salvar, `AllocationService.save()` e recálculo. Aviso leve quando os alvos não somam 100%.

## 4. Verificação

- [x] 4.1 Rodar `ng build` e validar: %/desvios corretos, concentração sinalizada, estado vazio, card no topo sem quebrar a lista, degradação a defaults quando o backend não responde.
- [x] 4.2 Commit e push seguindo o fluxo do projeto (stage de arquivos específicos).

## 5. Dependência externa (backend — outro repo, não bloqueia este apply)

- [ ] 5.1 Implementar `GET/PUT /api/v1/allocation` no backend Go (repo separado). Até lá, o frontend opera com defaults; a persistência fica pendente.
