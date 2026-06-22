## 1. Card Meus Ativos — preços na mesma linha

- [ ] 1.1 Em `dashboard.scss` (`@media (max-width: 640px)` da `.acoes-list`), alterar o `grid-template-areas` da `.acoes-row` para `'ticker hoje' / 'saldo qtd' / 'preco patual' / 'rent var'`, trocando `qtd` de lugar com `patual` para que Preço médio e Preço atual fiquem na mesma linha.
- [ ] 1.2 Conferir que os alinhamentos da coluna direita (`justify-self: end` em `qtd`, `patual`, `var`, `hoje`) continuam coerentes após a troca.

## 2. Histórico — remover borda

- [ ] 2.1 Em `dividend-history.scss`, remover a `border: 1px solid …` de `.dh-section`, mantendo `background`, `border-radius` e `padding`.

## 3. Verificação

- [ ] 3.1 Rodar `ng build` e validar visualmente o card de ativo em ≤640px (dois preços na mesma linha) e a tela de Histórico sem borda.
- [ ] 3.2 Commit e push seguindo o fluxo do projeto (stage de arquivos específicos).
