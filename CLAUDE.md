# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Git workflow

After every code change, commit and push to the remote repository:

```bash
git add <files alterados>
git commit -m "<tipo>: <descrição curta do que foi alterado>"
git push origin main
```

Use prefixes `feat:`, `fix:`, `refactor:`, `chore:`, `style:` according to the type of change. Never use `git add -A` or `git add .` — always stage specific files to avoid committing unintended files (`.env`, build artifacts, etc.).

## Commands

**Frontend (Angular)**
```bash
npm start          # ng serve — runs at http://localhost:4200
ng build           # production build
ng build --watch --configuration development  # watch mode
ng test            # run tests (Karma)
```

**Formatting**
```bash
npx prettier --write "src/**/*.{ts,html,scss}"
```

No linting scripts are configured beyond Prettier.

## Architecture

### Two-layer backend

All external data fetching is split across two services that point to the same production Render host (`carteira-inteligente-api.onrender.com`):

- **`BackendApiService`** (`/api/v1/...`) — REST API for the managed portfolio: stocks, historical dividends per stock, and monthly dividend summaries. This is the primary source of truth for which stocks appear in the portfolio.
- **`StockApiService`** (`/api/v1/quote/:ticker`) — real-time quote endpoint served by the Go backend, that queries Yahoo Finance for B3 tickers.

### State management

`StockDataService` is the central state holder. It loads on app startup by calling `BackendApiService.getStocks()` then fetching all dividends in parallel via `forkJoin`. The result is stored in an Angular `signal<Stock[]>`. All derived computations (month summaries, best-month analysis, dividends by month) are pure methods on `StockDataService` that compute from that signal.

`TransactionService` holds transactions in a separate `signal<Transaction[]>` with no backend persistence — it's in-memory only.

### Component structure

All components are standalone. The app has a single route (`/` → `DashboardComponent`). Components:

- `DashboardComponent` — top-level, composes all other views
- `StockCardComponent` — individual stock card with price and DY
- `MeusAtivosComponent` — table of portfolio assets
- `DividendCalendarComponent` — monthly dividend calendar
- `AddStockModalComponent` — modal to search and add a ticker (uses `StockApiService` for live quote lookup)
- `AddTransactionModalComponent` — modal to log a buy/sell transaction

### Data models

`src/app/models/stock.model.ts` defines the internal `Stock` shape. `BackendApiService` uses `ApiStock`/`ApiDividend` interfaces and `StockDataService` maps them to `Stock` on ingestion. Keep the mapping in `StockDataService.fetchPortfolioStocks()` when changing either shape.

### Angular version notes

This project uses **Angular 21** with standalone components (`skipTests: true` is set globally in `angular.json`), the signals API for state, and the `@angular/build:application` builder (not the legacy Webpack builder).
