## Why

Na aba "Meus Ativos" (tab `portfolio` do Dashboard), o resumo da carteira está concentrado num único bloco (`.ps-strip`) com hero + duas estatísticas, dificultando a leitura. Além disso, o card "Dividendos Hist." usa um cálculo simplificado (soma de **todos** os proventos × quantidade atual), divergindo do valor exibido na tela de Dividendos → Recebidos. E a listagem no mobile mostra 5 colunas, o que aperta o layout; o usuário quer apenas 4 colunas focadas.

## What Changes

- **Resumo em mais cards**: quebrar o bloco único de resumo (`.ps-strip`) em cards separados — Patrimônio Total, Investido, Ganho (R$), Variação (%) e Dividendos Recebidos — num grid responsivo, melhorando a leitura.
- **Renomear e recalcular "Dividendos Hist."**: trocar o rótulo para **"Dividendos Recebidos"** e calcular o valor com a **mesma lógica** da tela Dividendos → Recebidos (`DividendsSummaryComponent` em modo `received`): proventos do **ano corrente** já pagos (`pay_date < hoje`), somando `valor × cotas elegíveis` (lançamentos com data ≤ data-com).
- **Mobile: 4 colunas**: na listagem de "Meus Ativos" em mobile (≤640px), exibir apenas **Ativo, Qtde, Variação e Total** (Total = valor da posição, hoje exibido como "Saldo"), ocultando Preço Médio, Hoje e Rent.

## Capabilities

### New Capabilities
- `portfolio-resumo-cards`: Resumo da carteira em "Meus Ativos" apresentado como múltiplos cards de estatística (Patrimônio, Investido, Ganho, Variação, Dividendos Recebidos).
- `portfolio-dividendos-recebidos`: Card "Dividendos Recebidos" usa a mesma lógica de soma da tela Dividendos → Recebidos.
- `portfolio-lista-mobile-4-colunas`: Listagem de "Meus Ativos" no mobile exibe exatamente 4 colunas (Ativo, Qtde, Variação, Total).

### Modified Capabilities

## Impact

- `src/app/components/dashboard/dashboard.html` — bloco `.portfolio-summary`/`.ps-strip` reescrito em cards; rótulo "Dividendos Hist." → "Dividendos Recebidos".
- `src/app/components/dashboard/dashboard.scss` — novo grid de cards de resumo; media query da `.acoes-list` (≤640px) ajustada para 4 colunas.
- `src/app/components/dashboard/dashboard.ts` — `dividendosRecebidos()` recalculado conforme a lógica `computeReceived` (ano corrente, pagos, cotas elegíveis por data-com), reutilizando `transactionSvc.transactions()` e os proventos das ações.
- Sem mudanças de API ou modelo de dados.
