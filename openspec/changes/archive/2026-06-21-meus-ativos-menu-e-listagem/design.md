## Context

A aba `portfolio` (`DashboardComponent`) exibe "Minhas Ações" carregando dados de `BackendApiService.getAcoes()`. A aba `meus-ativos` (primeira posição) exibe "Lançamentos" (`MyAssetsComponent`). Os controles de ordenação global — chips de campo no desktop e combo + botão de direção no mobile — vivem no cabeçalho da seção dentro de `dashboard.html`. O `StockCardComponent` exibe `Hoje`, `DY` e `Nota` na sua stat-strip.

## Goals / Non-Goals

**Goals:**
- Renomear o rótulo da aba `portfolio` de "Minhas Ações" para "Meus Ativos" e movê-la para a primeira posição no array `tabs`.
- Exibir na tela todos os ativos da carteira, independentemente do tipo (Ações, FIIs, ETFs), agrupados ou não por tipo conforme necessário para legibilidade.
- Remover os controles de ordenação global do cabeçalho (chips desktop + combo/botão mobile); manter apenas ordenação via clique nos cabeçalhos de coluna da visão em lista.
- Remover `Hoje`, `DY` e `Nota` do `StockCardComponent`.

**Non-Goals:**
- Mudanças no backend ou nos endpoints da API.
- Alterar a lógica de cálculo de saldo/variação/rentabilidade.
- Modificar a aba "Lançamentos" (`meus-ativos`) ou qualquer outra aba.
- Criar filtros por tipo de ativo dentro da tela.

## Decisions

**1 — Ordem e rótulo da aba**

O array `tabs` em `DashboardComponent` é reordenado colocando o item `{ id: 'portfolio', label: 'Meus Ativos' }` na posição 0. O `id` permanece `'portfolio'` para não quebrar referências internas (`activeTab`, `goHome`, `refreshActiveTab`).

**2 — FIIs e ETFs na mesma listagem**

O endpoint `getAcoes()` retorna os ativos do portfólio cadastrado no backend; se FIIs e ETFs já estiverem cadastrados lá, eles chegam na mesma chamada. O campo `sector` atualmente é hardcoded como `'Ações'` no mapeamento de `loadAcoes()` — isso será removido, usando o valor que o backend enviar (ou derivado do ticker/tipo). Se o backend não diferenciar tipos, a separação visual pode ser omitida por ora; a tela ainda exibirá todos os tickers cadastrados.

Alternativa considerada: carregar FIIs/ETFs com chamadas separadas. Rejeitada por adicionar complexidade e latência sem garantia de que endpoints existam.

**3 — Ordenação migra para cabeçalhos de coluna**

Os sinais `sortField` e `sortAsc` em `DashboardComponent` são mantidos. Os `<th>` da tabela de lista recebem `(click)="setSort(field)"` e exibem seta indicativa. Os controles de ordenação do cabeçalho (`sort-controls` desktop e `sort-mobile` mobile) e o `ScrollBarComponent` são removidos da seção.

Alternativa considerada: manter sort global no mobile e remover apenas no desktop. Rejeitada: a proposta é clara em remover toda ordenação global.

**4 — Remoção de Hoje, DY e Nota do card**

No `stock-card.html`, os blocos do `Hoje` (div.stat + span.stat-sep), `DY` (div.stat) e o `<span class="card-nota">` são removidos. A stat-strip passa a conter apenas a `sector-tag`. Se a tag de setor for o único elemento, o espaçamento da faixa deve ser revisado (pode ficar vazia para ativos sem setor diferente de 'Ações').

## Risks / Trade-offs

- **Backend não devolve FIIs/ETFs via `getAcoes()`** → Nesse caso a tela continuará mostrando apenas ações. Aceitável como estado transitório; a spec define a intenção, a implementação confirma com o backend real.
- **Stat-strip vazia em cards** → Remover Hoje, DY e Nota pode deixar a faixa inferior do card visualmente vazia para a maioria dos ativos. Mitigation: remover o espaçamento da stat-strip quando não houver conteúdo, ou remover o elemento por completo.
- **Ordenação por coluna inexistente nos campos DY e Nota** → Os sort options `dy` e `nota` podem ser mantidos internamente mas sem botão de acionamento. Como não há mais UI para esses campos, o `sortField` inicial pode ser redefinido para `'name'` (já era o padrão).
