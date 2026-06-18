## Why

Cinco melhorias de produto. Algumas são puramente de frontend (Angular, neste repo) e outras dependem do backend Go, que vive em um repositório separado (`carteira-inteligente-api.onrender.com`). Para os itens de backend, esta mudança documenta o **contrato de API** a ser implementado no repo Go e implementa o **consumo no frontend**, sem alterar o backend aqui.

## What Changes

- **Autocomplete de ticker** no modal "Adicionar Lançamento": ao digitar 3+ letras, exibir sugestões de tickers (consumindo um novo endpoint de busca do backend).
- **Detalhes da ação**: ao clicar no card em Minhas Ações, abrir um modal com os detalhes da ação (preço, variação, DY, nota, setor, histórico de dividendos e indicadores quando disponíveis).
- **Indicadores do Status Invest** (contrato de backend): documentar a extração de indicadores fundamentais (ex.: P/L, P/VP, DY, ROE) no Go e exibi-los no detalhe da ação quando presentes.
- **Identificação do usuário** após login: exibir nome e foto do usuário autenticado no header do app.
- **Dividendos de FIIs** (contrato de backend + frontend): garantir que os proventos de FIIs (rendimentos) sejam retornados pela API e exibidos nas telas de Dividendos, hoje focadas em ações.

## Capabilities

### New Capabilities
- `ticker-autocomplete`: sugestões de ticker ao digitar no modal de lançamento.
- `stock-details-view`: modal de detalhes da ação ao clicar no card.
- `status-invest-indicators`: contrato de indicadores fundamentais (backend) e sua exibição no detalhe.
- `user-identity-display`: exibição do usuário autenticado no app.
- `fii-dividends`: contrato e exibição dos proventos de FIIs.

### Modified Capabilities
<!-- Nenhuma capability de requisito existente é alterada. -->

## Impact

**Frontend (este repo):**
- `src/app/services/stock-api.service.ts` — método `searchTickers(q)`; tipos de indicadores.
- `src/app/components/add-transaction-modal/*` — dropdown de sugestões.
- `src/app/components/stock-card/*` e novo componente de detalhes — abrir/exibir detalhes.
- `src/app/components/dashboard/*` — usuário no header.
- `src/app/components/dividends*/*` e `backend-api.service.ts` — incluir FIIs nos proventos.

**Backend Go (repo separado — apenas contrato documentado, não implementado aqui):**
- `GET /api/v1/search?q=` — busca de tickers.
- Indicadores do Status Invest no payload de ação/quote.
- Proventos de FIIs no endpoint de dividendos.
