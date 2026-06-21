## ADDED Requirements

### Requirement: Total por tipo centralizado no acordeão (web)

No cabeçalho de cada seção do acordeão da tela de Lançamentos, na visão **web/desktop**, o **total do tipo** (soma dos lançamentos da seção) MUST ser exibido **centralizado** horizontalmente no cabeçalho, e não encostado à direita junto ao chevron. O rótulo/contagem do tipo permanece à esquerda e o chevron de expandir/recolher permanece à direita; o total ocupa a região central.

#### Scenario: Total centralizado na web

- **WHEN** a tela de Lançamentos é exibida em largura de tela web/desktop e a seção possui total maior que zero
- **THEN** o total do tipo aparece centralizado no cabeçalho do acordeão
- **AND** o rótulo do tipo permanece à esquerda e o chevron permanece à direita

#### Scenario: Seção sem total

- **WHEN** a seção não possui lançamentos (total igual a zero)
- **THEN** o total não é exibido e o layout do cabeçalho permanece consistente
