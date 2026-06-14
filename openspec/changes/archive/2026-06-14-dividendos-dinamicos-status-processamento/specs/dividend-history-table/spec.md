## MODIFIED Requirements

### Requirement: Dividend history table shows only user portfolio stocks
The `DividendHistoryComponent` stock selector SHALL be populated exclusively from the stocks registered by the authenticated user (sourced from `portfolioStocks` signal, which maps to `/transactions/acoes`), not from any hardcoded or static list.

#### Scenario: Selector shows registered stocks
- **WHEN** the user has stocks A, B, C registered in their portfolio
- **THEN** the dropdown lists exactly A, B, C in the same order as returned by the API

#### Scenario: Selector is empty when no stocks registered
- **WHEN** the user has no stocks in their portfolio
- **THEN** the dropdown has no selectable options and the table area shows the empty state

### Requirement: Year filter uses dynamic range
Any year-based filter in the dividend history view SHALL be generated dynamically as the last 5 calendar years up to and including the current year, where the current year's upper bound is the current month.

#### Scenario: Available years at runtime
- **WHEN** the current date is June 2026
- **THEN** the available years are 2022, 2023, 2024, 2025, 2026

#### Scenario: Current year month boundary
- **WHEN** the current year is selected
- **THEN** only months 1 through the current month (inclusive) are shown/considered

#### Scenario: Years update across calendar year boundary
- **WHEN** the system clock advances to January of a new year
- **THEN** the oldest year drops off and the new year is added to the range
