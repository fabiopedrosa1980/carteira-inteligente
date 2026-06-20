## Why

Quatro ajustes de UI corrigem quebras de layout e melhoram a leitura: a Nota às vezes quebra para outra linha dentro do card em vez de ficar ao lado do ticker; os controles de ordenação de "Minhas Ações" no desktop quebram o layout do cabeçalho; o "Tipo" do Histórico aparece como badge destacado e o usuário quer texto normal alinhado aos demais campos; e a tela de Metas no mobile continua estourando o layout, precisando ocultar mais uma coluna.

## What Changes

- **Card de ação**: garantir que a Nota fique **sempre na mesma linha do ticker**, sem quebrar para uma segunda linha em cards estreitos.
- **Ordenação de "Minhas Ações" (web/desktop)**: ajustar os controles de ordenação para **não quebrarem o layout** do cabeçalho da seção no desktop.
- **Histórico — coluna "Tipo"**: exibir o tipo (Dividendo/JCP) como **texto normal**, igual aos demais campos da listagem, removendo o badge; ajustar para mobile.
- **Tela de Metas (mobile)**: **ocultar mais uma coluna** no mobile para a tabela parar de estourar o layout, mantendo as informações essenciais.

## Capabilities

### New Capabilities
- `acoes-sort-layout`: controles de ordenação de "Minhas Ações" no desktop não quebram o layout do cabeçalho.

### Modified Capabilities
- `mobile-view-fit`: Nota permanece na mesma linha do ticker (sem wrap); coluna "Tipo" do Histórico vira texto normal; tabela de Metas oculta coluna adicional no mobile para não estourar.

## Impact

- `src/app/components/stock-card/stock-card.scss` — Nota sem wrap no `card-top`.
- `src/app/components/dashboard/dashboard.scss` (e possivelmente `.html`) — controles de ordenação no desktop.
- `src/app/components/dividend-history/dividend-history.html` e `dividend-history.scss` — "Tipo" como texto normal.
- `src/app/components/goals/goals.scss` — ocultar coluna adicional no mobile.
- Sem mudanças de API, modelos ou serviços.
