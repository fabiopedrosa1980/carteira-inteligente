## Why

A tela "Meus Ativos" mantém dois padrões de acordeão distintos: o da aba "Lançamentos" (botão de adicionar no rodapé do acordeão, layout limpo) e o atual de Meus Ativos (botão de adicionar no cabeçalho, mais a alternância cards/lista). Unificar no padrão de Lançamentos e remover a visão de cards simplifica a experiência e o código. Além disso, o card de Patrimônio mostra os valores de Ganho e Variação juntos sem rótulos, dificultando a leitura, e a visão "batalha naval" (matriz) do Radar fica indisponível no mobile, onde também é útil.

## What Changes

- A tela "Meus Ativos" (aba `portfolio`) passa a usar o mesmo padrão de acordeão da aba "Lançamentos", com os campos adaptados à posição (Ativo, Qtd, Preço Médio, Hoje, Saldo, Variação, Rent.).
- **BREAKING** (UX): a visão em **cards** de Meus Ativos é removida, junto com o toggle cards/lista no cabeçalho. A tela fica somente em lista.
- O botão de adicionar lançamento sai do cabeçalho do acordeão e passa para o **rodapé** do corpo do acordeão (uma linha "Adicionar" ao final), como em Lançamentos.
- No card de **Patrimônio** de Meus Ativos, os valores de **Ganho** (R$) e **Variação** (%) recebem rótulos próprios.
- A visão **matriz ("batalha naval")** do Radar de proventos passa a ficar disponível também no **mobile**.

## Capabilities

### New Capabilities
- `meus-ativos-patrimonio-labels`: rótulos "Ganho" e "Variação" para os valores de lucro/variação no card de Patrimônio de Meus Ativos.

### Modified Capabilities
- `acoes-list-view`: remove a alternância cards/lista e a visão em cards; a tela passa a ser somente lista.
- `meus-ativos-grupos`: o acordeão adota o padrão de Lançamentos e o botão de adicionar move-se do cabeçalho para o rodapé do corpo do acordeão.
- `radar-card-layout`: a visão em matriz ("batalha naval") passa a ser permitida no mobile, respeitando a escolha do usuário.

## Impact

- `src/app/components/dashboard/dashboard.html` — remove toggle e bloco de cards; move botão de adicionar; adiciona rótulos ao card de Patrimônio.
- `src/app/components/dashboard/dashboard.ts` — remove estado/métodos da visão em cards (`viewMode`, `setView`).
- `src/app/components/dashboard/dashboard.scss` — estilos do rodapé do acordeão e rótulos do Patrimônio; remoção de estilos da visão em cards.
- `src/app/components/dividends-radar/dividends-radar.ts` — `effectiveView` deixa de forçar `cards` no mobile.
- `src/app/components/dividends-radar/dividends-radar.html` / `.scss` — toggle visível no mobile e matriz utilizável em telas estreitas.
