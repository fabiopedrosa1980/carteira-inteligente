## 1. Frontend — Filtro de ano (todos por padrão)

- [x] 1.1 Em `dividend-history.ts`, alterar `selectedYear` para `signal<number | null>(null)` (null = todos os anos)
- [x] 1.2 Atualizar `filteredDividends` para: quando `selectedYear()` é `null`, retornar todos os dividendos; quando um ano, filtrar por `year` (derivado de `pay_date`); remover o cap de mês corrente
- [x] 1.3 Atualizar `selectYear(year: number | null)` para aceitar `null` e resetar `page` para 0
- [x] 1.4 Remover o `currentMonth` se não for mais usado

## 2. Frontend — Chips de ano no template

- [x] 2.1 Em `dividend-history.html`, substituir o `<select>` de ano por uma fileira de chips: botão "Todos" + um botão por ano de `availableYears()`
- [x] 2.2 Marcar o chip ativo conforme `selectedYear()` (ou "Todos" quando `null`) e chamar `selectYear(...)` no clique

## 3. Frontend — Colunas iguais (25%)

- [x] 3.1 Em `dividend-history.scss`, alterar `.col-tipo/.col-data-com/.col-pagamento/.col-valor` para `width: 25%` cada
- [x] 3.2 Adicionar estilos dos chips de ano (ativo/inativo) em `dividend-history.scss`

## 4. Build e deploy

- [x] 4.1 `npx ng build` sem erros de tipo
- [x] 4.2 Commit e push em `carteira-inteligente`: `feat: dividendos exibem 5 anos por padrao com filtro por ano e colunas iguais`
- [ ] 4.3 Testar visualmente: tabela abre com todos os anos; clicar num ano filtra; "Todos" volta a exibir tudo; colunas com 25% cada
