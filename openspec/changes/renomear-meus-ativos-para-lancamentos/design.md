## Context

- `dashboard.ts`: aba `{ id: 'meus-ativos', label: 'Meus Ativos', iconPath }`. O `id` permanece `meus-ativos` (chave interna); só o `label` muda.
- `my-assets.html`: `<h2 class="page-title">Meus Ativos</h2>`; acordeão com `<svg class="sec-icon" *ngIf="sec.iconPath">` + `<span class="sec-label">{{ sec.label }}</span>`.
- `my-assets.ts`: `sections` com `label` "Lançamentos de …" e `iconPath` (FIIs/ETFs).
- `dashboard.html`: textos de estado vazio referenciam "aba Meus Ativos".

## Decisions

**1. Renomear sem mudar o id.** Trocar apenas o `label` da aba para "Lançamentos" (mantém `id: 'meus-ativos'` e a lógica de `refreshActiveTab`). Trocar o `<h2 class="page-title">` para "Lançamentos".

**2. Rótulos das seções.** Em `sections`, `label` passa a ser "Ações"/"FIIs"/"ETFs" (sem "Lançamentos de "). O campo `short` já é "Ações"/"FIIs"/"ETFs"; o `label` fica igual ao `short`.

**3. Remover ícone do acordeão.** Remover o `<svg class="sec-icon">` do template e o campo `iconPath` das seções; remover a regra `.sec-icon` do SCSS.

**4. Referências textuais.** Atualizar "aba Meus Ativos" → "aba Lançamentos" nas mensagens de estado vazio.

## Risks / Trade-offs

- [Inconsistência menu vs. título] → evitada: ambos viram "Lançamentos".
- [`id` interno permanece `meus-ativos`] → intencional, evita refator desnecessário; só o rótulo visível muda.
- [`iconPath` órfão] → removido das seções e do template para não deixar campo sem uso.
