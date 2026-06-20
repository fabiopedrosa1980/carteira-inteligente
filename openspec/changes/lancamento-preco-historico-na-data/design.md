## Context

`StockApiService.getQuote(ticker)` chama `/quote/:ticker` (preço atual). O `AddTransactionModalComponent` preenche `form.price` a partir da cotação **apenas quando o ticker resolve** (stream `tickerInput$` com debounce). `form.date` (default hoje) tem `[(ngModel)]` **sem** handler que dispare refetch. Testado: o backend **ignora** `?date=` hoje (retorna o preço atual). O backend é um serviço Go externo, fora deste repo.

## Goals / Non-Goals

**Goals:**
- Preço preenchido = fechamento na data informada quando a data < hoje.
- Refetch ao trocar a data; indicação de qual data a cotação representa.
- Preservar preço editado manualmente e o preço em modo edição.

**Non-Goals:**
- Implementar o backend aqui (é externo) — apenas documentar o contrato.
- Histórico/gráfico de preços; intraday; múltiplas datas.

## Decisions

**1. Contrato da API (externo).** `GET /api/v1/quote/:ticker?date=YYYY-MM-DD`:
- `date` ausente, ou ≥ hoje → cotação atual (comportamento atual).
- `date` < hoje → `price` = fechamento naquela data; se não houver pregão, o pregão anterior mais próximo. Mesma forma de resposta (`StockQuote`), com `found`.

**2. `getQuote(ticker, date?)`.** Assinatura opcional; só anexa `?date=` quando `date` é passada e é **anterior a hoje** (evita parâmetro inócuo para hoje/futuro). Mantém `catchError → empty`.

**3. Disparo do refetch.** Hoje o preço vem do `tickerInput$`. Passa a considerar a data:
- Ao resolver o ticker: buscar com `form.date`.
- Ao trocar a data (`onDateChange()`): se há ticker válido, refazer a busca com a nova data.
- Implementação: a fonte de busca emite `{ ticker, date }`; `switchMap` chama `getQuote(ticker, date)`. `onDateChange` reemite com o ticker atual.

**4. Guarda de edição manual.** Flag `priceManuallyEdited` (setada no `(ngModelChange)` do preço, limpa a cada auto-preenchimento). A cotação só sobrescreve `form.price` se `!priceManuallyEdited`. Em **modo edição** (`isEdit`), não auto-preencher por data (preserva o preço registrado).

**5. Indicador de data.** Quando o preço vier de uma data passada, exibir "Cotação de DD/MM/AAAA" perto do campo de preço; para hoje, sem indicador (ou "cotação atual"). Estado `quoteAsOf = signal<string>('')`.

**6. "Anterior a hoje".** Comparar strings `YYYY-MM-DD` em data local (`form.date < hojeLocal`), evitando fuso (mesmo padrão já usado em `dividends-summary`).

## Risks / Trade-offs

- [Dependência do backend] sem o `?date=` honrado, o frontend envia o parâmetro mas recebe o preço atual — sem efeito visível. O frontend fica pronto; o valor real depende do deploy do serviço externo.
- [Dia sem pregão] data em fim de semana/feriado → o backend deve cair no pregão anterior; documentado no contrato.
- [Sobrescrita] o refetch por data pode trocar um preço já sugerido; a guarda protege apenas edição **manual**, não o valor auto-sugerido anterior (desejado: refletir a nova data).
