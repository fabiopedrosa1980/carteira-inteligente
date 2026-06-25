## ADDED Requirements

### Requirement: Botão de adicionar no cabeçalho de cada seção

Na aba "Lançamentos" (`my-assets`), cada seção (acordeão de Ações, FIIs e ETFs) SHALL exibir um botão **"+"** (adicionar lançamento da seção) **no cabeçalho do acordeão**, à direita junto do total e do chevron. O botão MUST permanecer visível e acionável **mesmo quando a seção está recolhida**, sem expandir o corpo. Ao ser acionado, o botão MUST abrir o modal de novo lançamento já com o **tipo de ativo da seção pré-selecionado** (reusando `openAdd(type)`). O acionamento do botão MUST NOT alternar (expandir/recolher) a seção. O botão **"Adicionar"** do rodapé do corpo da seção MUST ser mantido como segundo ponto de acesso.

#### Scenario: Botão "+" visível no cabeçalho

- **WHEN** a aba "Lançamentos" é exibida
- **THEN** cada seção (Ações, FIIs, ETFs) mostra um botão "+" no cabeçalho do acordeão
- **AND** o botão fica visível mesmo com a seção recolhida

#### Scenario: Adicionar com tipo pré-selecionado

- **WHEN** o usuário aciona o botão "+" no cabeçalho da seção FIIs
- **THEN** o modal de novo lançamento abre com o tipo de ativo "FIIs" pré-selecionado

#### Scenario: Botão não alterna a seção

- **WHEN** o usuário aciona o botão "+" no cabeçalho de uma seção recolhida
- **THEN** o modal de novo lançamento abre
- **AND** a seção permanece recolhida (o clique não expande nem recolhe o acordeão)

#### Scenario: Botão do rodapé preservado

- **WHEN** a seção está expandida
- **THEN** o botão "Adicionar" continua disponível no rodapé do corpo da seção
- **AND** abre o mesmo modal de novo lançamento com o tipo da seção
