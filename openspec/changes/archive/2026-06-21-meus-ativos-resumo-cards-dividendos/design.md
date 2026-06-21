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

### Dividendos Recebidos (`portfolio-dividendos-recebidos`) — CORRIGIDO

Diagnóstico do desencontro (1ª implementação): o card somava `svc.stocks()` (todas as classes: Ações + FIIs + ETFs, fonte `/stocks`) enquanto a tela Recebidos mostra **uma classe por vez** (`/transactions/acoes` ou `/transactions/fiis`). Além disso o card usava `d.year` estrito, sem o fallback `yearOf` da tela. Por isso nunca batia.

Restrições de dados descobertas:
- `acoes()` (lista do Dashboard) é montada de `getAcoes/getFiis/getEtfs` mas mapeia `dividends: []` — **não tem proventos**, só posição/`sector` correto (`Ações`/`FII`/`ETF`).
- `svc.stocks()` (`StockDataService`) **tem** proventos (`/stocks` + `getStockDividends`) mas **não tem** `quantity` e seu `sector` é o setor GICS (não a classe).

Decisão:
- Criar util puro compartilhado `src/app/models/dividends-received.util.ts` com `receivedForTicker(dividends, txOfTicker, todayStr, currentYear)` (e helpers `yearOf`/`monthOf` com fallback para `pay_date`). Mesma fórmula da tela: ano corrente, `pay_date` < hoje, `comDate = ex_date || pay_date`, `eligibleShares = Σ qty (t.date <= comDate)`, soma `amount × eligibleShares`.
- `DividendsSummaryComponent.computeReceived` passa a chamar o util (uma única implementação → garante paridade).
- `dashboard.dividendosRecebidos()`:
  - Escopo Ações + FIIs: montar conjunto de tickers permitidos a partir de `acoes()` onde `sector === 'Ações' || sector === 'FII'` (exclui ETF).
  - Proventos: vir de `svc.stocks()` (que os carrega via `getStockDividends`), filtrando aos tickers permitidos.
  - Cotas elegíveis: de `transactionSvc.transactions()` por ticker.
  - Total = Σ `receivedForTicker(...)` entre os tickers permitidos.
  - Tickers normalizados com `toUpperCase().trim()` (igual à tela).
- Observação: o card só aparece dentro de `*ngIf="!acoesLoading() && acoes().length > 0"`, então `acoes()` já está carregado quando o card é exibido.

### Layout dos cards de resumo (`portfolio-resumo-cards`) — ajuste
- Desktop: `.ps-cards` em **uma linha** → `grid-template-columns: repeat(5, 1fr)` (sem `auto-fit`, sem span do hero).
- Mobile (≤640px): **2 por linha** → `grid-template-columns: repeat(2, 1fr)`. O card hero (Patrimônio) ocupa a linha inteira no mobile (`grid-column: 1 / -1`) para destaque; os demais ficam 2 por linha.
- Remover o `grid-column: 1 / -1` global do hero (passa a valer só no mobile).

### Reload ao fechar o modal de lançamentos (`lancamentos-modal-reload-api`)
- Forçar releitura na API ao fechar o modal (add/edit/remove), reusando os métodos que refazem as chamadas HTTP:
  - `StockDataService.reload()` (reexpor público; refaz `/stocks` + `getStockDividends`).
  - `TransactionService.reload()` (já existe; refaz `/transactions`).
  - Dashboard `loadAtivos()` (refaz `getAcoes/getFiis/getEtfs/getTransactions`).
- Dashboard: trocar `(close)="showTxModal.set(false)"` por `(close)="closeTxModal()"`, onde `closeTxModal()` fecha o modal e chama `loadAtivos()` + `svc.reload()` + `transactionSvc.reload()`.
- Lançamentos (`MyAssetsComponent.closeModal()`): além de fechar, chamar `transactionSvc.reload()` + `stockData.reload()`. Em `remove()`, chamar os reloads após a exclusão.

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
