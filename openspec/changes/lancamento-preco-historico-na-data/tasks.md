## 1. Backend (serviço externo — coordenação)

- [x] 1.1 [EXTERNO→FEITO no repo carteira-inteligente-api, commit 58850d2] No serviço Go `carteira-inteligente-api`: fazer `/api/v1/quote/:ticker` honrar `?date=YYYY-MM-DD` — retornar o fechamento na data (ou pregão anterior mais próximo) quando a data < hoje; manter cotação atual sem data. (Fora deste repo; pré-requisito para o efeito visível.)

## 2. Serviço de cotação (stock-api.service.ts)

- [x] 2.1 `getQuote(ticker: string, date?: string)`: anexar `?date=` somente quando `date` for informada e anterior a hoje; manter `catchError → empty`

## 3. Modal de lançamento (add-transaction-modal.ts)

- [x] 3.1 Trocar a fonte de busca para emitir `{ ticker, date }` e `switchMap` em `getQuote(ticker, date)`; usar `form.date` ao resolver o ticker
- [x] 3.2 Adicionar `onDateChange()` que reemite a busca com o ticker atual quando a data muda (somente em modo adição, com ticker válido)
- [x] 3.3 Guarda `priceManuallyEdited`: setar no change do preço, limpar a cada auto-preenchimento; só sobrescrever `form.price` se não editado manualmente; não auto-preencher em `isEdit`
- [x] 3.4 Estado `quoteAsOf` com a data de referência quando o preço vier de data passada
- [x] 3.5 Helper local de "anterior a hoje" comparando `YYYY-MM-DD` em data local (sem fuso)

## 4. Template (add-transaction-modal.html)

- [x] 4.1 Ligar `(ngModelChange)` da data ao `onDateChange()` e do preço à marcação de edição manual
- [x] 4.2 Exibir "Cotação de DD/MM/AAAA" perto do campo de preço quando `quoteAsOf` estiver setado

## 5. Verificação

- [x] 5.1 `ng build` sem erros; conferir o envio de `?date=` em data passada, refetch ao trocar a data, guarda de edição manual e o indicador de data
- [x] 5.2 `npx prettier --write` nos arquivos alterados; commit e push
