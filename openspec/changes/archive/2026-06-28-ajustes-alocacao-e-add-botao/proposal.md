## Why

Três ajustes de UI pedidos na tela de Meus Ativos / Alocação:

1. No card de **Alocação**, o botão de **Editar** (e as ações Salvar/Cancelar durante a edição) ficam no cabeçalho do card; o usuário quer essas ações **no final do card**.
2. A mensagem de sucesso ao salvar a edição diz "Distribuição alterada com sucesso" — deve passar a dizer **"Alocação alterada com sucesso"**, alinhada ao nome do card.
3. Os botões **"Adicionar"** dos lançamentos ficam, no **mobile**, em largura total (`width: 100%`) e alinhados à direita, divergindo do desktop. Devem ter o **mesmo tamanho do web** (largura automática) e ficar **no final, alinhados à esquerda**, de forma consistente nas **duas telas** (visão de tabela em `my-assets` e visão de acordeão mobile no `dashboard`).

## What Changes

- **Alocação — ações no rodapé**: mover o bloco de ações (`.alloc-actions`: Editar / Salvar / Cancelar) do cabeçalho para o **final do card de alocação**.
- **Mensagem**: trocar o texto do toast de `"Distribuição alterada com sucesso"` para `"Alocação alterada com sucesso"`.
- **Botão "Adicionar"**: no mobile, remover `width: 100%` (passa a ter largura automática, igual ao web) e alinhar o `.add-row` à **esquerda** (`flex-start`) em ambas as telas, mantendo o botão **no final** da seção/acordeão.

## Capabilities

### New Capabilities
- `alocacao-acoes-no-rodape`: posição das ações (Editar/Salvar/Cancelar) do card de alocação no final do card.

### Modified Capabilities
- `alocacao-mensagem-edicao`: texto da mensagem de sucesso passa a ser "Alocação alterada com sucesso".
- `lancamentos-botao-adicionar-secao`: o botão "Adicionar" no mobile passa a ter o mesmo tamanho do desktop (sem largura total) e alinhamento à esquerda no rodapé, consistente entre as duas telas.

## Impact

- `src/app/components/allocation-card/allocation-card.html` — reposicionar `.alloc-actions` para o fim do `<section>`.
- `src/app/components/allocation-card/allocation-card.scss` — ajustes de layout do bloco de ações no rodapé.
- `src/app/components/allocation-card/allocation-card.ts` — texto do toast em `saveEdit()`.
- `src/app/components/my-assets/my-assets.scss` — `.add-row` (alinhamento) e remoção do `width: 100%` no mobile.
- `src/app/components/dashboard/dashboard.scss` — `.add-row` (alinhamento) e remoção do `width: 100%` no mobile.
- Apenas frontend (sem mudança de API ou modelo de dados).
