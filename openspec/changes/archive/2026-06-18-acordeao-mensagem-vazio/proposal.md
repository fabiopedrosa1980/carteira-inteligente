## Why

Ao remover o estado vazio dos acordeões (deixando só o botão "Adicionar"), uma seção sem lançamentos fica sem nenhuma indicação de que está vazia. Falta uma mensagem clara de "nenhum lançamento cadastrado".

## What Changes

- Nos acordeões da tela de Lançamentos, quando a seção **não tem lançamentos**, exibir uma **mensagem "Nenhum lançamento cadastrado"**, mantendo o botão "Adicionar" (à direita).

## Capabilities

### New Capabilities
<!-- Nenhuma capability nova. -->

### Modified Capabilities
- `lancamentos-add-button`: o acordeão vazio passa a exibir uma mensagem de vazio além do botão "Adicionar".

## Impact

**Frontend (este repo):**
- `src/app/components/my-assets/my-assets.html` — mensagem de vazio condicional (`length === 0`).
- `src/app/components/my-assets/my-assets.scss` — estilo discreto da mensagem.
