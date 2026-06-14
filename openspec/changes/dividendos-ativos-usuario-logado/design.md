## Contexto

O `DividendHistoryComponent` atual injeta `StockDataService` e usa o sinal `portfolioRefs()`, que é populado por `GET /api/v1/stocks` (catálogo de stocks). Isso cria dois problemas:

1. O combo de ativos mostra stocks do catálogo, não as posições reais do usuário (vindas de transações)
2. A aba é renderizada mesmo quando o usuário não tem posições, exibindo estado vazio sem orientação

A solução correta é usar `GET /transactions/acoes` — endpoint que já é por-usuário autenticado — como fonte única para o combo. Porém, esse endpoint não retorna o `stock_id` do catálogo, necessário para chamar `GET /api/v1/stocks/:id/dividends`.

## Metas / Não-Metas

**Metas:**
- Expor `stock_id` no retorno de `GET /transactions/acoes`
- `DividendHistoryComponent` usa `getAcoes()` como fonte do combo de ativos
- Renderização condicional da seção baseada em `acoes().length > 0`
- Estado vazio com orientação quando sem posições

**Não-Metas:**
- Mudar autenticação ou escopo de usuário dos endpoints existentes
- Criar novo endpoint; reaproveitar `getAcoes()` com o campo adicional

## Decisões

### D1 — Adicionar `stock_id` ao `AcaoItem` no backend
Adicionar `StockID uint json:"stock_id"` ao struct `domain.AcaoItem` em `internal/domain/transaction.go`. Em `GetAcoes` (`transaction_handler.go`), o mapa `historyReadyByTicker` já busca todos os stocks — basta incluir o ID no lookup: `stockIDByTicker[s.Ticker] = s.ID`.

**Alternativa descartada:** Buscar `stock_id` no frontend fazendo join entre `getStocks()` e `getAcoes()` — exigiria duas chamadas e lógica de join no cliente.

### D2 — `DividendHistoryComponent` carrega posições via `getAcoes()`
O componente passa a injetar `BackendApiService` e chamar `getAcoes()` em `ngOnInit` para montar o combo. Troca `portfolioRefs` (signal do `StockDataService`) por um sinal local `positions` carregado do endpoint correto.

**Alternativa descartada:** Continuar usando `portfolioRefs` e fazer um join com `getAcoes()` — mais complexo e cria duas fontes de verdade.

### D3 — Renderização condicional no dashboard
Em `dashboard.html`, o bloco do tab `calendar` verifica `acoes().length > 0` antes de renderizar `<app-dividend-history>`. Se vazio, mostra card de estado vazio. `acoes` já é carregado no `DashboardComponent`.

## Riscos / Trade-offs

- **Usuário com posições mas sem stock no catálogo**: `stock_id = 0` se o ticker não estiver catalogado. O componente deve tratar `stock_id === 0` como item sem histórico disponível (desabilitar seleção ou ocultar na lista).
- **Latência adicional no carregamento**: `getAcoes()` já é chamado no dashboard para a aba "Minhas Ações"; o componente faz uma segunda chamada ao carregar a aba "Dividendos". Aceitável — os dados podem mudar entre abas.

## Plano de Migração

1. Deploy backend com `stock_id` em `AcaoItem` — sem breaking change (campo novo, opcional para clientes antigos)
2. Deploy frontend — sem impacto em outras features
3. Nenhum rollback especial necessário
