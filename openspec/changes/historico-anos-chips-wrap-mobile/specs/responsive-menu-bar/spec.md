# responsive-menu-bar

## MODIFIED Requirements

### Requirement: Filtro de anos alterna chips/combo por estado responsivo

No Histórico de dividendos, o filtro de anos SHALL ser exibido sempre como **chips** de ano (incluindo a opção "Todos"), em todos os tamanhos de tela, posicionados na linha abaixo do seletor de "Ativo". No mobile, os chips MUST quebrar de linha (`flex-wrap`) quando não couberem, sem rolagem horizontal e sem usar combo `<select>`.

#### Scenario: Chips em todos os tamanhos

- **WHEN** o Histórico é exibido com posições visíveis, em qualquer largura de viewport
- **THEN** o filtro de anos aparece como chips (anos + "Todos"), abaixo do seletor de "Ativo"
- **AND** nenhum combo `<select>` de anos é renderizado

#### Scenario: Chips quebram de linha no mobile sem rolagem

- **WHEN** o Histórico é exibido em largura estreita e os chips de ano não cabem em uma linha
- **THEN** os chips quebram para a(s) linha(s) abaixo
- **AND** não há rolagem horizontal dos chips nem da página

#### Scenario: Selecionar um ano filtra a tabela

- **WHEN** o usuário toca em um chip de ano (ou em "Todos")
- **THEN** a tabela de dividendos é filtrada por aquele ano (ou mostra todos)
