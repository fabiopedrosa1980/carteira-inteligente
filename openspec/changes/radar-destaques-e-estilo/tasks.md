## 1. Lógica de destaques (dividends-radar.ts)

- [x] 1.1 Adicionar `topMonth` (computed/método): mês com `max(tickers.length)` e length > 0; empate resolve no primeiro mês; retorna 0 se nenhum tem ativos
- [x] 1.2 Adicionar `nextMonth = (new Date().getMonth() + 1) % 12 + 1` para o mês seguinte ao atual (Dez→Jan)
- [x] 1.3 Expor helpers para o template: `isTop(m)` e `isNext(m)` comparando `m.month`

## 2. Template (dividends-radar.html)

- [x] 2.1 Remover `· {{ year }}` do `radar-title`
- [x] 2.2 Aplicar classes condicionais ao `.radar-card`: `.top` quando `isTop(m)`, `.next` quando `isNext(m)`
- [x] 2.3 Exibir estrela (★) no card do mês `topMonth`
- [x] 2.4 Adicionar contador de ativos por card (ex.: badge com `m.tickers.length`)

## 3. Estilo no padrão stock-card (dividends-radar.scss)

- [x] 3.1 Alinhar `.radar-card` ao stock-card: borda, raio, transição e hover `translateY(-3px)` + borda accent
- [x] 3.2 Estilizar `.next` com realce (borda accent) e a estrela do `.top`
- [x] 3.3 Estilizar o badge contador; manter grid responsivo (4/2/1 colunas)

## 4. Verificação

- [x] 4.1 `ng build` sem erros; conferir que o título não mostra mais o ano e que estrela, contador, próximo mês e estilo aparecem corretamente
- [x] 4.2 `npx prettier --write` nos arquivos alterados; commit e push
