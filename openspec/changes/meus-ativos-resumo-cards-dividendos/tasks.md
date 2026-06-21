## 1. Resumo da carteira em cards

- [x] 1.1 Em `dashboard.html`, substituir o bloco `.ps-strip` (hero + `.ps-secondary`) por um container de cards (`.ps-cards`) com cards individuais: Patrimônio Total (destaque), Investido, Ganho (R$), Variação (%) e Dividendos Recebidos.
- [x] 1.2 Em `dashboard.scss`, criar o grid `.ps-cards`/`.ps-card` responsivo (desktop multi-coluna; ≤640px reduz para 2 colunas, Patrimônio em linha inteira), sem rolagem horizontal.
- [x] 1.3 Manter cor por sinal (`.pos`/`.neg`) nos cards de Ganho e Variação usando `lucroTotal()`/`lucroPercent()`.
- [x] 1.4 Remover/ajustar estilos antigos `.ps-strip`, `.ps-hero`, `.ps-secondary` que ficarem sem uso.

## 2. Card "Dividendos Recebidos" com lógica da tela Recebidos

- [x] 2.1 Em `dashboard.html`, trocar o rótulo "Dividendos Hist." por "Dividendos Recebidos".
- [x] 2.2 Em `dashboard.ts`, reescrever `dividendosRecebidos()` replicando `computeReceived`: ano corrente, `payDate` existente e `< hoje` (data local), `comDate = exDate || payDate`, `eligibleShares` = soma das quantidades dos lançamentos do mesmo ticker com `t.date <= comDate`, acumulando `value * eligibleShares`; total = soma entre todos os ativos.
- [x] 2.3 Usar `transactionSvc.transactions()` e `svc.stocks()` (proventos via `stock.dividends`), normalizando tickers com `toUpperCase().trim()`.
- [ ] 2.4 (Opcional) Extrair a função pura para um util compartilhado entre dashboard e `DividendsSummaryComponent` para evitar divergência. — não feito (lógica replicada no computed).

## 3. Listagem mobile com 4 colunas

- [x] 3.1 Em `dashboard.scss`, na media query `@media (max-width: 640px)` da `.acoes-list`, ocultar Preço Médio(3), Hoje(4) e Rent.(7); manter Ativo(1), Qtd(2), Saldo(5) e Variação(6).
- [x] 3.2 Ajustar as larguras `.cl-*` para as 4 colunas visíveis e atualizar o comentário do mapeamento de colunas.

## 4. Verificação

- [x] 4.1 `npx prettier --write "src/app/components/dashboard/dashboard.html" "src/app/components/dashboard/dashboard.scss" "src/app/components/dashboard/dashboard.ts"`.
- [x] 4.2 `ng build` sem erros.
- [ ] 4.3 Validar no desktop: resumo em cards, Patrimônio em destaque, 7 colunas na tabela.
- [ ] 4.4 Validar no mobile (≤640px): cards reorganizados sem scroll; tabela com exatamente 4 colunas (Ativo, Qtde, Variação, Total).
- [ ] 4.5 Validar que o valor de "Dividendos Recebidos" coincide com o total da tela Dividendos → Recebidos.
- [x] 4.6 Commit e push (`feat: resumo de Meus Ativos em cards, Dividendos Recebidos e 4 colunas no mobile`).
