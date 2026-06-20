## Why

No mobile, navegação por uma barra superior rolável é menos ergonômica que o padrão de apps nativos: uma **barra inferior fixa com ícones**, sempre ao alcance do polegar. Além disso, os submenus de Dividendos hoje rolam horizontalmente no mobile; com poucos itens, é melhor que **caibam sem rolagem**. Esta mudança revê o comportamento mobile dos menus definido em `responsive-menu-bar`.

## What Changes

- **Menu principal vira barra inferior no mobile**: em telas estreitas, a navegação principal (Lançamentos, Minhas Ações, Dividendos, Metas) passa a ser uma barra **fixa na parte inferior**, com ícone + rótulo curto empilhados, 4 itens distribuídos igualmente, sem rolagem. No desktop, permanece como abas no topo.
- **Conteúdo respeita a barra inferior**: a área de conteúdo ganha espaço inferior (incluindo safe-area do iOS) para não ficar encoberta pela barra fixa.
- **Submenus de Dividendos sem scroll no mobile**: o seletor de classe de ativo (Ações/FIIs) e as abas internas (Histórico/Recebidos/Projetados/Radar) passam a **caber** na largura (colunas iguais, ícone + rótulo compacto), em vez de rolar horizontalmente. Deixam de usar `<app-scroll-bar>`.

## Capabilities

### New Capabilities
<!-- Nenhuma capability nova; o comportamento se encaixa em responsive-menu-bar. -->

### Modified Capabilities
- `responsive-menu-bar`: o requisito de que os menus usam a barra rolável muda no mobile — a navegação principal vira barra inferior de ícones e os submenus de Dividendos cabem sem rolar.

## Impact

- `src/app/components/dashboard/dashboard.html` / `dashboard.scss` — navegação principal vira barra inferior fixa no mobile; `.content` ganha padding inferior + safe-area; `.tab-nav` deixa de usar `<app-scroll-bar>`.
- `src/app/components/dividends/dividends.html` / `dividends.scss` — submenus deixam de usar `<app-scroll-bar>`; passam a caber sem rolagem no mobile (colunas iguais).
- `<app-scroll-bar>` e `ResponsiveService` continuam existindo (usados por ordenação de Minhas Ações e chips do Histórico); nenhuma dependência nova.
- Apenas template/estilos; sem mudança em serviços, modelos ou API.
