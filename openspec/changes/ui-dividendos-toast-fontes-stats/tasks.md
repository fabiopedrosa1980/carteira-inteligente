## 1. Títulos curtos em Dividendos

- [x] 1.1 Em `dividends.ts`, mudar os rótulos das sub-tabs para `Histórico`, `Recebidos` e `Projetados` (mantendo os ícones).
- [x] 1.2 Em `dividend-history.html`, mudar o título interno para `Histórico`.
- [x] 1.3 Em `dividends-summary.ts`, mudar o `title` computado para `Recebidos` / `Projetados`.

## 2. Toast maior

- [x] 2.1 Em `toast.scss`, aumentar `font-size`, `padding`, `max-width`, `gap` e o `toast-close`, preservando o comportamento responsivo no mobile.

## 3. Fonte base

- [x] 3.1 Em `src/styles.scss`, alterar a fonte base de `html, body` de 14px para 15px.

## 4. Remover faixa de pills em Minhas Ações

- [x] 4.1 Em `dashboard.html`, remover o bloco `.portfolio-stats` (todos os pills) antes do header.
- [x] 4.2 Em `dashboard.scss`, remover as regras órfãs `.portfolio-stats`, `.stat-pill`, `.sp-label`, `.sp-value` (e variantes) e `.sp-sub`.
- [x] 4.3 Em `dashboard.ts`, remover os computeds `maxChange`, `topChangeStock`, `minChange`, `maxNota`, `topNotaStock` e quaisquer imports que fiquem sem uso.

## 5. Verificação e entrega

- [x] 5.1 Rodar `npx prettier --write` nos arquivos alterados e validar o build (`ng build`).
- [x] 5.2 Commit e push seguindo o workflow do projeto (`feat:`/`style:`).
