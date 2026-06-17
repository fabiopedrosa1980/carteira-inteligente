## Por que

Hoje a aba Dividendos Recebidos soma todos os proventos do ano corrente (mesmo os que ainda não foram pagos), e a aba Dividendos Projetados usa o ano anterior. O usuário quer que "Recebidos" reflita apenas o que já foi efetivamente pago até ontem, e que "Projetados" mostre os proventos ainda por vir no ano corrente (com data-com no futuro).

## O que muda

- **Dividendos Recebidos**: considerar apenas proventos do ano corrente cuja **data de pagamento (`pay_date`) é anterior à data de hoje** (até a data atual −1, ou seja, já pagos). Mantém a regra de elegibilidade por lançamento (data do lançamento ≤ data-com).
- **Dividendos Projetados**: passar a usar o **ano corrente** (dinâmico, não fixo em 2026) e considerar apenas proventos cuja **data-com (`ex_date`) é maior que a data de hoje** (ainda por vir), multiplicando pelo total de cotas atuais.
- O detalhamento mensal colapsável por ativo é mantido, agora refletindo os novos filtros.

## Capabilities

### Novas capabilities
<!-- Nenhuma; é um ajuste de regra da capability existente. -->

### Capabilities modificadas
- `dividendos-recebidos-projetados`: ajusta os critérios de data — Recebidos por `pay_date` anterior a hoje; Projetados por `ex_date` futuro no ano corrente.

## Impacto

- Front-end (Angular), repositório `carteira-inteligente`. Sem alteração de backend.
- `DividendsSummaryComponent` (`.ts`): ajuste de `computeReceived` (filtro por `pay_date < hoje`) e `computeProjected` (ano corrente + `ex_date > hoje`).
