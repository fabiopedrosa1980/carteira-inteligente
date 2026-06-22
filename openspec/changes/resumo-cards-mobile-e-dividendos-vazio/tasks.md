## 1. Cards de indicadores 2 por linha no mobile

- [ ] 1.1 Em `src/app/components/dashboard/dashboard.scss`, no breakpoint `@media (max-width: 640px)`, remover o `grid-column: 1 / -1` do `.ps-card-hero` para que o Patrimônio Total ocupe apenas uma coluna (2 por linha como os demais).
- [ ] 1.2 No mesmo breakpoint, normalizar o valor do Patrimônio (`.ps-card-hero .ps-card-value`) para um tamanho que caiba no card em coluna única, sem quebrar o layout nem causar rolagem horizontal.

## 2. Estado vazio padronizado no resumo de dividendos

- [ ] 2.1 Em `src/app/components/dividends-summary/dividends-summary.html`, substituir o `.ds-empty` (texto solto) por um bloco no padrão da tela de Histórico (`dh-no-data`): ícone + título + texto de apoio, mantendo a condição `*ngIf="rows().length === 0"`.
- [ ] 2.2 Em `src/app/components/dividends-summary/dividends-summary.scss`, estilizar o novo estado vazio replicando o padrão do `.dh-no-data` (bloco centralizado, ícone com tinta do accent, título em destaque, texto secundário).

## 3. Verificação

- [ ] 3.1 Rodar `npx prettier --write "src/**/*.{ts,html,scss}"` nos arquivos alterados.
- [ ] 3.2 Verificar no mobile (≤640px) que todos os cards de resumo ficam 2 por linha, incluindo o Patrimônio, sem rolagem horizontal.
- [ ] 3.3 Verificar que a tela de Dividendos (Recebidos/Projetados) exibe o estado vazio no mesmo padrão visual do Histórico de dividendos.
