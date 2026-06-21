# lancamentos-modal-reload-api Specification

## Purpose
TBD - created by archiving change meus-ativos-resumo-cards-dividendos. Update Purpose after archive.
## Requirements
### Requirement: Fechar o modal de lançamentos força reload da API

Ao fechar o modal de lançamento (após adicionar, editar ou remover), a aplicação SHALL **forçar a releitura dos dados na API**, recarregando as fontes que alimentam a tela atual, de modo que os valores exibidos reflitam o estado atualizado no backend. O reload MUST abranger os lançamentos (`TransactionService`), a carteira agregada (`StockDataService`) e a lista/resumo de "Meus Ativos" do Dashboard.

#### Scenario: Reload após salvar no modal

- **WHEN** o usuário adiciona ou edita um lançamento e o modal é fechado
- **THEN** a aplicação refaz as chamadas à API para reler os dados
- **AND** a tela passa a exibir os valores atualizados (posições, totais e dividendos)

#### Scenario: Reload após remover

- **WHEN** o usuário remove um lançamento
- **THEN** a aplicação refaz as chamadas à API para reler os dados
- **AND** os totais e a listagem refletem a remoção

