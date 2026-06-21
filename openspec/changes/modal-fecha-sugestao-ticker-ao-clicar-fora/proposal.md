## Why

No modal de lançamento, o autocomplete de ticker abre uma lista de sugestões enquanto o usuário digita. Hoje essa lista só é fechada ao **escolher uma sugestão** ou ao reduzir o ticker para menos de 3 caracteres. Se o usuário decide não usar nenhuma sugestão e clica em outro lugar (outro campo, área do modal), a lista **continua aberta**, sobrepondo o conteúdo e atrapalhando o preenchimento.

## What Changes

- No modal de lançamento (`add-transaction-modal`), a lista de sugestões de ticker MUST **fechar ao clicar em qualquer lugar fora dela** (fora do campo de ticker e da própria lista), sem fechar o modal.
- Selecionar uma sugestão e digitar continuam funcionando como hoje.
- Clicar dentro do campo de ticker ou na própria lista **não** fecha as sugestões.

## Capabilities

### New Capabilities
- `lancamento-sugestao-fecha-ao-clicar-fora`: a lista de sugestões do autocomplete de ticker fecha ao clicar fora do campo/lista.

### Modified Capabilities
<!-- Nenhuma capability existente especifica o fechamento das sugestões por clique externo. -->

## Impact

- **Frontend Angular**:
  - `add-transaction-modal.ts` — adicionar um handler de clique no documento que fecha as sugestões quando o clique ocorre fora do `.ticker-wrapper`.
  - `add-transaction-modal.html` — ajuste mínimo se necessário (ex.: marcar o wrapper) para identificar o clique externo.
- Sem mudanças de dados, API ou no modelo. Não afeta o fechamento do modal (Esc / clique na overlay) já existente.
