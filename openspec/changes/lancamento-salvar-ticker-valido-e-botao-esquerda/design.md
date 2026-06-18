## Context

`AddTransactionModalComponent` tem os signals `quoteLoading`, `quoteName` (nome resolvido quando encontrado) e `quoteNotFound`. Ao digitar ≥3 letras, busca a cotação: sucesso → `quoteName` setado, `quoteNotFound=false`; falha → `quoteNotFound=true`, `quoteName=''`. O botão Salvar hoje é `[disabled]="saving()"`. Em modo edição (`isEdit`), o input do ticker fica `disabled` e a cotação não é re-buscada.

`.add-row` (my-assets) hoje usa `justify-content: center`.

## Decisions

**1. Validade do ticker.** Adicionar um getter:
```ts
get isTickerInvalid(): boolean {
  if (this.isEdit) return false;          // ticker fixo em edição
  return this.quoteLoading() || this.quoteNotFound() || !this.quoteName();
}
```
Bind: `[disabled]="saving() || isTickerInvalid"`. Assim, em adição, Salvar só habilita com cotação resolvida (`quoteName` setado), cobrindo vazio/carregando/não encontrado.

**2. Alinhamento do botão.** `.add-row { justify-content: flex-start }` (à esquerda).

## Risks / Trade-offs

- [Exigir cotação resolvida pode bloquear tickers válidos que a fonte não reconhece] → é o comportamento desejado (evitar ativos inválidos); o usuário vê o aviso "Ativo não encontrado". Caso necessário no futuro, dá para afrouxar para bloquear só `quoteNotFound`.
- [Edição sem cotação] → tratada com `isEdit` (não bloqueia).
