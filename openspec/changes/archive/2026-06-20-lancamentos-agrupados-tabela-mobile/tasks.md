## 1. Remover a transformação em cards empilhados

- [x] 1.1 Em `my-assets.scss`, remover o bloco `@media (max-width: 600px)` dentro de `.transactions-table.grouped` que faz `.table-row { display: block }`, `.table-header { display: none }`, e os rótulos `::before` (Quantidade/Preço médio/Total/Lançamentos) e estilos de card.

## 2. Tabela agrupada em colunas no mobile

- [x] 2.1 Adicionar em `.transactions-table.grouped` um `@media (max-width: 600px)` definindo `.table-header, .table-row { grid-template-columns: minmax(0, 1.4fr) minmax(0, 1fr) minmax(0, 1fr) }`.
- [x] 2.2 Reexibir cabeçalho de Qtd e Total (sobrescrever a regra geral): `.table-header > span:nth-child(2), .table-header > span:nth-child(4) { display: block }`.
- [x] 2.3 Ocultar Preço médio e Lançamentos: `.table-header > span:nth-child(3), .table-header > span:nth-child(5) { display: none }` e `.count-cell { display: none }` (price-cell já é oculto globalmente).
- [x] 2.4 Conferir alinhamento cabeçalho×linha (3 colunas) e que `min-width:0`/`text-overflow` já contêm o conteúdo.

## 3. Verificação

- [x] 3.1 `npx prettier --write` no arquivo alterado e `ng build` para garantir compilação.
- [x] 3.2 Conferir no mobile (≤ 600px, ~320px): tabela agrupada em colunas (Ativo · Qtd · Total), cabeçalho visível, sem cards e sem rolagem; desktop com todas as colunas inalterado.
- [x] 3.3 Commit e push seguindo o workflow do CLAUDE.md (stage específico dos arquivos).
