## Why

O portfólio está atualmente carregado com dados estáticos hardcoded e usa um proxy separado (porta 3001) para cotações. A API local `http://localhost:8081/api/v1/stocks` já expõe os dados do portfólio em formato próprio com campos em português, sendo a fonte de verdade real — o app precisa consumi-la tanto na leitura (GET) quanto na adição de ações (POST), alinhando os campos do formulário ao contrato real da API.

## What Changes

- **Portfólio carregado via API**: Substituir a lista hardcoded de tickers por chamada GET a `http://localhost:8081/api/v1/stocks` que retorna `id`, `ticker`, `nome`, `setor`, `nota`, `preco_atual`, `variacao_hoje`, `created_at`, `updated_at`
- **POST via API**: O modal "Adicionar Ação" envia POST para `http://localhost:8081/api/v1/stocks` com os campos corretos da API (`ticker`, `nome`, `setor`, `nota`, `preco_atual`, `variacao_hoje`)
- **Campos do formulário ajustados**: Remover `dividendYield` (não existe na API), adicionar campo `nota` (1–10) diretamente editável, manter `preco_atual` e `variacao_hoje`
- **Seção de dividendos mensais removida do POST**: A API não aceita dividendos mensais; essa seção deixa de ser necessária para salvar via API
- **Mapeamento de campos**: `nome` → `name`, `setor` → `sector`, `preco_atual` → `price`, `variacao_hoje` → `changePercent` na interface interna do app

## Capabilities

### New Capabilities
- `portfolio-api-integration`: Carregamento do portfólio a partir da API REST e persistência de novas ações via POST na mesma API

### Modified Capabilities
- Nenhuma spec existente — implementação inicial do projeto

## Impact

- `src/app/services/stock-api.service.ts`: Adição de métodos `getPortfolio()` e `createStock()` apontando para `http://localhost:8081/api/v1/stocks`
- `src/app/services/stock-data.service.ts`: Substituir `buildInitialStocks()` + `fetchPortfolioQuotes()` por carregamento via `getPortfolio()`
- `src/app/components/add-stock-modal/add-stock-modal.ts`: Ajustar form (remover `dividendYield`, adicionar `nota`), chamar `createStock()` no save, remover seção de dividendos mensais
- `src/app/models/stock.model.ts`: Adicionar interface `PortfolioApiStock` para o formato da API
