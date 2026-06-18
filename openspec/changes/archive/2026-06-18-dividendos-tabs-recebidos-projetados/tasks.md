## 1. Componente container de Dividendos

- [x] 1.1 Criar `DividendsComponent` (`app-dividends`) com barra de três abas: Histórico, Recebidos, Projetados (padrão: Histórico)
- [x] 1.2 Aba Histórico renderiza o `DividendHistoryComponent` existente (sem mudança de lógica)
- [x] 1.3 Apontar o dashboard (aba "Dividendos") para `<app-dividends>` no lugar de `<app-dividend-history>`, preservando o estado vazio

## 2. Componente de resumo (Recebidos/Projetados)

- [x] 2.1 Criar `DividendsSummaryComponent` com `@Input() mode: 'received' | 'projected'`
- [x] 2.2 Carregar posições via `getAcoes()` e proventos por ativo via `getStockDividends` em paralelo (`forkJoin`)
- [x] 2.3 Obter cotas/datas das transações via `TransactionService.transactions()` (normalizando ticker)

## 3. Cálculos

- [x] 3.1 Recebidos: para cada provento do ano atual, somar `amount × cotas elegíveis` (lançamentos com `date ≤ ex_date`)
- [x] 3.2 Projetados: para cada ativo, `total_por_cota_do_ano_anterior × total de cotas atuais`
- [x] 3.3 Fallback de data-com: usar `pay_date` se `ex_date` ausente; todas as cotas se ambos ausentes
- [x] 3.4 Calcular total geral e detalhamento por ativo em cada modo

## 4. Apresentação

- [x] 4.1 Card com total geral formatado em BRL (pipe `currency`)
- [x] 4.2 Tabela por ativo (ticker, cotas consideradas, valor)
- [x] 4.3 Estados de carregando e vazio (total R$ 0,00)
- [x] 4.4 Estilos consistentes com o tema (variáveis de cor)

## 5. Verificação

- [x] 5.1 `npx ng build` sem erros
- [x] 5.2 Validar manualmente: Histórico inalterado; Recebidos respeita data-com; Projetados usa ano anterior; totais somam corretamente
- [x] 5.3 `npx prettier --write` nos arquivos alterados
- [x] 5.4 Commit e push seguindo Conventional Commits
