## Context

A tela "Meus Ativos" vive na aba `portfolio`, renderizada **inline** em `dashboard.html` (não há componente dedicado). Ela tem hoje:

- Um toggle cards/lista (`viewMode` signal em `dashboard.ts`, padrão `'list'`).
- Acordeões por grupo (Ações/FIIs/ETFs) com o botão de adicionar (`btn-add-tx`) no **cabeçalho** do acordeão.
- Um card de Patrimônio (`.portfolio-summary` / `.ps-hero`) onde Ganho (R$) e Variação (%) aparecem juntos no `.ps-lucro`, sem rótulos.

A aba "Lançamentos" usa o componente `my-assets` (`my-assets.html`), cujo acordeão já tem o botão de adicionar no **rodapé** (`.add-row` > `.btn-add-inline`) — esse é o padrão a adotar.

O Radar (`dividends-radar`) tem visão `cards` e `matrix`. Em `dividends-radar.ts`, `effectiveView` força `cards` quando `isMobile()`, e o toggle é ocultado no mobile via `*ngIf="!isMobile()"`. A matriz já possui regras `@media (max-width: 480px)` no SCSS.

## Goals / Non-Goals

**Goals:**
- Acordeão de Meus Ativos com botão "Adicionar" no rodapé, igual a Lançamentos.
- Remover toggle e visão em cards de Meus Ativos (somente lista).
- Ocultar colunas **Hoje** e **Variação** na lista de Meus Ativos no mobile (≤640px); manter Ativo, Qtd, Preço Médio, Saldo e Rent.
- Rótulos "Ganho" e "Variação" no card de Patrimônio.
- Liberar a visão em matriz do Radar no mobile, com toggle visível.

**Non-Goals:**
- Não extrair Meus Ativos para componente próprio (continua inline em `dashboard`).
- Não alterar cálculos de posição (`position.util.ts`) nem fontes de dados.
- Não redesenhar a matriz do Radar — apenas habilitá-la no mobile com os estilos existentes.

## Decisions

**1. Remoção da visão em cards (dashboard.ts/html/scss)**
- Remover `viewMode`, `setView` e o type `ViewMode` de `dashboard.ts`.
- Em `dashboard.html`: remover o `.view-toggle` do `.section-header`; remover o bloco `@if (viewMode() === 'cards')`; o bloco `@if (viewMode() === 'list')` vira renderização incondicional. `StockCardComponent` deixa de ser usado em Meus Ativos (avaliar remoção do import se não usado em outro lugar do dashboard).
- Remover estilos órfãos da visão em cards (`.accordion-cards`, `.view-toggle`, `.vt-btn`) no SCSS.

**2. Botão de adicionar no rodapé do acordeão (dashboard.html/scss)**
- Remover o `button.btn-add-tx` de dentro do `.accordion-header`.
- Adicionar, ao final do `.accordion-inner` (após a tabela e a paginação), uma `.add-row` com `.btn-add-inline` chamando `openAddTx(group)` — mesmo markup/estilo de `my-assets.html` (linhas 170–182). Reaproveitar/portar os estilos `.add-row` e `.btn-add-inline` de `my-assets.scss` para `dashboard.scss`.

**3. Ocultar Hoje e Variação no mobile (dashboard.scss)**
- As colunas usam `<colgroup>` com classes `cl-hoje` e `cl-var`, e células `th`/`td` posicionais. Em `@media (max-width: 640px)`, aplicar `display: none` às colunas **Hoje** e **Variação** (col + th + td correspondentes via `:nth-child` ou seletores de classe de coluna), mantendo Ativo, Qtd, Preço Médio, Saldo e Rent. Conferir o índice das colunas: Ativo(1) Qtd(2) Preço(3) Hoje(4) Saldo(5) Variação(6) Rent(7) → ocultar `nth-child(4)` e `nth-child(6)`.

**4. Rótulos Ganho/Variação no card de Patrimônio (dashboard.html/scss)**
- Reestruturar o `.ps-lucro` (linhas 103–111) em dois itens rotulados, no mesmo padrão visual de `.ps-stat` (label + value): "Ganho" → `lucroTotal()` em R$ com sinal/cor; "Variação" → `lucroPercent()` em % com sinal/cor; "—" quando `lucroPercent() === null`. Manter classes `.pos`/`.neg` para a cor.

**5. Matriz do Radar no mobile (dividends-radar.ts/html)**
- Em `dividends-radar.ts`: `effectiveView` passa a retornar `this.view()` sempre (remover o ramo `isMobile() ? 'cards'`). Manter `view`/`setView`/persistência.
- Em `dividends-radar.html`: remover `*ngIf="!isMobile()"` do `.radar-view-toggle` para o toggle aparecer no mobile.
- SCSS: a matriz já tem `@media (max-width: 480px)`. Validar 480–640px; se necessário, garantir colunas compactas/sem overflow. `isMobile` pode permanecer injetado caso ainda usado em outro ponto.

## Risks / Trade-offs

- **Matriz larga no mobile**: a matriz tem 13 colunas; em telas muito estreitas pode comprimir demais. Mitigação: usar as regras compactas já existentes (`@media 480px`) e permitir rolagem horizontal contida apenas se inevitável. É uma escolha explícita do usuário (toggle), não o padrão.
- **`StockCardComponent` órfão**: se nada mais no dashboard usar `app-stock-card`, o import vira código morto — remover para manter limpo, mas confirmar antes que não há outro uso.
- **Índices de coluna no SCSS**: ocultar por `nth-child` é frágil se a ordem das colunas mudar; mitigar comentando claramente o mapeamento de colunas no SCSS.
