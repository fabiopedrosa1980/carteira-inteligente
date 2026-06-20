## 1. Motor de cadência (util)

- [x] 1.1 Criar util de cadência que recebe `ex_date[]` e retorna `{ next: Date, level: 'day'|'month'|null, cadence: 'mensal'|'trimestral'|'semestral'|'anual', daysUntil }`
- [x] 1.2 Implementar mediana dos intervalos consecutivos e classificação de cadência (~30/90/180/365d, faixa ±25%)
- [x] 1.3 Projetar `next = última_ex + gap`, rolando para frente até `> hoje`; calcular `daysUntil` em data local (sem deslocamento de fuso)
- [x] 1.4 Decidir `level`: `day` se ≥3 ex_dates e CV ≤ ~0,15; `month` se 1 intervalo ou CV alto; `null` (excluir) se <2 ex_dates
- [x] 1.5 Excluir ritmo quebrado: última ex mais antiga que 1,5× o intervalo → retorna `null`

## 2. Componente da faixa

- [x] 2.1 Criar `ProximasDatasComComponent` standalone com `@Input() assetType: 'Acoes' | 'FIIs'` e signals `loading`/`items`
- [x] 2.2 Carregar universo (`getStocks`) + carteira (`getAcoes`/`getFiis`); diff por ticker normalizado → `owned`
- [x] 2.3 Buscar `getStockDividends(stock_id)` em paralelo (`forkJoin`) para os ativos da classe; aplicar o motor de cadência
- [x] 2.4 Filtrar pelo horizonte (45 dias), ordenar por `daysUntil` asc (mês provável ordena pelo 1º dia do mês)
- [x] 2.5 Montar item: `owned`, ticker, data-com estimada (dia|mês), cadência, `daysUntil`

## 3. Template e estilo

- [x] 3.1 HTML da faixa: lista de itens com marcador 🟢/🔴, ticker, data estimada, cadência e "em N dias"; rodapé "≈ estimativa pelo histórico · confirme no RI"
- [x] 3.2 Estados de loading e vazio ("Nenhuma data-com estimada nos próximos 45 dias")
- [x] 3.3 SCSS no padrão stock-card/radar-card; realce de urgência (faixa lateral) para os primeiros dias

## 4. Integração

- [x] 4.1 Renderizar a faixa no topo da sub-tab Radar em `dividends.html`, passando o `assetType` atual
- [x] 4.2 Garantir recarga ao trocar Ações/FIIs (via `ngOnChanges` do `@Input`)

## 5. Verificação

- [x] 5.1 `ng build` sem erros; conferir ordenação por urgência, eixo tenho/não-tenho, dia-vs-mês e horizonte
- [x] 5.2 `npx prettier --write` nos arquivos alterados; commit e push
