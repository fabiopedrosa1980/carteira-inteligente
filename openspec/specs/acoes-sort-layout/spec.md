# acoes-sort-layout Specification

## Purpose
TBD - created by archiving change ajustes-nota-ordenacao-tipo-historico. Update Purpose after archive.
## Requirements
### Requirement: Controles de ordenação de Minhas Ações não quebram o layout no desktop

No desktop (largura > 640px), os controles de ordenação da seção "Minhas Ações" SHALL ser dispostos no cabeçalho da seção **sem quebrar o layout**: o título e os controles convivem na mesma faixa do cabeçalho sem que os controles ocupem indevidamente a largura inteira nem empurrem o conteúdo para fora. No mobile, o comportamento atual (combo de campo + botão de direção) é mantido.

#### Scenario: Cabeçalho íntegro no desktop

- **WHEN** a seção "Minhas Ações" é exibida em largura > 640px
- **THEN** título e controles de ordenação ficam alinhados no cabeçalho sem quebrar o layout
- **AND** os controles não forçam largura total que desloque ou estoure o cabeçalho

#### Scenario: Mobile preserva combo de ordenação

- **WHEN** a seção "Minhas Ações" é exibida em largura ≤640px
- **THEN** a ordenação continua como combo de campo + botão de direção, sem rolagem horizontal

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

