## Contexto

`DividendsSummaryComponent` calcula, por ativo, a quebra mensal e o total, nos modos `received` e `projected`. Hoje:
- `computeReceived`: proventos do ano corrente, elegíveis por lançamento (`date ≤ ex_date`), agregados por mês.
- `computeProjected`: proventos do **ano anterior** × cotas atuais, agregados por mês.

Os proventos (`ApiDividend`) têm `amount`, `month`, `year`, `ex_date` (data-com) e `pay_date`. Datas são strings ISO `YYYY-MM-DD`.

## Goals / Non-Goals

**Goals:**
- Recebidos = proventos do ano corrente já pagos (`pay_date` anterior a hoje), mantendo elegibilidade por data-com.
- Projetados = proventos do ano corrente ainda por vir (`ex_date` maior que hoje), no ano corrente (dinâmico).

**Non-Goals:**
- Alterar o detalhamento mensal/colapsável (apenas os filtros de data mudam o que entra nele).
- Backend, aba Histórico, ou a regra de multiplicação por cotas.

## Decisões

### 1. Data de referência "hoje" em horário local
Adicionar `todayStr` = data de hoje no formato `YYYY-MM-DD` construída a partir do horário local (ano/mês/dia locais), evitando o deslocamento de fuso do `toISOString()` (UTC). Comparações de data são feitas por string ISO.

### 2. Recebidos: filtro por `pay_date < hoje`
Em `computeReceived`, além da regra atual (ano corrente + elegibilidade por `ex_date`), descartar proventos sem `pay_date` anterior a `todayStr`. Ou seja, conta o provento somente se `pay_date` existir e `pay_date < todayStr` (já pago, até ontem).
- *Alternativa*: usar `ex_date` para "recebido". Rejeitada — o usuário confirmou usar a data de pagamento.

### 3. Projetados: ano corrente + `ex_date > hoje`
Em `computeProjected`, trocar `prevYear` por `currentYear` e contar somente proventos com `ex_date` existente e `ex_date > todayStr` (data-com ainda no futuro). Multiplicar por `total de cotas atuais` (como hoje).

### 4. Comportamento de borda
Um provento do ano corrente com data-com já passada (`ex_date ≤ hoje`) mas pagamento ainda no futuro (`pay_date ≥ hoje`) não entra em nenhuma das duas abas — é um estado "aguardando pagamento", fora do escopo deste ajuste. Documentado para clareza.

## Riscos / Trade-offs

- [Provento sem `pay_date`/`ex_date`] → não é contabilizado no respectivo modo (sem data não dá para classificar). Aceitável; os dados da API normalmente trazem essas datas.
- [Fuso horário] → mitigado calculando `todayStr` em horário local.

## Plano de Migração

1. Ajustar `computeReceived` e `computeProjected` no `.ts`.
2. `ng build` e validação visual nas duas abas.
3. Rollback: reverter o commit; mudança apenas de regra no front.

## Questões em Aberto

- Nenhuma. Datas confirmadas: Recebidos por `pay_date < hoje`; Projetados por `ex_date > hoje` no ano corrente.
