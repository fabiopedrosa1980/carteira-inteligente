## Why

O investidor quer antecipar em quais meses cada ativo costuma pagar proventos, para comprar **antes da data-com** e capturar dividendos. Um "Radar" com a sazonalidade do ano anterior (quais tickers tiveram data-com em cada mês) ajuda nessa decisão.

## What Changes

- Nova sub-tab **"Radar"** em Dividendos (ao lado de Histórico/Recebidos/Projetados), respeitando o seletor Ações/FIIs.
- Grade de **12 cards (Jan→Dez)**; cada card lista os **tickers da carteira** cujos proventos tiveram **data-com (ex_date) naquele mês no ano anterior** (`anoAtual - 1`).
- Apenas frontend: reaproveita `getAcoes`/`getFiis` + `getStockDividends` (como `dividends-summary`), agrupando por mês da data-com.

## Capabilities

### New Capabilities
- `dividends-radar`: radar de sazonalidade de proventos por mês (ano anterior) para apoiar a compra antes da data-com.

## Impact

**Frontend (este repo):**
- `src/app/components/dividends/dividends.{ts,html}` — sub-tab Radar.
- Novo `src/app/components/dividends-radar/*` — grade de 12 meses, `@Input() assetType`.
