## Why

Ao lançar uma compra/venda com **data passada**, o modal preenche o preço com a **cotação de hoje** (`/quote/:ticker`), não com o preço do ativo **na data informada**. Isso distorce o preço médio e os cálculos. O usuário deve poder registrar uma operação antiga com o **preço de fechamento daquela data**.

## What Changes

- **API (serviço externo):** o endpoint de cotação SHALL aceitar uma data e, quando a data for **anterior a hoje**, retornar o **preço de fechamento naquela data** (ou no pregão anterior mais próximo). Para hoje/futuro, mantém a cotação atual. Contrato: `GET /api/v1/quote/:ticker?date=YYYY-MM-DD`.
- **Frontend (este repo):**
  - `StockApiService.getQuote(ticker, date?)` passa `?date=` quando há data passada.
  - No modal de lançamento, ao **trocar a data** (ou resolver o ticker), buscar o preço **para a data informada** e preencher o campo de preço; indicar que é a "cotação de DD/MM/AAAA".
  - Não sobrescrever um preço **editado manualmente** pelo usuário; em **edição** de lançamento, preservar o preço registrado.

## Capabilities

### Modified Capabilities
- `lancamento-preco-na-data`: o lançamento passa a buscar e preencher o preço do ativo na data informada (preço histórico) quando a data é anterior a hoje, em vez da cotação atual.

## Impact

**Backend (serviço externo `carteira-inteligente-api`, fora deste repo):**
- `/api/v1/quote/:ticker` passa a honrar `?date=YYYY-MM-DD` (hoje ignora o parâmetro). Fonte: histórico do Yahoo Finance. **Pré-requisito** para o efeito ser visível.

**Frontend (este repo):**
- `src/app/services/stock-api.service.ts` — `getQuote(ticker, date?)` com `?date=`.
- `src/app/components/add-transaction-modal/add-transaction-modal.ts` — refetch por data, guarda de edição manual, indicador de data.
- `src/app/components/add-transaction-modal/add-transaction-modal.html` — texto "cotação de DD/MM/AAAA".
