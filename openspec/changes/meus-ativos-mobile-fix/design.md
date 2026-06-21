## Context

A tela de Lançamentos funciona corretamente no mobile usando CSS Grid com `minmax(0, 1fr)` — as linhas ficam diretamente dentro do `.accordion-inner` sem wrapper extra. A tela de Meus Ativos usa HTML `<table>` + `table-layout: fixed` dentro de `.acoes-list-wrap` (card dentro de card).

## Goals / Non-Goals

**Goals:**
- Lista renderiza sem overflow horizontal em 375px
- Visual idêntico ao desktop (apenas colunas ocultas mudam)
- Sem regressão no desktop

**Non-Goals:**
- Migrar para CSS Grid (a tabela HTML funciona bem no desktop; manter)
- Alterar quais colunas são visíveis (já definido em change anterior)

## Decisions

### Remover `.acoes-list-wrap`

O `.acoes-list-wrap` cria dupla borda/radius desnecessária. Remover o `<div class="acoes-list-wrap">` do template e mover seus estilos utilitários (`overflow: hidden`) para a própria `.acoes-list` ou para `.accordion-inner` no contexto lista.

HTML antes:
```
.accordion-inner
  .acoes-list-wrap        ← remover este wrapper
    table.acoes-list
```

HTML depois:
```
.accordion-inner.list-inner   ← adicionar classe diferenciadora
  table.acoes-list
```

CSS: `.acoes-list` ganha `width: 100%` explícito (já tem, mas confirmar) e o wrapper de overflow passa para `.accordion-inner` no contexto de lista, ou `.acoes-list` mesmo.

### Adicionar `overflow-x: hidden` na `.acoes-list`

Como salvaguarda para content overflow, adicionar diretamente na tabela.

### Validar no browser antes de commitar

A tarefa inclui abrir http://localhost:4200 em DevTools mobile (375px) e confirmar que a lista não transborda.
