## Context

Estado atual:
- **Card de alocação** (`allocation-card.html`): o bloco `.alloc-actions` (Editar / Salvar / Cancelar) está dentro do `<header class="alloc-head">`, no topo do card. O corpo segue com faixa de composição, legenda/sliders, ledger, limite e concentração.
- **Mensagem**: `allocation-card.ts` `saveEdit()` chama `notifications.show('Distribuição alterada com sucesso')` (linha ~118).
- **Botão "Adicionar"**: usa `.btn-add-inline` dentro de `.add-row`. Em `my-assets.scss` e `dashboard.scss`, `.add-row` é `justify-content: flex-end` (direita) e, no breakpoint `≤600px`, `.btn-add-inline { width: 100% }` (largura total). Ou seja: web = automático à direita; mobile = 100% de largura.

## Goals / Non-Goals

**Goals:**
- Mover as ações do card de alocação para o final do card.
- Trocar o texto do toast para "Alocação alterada com sucesso".
- No mobile, botão "Adicionar" com tamanho de desktop (sem `width: 100%`), no final e à esquerda, igual nas duas telas.

**Non-Goals:**
- Mudar a lógica de edição/salvamento da alocação (apenas posição visual das ações).
- Alterar o comportamento de abertura do modal de "Adicionar" (tipo pré-selecionado etc.).
- Mexer no botão "+" do cabeçalho das seções (escopo é o "Adicionar" do rodapé).

## Decisions

### Decisão: mover `.alloc-actions` para o final do `<section>`

No `allocation-card.html`, retirar `.alloc-actions` do `<header>` e colocá-lo como **último filho** do `<section class="alloc-card">`, após o bloco de concentração. O cabeçalho fica só com título + patrimônio. No SCSS, adicionar um espaçamento superior ao bloco de ações no rodapé (ex.: `margin-top`) e manter o alinhamento das ações (à direita ou conforme o padrão atual de `.alloc-actions`).

Como os botões dependem de `editing()` via `*ngIf`/expressões, mover o bloco no template preserva todo o comportamento (Editar/Salvar/Cancelar) sem mudança de lógica.

**Alternativa considerada — duplicar ações (topo + rodapé):** rejeitada; gera ambiguidade e duplicação de estado visual.

### Decisão: trocar a string do toast

Em `saveEdit()`, alterar a string para `'Alocação alterada com sucesso'`. Mudança pontual de texto.

### Decisão: `.add-row` à esquerda e botão sem largura total no mobile

Em `my-assets.scss` e `dashboard.scss`:
- `.add-row { justify-content: flex-start }` (era `flex-end`) — alinha o botão à esquerda, no final da seção/acordeão.
- Remover a regra `@media (max-width: 600px) { .btn-add-inline { width: 100% } }` (em my-assets está aninhada no `.add-row`; em dashboard está dentro de `.btn-add-inline`) para o botão manter a largura automática (igual ao desktop) também no mobile.

Resultado: comportamento idêntico nas duas telas — botão de largura automática, no rodapé, à esquerda, em qualquer breakpoint.

**Alternativa considerada — manter full-width no mobile como alvo de toque maior:** rejeitada; o pedido é igualar ao web e padronizar tamanho/alinhamento. A altura do botão (`--icon-btn-size`) já garante alvo de toque adequado.

## Risks / Trade-offs

- [Alvo de toque do "Adicionar" menor no mobile (sem 100%)] → Aceitável; altura padrão mantém usabilidade; é o comportamento pedido.
- [Reposicionar `.alloc-actions` pode exigir pequeno ajuste de espaçamento/estilo no rodapé] → Mitigado validando visualmente leitura e edição.
- [Dois arquivos SCSS com a mesma regra] → Aplicar a mudança igual nos dois para manter consistência (objetivo do próprio pedido).

## Migration Plan

Apenas frontend; sem migração de dados. Deploy normal; rollback = reverter o commit.

## Open Questions

- Alinhamento horizontal do bloco de ações no rodapé do card de alocação: manter como hoje (à direita) ou também à esquerda? Decisão atual: manter o alinhamento atual de `.alloc-actions`, apenas mudando a posição vertical (rodapé). Ajustável se o usuário preferir à esquerda.
