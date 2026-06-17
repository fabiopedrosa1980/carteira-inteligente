## 1. Nome da empresa no card

- [x] 1.1 Em `stock-card.ts`, alterar o limite de `displayName` de 20 para 40 caracteres (truncamento + reticências), preservando o fallback `—`.

## 2. Reposicionar a nota

- [x] 2.1 Em `stock-card.html`, remover o `nota-badge` de `.card-top` e renderizá-lo após a `.stat-strip`, na região inferior do card.
- [x] 2.2 Em `stock-card.scss`, ajustar os estilos do `nota-badge` para a nova posição (remover `margin-left: auto` do contexto do topo, definir alinhamento/espaçamento na base) e revisar o comportamento responsivo em `@media (max-width: 640px)`.

## 3. Verde de destaque no tema dark

- [x] 3.1 Em `src/styles.scss`, clarear `--accent` no bloco `:root` (tema dark) para um verde mais vibrante (ex.: `#2ea043`), sem alterar `body.light-theme`.
- [x] 3.2 Validar visualmente a tela Meus Ativos no tema dark (contadores, totais, ticker-badge, cabeçalhos ativos) e conferir legibilidade do texto branco nos botões com fundo `--accent`.

## 4. Verificação e entrega

- [x] 4.1 Rodar `npx prettier --write` nos arquivos alterados e validar o build (`ng build`).
- [x] 4.2 Commit e push seguindo o workflow do projeto (`style:`/`feat:`).
