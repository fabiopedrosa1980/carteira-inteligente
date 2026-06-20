## Context

A navegação principal (`.tab-nav`, 4 abas com `iconPath` + label) está hoje envolta em `<app-scroll-bar>` (uma linha rolável). Os submenus de Dividendos (`.dv-asset-toggle` pill 2 itens; `.dv-tabs` 4 abas com ícone) também usam `<app-scroll-bar>`. Esta mudança revê o comportamento mobile: barra inferior fixa para o menu principal e submenus que cabem sem rolar. `ResponsiveService.isMobile()` (≤ 600px) já existe.

## Goals / Non-Goals

**Goals:**
- Menu principal como barra inferior fixa de ícones no mobile; abas no topo no desktop.
- Conteúdo com padding inferior + `env(safe-area-inset-bottom)` para não ficar sob a barra.
- Submenus de Dividendos cabem sem rolar no mobile (colunas iguais, ícone + rótulo compacto).
- Reutilizar o `<app-scroll-bar>` apenas onde ainda faz sentido (ordenação, chips do Histórico).

**Non-Goals:**
- Trocar os ícones existentes ou adicionar novos itens de menu.
- Drawer/hambúrguer ou animações de transição entre telas.
- Mexer no header (logo/ações) ou em outras telas.

## Decisions

- **Menu principal: alternar layout por CSS, sem JS extra.** `.tab-nav` deixa de ser `<app-scroll-bar>` e volta a ser `<nav class="tab-nav">`. No desktop, mantém o visual atual (abas no topo). Em `@media (max-width: 600px)`, recebe `position: fixed; left/right/bottom: 0; z-index` alto, `border-top`, fundo, e os botões viram `flex: 1` com ícone acima do rótulo (`flex-direction: column`), rótulo pequeno. Racional: 4 itens cabem com folga numa barra inferior; CSS puro evita lógica de viewport em TS. Alternativa descartada: manter `<app-scroll-bar>` e reposicionar — o `flex-shrink: 0` interno brigaria com `flex: 1` dos itens.
- **Safe-area e espaço de conteúdo.** A barra recebe `padding-bottom: env(safe-area-inset-bottom)`. `.content` recebe, no mobile, `padding-bottom` igual à altura da barra + safe-area, garantindo que o último conteúdo não fique encoberto. Alternativa descartada: `scroll-padding` apenas — não resolve o último elemento estático.
- **Submenus sem scroll: colunas iguais.** `.dv-asset-toggle` e `.dv-tabs` deixam de usar `<app-scroll-bar>`. No mobile, `.dv-tabs` vira `display: flex` com `.dv-tab { flex: 1; justify-content: center }`, ícone + rótulo compacto (fonte menor), sem rolagem; `.dv-asset-toggle` (2 itens) continua pílula, podendo ocupar largura total com itens `flex: 1`. Racional: poucos itens cabem; "não rolar" exige que encolham (o oposto do `flex-shrink: 0` da scroll-bar). Alternativa descartada: grid 2×2 para as 4 abas — ocuparia mais altura vertical sem ganho.
- **`<app-scroll-bar>` permanece.** Continua usado por `.sort-controls` (Minhas Ações) e pelos chips de ano (Histórico, desktop). O componente não é removido.

## Risks / Trade-offs

- [Barra inferior fixa cobre conteúdo] → Mitigado com `padding-bottom` no `.content` calculado a partir da altura da barra + safe-area.
- [Rótulos longos nas abas (ex.: "Projetados", "Minhas Ações") no mobile] → Fonte reduzida e `text-overflow: ellipsis`/quebra controlada; ícone garante reconhecimento mesmo se o rótulo truncar.
- [z-index da barra inferior vs. modais] → Definir z-index abaixo dos overlays de modal (modais usam camada superior) para a barra não cobrir diálogos.
- [Reduzir uso do `<app-scroll-bar>` pode parecer regressão do change anterior] → É evolução consciente do design mobile; o componente segue válido nos demais usos.
