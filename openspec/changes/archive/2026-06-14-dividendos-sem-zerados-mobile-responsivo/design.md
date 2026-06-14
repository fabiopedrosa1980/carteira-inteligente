## Contexto

A listagem de dividendos (`FindByStockID` / `FindByStockIDAndYear`) não filtra `amount`. O scraper já descarta `amount <= 0`, mas reforçar na query garante que nenhum zero apareça.

No frontend, a `tab-nav` usa `overflow-x: auto` com `white-space: nowrap` (scroll horizontal no mobile). As tabelas `dividend-history` (4 colunas, 25% cada) e `goals` (5 colunas) usam `overflow-x: auto` nos wrappers. A `my-assets` já adapta o grid em 600px.

## Metas / Não-Metas

**Metas:**
- Excluir dividendos zerados da listagem
- Eliminar scroll horizontal no mobile para o menu de abas e as tabelas de dividendos e metas

**Não-Metas:**
- Reescrever tabelas como cards empilhados
- Alterar a `my-assets` (já responsiva)

## Decisões

### D1 — Filtro `amount > 0` nas queries de listagem
Adicionar `AND amount > 0` em `FindByStockID` e `FindByStockIDAndYear`. Centralizado na camada de persistência, sem mudar DTO nem contrato.

### D2 — `tab-nav` sem scroll
No mobile, as abas passam a `flex: 1 1 auto` com `flex-wrap: wrap`, padding e fonte reduzidos, removendo a dependência de `overflow-x: auto`. Com 4 abas, elas cabem em uma ou duas linhas.

### D3 — Tabela de dividendos no mobile
Breakpoint `≤480px`: reduzir `font-size` e `padding` das células e abreviar cabeçalhos longos ("Data de Pagamento" → "Pagamento"/"Pgto", "Data Com" → "Com"). Usar duas versões de texto no `<th>` controladas por classe (`.full`/`.short`) com `display` por media query, evitando lógica no TS. As 4 colunas a 25% cabem com fonte menor.

### D4 — Tabela de metas no mobile
Breakpoint `≤480px`: reduzir fonte/padding e ocultar a coluna "Valor Alvo" (`<col>`, `<th>`, `<td>` correspondentes) via `nth-child`, deixando Meta / Valor Atual / Progresso / Ações. Acima do breakpoint, todas as colunas aparecem.

## Riscos / Trade-offs

- **[Ocultar Valor Alvo no mobile]** → o usuário perde o alvo na tabela, mas mantém o percentual de progresso (que já reflete a relação atual/alvo). Aceitável; o alvo continua acessível no formulário de edição.
- **[Abreviação de cabeçalhos]** → leve perda de clareza no mobile, compensada por caber sem scroll.

## Plano de Migração

Backend: deploy direto (filtro de query). Frontend: apenas SCSS/HTML, deploy direto.
