## Context

A matriz do Radar (`DividendsRadarComponent`) destaca colunas via `isTopCol(i)`/`isNextCol(i)` (tint + ícone de atenção no cabeçalho do próximo mês). O cabeçalho mostra `monthLabels` (Jan…Dez). A aba Histórico (`dividend-history.html`) usa o padrão `.th-full`/`.th-short` para rótulos responsivos; a coluna de data-com tem `th-full="Data Com"` e `th-short="Com"`.

## Goals / Non-Goals

**Goals:**
- Matriz neutra, sem destaques de coluna.
- Mobile: inicial única do mês no Radar.
- Histórico: rótulo curto "Dt Com".

**Non-Goals:**
- Mudar a lógica de dados/marcação da matriz, ou os rótulos completos (desktop).
- Tocar em outras colunas do Histórico.

## Decisions

**1. Remover destaques (Radar).** Tirar do template os `[class.top]`/`[class.next]` em `.rm-month` e `.rm-cell`, e o `<svg class="rm-warn">`. Remover do SCSS `.rm-month.top/.next`, `.rm-cell.top/.next`, `.rm-cell.on.top .rm-dot` e `.rm-warn`. No TS, remover `nextMonth`, `topMonth`, `isTopCol`, `isNextCol` (ficam sem uso). `marks`/dados permanecem.

**2. Inicial no mobile.** Reaproveitar o padrão `.th-full`/`.th-short` do Histórico: no `.rm-month`, renderizar `<span class="rm-m-full">{{ label }}</span><span class="rm-m-ini">{{ initial }}</span>`. As iniciais vêm de um array no componente (`monthInitials = ['J','F','M','A','M','J','J','A','S','O','N','D']`) alinhado a `monthLabels`. Default: full visível, inicial oculta; em `@media (max-width: 480px)`: inverter (`rm-m-full { display:none }`, `rm-m-ini { display:inline }`). Em mobile dá também para estreitar as colunas (min menor) já que cabe 1 letra.

**3. Histórico "Dt Com".** Alterar o texto do `.th-short` da coluna de data-com de "Com" para "Dt Com". `.th-full` ("Data Com") inalterado.

## Risks / Trade-offs

- [Iniciais ambíguas] várias iniciais repetem (Mar/Mai = M, Jun/Jul = J, Jan = J). Aceitável: a ordem das 12 colunas é fixa e conhecida; o mobile prioriza caber. Mantém o `title` na célula com o mês por extenso para desambiguar.
- [Perda dos destaques] sai a sinalização de melhor/próximo mês; era o pedido (leitura limpa). Caso volte a fazer falta, é reversível.
