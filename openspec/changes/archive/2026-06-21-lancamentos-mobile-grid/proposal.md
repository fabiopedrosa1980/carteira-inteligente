## Why

Na aba "Lançamentos" (`MyAssetsComponent`), cada lançamento é uma linha de tabela em grid de colunas. No mobile o layout fica apertado: hoje só sobram Ativo, Qtd, Total e ações (Data e Preço Unit. são ocultados), escondendo informação útil. Convertendo a linha em **card/grid** no mobile dá para exibir todos os campos de forma legível, no mesmo idioma visual já adotado nos cards de "Meus Ativos".

## What Changes

- No mobile (≤600px), cada lançamento da lista de "Lançamentos" SHALL ser exibido como um **card** (grid de áreas), em vez de uma linha de tabela comprimida.
- O card exibe **todos os campos**: Ativo (badge), Data, Qtd., Preço Unit. e Total, com micro-rótulos (o cabeçalho da tabela some no mobile), além dos botões **Editar/Remover** no topo do card.
- Mantém ordenação, paginação, clique para editar e o botão "Adicionar" inalterados.
- Desktop permanece como tabela (linhas em grid de colunas).

## Capabilities

### New Capabilities
- `lancamentos-mobile-grid`: Define a apresentação de cada lançamento como card/grid no mobile, com todos os campos e ações.

### Modified Capabilities

## Impact

- `src/app/components/my-assets/my-assets.scss` — media query (≤600px) de `.table-header`/`.table-row` reescrita como card/grid; rótulos via `::before`.
- `src/app/components/my-assets/my-assets.html` — pode precisar de pequeno ajuste (ex.: ocultar o `.table-header` no mobile) sem mudar a estrutura das linhas.
- Sem mudanças de TS, API ou modelo de dados.
