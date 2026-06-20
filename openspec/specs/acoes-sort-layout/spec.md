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

