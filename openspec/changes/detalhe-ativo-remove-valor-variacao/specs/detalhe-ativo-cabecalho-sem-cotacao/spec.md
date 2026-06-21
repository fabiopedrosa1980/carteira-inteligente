## ADDED Requirements

### Requirement: Cabeçalho do detalhe do ativo sem cotação

O cabeçalho do modal de detalhe do ativo MUST exibir apenas a **identidade do ativo** (ticker e, quando houver e for diferente do ticker, o nome). O cabeçalho MUST NOT exibir o **preço/cotação (valor em R$)** nem a **variação do dia (%)** acima dos indicadores fundamentalistas. As seções de indicadores fundamentalistas e informações da empresa permanecem inalteradas.

#### Scenario: Detalhe aberto não mostra preço nem variação

- **WHEN** o usuário abre o detalhe de um ativo
- **THEN** o cabeçalho mostra o ticker (e o nome, se disponível e distinto do ticker)
- **AND** não exibe o preço em R$
- **AND** não exibe a variação do dia em porcentagem

#### Scenario: Indicadores continuam visíveis

- **WHEN** o ativo possui indicadores fundamentalistas e/ou informações da empresa
- **THEN** essas seções continuam sendo exibidas normalmente abaixo do cabeçalho
