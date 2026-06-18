## MODIFIED Requirements

### Requirement: Header de página padronizado

Todas as páginas/abas principais (Meus Ativos, Minhas Ações, Dividendos, Metas) SHALL exibir um header de página no mesmo padrão visual: título com peso 700 e tamanho 20px, sem ícone, e subtítulo de 13px na cor secundária. As margens do título e do subtítulo SHALL ser consistentes entre as páginas.

#### Scenario: Títulos consistentes entre abas
- **WHEN** o usuário navega entre as abas Meus Ativos, Minhas Ações, Dividendos e Metas
- **THEN** o título de cada página tem o mesmo tamanho, peso e espaçamento, sem ícone

#### Scenario: Header sem ícone
- **WHEN** qualquer página principal é exibida
- **THEN** o título mostra apenas o texto, sem emoji/ícone à esquerda

### Requirement: Rótulos das sub-tabs de Dividendos no mobile

No mobile, as sub-tabs de Dividendos (Histórico, Recebidos, Projetados) SHALL exibir seus rótulos de texto, e não apenas os ícones.

#### Scenario: Rótulos visíveis no mobile
- **WHEN** a aba Dividendos é exibida em tela estreita (mobile)
- **THEN** cada sub-tab mostra seu título (Histórico, Recebidos, Projetados) ao lado do ícone, sem ocultar o texto
