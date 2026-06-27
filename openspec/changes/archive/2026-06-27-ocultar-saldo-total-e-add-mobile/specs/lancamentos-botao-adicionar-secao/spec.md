## ADDED Requirements

### Requirement: Adicionar no rodapé da seção no mobile (sem "+" por card)

Na aba "Lançamentos" (`my-assets`), em **mobile** (largura ≤600px, visão em cards), cada seção (Ações, FIIs, ETFs) SHALL exibir o botão **"Adicionar"** no **rodapé do corpo da seção** (mesmo botão do desktop), e NÃO SHALL exibir um botão **"+"** por card de lançamento. O botão "Adicionar" MUST abrir o modal de novo lançamento com o **tipo da seção pré-selecionado** (reusando `openAdd(type)`). Cada card MUST manter apenas os botões **Editar** e **Remover**.

#### Scenario: "Adicionar" no fim da seção no mobile

- **WHEN** a aba "Lançamentos" é exibida em mobile e uma seção com lançamentos está expandida
- **THEN** o botão "Adicionar" aparece no rodapé da seção
- **AND** abre o modal de novo lançamento com o tipo da seção pré-selecionado

#### Scenario: Sem botão "+" por card no mobile

- **WHEN** a aba "Lançamentos" é exibida em mobile (cards)
- **THEN** nenhum card de lançamento exibe o botão "+"
- **AND** cada card mantém apenas os botões Editar e Remover

#### Scenario: Comportamento do desktop preservado

- **WHEN** a aba "Lançamentos" é exibida no desktop
- **THEN** o botão "Adicionar" no rodapé da seção continua presente e funcional como antes
