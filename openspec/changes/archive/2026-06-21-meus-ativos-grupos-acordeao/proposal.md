## Why

A tela "Meus Ativos" exibe Ações e FIIs misturados em uma lista ou grid plano, sem distinção de tipo. Com o crescimento da carteira, a mistura dificulta a leitura e a análise por classe de ativo — o usuário não consegue ver rapidamente quantos FIIs tem ou focar em um tipo específico.

## What Changes

- A tela "Meus Ativos" passa a organizar os ativos em **três grupos**: **Ações**, **FIIs** e **ETFs**, exibidos em seções separadas e colapsáveis (acordeão).
- Cada grupo pode ser **expandido ou recolhido** individualmente; por padrão todos estão expandidos.
- Na **visão em lista**, cada grupo exibe sua própria tabela paginada (10 itens por página), com controles de paginação por grupo.
- Na **visão em cards**, cada grupo exibe seu próprio grid de cards, também paginado.
- Grupos sem ativos são **ocultados** (não aparecem na tela).
- O cabeçalho de cada grupo exibe o nome do tipo e a contagem total de ativos daquele tipo.

## Capabilities

### New Capabilities

- `meus-ativos-grupos`: agrupa os ativos de "Meus Ativos" em seções por tipo (Ações, FIIs, ETFs) com acordeão colapsável e paginação independente por grupo.

### Modified Capabilities

- `acoes-list-view`: a visão em lista e a visão em cards agora são renderizadas dentro de cada grupo do acordeão (não mais em uma lista/grid plano global).

## Impact

- `DashboardComponent` (`dashboard.ts` / `dashboard.html` / `dashboard.scss`) — adicionar lógica de grupos, estado de acordeão por grupo, paginação por grupo.
- Backend: nenhuma mudança — o ETF virá do endpoint existente `getAcoes()` ou de novo endpoint; por ora, a terceira seção (ETFs) pode ficar vazia se não houver endpoint. O campo `sector` em cada `Stock` determina o grupo.
- Sem alterações em serviços ou modelos existentes.
