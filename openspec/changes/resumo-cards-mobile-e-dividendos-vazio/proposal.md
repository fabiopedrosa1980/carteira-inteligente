## Why

No mobile, os cards de resumo da carteira ("indicadores") deveriam ficar 2 por linha, mas o card de **Patrimônio Total** (hero) ocupa a linha inteira e usa um valor maior que os demais, o que destoa e quebra o alinhamento do grid. Além disso, a tela de **Dividendos** mostra a mensagem de "sem registros" como um texto solto, diferente do padrão visual (ícone + título + texto) já adotado na tela de **Histórico de dividendos**.

## What Changes

- No mobile (≤640px), o card de **Patrimônio Total** deixa de ocupar a linha inteira e passa a ocupar **uma coluna**, como os demais — todos os cards de indicadores ficam **2 por linha**.
- O valor do **Patrimônio Total** no mobile é normalizado para não destoar/quebrar o layout (tamanho compatível com o card em coluna única).
- Na tela de **Dividendos** (resumo Recebidos/Projetados), o estado vazio passa a usar o **mesmo padrão visual** da tela de Histórico de dividendos (ícone + título + texto de apoio), em vez de um texto solto.

## Capabilities

### New Capabilities

- `dividendos-resumo-estado-vazio`: padroniza a mensagem de "sem registros" do resumo de dividendos (Recebidos/Projetados) no mesmo idioma visual do estado vazio da tela de Histórico de dividendos.

### Modified Capabilities

- `portfolio-resumo-cards`: no mobile, o card de Patrimônio Total ocupa uma única coluna (não mais a linha inteira) e seu valor é dimensionado para caber no layout 2-por-linha sem quebrar.

## Impact

- `src/app/components/dashboard/dashboard.scss` — regras mobile de `.ps-cards` / `.ps-card-hero` / `.ps-card-hero .ps-card-value`.
- `src/app/components/dividends-summary/dividends-summary.html` — markup do estado vazio (`.ds-empty`).
- `src/app/components/dividends-summary/dividends-summary.scss` — estilo do estado vazio padronizado.
- Sem mudança de dados, API ou lógica de cálculo; apenas layout/apresentação.
