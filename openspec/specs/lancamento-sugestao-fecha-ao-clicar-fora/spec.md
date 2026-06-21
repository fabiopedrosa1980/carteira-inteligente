# lancamento-sugestao-fecha-ao-clicar-fora Specification

## Purpose
TBD - created by archiving change modal-fecha-sugestao-ticker-ao-clicar-fora. Update Purpose after archive.
## Requirements
### Requirement: Fechar sugestões de ticker ao clicar fora

No modal de lançamento, quando a lista de sugestões do autocomplete de ticker estiver aberta, um clique **fora do campo de ticker e fora da lista de sugestões** MUST fechar a lista. O clique externo MUST NOT fechar o modal nem limpar o ticker já digitado. Cliques **dentro** do campo de ticker ou **sobre uma sugestão** MUST NOT fechar a lista por este mecanismo (selecionar uma sugestão segue o comportamento normal de escolha).

#### Scenario: Clique fora fecha a lista

- **WHEN** a lista de sugestões está aberta e o usuário clica em outro ponto da tela (fora do campo de ticker e da lista)
- **THEN** a lista de sugestões é fechada
- **AND** o modal permanece aberto e o ticker digitado é preservado

#### Scenario: Clique no campo de ticker mantém a lista

- **WHEN** a lista está aberta e o usuário clica no próprio campo de ticker
- **THEN** a lista de sugestões permanece visível

#### Scenario: Selecionar sugestão continua funcionando

- **WHEN** o usuário clica em uma das sugestões da lista
- **THEN** a sugestão é aplicada ao campo de ticker
- **AND** a lista é fechada
