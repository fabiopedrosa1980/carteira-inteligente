## Context

O `AddTransactionModalComponent` busca a cotação por data via `tickerInput$ → switchMap(getQuote(ticker, date))`; o `subscribe` preenche `form.price` se `!priceManuallyEdited` e seta `quoteAsOf` quando a data é passada. Hoje, `onDateChange` tem `if (this.isEdit) return;`, então a edição nunca refaz a busca ao mudar a data. Em edição o ticker é fixo (input desabilitado) mas existe em `form.ticker`; `priceManuallyEdited` começa `false` e só vira `true` se o usuário editar o preço. `todayStr()` já existe (data local, sem fuso).

## Goals / Non-Goals

**Goals:**
- Edição busca a cotação da data quando a data < hoje.
- Preserva edição manual do preço.
- Não auto-altera o preço em edição para hoje/futuro.

**Non-Goals:**
- Auto-buscar ao **abrir** o modal de edição (preserva o preço registrado até o usuário mudar a data).
- Mudar o fluxo de adição (já funciona) ou o backend.

## Decisions

**1. Relaxar `onDateChange` para edição (só passado).**
```ts
onDateChange(value: string) {
  this.form.date = value;
  delete this.errors.date;
  const ticker = (this.form.ticker || '').trim();
  if (ticker.length < 3) return;
  // Em edição, só busca quando a data é anterior a hoje (preserva o preço
  // registrado para hoje/futuro). Na adição, mantém o comportamento atual.
  if (this.isEdit && value >= this.todayStr()) return;
  this.tickerInput$.next({ ticker: ticker.toUpperCase(), date: this.form.date });
}
```
O `subscribe` existente já cuida de: preencher `form.price` se não houver edição manual e setar `quoteAsOf` para data passada. Reaproveita tudo.

**2. Gatilho.** Apenas na **mudança de data** (ação explícita). Abrir o modal de edição não dispara busca — o preço registrado permanece até o usuário alterar a data.

**3. Edição manual.** A guarda `priceManuallyEdited` continua válida: se o usuário digitar o preço, a cotação não sobrescreve. (Em edição ela só vira `true` após o usuário mexer no campo de preço — abrir o modal não marca.)

## Risks / Trade-offs

- [Sobrescrever o preço original] ao mudar a data para o passado em edição, o preço registrado é substituído pela cotação da nova data — é justamente o pedido; o usuário ainda pode digitar outro valor (que passa a ser preservado).
- [Dependência do backend] o `?date=` já está em produção; se indisponível, retorna o preço atual (sem regressão).
