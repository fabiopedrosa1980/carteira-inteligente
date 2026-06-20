## Why

O Radar hoje só tem a **matriz (batalha naval)** — ótima para ver o padrão anual de cada ativo, mas pesada para quem só quer "quem paga em cada mês". Oferecer uma **alternância** entre **Cards (Jan→Dez)** e **Matriz** deixa o usuário escolher a leitura que prefere, sem perder nenhuma das duas.

## What Changes

- Adicionar um **alternador de visualização** no topo do Radar: **Cards** | **Matriz**.
- **Cards (Jan→Dez):** 12 cards de mês; cada card lista os **tickers** que tiveram data-com naquele mês (com contador), no estilo dos cards do app.
- **Matriz (batalha naval):** a visualização atual (tickers × meses), inalterada.
- Padrão: **Matriz** (comportamento atual). A escolha é **lembrada** entre sessões.
- Ambas respeitam o seletor Ações/FIIs e usam os mesmos dados (data-com do ano anterior). Skeleton de carregamento para as duas.

## Capabilities

### Modified Capabilities
- `dividends-radar`: passa a oferecer duas visualizações (Cards Jan→Dez ou Matriz) com um alternador; a matriz continua sendo o padrão.

## Impact

**Frontend (este repo):**
- `src/app/components/dividends-radar/dividends-radar.ts` — estado `view` ('cards' | 'matrix') com persistência; `monthCards` derivado das linhas.
- `src/app/components/dividends-radar/dividends-radar.html` — alternador + render condicional (cards / matriz) + skeleton por modo.
- `src/app/components/dividends-radar/dividends-radar.scss` — estilos do alternador e do grid de cards.

Sem mudança de backend.
