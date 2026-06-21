## Context

A tela "Minhas Ações" (aba `portfolio` no DashboardComponent) já tem toggle cards/lista implementado. O `viewMode` é um `signal<ViewMode>('cards')` sem persistência em localStorage. A tabela lista já tem CSS responsivo mas pode ter colunas coladas em telas ~360px. Na tela de Lançamentos (MyAssetsComponent), o agrupamento por ticker foi implementado com `grouped`, `groupedData`, `pagedGrouped` e UI separada, consumindo ~80 linhas de lógica e ~60 linhas de CSS que podem ser removidas.

## Goals / Non-Goals

**Goals:**
- Alterar o padrão inicial da visão de Minhas Ações de `'cards'` para `'list'`
- Garantir que a tabela lista seja legível em mobile (~360px) sem rolagem horizontal
- Remover completamente o toggle "Agrupar por ticker" e toda a lógica associada do componente Lançamentos

**Non-Goals:**
- Persistir o viewMode em localStorage (não foi pedido)
- Redesenhar a lógica de ordenação da lista
- Alterar o comportamento da tabela detalhada de Lançamentos (não-agrupada)

## Decisions

**D1 — Mudar apenas o valor inicial do signal**
Alterar `signal<ViewMode>('cards')` → `signal<ViewMode>('list')` em `dashboard.ts`. O toggle cards/lista permanece funcional. Alternativa de remover o toggle foi descartada: o usuário ainda pode preferir cards em algum momento.

**D2 — Mobile da tabela lista: ajuste de padding e colgroup**
A tabela usa `table-layout: fixed` com `colgroup` definindo larguras via classes CSS. No breakpoint ≤640px, colunas 2, 3, 4 e 6 são ocultadas (`display: none`), deixando Ativo, Saldo e Rent. As larguras do colgroup precisam refletir esse estado para caber em ~360px sem `overflow-x`. Apenas ajustes CSS — sem mudanças de HTML.

**D3 — Remoção completa do agrupamento em Lançamentos**
Deletar: interface `GroupedRow`, constante `GROUPED_KEY`, métodos `readGrouped`/`toggleGrouped`/`groupRows`/`pagedGrouped`, signals `grouped`/`groupedData`. Simplificar `rowsCount` para usar só `sectionData`. Remover do HTML o botão `ma-group-toggle` e o bloco `*ngIf="grouped()"`. Remover do SCSS os blocos `.ma-group-toggle` e `.transactions-table.grouped`. Alternativa de manter como feature flag foi descartada: a proposta é remoção definitiva.

## Risks / Trade-offs

- [Usuários que usavam o agrupamento perdem a funcionalidade] → Funcionalidade considerada não essencial dado o pedido; sem migração necessária pois é in-memory sem backend.
- [Mudar padrão para lista pode surpreender usuários acostumados com cards] → Risco baixo; o toggle continua disponível.
- [Colgroup com `table-layout: fixed` pode gerar colunas com largura zero se os valores não somarem 100%] → Mitigado usando larguras relativas e testando em ~360px.
