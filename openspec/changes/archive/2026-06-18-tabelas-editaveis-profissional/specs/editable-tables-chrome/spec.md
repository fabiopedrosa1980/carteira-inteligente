## ADDED Requirements

### Requirement: Ícones SVG nas tabelas editáveis

As ações das tabelas editáveis (editar e excluir, em Meus Ativos e Metas) e os ícones de seção do acordeão de Meus Ativos SHALL usar ícones vetoriais (SVG) de traço, sem emojis, herdando a cor por `currentColor`, com hover e foco visíveis.

#### Scenario: Ações com ícones SVG
- **WHEN** uma linha editável (lançamento ou meta) é exibida
- **THEN** os botões de editar e excluir mostram ícones SVG (lápis e lixeira), não emojis

#### Scenario: Ícones de seção SVG
- **WHEN** o acordeão de Meus Ativos é exibido
- **THEN** as seções FIIs e ETFs mostram ícones SVG de traço (Ações permanece sem ícone)

### Requirement: Cores padronizadas nas listas

As listas (tabelas de lançamentos e de metas, e os badges/totais do acordeão) SHALL usar os tokens semânticos de cor (`--accent`, `--color-neg`) para tints e destaques, via `color-mix`, em vez de valores `rgba()` fixos, de modo a manter coerência entre tema claro e escuro.

#### Scenario: Tints coerentes com o tema
- **WHEN** uma lista é exibida em qualquer tema
- **THEN** badges, totais, hovers e botões de ação usam o verde/vermelho do tema (sem cor fixa que destoe do accent atual)

#### Scenario: Excluir em vermelho semântico
- **WHEN** o usuário passa o cursor sobre o botão de excluir
- **THEN** ele usa o vermelho do token `--color-neg`
