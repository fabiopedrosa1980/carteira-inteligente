## Why

"Minhas Ações" restringe a tela a ações, mas a carteira já suporta FIIs e ETFs — a nomenclatura confunde e a listagem está incompleta. Além disso, os controles de ordenação global duplicam a função que os cabeçalhos de coluna na visão em lista já podem cumprir, e campos como Hoje, DY e Nota nos cards ocupam espaço sem prioridade para o usuário.

## What Changes

- Menu "Minhas Ações" é renomeado para **Meus Ativos** e passa a ser o **primeiro item** da navegação.
- A tela exibe todos os tipos de ativo da carteira: **Ações, FIIs e ETFs**.
- Os controles de ordenação globais (chips no desktop e combo + botão no mobile) são **removidos**; a ordenação passa a ser feita exclusivamente pelos **cabeçalhos de coluna** na visão em lista.
- Nos cards, os campos **Hoje**, **DY** e **Nota** são removidos.

## Capabilities

### New Capabilities

_(nenhuma — todas as mudanças são sobre comportamentos já cobertos por specs existentes)_

### Modified Capabilities

- `responsive-menu-bar`: item "Meus Ativos" passa a ser o primeiro na navegação principal (antes de Dividendos, Histórico, etc.); rótulo muda de "Minhas Ações" para "Meus Ativos".
- `acoes-list-view`: tela renomeada para "Meus Ativos"; listagem inclui Ações, FIIs e ETFs; controles globais de ordenação são removidos; colunas da lista passam a ter cabeçalhos clicáveis para ordenar.
- `acoes-sort-layout`: spec inteira se torna obsoleta — os controles de ordenação global (chips + combo/botão) são eliminados.
- `stock-card-stat-layout`: a faixa de estatísticas dos cards remove os itens **Hoje**, **DY** e **Nota**; apenas a tag de setor permanece.
- `acoes-card-position`: a referência a "Hoje (`change_percent`)" no card é removida — esse campo não é mais exibido.

## Impact

- `src/app/components/meus-ativos/` (ou equivalente de "Minhas Ações") — renomear rótulos, adicionar suporte a FIIs/ETFs, remover controles de sort global, adicionar sort por coluna.
- `src/app/components/stock-card/` — remover campos Hoje, DY, Nota do template.
- `src/app/app.component.html` (ou componente de navegação) — reordenar itens e atualizar rótulo.
- Sem alterações na API ou no backend.
