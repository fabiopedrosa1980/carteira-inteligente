## Context

- Abas em `dashboard.ts`: `meus-ativos` (📊), `portfolio`/Minhas Ações (💼). Significado invertido em relação ao desejado.
- Tabela de lançamentos (`my-assets.html`): `.table-row` (div) com `edit(t)` e `remove(t)`; a edição abre um modal (`editing` signal). Tabela de Metas (`goals.html`): `<tr>` com `openForm(meta)` e `deleteMeta(meta.id)`; edição inline.
- Badges de tipo (`dividend-history`): `typeClass()` aplica `.badge-jcp`/`.badge-dividendo`, com cores fixas claras (`#facc15`, `#4ade80`) pensadas para o dark; no light ficam lavadas. O tema é controlado por `body.light-theme` (variáveis em `styles.scss`: `--color-warning` light = `#b45c0a`, `--color-pos` light = `#1a7f4b`).

## Goals / Non-Goals

**Goals:**
- Ícones de aba coerentes (stocks/portfólio).
- Linha clicável para editar nas duas tabelas, sem conflito com os botões.
- Badges Dividendo/JCP legíveis no light, sem regredir o dark.

**Non-Goals:**
- Redesenhar tabelas ou o fluxo de edição.
- Alterar os badges no tema dark.

## Decisions

**1. Ícones das abas.** `meus-ativos` → 💼 (portfólio); `portfolio` (Minhas Ações) → 📈 (stocks). Apenas o campo `icon` no array `tabs`.

**2. Linha clicável.**
- Meus Ativos: adicionar `(click)="edit(t)"` e `class="clickable"` (cursor pointer) à `.table-row`; nos botões de ação, `(click)="edit(t); $event.stopPropagation()"` e `(click)="remove(t); $event.stopPropagation()"`.
- Metas: adicionar `(click)="openForm(meta)"` e estilo de cursor/realce ao `<tr>`; nos botões, `$event.stopPropagation()` antes de `openForm`/`deleteMeta`.
- O botão de editar pode permanecer como affordance redundante; o essencial é o `stopPropagation` no excluir. Alternativa considerada: remover os botões de editar — descartada para preservar a familiaridade visual.

**3. Badges no tema light.** Adicionar overrides em `dividend-history.scss` sob `body.light-theme` (selecionável via encapsulação emulada, pois `.badge-*` está no template do componente):
- `.badge-jcp` → texto/borda em âmbar escuro (ex.: `#b45c0a`), fundo com leve tom âmbar.
- `.badge-dividendo` → texto/borda em verde escuro (ex.: `#1a7f4b`), fundo com leve tom verde.
Mantém as regras atuais como padrão do dark. Alternativa: trocar as cores fixas por `var(--color-warning)`/`var(--color-pos)` — também válida, mas o override no light é mais cirúrgico e garante zero regressão no dark.

## Risks / Trade-offs

- [Clique acidental na linha abrindo edição] → A edição é não destrutiva (abre modal/form, não salva sozinha); o excluir está protegido com `stopPropagation`.
- [Seletor `body.light-theme` dentro de SCSS de componente] → Funciona na encapsulação emulada porque o elemento estilizado (`.badge-*`) pertence ao componente; o ancestral `body.light-theme` é preservado.
- [📈 também é usado no logo] → Contexto visual distinto (brand vs. aba); aceitável.
