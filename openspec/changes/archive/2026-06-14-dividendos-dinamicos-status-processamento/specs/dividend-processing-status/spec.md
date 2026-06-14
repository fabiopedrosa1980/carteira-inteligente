## ADDED Requirements

### Requirement: Stock exposes dividend history processing status
Each stock resource SHALL include a boolean field `history_ready` that is `false` while the Investidor10 scraping goroutine is running and `true` after all scraped dividends have been successfully persisted.

#### Scenario: Field defaults to false on stock creation
- **WHEN** a new stock is created via `POST /api/v1/stocks`
- **THEN** the response and subsequent `GET /api/v1/stocks` include `"history_ready": false`

#### Scenario: Field becomes true after successful scraping
- **WHEN** the background goroutine finishes calling `CreateIfNotExists` for all scraped dividends without error
- **THEN** the stock's `history_ready` field is updated to `true` in the database

#### Scenario: Field stays false on scraping error
- **WHEN** the Investidor10 scraper returns an error (network failure, parsing failure, etc.)
- **THEN** `history_ready` remains `false` and the stock is NOT deleted

### Requirement: Frontend shows processing banner while any stock is not ready
The dividend history screen SHALL display a visible banner with the message "Histórico de dividendos da sua carteira está em processamento" while at least one portfolio stock has `history_ready = false`.

#### Scenario: Banner visible when processing incomplete
- **WHEN** `portfolioStocks` contains at least one entry with `historyReady = false`
- **THEN** the banner is rendered above the stock selector and table

#### Scenario: Banner hidden when all stocks ready
- **WHEN** all entries in `portfolioStocks` have `historyReady = true`
- **THEN** no banner is shown

#### Scenario: Banner hidden when portfolio is empty
- **WHEN** `portfolioStocks` is an empty array
- **THEN** no banner is shown
