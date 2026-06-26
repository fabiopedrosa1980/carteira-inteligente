## 1. Reorganizar o grid do card mobile

- [x] 1.1 Em `my-assets.scss`, no `@media (max-width: 600px)` da `.table-row`, trocar para `grid-template-columns: 1fr 1fr` e `grid-template-areas: 'ticker ticker' / 'data qtd' / 'preco total' / 'actions actions'`.
- [x] 1.2 Conferir os `grid-area` das células: ticker (linha 1 inteira), data/qtd (linha 2), preco/total (linha 3), actions (rodapé). Data e Preço à esquerda; Qtd e Total à direita (`justify-self: end`).
- [x] 1.3 Remover o `align-self: center` específico da `.qty-cell` (não é mais a linha do ticker), deixando o alinhamento padrão da linha.

## 2. Paridade visual com Meus Ativos

- [x] 2.1 Remover o `font-family` monospace do `.table-row` mobile para herdar a sans (igual ao card de Meus Ativos); manter micro-rótulos (`::before`) inalterados.
- [x] 2.2 Mudar o `border-radius` do card de 12px para 14px (igual a Meus Ativos).
- [x] 2.3 Confirmar que o Total continua como valor de destaque (negrito/acento) e que o rodapé de ações (Editar/Excluir e "+") permanece com a divisória.

## 3. Validação

- [x] 3.1 `npx prettier --write` no arquivo alterado.
- [x] 3.2 `ng build` sem erros (avisos de budget pré-existentes são aceitáveis).
- [x] 3.3 Conferir no mobile (≤600px): ticker sozinho na 1ª linha; Data·Qtd e Preço·Total 2 por linha; ações no rodapé; tipografia/raio iguais a Meus Ativos; sem rolagem horizontal. Desktop inalterado.
