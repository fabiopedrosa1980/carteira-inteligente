## 1. Cabeçalho da coluna (desktop)

- [x] 1.1 Em `src/app/components/dashboard/dashboard.html`, alterar o texto do cabeçalho da coluna de variação do dia de "Hoje" para "Variação hoje" (mantendo o `setSort('change')` e o indicador de ordenação `th-arrow`).

## 2. Rótulo da pílula no card mobile

- [x] 2.1 Em `src/app/components/dashboard/dashboard.scss`, adicionar `content: 'Variação hoje'` ao `::before` da célula de variação do dia no card mobile (`td:nth-child(5)`), seguindo o padrão dos demais micro-rótulos do card.
- [x] 2.2 Ajustar o estilo da pílula `td:nth-child(5)` se necessário (alinhamento/espaçamento) para acomodar o rótulo acima do valor sem quebrar o layout do card.

## 3. Verificação

- [x] 3.1 Rodar `npx prettier --write "src/**/*.{ts,html,scss}"` nos arquivos alterados.
- [x] 3.2 Verificar no desktop que o cabeçalho exibe "Variação hoje" e a ordenação continua funcionando.
- [x] 3.3 Verificar no mobile (≤640px) que a pílula de variação do dia exibe o rótulo "Variação hoje" e o valor permanece colorido por sinal.
