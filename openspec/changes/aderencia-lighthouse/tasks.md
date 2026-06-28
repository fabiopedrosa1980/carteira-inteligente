## 1. SEO / metadados (index.html)

- [x] 1.1 Corrigir `<html lang="en">` → `<html lang="pt-BR">`.
- [x] 1.2 Adicionar `<meta name="description" content="...">` descritiva no `<head>`.

## 2. Acessibilidade (landmark main)

- [x] 2.1 Em `src/app/app.ts`, envolver `<router-outlet>` em `<main>` no template inline (toast e diálogo permanecem fora do `<main>`).

## 3. Limpeza

- [x] 3.1 Remover `src/app/app.html` (placeholder morto; `app.ts` usa template inline).

## 4. Verificação

- [x] 4.1 Build: `npx ng build` compila sem erros.
- [x] 4.2 Re-rodar Lighthouse no build de produção: SEO 100 e Acessibilidade 100; `meta-description`, `landmark-one-main`, `html-has-lang`/`html-lang-valid` passando.
- [x] 4.3 Conferir que o `<main>` não introduziu regressão de layout (build ok; `<main>` é display:block sem estilo próprio).

## 5. Entrega

- [x] 5.1 `npx prettier --write` nos arquivos alterados.
- [ ] 5.2 Commit (`fix:`/`chore:`) e push para `main` (stage apenas dos arquivos alterados).

## 6. Performance (fase futura / opcional — fora do escopo desta entrega)

- [ ] 6.1 (futuro) Lazy-load das rotas/telas pesadas (Dividendos/Radar/Importar) para baixar o bundle inicial < 500KB.
- [ ] 6.2 (futuro) Reavaliar orçamento de `dashboard.scss` (split ou aumento justificado).
