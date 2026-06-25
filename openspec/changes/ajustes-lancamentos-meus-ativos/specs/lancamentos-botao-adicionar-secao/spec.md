## MODIFIED Requirements

### Requirement: Botão de adicionar no cabeçalho de cada seção

Na aba "Lançamentos" (`my-assets`), o botão de adicionar lançamento de cada seção (Ações, FIIs, ETFs) SHALL existir **apenas no rodapé do corpo do card** (botão "Adicionar"), **sem** botão "+" no cabeçalho do acordeão. O botão do rodapé MUST abrir o modal de novo lançamento já com o **tipo de ativo da seção pré-selecionado** (reusando `openAdd(type)`). O cabeçalho do acordeão MUST conter apenas rótulo, contagem, total e chevron.

#### Scenario: Sem botão "+" no cabeçalho

- **WHEN** a aba "Lançamentos" é exibida
- **THEN** o cabeçalho de cada seção não exibe botão "+"
- **AND** o cabeçalho mostra apenas rótulo, contagem, total e chevron

#### Scenario: Adicionar pelo rodapé com tipo pré-selecionado

- **WHEN** o usuário expande uma seção e aciona o botão "Adicionar" do rodapé
- **THEN** o modal de novo lançamento abre com o tipo de ativo daquela seção pré-selecionado

#### Scenario: Único ponto de acesso

- **WHEN** o usuário deseja adicionar um lançamento a uma seção
- **THEN** o único ponto de acesso é o botão "Adicionar" no rodapé do corpo do card
