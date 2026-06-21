## Why

A tabela de Meus Ativos quebra no mobile porque `.acoes-list-wrap` cria um card aninhado (`border + border-radius + overflow: hidden`) dentro do card do acordeão. Lançamentos não tem esse wrapper — suas linhas vão direto no `.accordion-inner` com CSS Grid (`minmax(0, 1fr)`), o que impede overflow horizontal. A tabela HTML com `table-layout: fixed` dentro do wrapper duplo tem menos margem de erro no mobile.

## What Changes

- Remover o div `.acoes-list-wrap` do HTML (o acordeão já fornece o card frame)
- Mover os estilos de borda/background para `.accordion-inner` da visão lista, ou simplesmente deixar a tabela sem wrapper
- Garantir `width: 100%` e `overflow-x: hidden` direto na `.acoes-list`
- Validar no browser a 375px que a lista renderiza corretamente

## Capabilities

### New Capabilities

<!-- nenhuma -->

### Modified Capabilities

- `acoes-list-view`: remoção do wrapper `.acoes-list-wrap`; tabela agora fica diretamente no `.accordion-inner`

## Impact

- `src/app/components/dashboard/dashboard.html` — remover `<div class="acoes-list-wrap">` (ambas as view modes usam lista dentro do accordion)
- `src/app/components/dashboard/dashboard.scss` — remover/ajustar regras de `.acoes-list-wrap`; garantir que `.acoes-list` ocupa 100% da largura disponível
