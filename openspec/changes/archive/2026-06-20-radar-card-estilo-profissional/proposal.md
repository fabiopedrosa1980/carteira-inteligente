## Why

O card do Radar já pegou emprestado alguns traços do `stock-card` (borda, perf-bar, hover), mas ainda não "pertence" à mesma família: falta a estrutura de **identidade no topo + faixa inferior com divisória**, a **tipografia mono/tabular** dos números e o acabamento do hover/sombra que dão o ar profissional dos cards de Minhas Ações. Além disso, a **estrela (★)** do "Melhor mês" é redundante com o texto "Melhor mês, aproveite" — o texto sozinho comunica melhor.

## What Changes

- Alinhar o `.radar-card` ao sistema visual do `stock-card` (Minhas Ações): mesmo raio, padding, transição e **efeito de hover** (elevação `translateY(-3px)`, borda accent, sombra `0 8px 28px`), perf-bar lateral que engrossa no hover.
- Adotar a **estrutura do stock-card**: linha de identidade no topo (mês + contador) e os tickers numa **faixa inferior separada por divisória** (`border-top`), empurrada para a base do card.
- Usar **tipografia mono/tabular** no contador (como os números do stock-card).
- **Remover a estrela (★)** do mês com mais ativos; o texto "Melhor mês, aproveite" passa a ser o único indicador.

## Capabilities

### Modified Capabilities
- `dividends-radar`: cards com o mesmo efeito visual e estrutura do stock-card; indicador do melhor mês passa da estrela para o texto.

## Impact

**Frontend (este repo):**
- `src/app/components/dividends-radar/dividends-radar.html` — remover o `.rc-star`; ajustar estrutura para faixa inferior de tickers.
- `src/app/components/dividends-radar/dividends-radar.scss` — alinhar tokens (raio, padding, hover, sombra, perf-bar), tipografia mono/tabular no contador, divisória da faixa inferior.
- Referência de estilo: `src/app/components/stock-card/stock-card.scss`.
