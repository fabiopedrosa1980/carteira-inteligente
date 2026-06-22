## Why

No mobile, o card de cada ativo em "Meus Ativos" mostra saldo, variação, rentabilidade, quantidade e preço médio, mas **não a cotação atual** (preço corrente do ticker) — justamente o número que o investidor quer comparar com o preço médio. Na tela de **Histórico**, quando a carteira não tem nenhuma posição, a tela fica **vazia e silenciosa** (nenhum seletor, nenhuma mensagem), passando impressão de erro ou carregamento travado. E os **cards de indicadores** de "Meus Ativos" ficaram apertados ao crescer para 6 cards numa única fileira; o usuário quer **3 cards por linha no web e 2 por linha no mobile** para leitura mais confortável.

## What Changes

- **Meus Ativos (mobile)**: o card de cada ativo passa a exibir o **Preço Atual** (cotação corrente do ticker, `stock.price`), com rótulo próprio, ao lado do Preço Médio para facilitar a comparação. No desktop a coluna "Preço Atual" já existe e permanece inalterada.
- **Histórico**: quando não há nenhuma posição/dado de histórico (carteira vazia), a tela exibe uma **mensagem de estado vazio** orientando o usuário, em vez de não mostrar nada.
- **Indicadores de Meus Ativos**: os cards de resumo são exibidos **3 por linha no web e 2 por linha no mobile** (antes: fileira única no desktop).

## Capabilities

### New Capabilities
- `meus-ativos-mobile-preco-atual`: exibição da cotação atual do ticker no card de ativo do mobile em "Meus Ativos".
- `historico-estado-vazio`: mensagem de estado vazio no Histórico quando não há posições/dados a exibir.

### Modified Capabilities
- `portfolio-resumo-cards`: o grid de cards de resumo passa a exibir **3 cards por linha no desktop** (antes era fileira única); mantém 2 por linha no mobile.

## Impact

- **Frontend (Angular)**:
  - `src/app/components/dashboard/dashboard.html` / `dashboard.scss` — célula "Preço Atual" no card mobile da listagem `.acoes-list` (revelar no mobile a coluna hoje oculta, posicionar no grid de áreas, com rótulo); `.ps-cards` em 3 colunas no web e 2 no mobile.
  - `src/app/components/dividend-history/dividend-history.html` / `dividend-history.scss` — bloco de estado vazio quando `visiblePositions().length === 0` (sem carregamento, erro ou processamento).
- **Sem mudanças de backend/API.** `stock.price` já vem de `current_price`; os sinais `loadingPositions`, `error`, `anyProcessing` e `visiblePositions` já existem no componente de Histórico.
