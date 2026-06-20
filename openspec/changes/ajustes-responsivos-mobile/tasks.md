## 1. Cabeçalho responsivo (logo em cima, ações embaixo à direita)

- [x] 1.1 Em `dashboard.scss`, adicionar breakpoint (≤ 600px) que faz `.header-left` e `.header-actions` ocuparem largura total (`flex: 1 1 100%`), com `.header-actions` em `justify-content: flex-end`.
- [x] 1.2 Verificar que o logo + título permanecem na 1ª linha e que chip do usuário, tema e sair ficam na 2ª linha alinhados à direita, sem overflow.
- [x] 1.3 Confirmar que o layout em uma linha continua intacto em telas largas (> 600px).

## 2. Cards de Minhas Ações sem quebra no mobile (2 por linha)

- [x] 2.1 Em `dashboard.scss`, garantir `min-width: 0` nos itens do `.stocks-grid` (≤ 640px) para permitir encolhimento das colunas.
- [x] 2.2 Revisar `stock-card.scss` (≤ 640px / ≤ 380px) e reforçar contenção (paddings/fontes/`overflow-wrap`) caso algum conteúdo ainda empurre a coluna.
- [x] 2.3 Validar 2 cards por linha sem rolagem horizontal da página em viewports estreitos.

## 3. Menus e submenus no mobile

- [x] 3.1 Em `dividends.scss`, aplicar a `.dv-asset-toggle` e `.dv-tabs` o padrão mobile (`flex-wrap: nowrap; overflow-x: auto; scrollbar oculta; itens `flex-shrink: 0`) no breakpoint ≤ 480px.
- [x] 3.2 Conferir que a navegação principal por abas (`.tab-nav`) continua cabendo/rolando corretamente no mobile.
- [x] 3.3 Garantir que a rolagem ocorre dentro dos containers de menu/submenu e não gera rolagem horizontal da página.

## 4. Histórico: combo de anos ao lado de "Ativo" no mobile

- [x] 4.1 Em `dividend-history.html`, adicionar um `<select>` de anos (opções de `availableYears()` + "Todos") ao lado do seletor de "Ativo" dentro de `.dh-selector`, chamando `selectYear(...)` no `(change)` (valor sentinela → `null`).
- [x] 4.2 Em `dividend-history.scss`, exibir o `<select>` de anos apenas em ≤ 480px e ocultar os chips `.dh-years`; manter os chips e ocultar o combo em > 480px.
- [x] 4.3 Garantir que `.dh-selector` mantém "Ativo" e o combo de anos na mesma linha no mobile, sem overflow.
- [x] 4.4 Validar que selecionar um ano (ou "Todos") no combo filtra a tabela igual aos chips.

## 5. Verificação final

- [x] 5.1 Rodar `npx prettier --write` nos arquivos alterados e fazer build/serve para checar visualmente nos breakpoints (≤ 600px, ≤ 480px, ≤ 380px).
- [x] 5.2 Commit e push seguindo o workflow do CLAUDE.md (stage específico dos arquivos alterados).
