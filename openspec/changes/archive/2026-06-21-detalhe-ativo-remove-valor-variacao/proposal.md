## Why

No modal de detalhe do ativo, o cabeçalho exibe a cotação (valor em R$) e a variação do dia logo acima dos "Indicadores fundamentalistas". Essa informação duplica o que já aparece na lista/cards de onde o detalhe é aberto e desvia o foco da tela, cujo propósito é mostrar fundamentos. Removê-la deixa o detalhe mais limpo e centrado nos indicadores.

## What Changes

- No cabeçalho do modal de detalhe do ativo (`stock-details-modal`), **remover o bloco de cotação**: o preço em R$ (valor) e a variação do dia (`%`).
- O cabeçalho passa a exibir apenas a identidade do ativo (ticker e nome).
- Nenhuma mudança nas seções de indicadores fundamentalistas e informações da empresa.

## Capabilities

### New Capabilities
- `detalhe-ativo-cabecalho-sem-cotacao`: o cabeçalho do detalhe do ativo exibe apenas a identidade (ticker/nome), sem preço nem variação.

### Modified Capabilities
<!-- Nenhuma capability existente tem requisito sobre o cabeçalho do detalhe. -->

## Impact

- **Frontend Angular**:
  - `stock-details-modal.html` — remover o bloco `.price-group` (preço + variação) do `<header>`.
  - `stock-details-modal.scss` — remover/ajustar os estilos órfãos de `.price-group`, `.d-price`, `.currency`, `.d-change` e o layout do `.details-header`.
- Sem mudanças de dados, API ou no modelo `Stock` (os campos continuam existindo; apenas deixam de ser exibidos nesta tela).
