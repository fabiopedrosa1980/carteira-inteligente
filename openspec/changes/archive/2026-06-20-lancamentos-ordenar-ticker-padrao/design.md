## Context

`MyAssetsComponent` ordena a tabela detalhada via `sortField = signal<SortField | null>(null)` e `sortAsc = signal(true)`; `sortRows()` já implementa o caso `'ticker'` (localeCompare pt-BR). `setSort()` alterna a direção/coluna. A visão agrupada já vem ordenada por ticker.

## Goals / Non-Goals

**Goals:** ordenação padrão por ticker (A→Z) na tabela de Lançamentos.

**Non-Goals:** mudar a lógica de `sortRows`/`setSort`, a visão agrupada, ou outras telas.

## Decisions

**1. Default `'ticker'`.** Alterar a inicialização para `sortField = signal<SortField | null>('ticker')` (mantendo `sortAsc = true`). Isso já aciona `sortRows` no estado inicial; o cabeçalho mostra "Ativo" como coluna ativa ascendente. O usuário pode reordenar normalmente.

## Risks / Trade-offs

- [Nenhum relevante] mudança de estado inicial; reaproveita a ordenação existente.
