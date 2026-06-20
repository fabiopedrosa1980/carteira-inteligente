## Context

Três ajustes de UI independentes em componentes standalone Angular 21, sem mudança de estado, serviços ou modelos. Cada um toca apenas HTML/SCSS de um componente:

- **Card** (`stock-card`): Nota hoje vive no `stat-strip` (rodapé) com rótulo "Nota". O topo (`card-top` → `identity`) tem ticker + nome empilhados à esquerda.
- **Metas** (`goals`): tabela com `table-layout: fixed`. No mobile (≤480px) já oculta a coluna "Valor Alvo" e reproporciona as demais. Há relato de corte de texto.
- **Histórico** (`dividend-history`): filtro de anos é `.dh-years` com `.dh-year-chip` (chips que quebram linha). Já existe um padrão de `select` no mesmo componente (`.dh-selector` com `.dh-label` "Ativo" + `.dh-select`).

## Goals / Non-Goals

**Goals:**
- Nota no topo do card, mesma linha do ticker, alinhada à direita, sem rótulo.
- Metas legível no mobile sem corte de texto e sem scroll horizontal.
- Filtro de anos como combo com rótulo "Ano" no mobile; chips no desktop.

**Non-Goals:**
- Mudar lógica de cálculo de Nota, progresso de metas ou filtro de dividendos.
- Alterar desktop do card ou de Metas além do necessário.
- Persistência ou API.

## Decisions

- **Card — Nota no topo**: adicionar a Nota como elemento dentro de `.card-top`, após `.identity`, com `margin-left: auto` para empurrar à direita. Reaproveitar a classe `notaClass` (cores por faixa). Remover o bloco `.stat` da Nota e o `.stat-sep` associado do `stat-strip`. Renderizar só quando `stock.nota > 0`. Alternativa descartada: manter no rodapé sem rótulo — não atende ao pedido de alinhar ao ticker.

- **Metas — sem corte no mobile**: a causa provável do corte é `white-space: nowrap` + colunas estreitas e/ou padding. Permitir quebra de linha nas células de texto no mobile (`white-space: normal`, `word-break`) e revisar larguras de `colgroup` no breakpoint ≤480px para que nome e valores caibam. Manter `overflow-x: hidden` (sem scroll). Alternativa: reduzir fonte agressivamente — descartada por prejudicar legibilidade.

- **Histórico — combo no mobile, chips no desktop**: reutilizar o padrão existente `.dh-selector`/`.dh-label`/`.dh-select`. Adicionar um bloco combo de ano (label "Ano" + `select` com opção "Todos" + anos) visível só no mobile, e manter `.dh-years` (chips) visível só no desktop, via media query (`display: none` cruzado em 480px). O `select` chama `selectYear(...)` reusando a lógica atual (`null` para "Todos"). Alternativa: substituir totalmente os chips por combo em todas as larguras — descartada porque o desktop com chips já funciona bem e o pedido é específico para mobile.

## Risks / Trade-offs

- [Nota empurrando o nome longo do ticker/empresa no topo] → `min-width: 0` no `.identity` e `margin-left: auto`/`flex-shrink: 0` na Nota para o nome truncar com ellipsis sem estourar.
- [Duplicação de markup do filtro de anos (chips + combo)] → mínimo de markup; alternância só por CSS `display`, sem lógica duplicada (mesmo handler `selectYear`).
- [Quebra de linha em Metas mudando a altura das linhas] → aceitável; melhora legibilidade e evita corte.
