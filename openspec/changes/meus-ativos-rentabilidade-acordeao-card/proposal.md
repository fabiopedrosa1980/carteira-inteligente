## Why

O cabeçalho do acordeão da aba "Meus Ativos" exibe Total **e** Rentabilidade, o que polui o resumo; a rentabilidade já aparece por ativo na lista. Além disso, no card de ativo (mobile) a "Variação hoje" ocupa o topo do card, enquanto a rentabilidade — métrica de desempenho da posição — fica no rodapé. Trazer a rentabilidade para o topo e mover a "Variação hoje" para junto da "Variação" dá mais destaque ao desempenho da posição.

## What Changes

- **Remover a rentabilidade do cabeçalho do acordeão** de "Meus Ativos" (métrica "Rent." ao lado do Total), mantendo apenas o Total no cabeçalho. A rentabilidade por ativo na lista/tabela permanece.
- **Reorganizar o card de ativo (mobile)**: colocar a **rentabilidade no topo** (posição hoje ocupada pela "Variação hoje") e mover a **"Variação hoje" para baixo, na mesma linha da "Variação"**.

## Capabilities

### New Capabilities
<!-- Nenhuma capability nova. -->

### Modified Capabilities
- `meus-ativos-rentabilidade-por-tipo`: o cabeçalho do acordeão por tipo passa a exibir apenas o Total (sem a rentabilidade do tipo).
- `meus-ativos-card-mobile-layout`: o card de ativo no mobile passa a exibir a rentabilidade no topo e a "Variação hoje" na mesma linha da "Variação".

## Impact

- `src/app/components/dashboard/dashboard.html` — remoção do bloco `sec-metric` da rentabilidade (`sec-rent`) no cabeçalho do acordeão.
- `src/app/components/dashboard/dashboard.scss` — `grid-template-areas` da `.acoes-row` (troca de `hoje` ↔ `rent`) e ajuste de alinhamento/tamanho dos campos nas novas posições.
- Sem mudanças de API, modelos ou lógica de dados. O método `groupRentabilidade` permanece disponível.
