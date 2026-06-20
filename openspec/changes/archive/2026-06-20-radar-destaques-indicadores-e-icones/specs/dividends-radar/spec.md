## MODIFIED Requirements

### Requirement: Radar de proventos por mês

A sub-tab "Radar" SHALL oferecer duas visualizações (Cards e Matriz) com um alternador **por ícones** (um ícone de cards e um de matriz, com rótulo acessível). A Matriz SHALL ser o padrão e a escolha SHALL ser lembrada entre sessões. Em ambas as visualizações:

- O **mês com mais ativos** SHALL receber um **ícone de estrela** e um realce.
- O **próximo mês em relação ao mês atual** SHALL receber o sinal **"Oportunidade de compra"** com um **ícone de atenção** e um realce.

Uma **legenda** SHALL explicar o significado dos dois ícones. O título NÃO SHALL incluir o ano. As demais regras da matriz (tickers em linhas × meses em colunas, célula marcada por data-com, coluna de tickers fixa, rolagem) e dos cards (12 meses com tickers e contador) permanecem.

#### Scenario: Estrela no mês com mais ativos
- **WHEN** o radar é exibido (matriz ou cards)
- **THEN** o mês com o maior número de ativos mostra um ícone de estrela e um realce

#### Scenario: Próximo mês como oportunidade de compra
- **WHEN** o radar é exibido (matriz ou cards)
- **THEN** o próximo mês ao atual mostra "Oportunidade de compra" com um ícone de atenção e um realce

#### Scenario: Legenda dos ícones
- **WHEN** o radar é exibido
- **THEN** há uma legenda explicando o ícone de estrela (mês com mais ativos) e o de atenção (próximo mês / oportunidade)

#### Scenario: Alternador por ícones
- **WHEN** o usuário vê o alternador de visualização
- **THEN** ele é representado por ícones (cards e matriz) com rótulo acessível, e alterna a visão ao ser clicado
