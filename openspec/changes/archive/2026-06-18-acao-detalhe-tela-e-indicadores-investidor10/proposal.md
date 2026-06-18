## Why

O detalhe da ação foi entregue como um modal sobreposto, mas uma tela cheia (in-page) é mais confortável para ler preço, indicadores e histórico de proventos. E os indicadores fundamentalistas foram implementados na API Go via Status Invest, fonte que costuma bloquear scraping de servidor; o Investidor10 — já usado e funcional no projeto para dividendos — é uma fonte mais confiável para os indicadores.

## What Changes

- **Frontend:** transformar o detalhe da ação de **modal** para **tela normal** (in-page) dentro da aba Minhas Ações: ao clicar no card, a lista dá lugar à tela de detalhes com um botão "Voltar"; sem overlay.
- **Backend Go:** obter os **indicadores fundamentalistas** (P/L, P/VP, DY, ROE, Payout) do **Investidor10** em vez do Status Invest, estendendo o scraper já existente; remover o uso do scraper do Status Invest.

## Capabilities

### New Capabilities
<!-- Nenhuma capability nova. -->

### Modified Capabilities
- `stock-details-view`: a visualização de detalhes passa a ser uma tela in-page (não modal).
- `status-invest-indicators`: a fonte dos indicadores fundamentalistas passa a ser o Investidor10.

## Impact

**Frontend (este repo):**
- `src/app/components/stock-details-modal/*` → vira tela in-page (renomear para `stock-details` ou ajustar template/estilos para seção, sem overlay).
- `src/app/components/dashboard/dashboard.{html,ts}` — renderizar o detalhe no lugar da grade quando houver ação selecionada (com "Voltar").

**Backend Go (repo separado `carteira-inteligente-api`):**
- `internal/infrastructure/scraper/investidor10.go` — função para extrair indicadores fundamentalistas.
- `internal/adapters/http/handler/transaction_handler.go` — usar Investidor10 para indicadores.
- `internal/infrastructure/scraper/statusinvest.go` — remover (deixa de ser usado).
