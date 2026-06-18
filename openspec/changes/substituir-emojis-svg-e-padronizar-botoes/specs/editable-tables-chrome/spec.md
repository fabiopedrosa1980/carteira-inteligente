## MODIFIED Requirements

### Requirement: Ícones SVG nas tabelas editáveis

As telas com tabelas e listas (Meus Ativos, Minhas Ações, Metas, Dividendos) e seus modais SHALL usar ícones vetoriais (SVG) de traço em todos os pontos pictográficos — ações, estados vazios, avisos, confirmações e cabeçalhos de modal — sem emojis. Glifos direcionais tipográficos (setas ↑ ↓ ←) podem permanecer como texto.

#### Scenario: Estados vazios em SVG
- **WHEN** uma lista vazia é exibida (sem lançamentos, sem ações, sem metas)
- **THEN** o estado vazio usa um ícone SVG, não um emoji

#### Scenario: Avisos e confirmações em SVG
- **WHEN** um aviso (erro/processamento) ou diálogo de confirmação é exibido
- **THEN** o ícone de alerta é SVG, não emoji

#### Scenario: Modais em SVG
- **WHEN** um modal (lançamento, ativo) é exibido
- **THEN** o ícone do cabeçalho, o botão de fechar e o check de salvar usam SVG
