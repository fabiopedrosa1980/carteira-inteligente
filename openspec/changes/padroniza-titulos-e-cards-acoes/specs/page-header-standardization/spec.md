## ADDED Requirements

### Requirement: Header de página padronizado

Todas as páginas/abas principais (Meus Ativos, Minhas Ações, Dividendos, Metas) SHALL exibir um header de página no mesmo padrão visual: título com peso 700 e tamanho 20px, ícone do mesmo tamanho do título (20px), espaçamento (`gap`) de 8px entre ícone e texto, e subtítulo de 13px na cor secundária. As margens do título e do subtítulo SHALL ser consistentes entre as páginas.

#### Scenario: Título e ícone consistentes entre abas
- **WHEN** o usuário navega entre as abas Meus Ativos, Minhas Ações, Dividendos e Metas
- **THEN** o título e o ícone de cada página têm o mesmo tamanho, peso e espaçamento

#### Scenario: Ícone de Metas alinhado ao padrão
- **WHEN** a aba Metas é exibida
- **THEN** o ícone do título usa o mesmo tamanho das demais páginas (20px), e não 22px

#### Scenario: Dividendos passa a ter header de página
- **WHEN** a aba Dividendos é exibida
- **THEN** um header de página (`📅 Dividendos` + subtítulo) aparece acima das sub-tabs, no mesmo padrão das outras páginas

### Requirement: Rótulos das sub-tabs de Dividendos no mobile

No mobile, as sub-tabs de Dividendos (Histórico, Recebidos, Projetados) SHALL exibir seus rótulos de texto, e não apenas os ícones.

#### Scenario: Rótulos visíveis no mobile
- **WHEN** a aba Dividendos é exibida em tela estreita (mobile)
- **THEN** cada sub-tab mostra seu título (Histórico, Recebidos, Projetados) ao lado do ícone, sem ocultar o texto
