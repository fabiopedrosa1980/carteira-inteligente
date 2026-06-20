## Context

`AddTransactionModalComponent` tem `@Input() defaultAssetType: AssetType | null` e `isEdit` (true quando `transaction` existe). Em `ngOnInit`, edição carrega `form.assetType = transaction.assetType`; adição a partir de seção seta `form.assetType = defaultAssetType`. O select usa `[(ngModel)]="form.assetType"` e hoje fica editável. No `my-assets`, o único `openAdd(sec.id)` sempre passa o tipo da seção via `presetType`/`defaultAssetType`.

## Goals / Non-Goals

**Goals:**
- Travar o tipo quando vier do contexto (seção ou edição).
- Manter o valor visível e o restante do formulário inalterado.

**Non-Goals:**
- Bloquear o tipo num eventual fluxo de adição **sem** contexto (aí continua editável).
- Mudar como o lançamento é salvo.

## Decisions

**1. Condição de trava.**
```ts
get isAssetTypeLocked(): boolean {
  return this.isEdit || this.defaultAssetType !== null;
}
```
Cobre os dois caminhos atuais (todo add vem de seção; toda edição tem tipo fixo). Se um dia existir add genérico (`defaultAssetType` null e não-edição), o select permanece habilitado.

**2. Template.** `[disabled]="isAssetTypeLocked"` no `<select>`. O `[(ngModel)]` mantém o valor; select desabilitado não impede o binding já feito no `ngOnInit`. Adicionar uma nota curta ("Definido pela seção") quando travado, para clareza.

**3. Estilo.** Garantir aparência de desabilitado (cursor `not-allowed`, leve atenuação) no `.form-select:disabled`, se ainda não houver.

## Risks / Trade-offs

- [Validação] `errors.assetType` ("Selecione o tipo de ativo") só dispararia sem tipo; como o tipo vem travado e preenchido, não ocorre. Sem regressão.
- [Acessibilidade] select desabilitado não recebe foco; o valor segue legível. Aceitável para um campo determinado pelo contexto.
