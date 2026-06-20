## ADDED Requirements

### Requirement: Rótulo "Ordenar por" não é cortado no desktop

No desktop, o rótulo "Ordenar por" dos controles de ordenação de "Minhas Ações" SHALL ser exibido por inteiro, **sem ser cortado** pela máscara de fade da barra rolável (`app-scroll-bar`). O rótulo MUST ficar fora da área mascarada/rolável, enquanto apenas os botões de campo permanecem na barra com rolagem.

#### Scenario: Rótulo legível no desktop

- **WHEN** a seção "Minhas Ações" é exibida no desktop
- **THEN** o rótulo "Ordenar por" aparece completo, sem clip/fade nas bordas
- **AND** apenas os botões de campo de ordenação ficam sujeitos à rolagem/máscara

### Requirement: Ordenação no mobile inicia em "Nome" sem opção "Padrão"

No mobile, o combo de ordenação de "Minhas Ações" SHALL iniciar com **"Nome"** selecionado por padrão e **não** SHALL oferecer a opção "Padrão". A lista ordenada MUST refletir a ordenação por nome no carregamento inicial.

#### Scenario: Estado inicial do combo no mobile

- **WHEN** a seção "Minhas Ações" é carregada no mobile
- **THEN** o combo de ordenação mostra "Nome" selecionado
- **AND** não existe a opção "Padrão" no combo
- **AND** os cards aparecem ordenados por nome
