## Context

O dashboard já calcula `patrimonioTotal` e `groupSaldo(classe)` a partir de `saldo()` das posições em `acoes()`. A classe vive em `Stock.sector` ('Ações' | 'FII' | 'ETF') — **atenção: é a classe, não o setor econômico** (o setor real só existe solto em `company_info`, fora de escopo). Padrões a reusar: util puro testável (`preco-teto.util.ts`), serviço com signals (`PrecoTetoConfigService`), e o backend já tem o padrão `goals` (GET/PUT/POST/DELETE) que o `/allocation` espelha.

## Goals / Non-Goals

**Goals:**
- Visão de carteira por classe: % atual vs alvo, desvio e R$ para rebalancear.
- Alerta de concentração por ativo acima de um limite.
- Card no topo de Meus Ativos; alvos/limite persistidos no backend.

**Non-Goals:**
- Alocação por **setor econômico** (dado frágil em `company_info`) — fica para v2.
- Lógica **fiscal** (IR sobre venda) — v1 trata aporte e venda com peso igual.
- Recomendação automática de compra/venda — o usuário define o alvo; o app só compara.
- Watchlist / ativos fora da carteira.

## Decisions

- **Granularidade = classe + concentração por ativo.** Ambos usam `saldo()`/`patrimonioTotal`, já carregados. Setor econômico fora do v1.
- **Util puro `allocation.util.ts`:**
  - `allocationByClass(stocks)` → `{ Acoes, FIIs, ETFs }` em R$ e em %.
  - `deviations(atualPct, alvos, patrimonio, tolerancia)` → por classe: desvio (pp), montante R$ para convergir, e status `abaixo | acima | no-alvo`.
  - `concentrations(stocks, patrimonio, limite)` → ativos com `saldoPct > limite`.
  - Mapear classe via `Stock.sector` ('Ações'→Acoes, 'FII'→FIIs, 'ETF'→ETFs), reusando o espírito de `classeFromSector`.
- **Rebalanceamento aporte = venda (sem IR).** O montante é simplesmente `(alvoPct − atualPct) × patrimônio`; sinal define aporte (negativo→aportar) ou redução (positivo→reduzir). Sem ponderação fiscal.
- **`AllocationService`** com signals: `{ targets: {Acoes, FIIs, ETFs}, concentrationLimit }`. `load()` chama `GET /allocation`; `save()` chama `PUT`. Defaults aplicados quando o backend não responde ou não há config. Defaults: Ações 50 / FIIs 40 / ETF 10; limite 20%; tolerância "no alvo" 2pp.
- **`BackendApiService`**: `getAllocation()` (catchError → null/observable vazio, para degradar a defaults) e `updateAllocation(payload)`.
- **UI — card no topo de Meus Ativos:** barras por classe (% atual, marca do alvo), desvio + R$, chips de status; bloco de concentração; botão "Editar" abrindo edição inline/modal dos alvos e limite. Estado vazio quando não há saldo.
- **Persistência = backend (`/allocation`).** Escolha explícita do usuário (em vez de localStorage). Como o backend é outro repo, o contrato é capturado em `backend-allocation-endpoint`; o frontend degrada a defaults até o endpoint existir.

## Risks / Trade-offs

- [Endpoint `/allocation` ainda não existe no backend Go] → Persistência fica pendente; frontend funciona com defaults em memória e grava "no vácuo" (PUT falha silenciosamente) até o endpoint subir. Documentado como dependência externa.
- [Alvos podem não somar 100%] → A UI deve avisar, mas o cálculo de desvio funciona mesmo assim (cada classe comparada ao seu alvo). v1: aviso leve, não bloqueia.
- [Patrimônio inclui ETFs sem cotação (saldo null)] → Desconsiderados do total; coerente com `saldo()` retornando null.
- [Sem IR no rebalanceamento] → Pode sugerir venda fiscalmente cara; aceitável por decisão de escopo (peso igual). Possível evolução v2.

## Migration Plan

Feature aditiva: sem migração de dados. Sem config salva (ou backend indisponível), aplicam-se os defaults. Rollback = ocultar o card; util e service não afetam fluxos existentes.

## Open Questions

- Edição dos alvos: inline no card vs modal dedicado (decisão de UI na implementação).
- v2: alocação por setor econômico (depende de estruturar `company_info`) e rebalanceamento fiscal-aware (IR de Ações/FIIs).
