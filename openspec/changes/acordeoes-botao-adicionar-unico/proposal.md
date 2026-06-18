## Why

A tela de Lançamentos tem botões de adicionar redundantes: um "Adicionar Lançamento" no topo, um no estado vazio (com ícone e mensagem) e um no rodapé de cada tabela ("Adicionar em {classe}"). Isso polui e usa textos inconsistentes. O ideal é um único botão de adicionar por acordeão, centralizado ao final da lista, com o texto padronizado "Adicionar".

## What Changes

- Remover o botão **"Adicionar Lançamento"** do cabeçalho da tela.
- Em cada acordeão, manter **um único botão "Adicionar"**, centralizado, ao final da lista (após as linhas).
- No **estado vazio**, exibir somente o botão "Adicionar" centralizado (remover o ícone e o texto "Nenhum lançamento em …").
- Padronizar o texto do botão para **"Adicionar"** (sem "Lançamento" nem "em {classe}").
- Trocar o **ícone da aba "Lançamentos"** por um ícone de **lista** (SVG de traço).

## Capabilities

### New Capabilities
- `lancamentos-add-button`: botão único de adicionar por acordeão, centralizado e padronizado.

### Modified Capabilities
<!-- Nenhuma capability de requisito existente (não arquivada) é alterada. -->

## Impact

**Frontend (este repo):**
- `src/app/components/my-assets/my-assets.html` — remover o botão do topo; unificar o botão de adicionar no fim do acordeão; simplificar o estado vazio.
- `src/app/components/my-assets/my-assets.scss` — remover estilos órfãos (`.btn-add-transaction`, `.empty-state` se não usado); estilo centralizado do botão.
