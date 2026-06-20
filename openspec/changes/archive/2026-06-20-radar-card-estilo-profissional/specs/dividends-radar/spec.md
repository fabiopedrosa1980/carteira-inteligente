## MODIFIED Requirements

### Requirement: Radar de proventos por mês

A visão de sazonalidade SHALL viver em uma sub-tab chamada "Radar" na tela de Dividendos. A tela SHALL exibir 12 cards (Jan→Dez) com os tickers da carteira (da classe selecionada) cujos proventos tiveram data-com naquele mês no ano anterior. O card do mês com mais tickers SHALL exibir o texto "Melhor mês, aproveite" (sem estrela). O card do próximo mês em relação ao mês atual SHALL receber um destaque visual, o texto "Oportunidade de compra" e um ícone de atenção. Os textos de destaque SHALL aparecer na parte superior do card, junto ao contador de ativos. Cada card SHALL exibir um contador de ativos com tipografia mono/tabular. O título NÃO SHALL incluir o ano. Os cards SHALL usar o **mesmo efeito visual e estrutura dos cards de Minhas Ações (stock-card)**: hover com elevação, borda de destaque e sombra, perf-bar lateral e faixa inferior separada por divisória.

#### Scenario: Mesmo efeito do stock-card
- **WHEN** o usuário passa o cursor sobre um card do Radar
- **THEN** o card eleva (translateY), a borda fica em destaque, surge sombra e a perf-bar lateral engrossa — como nos cards de Minhas Ações

#### Scenario: Indicador do melhor mês por texto
- **WHEN** o card do mês com mais tickers é exibido
- **THEN** ele mostra o texto "Melhor mês, aproveite" e NÃO mostra a estrela (★)

#### Scenario: Tickers em faixa inferior
- **WHEN** um card com tickers é exibido
- **THEN** os tickers aparecem numa faixa inferior separada por uma divisória, na base do card

#### Scenario: Contador por card
- **WHEN** um card é exibido
- **THEN** ele mostra a quantidade de ativos daquele mês com tipografia mono/tabular
