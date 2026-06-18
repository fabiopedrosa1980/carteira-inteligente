## MODIFIED Requirements

### Requirement: Ícones das abas por significado

As abas SHALL usar ícones vetoriais de traço (SVG), monocromáticos, que remetam ao significado de cada uma: Meus Ativos a portfólio, Minhas Ações a ações/stocks, Dividendos a calendário/proventos e Metas a objetivo/alvo. Os ícones NÃO SHALL ser emojis.

#### Scenario: Ícones SVG nas abas
- **WHEN** a barra de abas é exibida
- **THEN** cada aba mostra um ícone SVG de traço coerente com seu significado, e não um emoji

#### Scenario: Estado ativo
- **WHEN** uma aba está selecionada
- **THEN** seu ícone e rótulo recebem o realce de estado ativo, com bom contraste
