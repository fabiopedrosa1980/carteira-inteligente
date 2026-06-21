## Context

`my-assets.scss` define `.table-header` e `.table-row` com `grid-template-columns: repeat(5, minmax(0, 1fr)) 72px` no desktop e `repeat(3, minmax(0, 1fr)) 56px` no mobile (≤600px). Frações iguais ignoram o conteúdo: o badge do ticker e o valor do Total em BRL competem por igual espaço com colunas curtas, e a coluna de ações de `56px` é apertada para os dois botões de 30px. Resultado: corte/ellipsis e linha desalinhada no mobile.

As colunas atuais (na ordem do HTML): Ativo, Data, Qtd., Preço Unit., Total, Operação. No mobile, Data (2ª) e Preço (4ª) já são ocultadas via `display: none`, restando Ativo, Qtd., Total, Operação.

## Goals / Non-Goals

**Goals:**
- Colunas com largura proporcional ao conteúdo real de cada campo.
- Mobile: ticker, Qtd., Total e os dois botões de ação cabem sem corte nem rolagem horizontal.
- Header e linhas com o mesmo template, mantendo alinhamento, ordenação e paginação.

**Non-Goals:**
- Não alterar quais colunas existem nem a lógica de ordenação/paginação (`my-assets.ts`).
- Não mudar o HTML (sem nova marcação); apenas SCSS, salvo necessidade de ajuste mínimo.
- Não alterar o breakpoint de ocultação de Data/Preço (≤600px).

## Decisions

- **Template por conteúdo no desktop**: trocar `repeat(5, minmax(0,1fr)) 72px` por colunas dimensionadas ao conteúdo, deixando o Total como coluna flexível:
  `grid-template-columns: max-content max-content max-content max-content minmax(0,1fr) auto;`
  (Ativo, Data, Qtd., Preço → `max-content`; Total → `minmax(0,1fr)` para absorver folga; Operação → `auto`/largura fixa dos botões). Manter `min-width: 0` nas células flexíveis para permitir ellipsis quando necessário.
- **Template por conteúdo no mobile (≤600px)**: com Data e Preço ocultas, usar
  `grid-template-columns: max-content max-content minmax(0,1fr) auto;`
  para Ativo, Qtd., Total, Operação. A coluna de ações passa a `auto` (ou largura calculada para 2×30px + gap) em vez de `56px` fixo, garantindo que os dois ícones caibam.
- **Coluna de ações**: como Data/Preço são ocultadas por `display:none` mas continuam no fluxo do grid, o template do mobile deve ter exatamente o número de trilhas das colunas visíveis. Confirmar que a contagem de trilhas casa com as colunas renderizadas (4 visíveis) para não desalinhar.
- **Células de texto**: manter `min-width:0; overflow:hidden; text-overflow:ellipsis; white-space:nowrap` nas colunas flexíveis (Total), permitindo truncar em último caso sem empurrar a linha.

## Atualização ao fechar o modal (re-soma)

`TransactionService` mantém os lançamentos num `signal` e `MyAssetsComponent` deriva contagens/totais via `computed`, então a tabela já re-soma reativamente ao adicionar/editar/remover. O que **não** atualiza é a carteira agregada de `StockDataService`, cuja carga (`fetchPortfolioStocks()`) é privada e só roda no construtor.

Decisões:
- Expor `StockDataService.reload()` público que reexecuta `fetchPortfolioStocks()`.
- Em `MyAssetsComponent`, injetar `StockDataService` e chamar `reload()` ao fechar o modal após salvar (add/edit) e após `remove()`, para que somatórios/posições derivados da carteira reflitam o novo estado.
- A re-soma das seções/total geral em "Meus Ativos" continua reativa (sem ação extra); a recarga da carteira cobre a "tela chamadora" mais ampla.

## Risks / Trade-offs

- `max-content` pode alargar uma coluna se algum valor for atipicamente longo (ticker grande). Mitigação: apenas Ativo/Qtd usam `max-content` (conteúdo curto e previsível); Total e células longas ficam na trilha flexível com ellipsis.
- Grid com `display:none` em colunas: as trilhas precisam corresponder às colunas efetivamente exibidas. Verificar visualmente no mobile após a mudança.
- Trade-off: abandonar colunas de largura uniforme pode deixar o desktop visualmente menos "tabular", mas elimina o corte de conteúdo — objetivo do change.
