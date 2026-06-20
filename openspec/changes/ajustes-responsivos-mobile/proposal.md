## Why

No mobile, alguns blocos de interface ainda quebram ou disputam espaço: o cabeçalho tenta manter logo e ícones de ação na mesma linha, os cards de "Minhas Ações" podem estourar a largura com 2 por linha, os menus/submenus ficam apertados e, na tela de histórico de dividendos, os chips de ano consomem uma linha inteira. O objetivo é refinar o comportamento responsivo desses pontos para uma leitura limpa em telas estreitas.

## What Changes

- **Cabeçalho**: em telas estreitas, manter o logo + título "Carteira Inteligente" na primeira linha e empurrar os ícones de ação (chip do usuário, alternar tema, sair) para a linha abaixo, alinhados à direita.
- **Cards de Minhas Ações**: garantir que o grid de 2 cards por linha no mobile não estoure o layout (proteção contra overflow de conteúdo dentro de cada card).
- **Menus e submenus no mobile**: ajustar a navegação principal (abas) e os submenus da área de Dividendos (classe de ativo e abas internas) para caber/rolar corretamente em telas estreitas.
- **Histórico de dividendos**: no mobile, transformar o filtro de anos (atualmente chips) em um combo (`<select>`) e posicioná-lo ao lado do seletor de "Ativo" na mesma linha.

## Capabilities

### New Capabilities
- `responsive-mobile-layout`: comportamento responsivo do cabeçalho, dos cards de ações, dos menus/submenus e do filtro de histórico de dividendos em telas mobile.

### Modified Capabilities
<!-- Nenhuma capability de requisitos existente é alterada. -->

## Impact

- `src/app/components/dashboard/dashboard.html` / `dashboard.scss` — cabeçalho, abas (menu) e grid de cards.
- `src/app/components/stock-card/stock-card.scss` — proteção de overflow do card no mobile.
- `src/app/components/dividends/dividends.html` / `dividends.scss` — submenus (classe de ativo e abas internas).
- `src/app/components/dividend-history/dividend-history.html` / `dividend-history.scss` — filtro de anos como combo ao lado de "Ativo" no mobile.
- Apenas estrutura de template e estilos (CSS/SCSS); sem mudança em serviços, modelos ou contratos de API.
