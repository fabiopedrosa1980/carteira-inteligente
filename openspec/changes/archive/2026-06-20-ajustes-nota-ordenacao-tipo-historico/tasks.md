## 1. Card — Nota na mesma linha do ticker

- [x] 1.1 Em `stock-card.scss`, no breakpoint mobile (≤640px), trocar `flex-wrap: wrap` por `nowrap` no `.card-top`, mantendo `.identity { min-width: 0 }` (nome trunca) e `.card-nota { flex-shrink: 0 }`.
- [x] 1.2 Validar em cards estreitos (2 por linha no mobile) que a Nota fica ao lado do ticker sem quebrar para baixo.

## 2. Ordenação de Minhas Ações — não quebrar layout no desktop

- [x] 2.1 Em `dashboard.scss`, escopar `width: 100%; align-self: stretch` de `.sort-controls` apenas em `@media (max-width: 640px)`.
- [x] 2.2 Em `dashboard.scss`, no desktop dar a `.sort-controls` `flex: 0 1 auto; min-width: 0; max-width: 100%` para dimensionar pelo conteúdo ao lado do título, sem quebrar o cabeçalho.
- [x] 2.3 Validar no desktop (>640px) que título e controles convivem na mesma faixa sem quebra; e no mobile (≤600px) o combo permanece.

## 3. Histórico — coluna "Tipo" como texto normal

- [x] 3.1 Em `dividend-history.html`, substituir o `<span class="badge ...">{{ typeLabel(d.type) }}</span>` por `{{ typeLabel(d.type) }}` (texto normal).
- [x] 3.2 Em `dividend-history.scss`, remover/neutralizar os estilos `.badge`/`.badge-jcp`/`.badge-dividendo` que deixaram de ser usados.
- [x] 3.3 (opcional) Em `dividend-history.ts`, remover o método `typeClass` se ficou sem uso.
- [x] 3.4 Validar desktop e mobile (≤480px): Tipo aparece como texto, alinhado aos demais campos, sem rolagem horizontal.

## 4. Metas — ocultar coluna adicional no mobile

- [x] 4.1 Em `goals.scss`, no `@media (max-width: 480px)`, ocultar também a coluna "Valor Atual" (col/th/td nth-child 2), além de "Valor Alvo" (nth-child 3).
- [x] 4.2 Em `goals.scss`, reproporcionar as 3 colunas visíveis (Meta ~52%, Progresso ~24%, Operação ~24%).
- [x] 4.3 Validar no mobile (≤480px) que a tabela cabe sem estouro nem rolagem horizontal, com Meta, Progresso e Operação visíveis.

## 5. Verificação e entrega

- [x] 5.1 Rodar `npx prettier --write` nos arquivos alterados e `ng build` para garantir que compila.
- [x] 5.2 Commit e push por área (prefixos `feat:`/`style:`), staged por arquivo específico.
