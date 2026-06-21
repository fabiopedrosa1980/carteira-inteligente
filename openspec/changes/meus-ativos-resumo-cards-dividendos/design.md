## Context

A aba "Meus Ativos" é o bloco `activeTab === 'portfolio'` em `dashboard.html`. O resumo (`.portfolio-summary` → `.ps-strip`) é um grid `3fr 2fr`: à esquerda o hero (Patrimônio Total + Ganho + Variação) e à direita `.ps-secondary` com Investido e "Dividendos Hist.". A listagem é a tabela `.acoes-list` (7 colunas) dentro de acordeões por grupo.

Cálculos atuais em `dashboard.ts`:
- `patrimonioTotal`, `valorInvestido`, `lucroTotal`, `lucroPercent` via helpers de `position.util` (`saldo`, `custo`).
- `dividendosRecebidos` (simplificado): soma de **todos** os proventos × `quantity` atual, sem filtrar ano nem data de pagamento.

A tela Dividendos → Recebidos (`DividendsSummaryComponent`, modo `received`) já tem a lógica correta em `computeReceived`: por ativo, para proventos do ano corrente com `pay_date < hoje`, soma `amount × cotas elegíveis`, onde elegíveis são os lançamentos com `t.date <= ex_date`.

## Goals / Non-Goals

**Goals:**
- Resumo da carteira em múltiplos cards num grid responsivo.
- Card "Dividendos Recebidos" com valor idêntico à lógica da tela Recebidos.
- Mobile: tabela com 4 colunas (Ativo, Qtde, Variação, Total/Saldo).

**Non-Goals:**
- Não alterar a tela Dividendos → Recebidos.
- Não mudar API, modelos, ordenação nem paginação da tabela.
- Não alterar o comportamento do desktop na tabela (mantém 7 colunas).

## Decisions

### Resumo em cards (`portfolio-resumo-cards`)
- Substituir `.ps-strip` (hero + secondary) por um container `.ps-cards` com `display: grid` e cards individuais (`.ps-card`): Patrimônio Total (destaque, ex.: `grid-column: span 2` ou fonte maior), Investido, Ganho (R$), Variação (%), Dividendos Recebidos.
- Grid responsivo: desktop `repeat(auto-fit, minmax(...))` ou colunas fixas; mobile (≤640px) reduz para 2 colunas (e Patrimônio ocupando a linha inteira). Sem rolagem horizontal.
- Ganho/Variação mantêm classes `.pos`/`.neg` para cor por sinal (reaproveitar `lucroTotal()`/`lucroPercent()`).

### Dividendos Recebidos (`portfolio-dividendos-recebidos`)
- Renomear o rótulo no HTML para "Dividendos Recebidos".
- Reescrever `dividendosRecebidos()` em `dashboard.ts` replicando `computeReceived`:
  - `currentYear = new Date().getFullYear()`; `todayStr` em horário local (YYYY-MM-DD).
  - Para cada stock da carteira: filtrar transações do mesmo ticker (`transactionSvc.transactions()`), e para cada provento (`stock.dividends`) com `year === currentYear` e `payDate` existente e `< todayStr`:
    - `comDate = exDate || payDate`
    - `eligibleShares = soma das quantidades dos lançamentos com t.date <= comDate`
    - acumular `value * eligibleShares`.
  - Total = soma entre todos os ativos.
- Observação de fidelidade: o `Stock` mapeado em `StockDataService` já expõe `dividends[].exDate/payDate/year/value`. Usar `value` (equivalente a `amount`). Normalizar tickers com `toUpperCase().trim()` como na tela Recebidos.
- Reutilização: opcionalmente extrair a função pura para um util compartilhado; mínimo viável é replicar a lógica no `computed` do dashboard (mesma fórmula).

### Mobile 4 colunas (`portfolio-lista-mobile-4-colunas`)
- Colunas atuais (1→7): Ativo, Qtd, Preço Médio, Hoje, Saldo, Variação, Rent.
- Hoje (≤640px) oculta 4 e 6; manter Ativo, Qtd, Preço, Saldo, Rent (5 colunas).
- Novo: ocultar **Preço Médio(3), Hoje(4) e Rent.(7)**; manter **Ativo(1), Qtd(2), Saldo(5)=Total, Variação(6)**.
- Atualizar os `nth-child` ocultos e as larguras `.cl-*` (ex.: Ativo 30%, Qtd 16%, Saldo 28%, Variação 26%) para 4 colunas, e comentário explicando o mapeamento.
- "Total" é o valor da posição (coluna Saldo); o cabeçalho permanece "Saldo" no desktop (apenas o conjunto exibido no mobile muda). Caso se queira o texto "Total" no mobile, é ajuste de rótulo posterior.

## Risks / Trade-offs

- "Total" vs "Saldo": assume-se Total = Saldo (valor da posição). Se o usuário quiser uma coluna distinta, será necessário revisitar.
- Replicar `computeReceived` no dashboard duplica lógica com `DividendsSummaryComponent`; risco de divergência futura. Mitigação possível: extrair util compartilhado (decisão aberta na implementação).
- A tela Recebidos calcula por classe (Ações/FIIs separadamente) carregando posições do backend; o dashboard soma sobre `stocks()` já carregados. Os números devem coincidir desde que a base de proventos/lançamentos seja a mesma; validar visualmente comparando o total do card com a soma da tela Recebidos.
