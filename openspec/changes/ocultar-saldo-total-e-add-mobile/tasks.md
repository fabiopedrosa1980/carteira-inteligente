## 1. Mascarar Saldo por ativo (Dashboard "Meus Ativos")

- [x] 1.1 Em `dashboard.html`, adicionar `class="cell-saldo"` ao `td` do Saldo, com o valor em `<span class="val">` (mantém o micro-rótulo mobile visível)
- [x] 1.2 Em `dashboard.scss`, adicionar `.sections-list.values-hidden .cell-saldo .val { filter: blur(7px); user-select: none; pointer-events: none; }`

## 2. Mascarar Total da operação por lançamento (Lançamentos)

- [x] 2.1 Em `my-assets.html`, envolver o valor do `.total-cell` em `<span class="val">`; em `my-assets.scss`, incluir `.total-cell .val` no bloco `.meus-ativos.values-hidden`

## 3. Mobile: "Adicionar" no rodapé e remover "+" por card (Lançamentos)

- [x] 3.1 Em `my-assets.html`, remover o botão `btn-add-card` do `.action-cell`, mantendo Editar e Remover
- [x] 3.2 Em `my-assets.scss`, exibir `.add-row` no mobile (largura cheia via `justify-content: stretch`)
- [x] 3.3 Em `my-assets.scss`, remover as regras de `.btn-add-card` (estilo compartilhado e bloco mobile)

## 4. Validar

- [x] 4.1 Rodar `ng build` sem erros (apenas warnings de budget pré-existentes)
- [x] 4.2 Saldo (Dashboard) e Total (Lançamentos) mascarados com privacidade ATIVA, valor em `.val` e rótulos preservados — verificado no código/build
- [x] 4.3 Mobile de Lançamentos: `.add-row` "Adicionar" visível por seção; `btn-add-card` removido; Editar/Remover mantidos — verificado no código/build
- [x] 4.4 Com privacidade INATIVA o blur não se aplica (regra sob `.values-hidden`) — verificado no código
