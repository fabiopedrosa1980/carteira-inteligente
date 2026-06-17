## 1. Data de referência

- [x] 1.1 Adicionar `todayStr` (`YYYY-MM-DD` em horário local) no `DividendsSummaryComponent`

## 2. Recebidos (pay_date < hoje)

- [x] 2.1 Em `computeReceived`, contabilizar apenas proventos com `pay_date` existente e `pay_date < todayStr`
- [x] 2.2 Manter a regra de elegibilidade por data-com (`lançamento.date ≤ ex_date`) e a agregação mensal

## 3. Projetados (ano corrente, ex_date > hoje)

- [x] 3.1 Em `computeProjected`, usar `currentYear` (dinâmico) no lugar de `prevYear`
- [x] 3.2 Contabilizar apenas proventos com `ex_date` existente e `ex_date > todayStr`
- [x] 3.3 Manter multiplicação por total de cotas atuais e a agregação mensal
- [x] 3.4 Ajustar o subtítulo da aba Projetados para refletir "proventos por vir no ano corrente"

## 4. Verificação

- [x] 4.1 `npx ng build` sem erros
- [x] 4.2 Validar: Recebidos só mostra proventos já pagos; Projetados só mostra data-com futura do ano corrente; totais e meses coerentes
- [x] 4.3 `npx prettier --write` nos arquivos alterados
- [x] 4.4 Commit e push seguindo Conventional Commits
