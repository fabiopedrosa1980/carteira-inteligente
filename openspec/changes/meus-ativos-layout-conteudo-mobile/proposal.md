## Why

Na tela "Meus Ativos" (Lançamentos), as colunas da tabela usam frações iguais (`repeat(N, minmax(0, 1fr))`), o que ignora o tamanho real do conteúdo de cada campo. No mobile isso ainda quebra: o badge do ticker, o valor do Total em BRL e os botões de ação (dois ícones em `56px`) são truncados/cortados ou pressionam a linha, deixando o layout desalinhado e ilegível.

## What Changes

- Dimensionar as colunas da tabela de Lançamentos **de acordo com o conteúdo** de cada campo (largura por conteúdo, não frações iguais), tanto no header quanto nas linhas.
- No mobile (≤600px), garantir que ticker, quantidade, total e ações caibam sem corte: coluna de ações com largura suficiente para os dois ícones (editar/remover) e coluna de Total dimensionada para o valor em BRL.
- Manter o header e as linhas com o **mesmo template de colunas**, preservando ordenação, paginação e ocultação de Data/Preço já existentes no mobile.
- Sem rolagem horizontal da página e sem estouro de linha em telas estreitas.
- Ao salvar/fechar o modal de lançamento (adicionar, editar ou remover), **atualizar a tela chamadora** e refletir as alterações **somando os ativos**: contagens, total por seção e total geral recalculados, e a carteira/posições agregadas (`StockDataService`) recarregadas para refletir o novo somatório.

## Capabilities

### New Capabilities
- `lancamentos-tabela-mobile-conteudo`: Define o dimensionamento das colunas da tabela de Lançamentos conforme o conteúdo de cada campo, garantindo que nada seja cortado nem quebre o layout no mobile.
- `lancamentos-modal-refresh-soma`: Define que ao fechar o modal de lançamento após uma alteração, a tela chamadora é atualizada e os ativos são re-somados (contagens, totais por seção/geral e carteira agregada).

### Modified Capabilities

## Impact

- `src/app/components/my-assets/my-assets.scss` — grid-template-columns do `.table-header` e `.table-row` (desktop e media query ≤600px), coluna de ações e células.
- `src/app/components/my-assets/my-assets.ts` — `closeModal()` dispara recarga da carteira agregada após salvar.
- `src/app/services/stock-data.service.ts` — expor método público de recarga da carteira (`reload()`/tornar `fetchPortfolioStocks` acionável).
- Sem mudanças de modelo de dados ou comportamento de ordenação/paginação.
