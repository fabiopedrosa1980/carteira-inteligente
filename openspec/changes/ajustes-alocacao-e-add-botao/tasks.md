## 1. Alocação — ações no final do card

- [x] 1.1 Em `allocation-card.html`, remover o bloco `.alloc-actions` do `<header class="alloc-head">` (deixando só título + patrimônio).
- [x] 1.2 Inserir o bloco `.alloc-actions` como último filho do `<section class="alloc-card">` (após o bloco de concentração), preservando os `*ngIf`/`(click)` atuais.
- [x] 1.3 Em `allocation-card.scss`, ajustar `.alloc-actions` no rodapé (ex.: `margin-top` para separar do conteúdo) mantendo o estilo dos botões.

## 2. Mensagem de sucesso

- [x] 2.1 Em `allocation-card.ts` (`saveEdit()`), trocar `'Distribuição alterada com sucesso'` por `'Alocação alterada com sucesso'`.

## 3. Botão "Adicionar" — tamanho e alinhamento

- [x] 3.1 Em `my-assets.scss`, alterar `.add-row` para `justify-content: flex-start` e remover o override `@media (max-width: 600px) { .btn-add-inline { width: 100% } }`.
- [x] 3.2 Em `dashboard.scss`, alterar `.add-row` para `justify-content: flex-start` e remover o `@media (max-width: 600px) { width: 100% }` dentro de `.btn-add-inline`.

## 4. Verificação

- [x] 4.1 Build: `npx ng build` compila sem erros.
- [ ] 4.2 Alocação: Editar/Salvar/Cancelar aparecem no final do card e funcionam; cabeçalho mantém título + patrimônio.
- [ ] 4.3 Ao salvar a edição, o toast diz "Alocação alterada com sucesso"; cancelar não mostra toast.
- [ ] 4.4 "Adicionar" no mobile e no desktop: mesmo tamanho (largura automática), no final, alinhado à esquerda — igual em `my-assets` e na visão de acordeão do `dashboard`.

<!-- NOTA: validação visual (4.2–4.4) requer login no app (Google Sign-In, indisponível
     em headless), então não pôde ser executada automaticamente. Build compila e as
     mudanças são corretas por inspeção. Recomenda-se conferência manual no navegador. -->

## 5. Entrega

- [x] 5.1 `npx prettier --write` nos arquivos alterados.
- [ ] 5.2 Commit com prefixos adequados (`style:`/`fix:`) e push para `main` (stage apenas dos arquivos alterados).
