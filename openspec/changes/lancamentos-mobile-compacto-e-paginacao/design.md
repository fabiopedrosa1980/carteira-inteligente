## Context

`MyAssetsComponent` tem `sectionData` (detalhado por seção) e `groupedData` (agrupado por seção); o template renderiza tabela detalhada (`!grouped()`) ou agrupada (`grouped()`) dentro de cada acordeão (Acoes/FIIs/ETFs). A tabela detalhada usa grid `repeat(5,1fr) 72px`; no mobile já vira `repeat(4,1fr) 56px` ocultando o **Preço** (`.price-cell` + header nth-child(4)). O `dividend-history` já tem o padrão de paginação (`PAGE_SIZE=10`, `page` signal, `totalPages`, `pageItems`, `prev/next`, `showPagination`). Não há paginação no `my-assets`.

## Goals / Non-Goals

**Goals:**
- Mobile detalhado: Ativo · Qtd · Total · ações; fonte maior.
- Paginação 10/página por seção (detalhado e agrupado).

**Non-Goals:**
- Mudar o desktop (todas as colunas) ou a visão agrupada em cards no mobile.
- Persistir a página entre sessões.

## Decisions

**1. Paginação por seção.** `PAGE_SIZE = 10`. Estado `pages = signal<Record<AssetType, number>>({})`; `pageOf(sec)` (default 0). Helpers por seção:
- `rowsOf(sec)` = `grouped() ? groupedData()[sec] : sectionData()[sec]` (a lista vigente).
- `totalPages(sec)` = `max(1, ceil(rowsOf.length / 10))`.
- `pageClamped(sec)` = `min(pageOf(sec), totalPages-1)`.
- `pagedDetailed(sec)` / `pagedGrouped(sec)` = slice de 10 a partir de `pageClamped`.
- `showPager(sec)` = `rowsOf.length > 10`.
- `prevPage(sec)`/`nextPage(sec)`/`setPage(sec,n)` atualizam o `pages`.

O template passa a iterar `pagedDetailed(sec.id)` / `pagedGrouped(sec.id)`. O clamp cobre remoções/troca de modo sem página fora do intervalo.

**2. Controles de paginação.** Mirar o `dh-pagination`: Anterior / "X / Y" / Próxima, por seção, exibido quando `showPager`. Botões desabilitados nos limites.

**3. Mobile compacto (detalhado).** No `@media (max-width: 600px)` da tabela detalhada: grid `repeat(3,1fr) 56px` (4 colunas); ocultar **Data** (`.date-cell` + header nth-child(2)) além do **Preço** já oculto; manter Ativo · Qtd · Total · ações. Aumentar a fonte (linha ~14px; ticker/valores um pouco maiores). Não afeta a visão agrupada (cards) nem o desktop.

## Risks / Trade-offs

- [Página por seção em memória] reset ao recarregar; aceitável.
- [Contaderes da seção] o badge de contagem segue mostrando o total de itens (não o da página) — correto.
- [Interação com agrupado] como `rowsOf` troca conforme `grouped()`, o clamp evita páginas inválidas ao alternar.
