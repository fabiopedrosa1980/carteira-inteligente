## Context

Quatro ajustes de CSS/HTML em componentes standalone, sem mudança de estado/serviços:

- **Card** (`stock-card`): no mobile (≤640px) `.card-top` usa `flex-wrap: wrap`, então em cards estreitos a Nota (irmã de `.identity`, com `margin-left:auto`) pode cair para uma segunda linha.
- **Ordenação** (`dashboard`): `isMobile()` é `≤600px` → abaixo disso renderiza `.sort-mobile` (combo). Acima, renderiza `app-scroll-bar.sort-controls`. Mas `.sort-controls { width:100% }` é incondicional; `.section-header` só vira coluna em `≤640px`. Acima de 640px o `width:100%` empurra a barra para uma linha inteira abaixo do título — o "quebra de layout" no desktop.
- **Histórico** (`dividend-history`): a coluna "Tipo" usa `<span class="badge ...">` com `typeClass`/`typeLabel`. O usuário quer texto normal.
- **Metas** (`goals`): em `≤480px` já oculta "Valor Alvo" (col 3), mas a tabela ainda estoura; falta ocultar mais coluna.

## Goals / Non-Goals

**Goals:**
- Nota sempre na mesma linha do ticker (sem wrap), nome truncando.
- Controles de ordenação no desktop sem quebrar o cabeçalho; mobile mantém combo.
- "Tipo" do Histórico como texto normal alinhado aos demais campos.
- Metas no mobile cabe sem estouro ocultando coluna adicional.

**Non-Goals:**
- Mudar lógica de ordenação, cálculo de progresso ou filtro.
- Alterar o combo de ordenação do mobile.

## Decisions

- **Card — Nota inline**: trocar `flex-wrap: wrap` por `nowrap` no `.card-top` do mobile, mantendo `.identity { min-width: 0 }` (nome trunca) e `.card-nota { flex-shrink: 0 }`. Alternativa: mover a Nota para dentro de `.identity` na linha do ticker — descartada por exigir reestruturar o markup sem ganho.

- **Ordenação desktop**: escopar `width:100%; align-self:stretch` de `.sort-controls` apenas em `≤640px` (quando o cabeçalho vira coluna). No desktop usar `flex: 0 1 auto; min-width:0; max-width:100%` para a barra dimensionar pelo conteúdo e conviver à direita do título sem quebrar, preservando a rolagem interna do `app-scroll-bar` quando faltar espaço. Alternativa: remover o `app-scroll-bar` no desktop — descartada por perder o fallback de rolagem em telas médias.

- **Histórico — Tipo texto**: no HTML, substituir o `<span class="badge ...">{{ typeLabel(...) }}</span>` por `{{ typeLabel(d.type) }}` puro. Manter `typeLabel`; remover o uso de `typeClass` e os estilos `.badge*` (ou deixá-los inertes). A `td` já trunca/contém no mobile. Alternativa: manter badge só no desktop — descartada, o pedido é texto normal igual aos demais campos.

- **Metas — ocultar coluna**: em `≤480px`, além de "Valor Alvo" (col 3), ocultar também "Valor Atual" (col 2), mantendo Meta, Progresso e Operação (editar/excluir). Reproporcionar as 3 colunas visíveis (Meta ~52%, Progresso ~24%, Operação ~24%). Mantém todas as ações e o indicador-chave (progresso %). Alternativa: ocultar "Operação" — descartada por remover acesso a excluir.

## Risks / Trade-offs

- [Nota muito grande empurrando o ticker em telas minúsculas] → Nota é numérica curta com `flex-shrink:0`; o nome (não o ticker) é quem cede espaço via ellipsis.
- [No desktop, muitos campos de ordenação ainda assim não cabem] → o `app-scroll-bar` mantém a rolagem interna como fallback; não quebra o cabeçalho.
- [Perda de "Valor Atual" no mobile de Metas] → aceitável; o progresso % comunica o avanço e o valor permanece visível ao editar a meta.
