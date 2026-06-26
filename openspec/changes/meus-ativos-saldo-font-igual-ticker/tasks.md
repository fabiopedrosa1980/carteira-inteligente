## 1. Reduzir a fonte do Saldo

- [x] 1.1 Em `dashboard.scss`, no bloco mobile da `.acoes-list`, alterar `td:nth-child(6)` de `font-size: 23px` para `16px` (igual ao ticker `.cell-ativo`), mantendo `font-weight: 700` e `line-height: 1.1`; atualizar o comentário "número-herói".

## 2. Validação

- [x] 2.1 `npx prettier --write` no arquivo alterado.
- [x] 2.2 `ng build` sem erros (avisos de budget pré-existentes são aceitáveis).
- [x] 2.3 Conferir no mobile (≤640px): a fonte do Saldo fica igual à do ticker; peso, posição e rótulos preservados; desktop inalterado.
