## Context

The `DividendHistoryComponent` was built in the previous session and already receives `portfolioStocks: { id: number; ticker: string }[]` from `DashboardComponent`. However:

1. The `portfolioRefs` signal in `StockDataService` uses the `ApiStock` list from `GET /api/v1/stocks`, but that endpoint does not yet return a `history_ready` field.
2. The component has no year filtering UI — it fetches all dividends for a stock regardless of period.
3. There is no feedback mechanism for the background scraping goroutine to mark a stock as "done".

The backend (`carteira-inteligente-api`) uses Go/Gin + GORM + SQLite. The `Stock` domain model is in `internal/domain/stock.go`. The `StockHandler.importDividends` goroutine in `stock_handler.go` already runs on creation but does not write back to the stock record.

## Goals / Non-Goals

**Goals:**
- Add `history_ready bool` to `domain.Stock` and persist it after successful scraping
- Surface `history_ready` in `GET /api/v1/stocks` and `GET /transactions/acoes` responses
- Pass `historyReady` through the Angular `portfolioRefs` signal shape to `DividendHistoryComponent`
- Render processing banner in `DividendHistoryComponent` based on that flag
- Replace any static year list with a dynamically computed range (last 5 years, current month cap)

**Non-Goals:**
- Polling / WebSocket live updates — the banner disappears only on the next full page load / signal refresh; real-time push is out of scope
- Retry logic for failed scraping — if scraping fails, `history_ready` stays false; no auto-retry
- Per-month filtering UI beyond the existing stock selector

## Decisions

### D1 — `history_ready` as a database column on `Stock`
Add `HistoryReady bool` to `domain.Stock` with GORM tag `gorm:"default:false"`. The scraping goroutine updates it to `true` via a targeted `db.Model(&Stock{}).Where("id = ?", id).Update("history_ready", true)` call after all dividends are persisted.

**Alternatives considered:**
- Separate `stock_scraping_status` table: more flexible but over-engineered for a single boolean.
- In-memory map in the handler: lost on restart, doesn't persist across Render cold starts.

### D2 — Expose `history_ready` in existing API responses
The `ApiStock` struct (used by `GET /api/v1/stocks`) gains `HistoryReady bool json:"history_ready"`. The `AcaoItem` struct (used by `GET /transactions/acoes`) also gains `HistoryReady bool json:"history_ready"` — populated from the stock record fetched during `GetAcoes`.

### D3 — Angular signal shape extension
`portfolioRefs` in `StockDataService` changes from `{ id: number; ticker: string }[]` to `{ id: number; ticker: string; historyReady: boolean }[]`. `DividendHistoryComponent`'s `@Input()` type mirrors this.

### D4 — Processing banner as inline conditional in component
No separate component needed. A `computed()` signal `anyProcessing = computed(() => this.portfolioStocks.some(s => !s.historyReady))` drives an `*ngIf` banner div inside `DividendHistoryComponent`.

### D5 — Dynamic years as `computed()` in component
```typescript
readonly availableYears = computed(() => {
  const now = new Date();
  const currentYear = now.getFullYear();
  return Array.from({ length: 5 }, (_, i) => currentYear - 4 + i);
});
```
No backend change needed — the filtering is client-side display logic only. The existing `dividends` signal already holds full history; the year filter only affects what rows are shown.

## Risks / Trade-offs

- **Stale `history_ready = false` after partial failure**: If scraping partially succeeds (some dividends saved, then error), the field stays `false` but data is partially present. The banner will keep showing. Acceptable for MVP — the user sees a consistent "still loading" state rather than partial data silently.
- **Race between `GET /api/v1/stocks` and goroutine completion**: On slow connections, the front-end may load `history_ready = false` and show the banner even when scraping is nearly done. User must refresh to dismiss. Acceptable without real-time push.
- **GORM `AutoMigrate` adds column**: SQLite `ALTER TABLE ADD COLUMN` is safe for new nullable/default columns. Existing stocks get `history_ready = false` (default), which means the banner will show for pre-existing stocks until they are re-imported (by delete + re-add). This is the correct behavior — old stocks never had their history scraped.

## Migration Plan

1. Deploy backend with `HistoryReady` field; `AutoMigrate` runs on startup and adds the column.
2. All existing stocks default to `history_ready = false`.
3. Frontend deploy: banner appears for all existing users until they re-add their stocks.
4. No data loss, no rollback required — column addition is additive.

## Open Questions

- Should existing stocks get a one-time re-import triggered on migration? Decided: No — too complex for MVP; user re-adds if they want history.
