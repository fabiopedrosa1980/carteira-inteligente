## 1. Resumo da carteira em cards

- [x] 1.1 Em `dashboard.html`, substituir o bloco `.ps-strip` por cards individuais (`.ps-cards`/`.ps-card`): Patrimônio Total (destaque), Investido, Ganho (R$), Variação (%) e Dividendos Recebidos.
- [x] 1.2 Em `dashboard.scss`, criar o grid `.ps-cards`/`.ps-card`.
- [x] 1.3 Manter cor por sinal (`.pos`/`.neg`) nos cards de Ganho e Variação.
- [x] 1.4 Remover estilos antigos `.ps-strip`, `.ps-hero`, `.ps-secondary`.

## 2. Card "Dividendos Recebidos" — CORRIGIR p/ bater com a tela Recebidos

- [x] 2.1 Em `dashboard.html`, rótulo "Dividendos Hist." → "Dividendos Recebidos".
- [x] 2.2 Criar util puro `src/app/models/dividends-received.util.ts`: `receivedForTicker`/`receivedByMonth` + `yearOf`/`monthOf` com fallback para `pay_date` (mesma fórmula da tela).
- [x] 2.3 Refatorar `DividendsSummaryComponent.computeReceived` para usar o util compartilhado (implementação única).
- [x] 2.4 Reescrever `dashboard.dividendosRecebidos()`: escopo Ações + FIIs (tickers de `acoes()` com `sector` Ações/FII), proventos de `svc.stocks()`, cotas de `transactionSvc.transactions()`, normalizando tickers; total = Σ `receivedForTicker`.
- [x] 2.5 Remover do `dashboard.ts` o cálculo antigo (estrito por `year`) e o `localDateStr` duplicado (migrado para o util).

## 3. Listagem mobile com 4 colunas

- [x] 3.1 Em `dashboard.scss`, ocultar Preço Médio(3), Hoje(4) e Rent.(7); manter Ativo(1), Qtd(2), Saldo(5) e Variação(6).
- [x] 3.2 Ajustar larguras `.cl-*` para as 4 colunas e atualizar o comentário.

## 4. Layout dos cards: 1 linha no desktop, 2 por linha no mobile

- [x] 4.1 Em `dashboard.scss`, `.ps-cards` desktop = `repeat(5, 1fr)` (uma linha); remover o `grid-column: 1 / -1` global do hero.
- [x] 4.2 Media query ≤640px: `.ps-cards` = `repeat(2, 1fr)` e `.ps-card-hero { grid-column: 1 / -1 }` (hero em linha inteira no mobile).

## 5. Reload forçado ao fechar o modal de lançamentos

- [x] 5.1 Reexpor `StockDataService.reload()` público (refaz `/stocks` + dividendos).
- [x] 5.2 Dashboard: criar `closeTxModal()` que fecha o modal e chama `loadAtivos()` + `svc.reload()` + `transactionSvc.reload()`; trocar `(close)="showTxModal.set(false)"` por `(close)="closeTxModal()"`.
- [x] 5.3 `MyAssetsComponent`: injetar `StockDataService`; em `closeModal()` chamar `transactionSvc.reload()` + `stockData.reload()`; em `remove()` chamar os reloads após a exclusão.

## 6. Verificação

- [x] 6.1 `npx prettier --write` nos arquivos alterados.
- [x] 6.2 `ng build` sem erros.
- [ ] 6.3 Desktop: cards em uma linha; tabela com 7 colunas.
- [ ] 6.4 Mobile (≤640px): cards 2 por linha; tabela com 4 colunas (Ativo, Qtde, Variação, Total).
- [ ] 6.5 Valor de "Dividendos Recebidos" = Recebidos(Ações) + Recebidos(FIIs) da tela Dividendos.
- [ ] 6.6 Fechar o modal de lançamentos (add/edit/remove) refaz as chamadas à API e atualiza a tela.
- [x] 6.7 Commit e push.
