## REMOVED Requirements

### Requirement: Controles de ordenação de Minhas Ações não quebram o layout no desktop

**Reason**: Os controles de ordenação global (chips no desktop e combo + botão no mobile) foram removidos da seção de Meus Ativos. A ordenação passa a ser feita exclusivamente pelos cabeçalhos de coluna na visão em lista, eliminando a necessidade deste requisito.

**Migration**: Remover o bloco `sort-controls` (desktop) e `sort-mobile` (mobile) do template `dashboard.html`. Remover o uso de `<app-scroll-bar>` na seção de Meus Ativos. A lógica de `sortField`/`sortAsc` é mantida internamente e acionada pelos cabeçalhos de coluna (ver spec `acoes-list-view`).

### Requirement: Rótulo "Ordenar por" não é cortado no desktop

**Reason**: Com a remoção dos controles de ordenação global, o rótulo "Ordenar por" não existe mais na interface.

**Migration**: Não é necessário — o elemento é removido junto com os controles.

### Requirement: Ordenação no mobile inicia em "Nome" sem opção "Padrão"

**Reason**: O combo de ordenação mobile foi removido. O estado inicial de ordenação por "Nome" é mantido internamente no componente para a ordenação por cabeçalho de coluna.

**Migration**: Manter `sortField = signal<SortField>('name')` no componente, mas remover o combo/botão de direção do template mobile.
