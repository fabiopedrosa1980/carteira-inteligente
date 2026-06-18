## ADDED Requirements

### Requirement: Portfólio carregado da API backend
A tela de Portfólio SHALL buscar a lista de ações de `GET http://localhost:8080/api/v1/stocks` ao inicializar, substituindo os tickers e dados hardcoded.

#### Scenario: Carregamento bem-sucedido do portfólio
- **WHEN** a aplicação inicializa e o backend está disponível
- **THEN** a tela de Portfólio SHALL exibir as ações retornadas pela API com ticker, nome, setor, preço, DY e nota

#### Scenario: Backend indisponível ao carregar portfólio
- **WHEN** a chamada a `GET /api/v1/stocks` falha (erro de rede ou HTTP)
- **THEN** a tela SHALL exibir lista vazia e o estado de loading SHALL ser encerrado sem travar a UI

#### Scenario: Estado de carregamento visível
- **WHEN** a requisição a `GET /api/v1/stocks` está em andamento
- **THEN** a barra de carregamento ("Buscando cotações em tempo real…") SHALL estar visível até a resposta ser recebida

### Requirement: Dados de ações mapeados para o modelo interno
O `BackendApiService` SHALL mapear a resposta de `GET /api/v1/stocks` para o tipo `Stock` usado pelo `StockDataService`.

#### Scenario: Mapeamento completo de campos
- **WHEN** a API retorna um objeto de ação com campos de ticker, nome, setor, preço, changePercent, dividendYield e nota
- **THEN** o `StockDataService` SHALL expor o objeto `Stock` correspondente com todos os campos preenchidos

#### Scenario: Campo ausente na resposta da API
- **WHEN** a API retorna um campo opcional ausente (ex: `name` vazio)
- **THEN** o sistema SHALL usar o `ticker` como fallback para `name` e zero para campos numéricos

### Requirement: Operações de adicionar e remover ação mantidas
As operações `addStock` e `removeStock` do `StockDataService` SHALL continuar funcionando após a migração.

#### Scenario: Adicionar ação ao portfólio local
- **WHEN** o usuário adiciona uma nova ação via modal
- **THEN** a ação SHALL ser adicionada ao estado local do `StockDataService` e exibida no portfólio
