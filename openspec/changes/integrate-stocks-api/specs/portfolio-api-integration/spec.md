## ADDED Requirements

### Requirement: Portfólio carregado da API REST
O sistema SHALL carregar a lista de ações do portfólio via GET `http://localhost:8081/api/v1/stocks` ao inicializar, substituindo a lista hardcoded. O mapeamento de campos SHALL ser: `nome`→`name`, `setor`→`sector`, `preco_atual`→`price`, `variacao_hoje`→`changePercent`, `nota`→`nota`.

#### Scenario: Carregamento bem-sucedido
- **WHEN** o app inicializa e a API retorna HTTP 200 com array de ações
- **THEN** o portfólio exibe as ações retornadas pela API com `nome`, `setor`, `preco_atual`, `variacao_hoje` e `nota` corretos

#### Scenario: API indisponível
- **WHEN** a chamada GET falha (erro de rede ou status não-2xx)
- **THEN** o portfólio exibe lista vazia e o estado de loading é desativado sem travar o app

### Requirement: Nova ação salva via POST na API
O sistema SHALL enviar POST para `http://localhost:8081/api/v1/stocks` ao salvar uma nova ação no modal, com body contendo `ticker`, `nome`, `setor`, `nota` (inteiro 1–10), `preco_atual` e `variacao_hoje`.

#### Scenario: POST bem-sucedido
- **WHEN** o usuário preenche o form e clica em "Adicionar Ação" e a API retorna 2xx
- **THEN** a ação é adicionada ao portfólio local e o modal é fechado

#### Scenario: POST com falha
- **WHEN** a API retorna erro no POST
- **THEN** uma mensagem de erro é exibida no modal e o modal permanece aberto

### Requirement: Formulário alinhado ao contrato da API
O form de adição SHALL conter os campos: `ticker`, `nome`, `setor`, `preco_atual`, `variacao_hoje` e `nota` (1–10). O campo `dividendYield` SHALL ser removido. A seção de dividendos mensais SHALL ser removida do fluxo de POST.

#### Scenario: Campo nota visível e editável
- **WHEN** o modal de adição está aberto
- **THEN** o campo "Nota (1-10)" é exibido como input numérico inteiro com range 1–10

#### Scenario: Validação do formulário
- **WHEN** o usuário submete o form sem preencher ticker, nome ou preço
- **THEN** mensagens de erro são exibidas para cada campo obrigatório faltante
