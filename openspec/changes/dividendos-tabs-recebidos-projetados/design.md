## Contexto

A tela de Dividendos é o `DividendHistoryComponent`, renderizado pelo dashboard na aba "Dividendos" (`activeTab === 'calendar'`) quando há ações. Ele já consome:
- `BackendApiService.getAcoes()` → posições (`ticker`, `stock_id`, `total_quantity`, `transaction_count`);
- `BackendApiService.getStockDividends(stockId)` → proventos do ativo (`amount` por cota, `ex_date` = data-com, `pay_date`, `year`, `month`).

As transações do usuário estão em `TransactionService.transactions()` (`ticker`, `quantity`, `date` no formato `YYYY-MM-DD`). Todos os dados necessários para os cálculos já existem no front — não há mudança de backend.

## Goals / Non-Goals

**Goals:**
- Três abas na tela de Dividendos: Histórico, Recebidos, Projetados.
- Cálculo de Recebidos (ano atual, elegibilidade por data-com) e Projetados (ano anterior), com total geral e detalhamento por ativo.

**Non-Goals:**
- Alterar o backend ou o cálculo do histórico existente.
- Persistir os valores calculados (são derivados em tempo de exibição).

## Decisões

### 1. Componente container com abas
Criar `DividendsComponent` (`app-dividends`) com a barra de abas. A aba "Histórico de Dividendos" renderiza o `DividendHistoryComponent` atual (sem alterações de lógica). As abas "Recebidos" e "Projetados" renderizam um novo `DividendsSummaryComponent` com `@Input() mode: 'received' | 'projected'`. O dashboard passa a renderizar `<app-dividends>` no lugar de `<app-dividend-history>`.
- *Alternativa*: abas internas dentro do próprio `DividendHistoryComponent`. Rejeitada por inchar um componente já grande e misturar responsabilidades.

### 2. Fonte de dados do resumo
`DividendsSummaryComponent` busca as posições via `getAcoes()` e, para cada posição com `stock_id > 0`, os proventos via `getStockDividends(stock_id)` em paralelo (`forkJoin`). As cotas/datas vêm de `TransactionService.transactions()`. Mantém o mesmo padrão do histórico.

### 3. Fórmulas
Seja `anoAtual = new Date().getFullYear()`.

**Recebidos (ano atual):** para cada ativo, para cada provento com `year === anoAtual`:
```
cotasElegiveis = Σ tx.quantity  (tx.ticker == ativo E tx.date <= provento.ex_date)
recebido += provento.amount * cotasElegiveis
```
Total = soma sobre todos os ativos. Detalhe por ativo = soma por ativo.

**Projetados (base ano anterior):** para cada ativo:
```
totalPorCotaAnoAnterior = Σ provento.amount  (provento.year == anoAtual - 1)
cotasAtuais = Σ tx.quantity  (tx.ticker == ativo)   // todas as cotas
projetado += totalPorCotaAnoAnterior * cotasAtuais
```
Total = soma sobre todos os ativos.

### 4. Comparação de datas e fallback
Datas são strings ISO `YYYY-MM-DD`; comparação direta de string ou via `Date` funciona. Se `ex_date` estiver ausente em um provento, usar `pay_date` como data-com; se ambos ausentes, considerar todas as cotas atuais elegíveis para aquele provento. Tickers comparados de forma normalizada (uppercase + trim) para casar transações e posições.

### 5. Apresentação
Cada aba de resumo mostra: um card com o total geral (formatado em BRL via pipe `currency`) e uma tabela com `ticker`, cotas consideradas e valor do ativo. Estados de carregando e vazio (total R$ 0,00) tratados.

## Riscos / Trade-offs

- [Muitas chamadas `getStockDividends` em paralelo] → carteiras pessoais têm poucos ativos; `forkJoin` resolve bem. Mitigação futura: endpoint agregado.
- [Proventos sem `ex_date`] → fallback para `pay_date`/todas as cotas, documentado na decisão 4.
- [Divergência de ticker entre transações e posições] → normalização de ticker na comparação.

## Plano de Migração

1. Criar `DividendsSummaryComponent` e `DividendsComponent`.
2. Apontar o dashboard para `<app-dividends>`.
3. `ng build` e validação visual das três abas.
4. Rollback: reverter o commit; mudança apenas de UI.

## Questões em Aberto

- Nenhuma. As regras de cálculo foram confirmadas com o usuário (cotas elegíveis, data-com = `ex_date`, projeção pelo total/cota do ano anterior).
