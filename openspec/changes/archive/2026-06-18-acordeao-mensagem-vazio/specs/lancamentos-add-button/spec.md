## MODIFIED Requirements

### Requirement: Botão único de adicionar por acordeão

Cada acordeão da tela de Lançamentos SHALL ter um único botão de adicionar, com o texto "Adicionar", alinhado à direita ao final da lista. NÃO SHALL haver botão de adicionar no cabeçalho da tela. No estado vazio (seção sem lançamentos), o acordeão SHALL exibir uma mensagem "Nenhum lançamento cadastrado" além do botão "Adicionar".

#### Scenario: Acordeão com lançamentos
- **WHEN** uma seção tem lançamentos
- **THEN** abaixo das linhas há um único botão "Adicionar" alinhado à direita

#### Scenario: Acordeão vazio
- **WHEN** uma seção não tem lançamentos
- **THEN** é exibida a mensagem "Nenhum lançamento cadastrado" e o botão "Adicionar"

#### Scenario: Sem botão no topo
- **WHEN** a tela de Lançamentos é exibida
- **THEN** não há botão "Adicionar Lançamento" no cabeçalho

#### Scenario: Texto padronizado
- **WHEN** qualquer botão de adicionar é exibido nos acordeões
- **THEN** seu texto é exatamente "Adicionar"
