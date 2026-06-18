## ADDED Requirements

### Requirement: Botão único de adicionar por acordeão

Cada acordeão da tela de Lançamentos SHALL ter um único botão de adicionar, com o texto "Adicionar", centralizado ao final da lista. NÃO SHALL haver botão de adicionar no cabeçalho da tela. No estado vazio (seção sem lançamentos), apenas o botão "Adicionar" centralizado SHALL ser exibido (sem ícone nem mensagem).

#### Scenario: Acordeão com lançamentos
- **WHEN** uma seção tem lançamentos
- **THEN** abaixo das linhas há um único botão "Adicionar" centralizado

#### Scenario: Acordeão vazio
- **WHEN** uma seção não tem lançamentos
- **THEN** é exibido somente o botão "Adicionar" centralizado, sem ícone nem texto de estado vazio

#### Scenario: Sem botão no topo
- **WHEN** a tela de Lançamentos é exibida
- **THEN** não há botão "Adicionar Lançamento" no cabeçalho

#### Scenario: Texto padronizado
- **WHEN** qualquer botão de adicionar é exibido nos acordeões
- **THEN** seu texto é exatamente "Adicionar"
