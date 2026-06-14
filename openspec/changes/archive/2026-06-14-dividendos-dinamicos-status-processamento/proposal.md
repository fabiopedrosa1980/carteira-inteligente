## Why

A tela de Dividendos exibe dados estáticos/hardcoded sem refletir os ativos reais do usuário, e não informa o usuário quando o scraping de histórico de dividendos ainda está em andamento — causando confusão com tabelas vazias sem feedback.

## What Changes

- A tela Dividendos passa a carregar apenas os ativos cadastrados pelo usuário (via `/transactions/acoes`), eliminando dados fictícios ou stocks hardcoded
- Os filtros de ano são gerados dinamicamente: últimos 5 anos até o ano corrente, sendo o ano atual limitado ao mês vigente
- O backend expõe um campo `history_ready` (ou similar) por ativo, sinalizando quando o scraping do Investidor10 foi concluído com sucesso
- A tela exibe um banner "Histórico de dividendos da sua carteira está em processamento" enquanto `history_ready = false`, e oculta o banner quando todos os ativos estiverem prontos

## Capabilities

### New Capabilities
- `dividend-processing-status`: Sinalizar por ativo se o histórico de dividendos foi processado; expor campo na API e consumir no frontend com feedback visual

### Modified Capabilities
- `dividend-history-table`: O componente `DividendHistoryComponent` passa a usar só os ativos do usuário e anos dinâmicos (em vez de lista estática/hardcoded)

## Impact

- **Backend** (`carteira-inteligente-api`): campo `history_ready bool` no modelo `Stock`, atualizado para `true` pela goroutine de scraping após inserção bem-sucedida; endpoint `GET /api/v1/stocks` (ou `/transactions/acoes`) inclui o campo
- **Frontend** (`carteira-inteligente`): `DividendHistoryComponent` consome `portfolioStocks` com `historyReady`; lógica de anos dinâmicos substitui lista fixa; banner condicional de processamento
- **Nenhuma breaking change** em outros componentes — apenas adição de campo opcional
