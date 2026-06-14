## Contexto

O `DividendHistoryComponent` carrega os dividendos de um ativo via `getStockDividends(stockId)` (já limitados a 5 anos pelo backend) e hoje filtra por `selectedYear`, que inicia no ano atual. O `filteredDividends` também aplica um cap de mês corrente para o ano atual. O seletor de ano é um `<select>`. As colunas usam `<colgroup>` com larguras 16/26/30/28%.

## Metas / Não-Metas

**Metas:**
- Exibir todos os 5 anos por padrão
- Filtro de ano por chips clicáveis, com "Todos" como padrão
- 4 colunas a 25% cada

**Não-Metas:**
- Alterar o backend ou a janela de importação de 5 anos
- Mudar a paginação (continua 10 por página sobre o conjunto filtrado)

## Decisões

### D1 — `selectedYear: number | null` com null = todos
`selectedYear` passa de `signal<number>` para `signal<number | null>`, inicializado em `null`. Em `filteredDividends`, quando `null`, retorna todos os dividendos; quando um ano, filtra por `year` (derivado de `pay_date`). O cap de mês corrente é removido — o backend já restringe a janela e exibir o histórico completo é o comportamento desejado.

### D2 — Chips de ano em vez de `<select>`
Trocar o `<select>` por uma fileira de botões: "Todos" + os 5 anos de `availableYears()`. O botão ativo reflete `selectedYear()` (ou "Todos" quando `null`). `selectYear(year: number | null)` atualiza o filtro e reseta a página para 0.

**Alternativa descartada:** manter o `<select>` com uma opção "Todos" — menos alinhado ao pedido "ao clicar no ano" e menos visível.

### D3 — Colunas a 25%
No SCSS, `.col-tipo/.col-data-com/.col-pagamento/.col-valor` passam todos para `width: 25%`. `table-layout: fixed` já está aplicado, garantindo as proporções.

## Riscos / Trade-offs

- **[Remover o cap de mês corrente]** → dividendos já anunciados com pagamento futuro no ano corrente passam a aparecer. É aceitável e até desejável (mostra o histórico/futuro próximo importado). Baixo impacto.
- **[Conteúdo da coluna Valor mais largo]** → com 25% fixo e `text-overflow: ellipsis` já existente, valores longos truncam; valores BRL cabem confortavelmente.

## Plano de Migração

Mudança apenas de frontend. Deploy direto, sem migração de dados.
