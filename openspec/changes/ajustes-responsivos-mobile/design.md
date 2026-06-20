## Context

São quatro ajustes de responsividade pontuais, todos resolvidos em template (HTML) e estilos (SCSS) de componentes Angular standalone, sem tocar serviços, modelos ou API. O projeto já usa media queries com breakpoints de 768px, 640px, 600px, 480px e 380px. Os pontos afetados:

- `dashboard.html` / `dashboard.scss`: cabeçalho (`.dashboard-header`, `.logo`, `.header-actions`), abas (`.tab-nav`) e grid (`.stocks-grid`).
- `stock-card.scss`: já tem proteções `min-width: 0` e `overflow-wrap`; precisa reforço para o cenário de 2 colunas.
- `dividends.html` / `dividends.scss`: submenus `.dv-asset-toggle` e `.dv-tabs`.
- `dividend-history.html` / `dividend-history.scss`: `.dh-selector` (Ativo) e `.dh-years` (chips de ano).

## Goals / Non-Goals

**Goals:**
- Cabeçalho: logo na 1ª linha, ações na 2ª linha alinhadas à direita no mobile (≤ 600px).
- Cards de Minhas Ações: 2 por linha no mobile sem overflow horizontal.
- Menus (abas) e submenus (Dividendos) cabem ou rolam sem quebrar a página no mobile.
- Histórico: anos como `<select>` na mesma linha que "Ativo" no mobile (≤ 480px); chips mantidos no desktop.

**Non-Goals:**
- Redesenhar a navegação ou introduzir menu hambúrguer/drawer.
- Alterar comportamento de filtragem/dados (o combo de anos reusa a lógica existente `selectYear`).
- Mudar o layout desktop além do necessário.

## Decisions

- **Cabeçalho via `flex-wrap` + ordem.** Manter `.dashboard-header` como flex com `flex-wrap: wrap`; no breakpoint ≤ 600px, dar `flex: 1 1 100%` ao `.header-left` (logo) e a `.header-actions` para forçar quebra, com `justify-content: flex-end` nas ações para alinhar à direita. Alternativa descartada: grid com áreas nomeadas — mais verboso para um caso simples de empilhar duas faixas.
- **Cards: reforçar contenção do grid e do card.** `.stocks-grid` já usa `repeat(2, 1fr)` em ≤ 640px; garantir `min-width: 0` nos itens do grid e manter as proteções já existentes em `stock-card.scss` (`min-width: 0`, `overflow-wrap: anywhere`). Ajustar paddings/fontes se algum conteúdo ainda empurrar a coluna. Alternativa descartada: 1 card por linha no mobile — contraria o pedido de 2 por linha.
- **Combo de anos: dois elementos, alternados por CSS, não recriação de estado.** Renderizar tanto os chips (`.dh-years`) quanto um `<select>` de anos no template; exibir o `<select>` apenas em ≤ 480px e ocultar os chips, e vice-versa, via media query (`display`). O `<select>` reusa `availableYears()`, `selectedYear()` e chama o mesmo `selectYear(...)` (mapeando o valor "Todos" para `null`). Posicionar `<select>` de anos dentro/ao lado de `.dh-selector` para ficar na mesma linha que "Ativo". Alternativa descartada: trocar a estrutura via `*ngIf` baseado em largura de tela em TS — adiciona lógica de resize desnecessária; CSS é suficiente e mais robusto.
- **Submenus: `flex` com rolagem horizontal contida.** Aplicar em `.dv-asset-toggle` e `.dv-tabs` o mesmo padrão já usado em `.tab-nav`/`.dh-years` no mobile (`flex-wrap: nowrap; overflow-x: auto; scrollbar oculta; itens `flex-shrink: 0`), garantindo que a rolagem fique no container e não na página.

## Risks / Trade-offs

- [Chips e select duplicados no DOM podem divergir] → Ambos derivam das mesmas signals (`availableYears`, `selectedYear`) e chamam `selectYear`; só a visibilidade muda por CSS, então não há estado duplicado.
- [Empurrar ações para a 2ª linha pode aumentar a altura do header sticky e reduzir área útil no mobile] → Aceitável; paddings já são reduzidos nos breakpoints; o ganho de legibilidade compensa.
- [Mapear opção "Todos" no `<select>`] → Usar um valor sentinela (ex.: string vazia ou `"all"`) convertido para `null` no handler para casar com `selectYear(null)`.
