## 1. Ajustar colunas do mobile na `.acoes-list`

- [x] 1.1 Em `dashboard.scss`, na media query `@media (max-width: 640px)` da `.acoes-list`, ocultar Preço Médio(3), Hoje(4) e Variação(6) via `th:nth-child`/`td:nth-child` (3, 4, 6).
- [x] 1.2 Garantir que Ativo(1), Qtd(2), Saldo(5) e Rent.(7) permaneçam visíveis.
- [x] 1.3 Definir larguras: `.cl-ativo { width: 15% }`, `.cl-qtd { width: 15% }`, `.cl-saldo { width: 35% }`, `.cl-rent { width: 35% }`; colunas ocultas (`.cl-preco`, `.cl-hoje`, `.cl-var`) com `width: 0`.
- [x] 1.4 Atualizar o comentário do mapeamento de colunas.

## 2. Verificação

- [x] 2.1 `npx prettier --write "src/app/components/dashboard/dashboard.scss"`.
- [x] 2.2 `ng build` sem erros.
- [ ] 2.3 Validar no mobile (≤640px): apenas Ativo, Qtde, Rentabilidade e Saldo; larguras ~15/15/35/35; sem rolagem horizontal.
- [ ] 2.4 Validar no desktop: 7 colunas intactas.
- [x] 2.5 Commit e push.
