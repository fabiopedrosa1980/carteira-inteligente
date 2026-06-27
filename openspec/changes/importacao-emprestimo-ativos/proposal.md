## Why

No relatório de Posição da B3, ações emprestadas pelo investidor (natureza **Doador**) saem da aba `Acoes` e passam a aparecer **apenas** na aba `Empréstimos`. A importação atual ignora essa aba, então essas posições — que continuam pertencendo ao investidor — somem da carteira importada. No arquivo real são 3 ativos (BBSE3, CSMG3, ITUB3) que ficam de fora.

## What Changes

- A importação na **API Go** passa a processar a aba **`Empréstimos`** do relatório de Posição.
- Apenas linhas com natureza **`Doador`** são incluídas (o investidor emprestou e continua dono). Linhas **`Tomador`** (ativos tomados, não próprios) são ignoradas.
- Ticker, quantidade e `Preço de Fechamento` vêm da própria aba; a classificação (`Acoes`/`FIIs`) usa o catálogo, como na aba `Acoes`.
- As quantidades passam a ser **agregadas por ticker** entre as abas: se um ativo estiver parte disponível (`Acoes`) e parte emprestado (`Empréstimos`), o lançamento importado reflete a **soma** das quantidades.
- A aba `Tesouro Direto` continua ignorada.

## Capabilities

### New Capabilities
<!-- Nenhuma capability nova. -->

### Modified Capabilities
- `importacao-posicao-b3-api`: o parsing deixa de ignorar a aba `Empréstimos` e passa a incluir as posições de natureza `Doador`, com agregação de quantidade por ticker entre as abas.

## Impact

- **API Go (repo `carteira-inteligente-api`):** ajuste no parser `internal/infrastructure/b3import` (ler aba `Empréstimos`, expor a natureza) e no handler de importação (filtrar `Doador`, agregar quantidade por ticker). Sem mudança de contrato HTTP nem de payload de resposta.
- **Frontend:** nenhuma mudança — o resumo já exibe a contagem por classe, que passa a incluir as posições emprestadas.
- **Depende de:** o change `importacao-planilha-b3` (endpoint de importação base). Recomenda-se arquivá-lo antes de arquivar este.
