## Context

O app Angular usa atualmente dois mecanismos paralelos para dados de ações:
1. Uma lista hardcoded de 10 tickers em `StockDataService` com dividendos gerados localmente
2. Um proxy na porta 3001 (`StockApiService`) para cotações em tempo real via brapi.dev

A API REST local em `http://localhost:8081/api/v1/stocks` já possui os dados do portfólio com campos em português (`ticker`, `nome`, `setor`, `nota`, `preco_atual`, `variacao_hoje`) e é a fonte de verdade. O objetivo é fazer o app ler e gravar dessa API diretamente.

**Contrato da API (GET /api/v1/stocks):**
```json
{ "id": 1, "ticker": "BBAS3", "nome": "Banco do Brasil S.A.", "setor": "Bancário",
  "nota": 3, "preco_atual": 19.17, "variacao_hoje": -1.84,
  "created_at": "...", "updated_at": "..." }
```

## Goals / Non-Goals

**Goals:**
- Carregar portfólio inicial via GET `http://localhost:8081/api/v1/stocks`
- Salvar nova ação via POST `http://localhost:8081/api/v1/stocks` com campos do contrato da API
- Ajustar form de adição para refletir os campos da API (remover `dividendYield`, adicionar `nota`)
- Manter compatibilidade com a interface `Stock` interna do app (mapeamento de campos)

**Non-Goals:**
- Remover o proxy da porta 3001 ou integração com brapi.dev (mantém para lookup de ticker no form)
- Implementar DELETE ou PATCH de ações existentes
- Persistir dividendos mensais via API (API não suporta)

## Decisions

### D1: Novo método na `StockApiService` em vez de serviço separado
A `StockApiService` já é o ponto de acesso a APIs HTTP. Adicionar `getPortfolio()` e `createStock()` nela mantém coesão sem proliferar serviços.

**Alternativa considerada**: Criar `PortfolioApiService` separado.
**Rejeitado**: Over-engineering para apenas 2 novos endpoints na mesma URL base.

### D2: Interface `PortfolioApiStock` para o DTO da API
A API retorna campos em português que não coincidem 1:1 com a interface `Stock` interna. Uma interface DTO separada (`PortfolioApiStock`) em `stock.model.ts` formaliza o contrato e o mapeamento fica explícito no service.

### D3: `StockDataService` carrega via API, mantém dividendos locais gerados
A API não fornece histórico de dividendos. O `generateDividends()` é mantido para os tickers conhecidos; para tickers novos sem padrão, usa-se o padrão genérico já existente. O campo `nota` vem direto da API (não calculado a partir de DY).

**Alternativa considerada**: Remover geração de dividendos.
**Rejeitado**: O calendário e o "Melhor Mês" dependem dos dividendos locais — são features valiosas.

### D4: Form do modal sem seção de dividendos mensais no POST
O POST à API aceita apenas: `ticker`, `nome`, `setor`, `nota`, `preco_atual`, `variacao_hoje`. A seção de dividendos mensais do form é removida do fluxo de salvar. Internamente (para o calendário), os dividendos continuam sendo gerados localmente após o save via API.

### D5: Campo `nota` (1–10) no lugar de `dividendYield` no form
A API usa `nota` como score. O form exibe `nota` como campo numérico inteiro (1–10). O lookup de ticker via proxy ainda pode preencher automaticamente nome/setor/preço; `nota` é preenchida manualmente.

## Risks / Trade-offs

- **API offline**: Se a porta 8081 estiver indisponível, o portfólio fica vazio. → Mitigação: mensagem de erro amigável no dashboard + fallback para lista vazia (não trava o app)
- **Sem validação de resposta do POST**: A API pode retornar campos diferentes no response. → Mitigação: após POST bem-sucedido, adicionar a ação localmente com os dados enviados (não depender do response body)
- **Divisor de responsabilidades `nota` vs `dividendYield`**: Externamente o app exibe `nota`; internamente usa `dividendYield` para cálculos de yield médio. → Mitigação: para ações vindas da API, setar `dividendYield = 0` e usar `nota` para exibição — a lógica de yield médio no header fica zerada mas não quebra
