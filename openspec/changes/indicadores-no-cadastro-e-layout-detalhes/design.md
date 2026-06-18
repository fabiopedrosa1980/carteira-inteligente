## Context

- Backend: `domain.Stock` é persistido via GORM/SQLite (gorm v1.31, suporta `serializer:json`). `importDividendsForStock` roda em background após o cadastro do Stock (tanto em `CreateStock` quanto em `ensureStockAndImport`) e também no job `refreshAllDividends`. `respondPositions` hoje chama `scraper.FetchIndicators` por ticker em cada request. O catálogo de stocks já é carregado em `respondPositions` (`FindAll`) para montar `historyReadyByTicker`/`stockIDByTicker`.
- `domain.Indicator{Label, Value}` já existe (em transaction.go).
- Frontend: `StockDetailsModalComponent` é in-page; exibe indicadores via `*ngFor`. Layout atual é funcional, mas simples.

## Goals / Non-Goals

**Goals:**
- Buscar indicadores no cadastro do ticker e persistir; servir do banco.
- Atualizar no sync periódico.
- Layout profissional na tela de detalhes.

**Non-Goals:**
- Mudar o formato dos indicadores (continua lista rótulo/valor).
- Endpoint novo de indicadores (continuam embutidos no payload de posições).

## Decisions

**1. Persistência dos indicadores (backend).**
Adicionar a `domain.Stock` o campo `Indicators []Indicator \`gorm:"serializer:json" json:"indicators,omitempty"\``. AutoMigrate cria a coluna (TEXT/JSON no SQLite). `Validate()` não muda (campo opcional).

**2. Fluxo de cadastro busca + persiste.**
Estender o repositório/serviço com `UpdateIndicators(id uint, indicators []Indicator) error` (espelhando `UpdateHistoryReady`). Em `importDividendsForStock(dividendSvc, stockSvc, stockID, ticker, fii)`, após importar dividendos, chamar `scraper.FetchIndicators(ticker, fii)` e persistir via `UpdateIndicators` (best-effort: erro → log e segue). Como esse import roda no cadastro (CreateStock e ensureStockAndImport) e no `refreshAllDividends`, cobre cadastro + atualização periódica sem código novo de orquestração.

**3. Leitura do banco em respondPositions.**
Remover a chamada `scraper.FetchIndicators` do goroutine por ticker. Construir `indicatorsByTicker map[string][]domain.Indicator` a partir do `FindAll` já existente e atribuir `Indicators: indicatorsByTicker[p.Ticker]`. Elimina scraping por requisição (mais rápido e estável).

**4. Mocks/testes.**
Implementar `UpdateIndicators` nos mocks de `StockRepository`/`StockUseCase` usados em testes; ajustar chamadas se necessário. `go build/vet/test`.

**5. Layout profissional (frontend).**
Reformular `stock-details-modal.html/scss`: cabeçalho com ticker + nome e preço grande, variação como "pill" colorida; uma faixa de métricas de posição (DY, Nota, Setor, Cotas, Preço médio) em cartões; seção "Indicadores fundamentalistas" em grid responsivo de células com rótulo/valor, divisores sutis e tipografia tabular para números. Reaproveitar tokens de tema (`--card-bg`, `--border`, `--color-pos/neg`).

## Risks / Trade-offs

- [Migração de coluna nova em produção] → AutoMigrate adiciona a coluna; registros antigos ficam com indicadores vazios até o próximo sync/cadastro.
- [Indicadores defasados entre syncs] → Aceitável; o job periódico atualiza. Cadastro novo já vem com dados.
- [serializer:json indisponível] → gorm 1.31 suporta; se falhar, alternativa é coluna string com JSON manual (encoding/json) — não esperado.
