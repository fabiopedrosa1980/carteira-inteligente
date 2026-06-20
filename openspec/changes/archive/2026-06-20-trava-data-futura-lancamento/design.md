## Context

`AddTransactionModalComponent` serve adição e edição (`isEdit`). O input de data é `<input type="date" [ngModel]="form.date" (ngModelChange)="onDateChange($event)">` (sem `max`). O componente já tem `todayStr()` (data local `YYYY-MM-DD`, sem fuso) usado na cotação por data. O `save()` valida campos e seta `errors`.

## Goals / Non-Goals

**Goals:**
- Calendário não oferece datas futuras (adição e edição).
- Validação de data futura no salvar (defesa em profundidade).

**Non-Goals:**
- Limite mínimo de data; mudar o fluxo de cotação por data.

## Decisions

**1. `max` no input.** Adicionar `[max]="maxDate"` ao input de data. `maxDate = this.todayStr()` (campo). O atributo nativo `max` impede a seleção de datas futuras no date picker dos navegadores.

**2. Validação no `save()`.** Como o `max` nativo não impede 100% (digitação manual em alguns navegadores), adicionar em `save()`:
```ts
if (this.form.date && this.form.date > this.maxDate) {
  this.errors.date = 'A data não pode ser futura';
}
```
antes do bloqueio por `errors`. Mantém a mensagem padrão de campo.

**3. Local sem fuso.** `maxDate` vem de `todayStr()` (já em horário local), evitando bloquear/permitir o dia errado por UTC.

## Risks / Trade-offs

- [Suporte de browser] `max` em `input[type=date]` é amplamente suportado; a validação no `save()` cobre os casos de borda.
- [Edição de registros antigos] não afeta — só impede datas no futuro; datas passadas continuam livres.
