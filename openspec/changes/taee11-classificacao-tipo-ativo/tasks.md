## 1. Paliativo — destravar o salvamento (prioridade 1, sem backend)

- [ ] 1.1 Em `add-transaction-modal.ts` `save()` (`:296-303`): remover a gravação de `errors.ticker` na divergência de tipo, mantendo a divergência apenas como aviso visual (`tickerTypeMismatch`). O `save()` não deve mais bloquear por tipo detectado.
- [ ] 1.2 Garantir que o salvamento prossegue com `form.assetType` escolhido pelo usuário (Ações/FIIs/ETFs), inclusive com a seção travada (`isAssetTypeLocked`).
- [ ] 1.3 Verificar o template do modal: o aviso `tickerTypeMismatch` deve aparecer como mensagem informativa (não como erro que trava o botão de salvar).

## 2. Heurística — parar de classificar unit como FII

- [ ] 2.1 Em `asset-type.util.ts` `detectAssetType`: para sufixo `11` fora de `ETF_TICKERS`, retornar `null` (indeterminado) em vez de `'FIIs'`. Preservar `ETF_TICKERS → 'ETFs'` e sufixos `3/4/5/6/7/8 → 'Acoes'`.
- [ ] 2.2 Atualizar o comentário-cabeçalho do arquivo: descrever que `11` sem classificação confiável é indeterminado e que o tipo confiável vem da cotação/usuário.
- [ ] 2.3 Ampliar/criar `asset-type.util.spec.ts`: `TAEE11/SANB11/KLBN11/ENGI11/BPAC11 → null`; `MXRF11 → null`; `BOVA11/IVVB11 → ETFs`; `VALE3/ITUB4 → Acoes`.
- [ ] 2.4 Rodar `preco-teto.util.spec.ts` e demais consumidores de `detectAssetType`; ajustar o que assumia `FIIs` para `11` desconhecido.

## 3. Tipo vindo da cotação (consome backend; degrada sem ele)

- [ ] 3.1 `stock-api.service.ts`: adicionar `assetType?: AssetType` em `StockQuote` (importar `AssetType` de `transaction.model`).
- [ ] 3.2 `add-transaction-modal.ts`: ao receber a cotação, se `quote.assetType` vier preenchido, usá-lo para o auto-fill do tipo (prioridade sobre `detectAssetType`), respeitando `isAssetTypeLocked`.
- [ ] 3.3 Manter `detectAssetType` como fallback quando `quote.assetType` ausente; nunca sobrescrever escolha manual já feita pelo usuário.

## 4. Backend Go (`carteira-inteligente-api`) — classificador no próprio repo

- [ ] 4.1 Especificar no contrato (`specs/backend-quote-asset-type`) o campo `assetType` (`Acoes|FIIs|ETFs|""`) em `GET /api/v1/quote/:ticker` e `/quotes`, e a regra de classificação tiered.
- [ ] 4.2 `quote_handler.go`: adicionar `InstrumentType string \`json:"instrumentType"\`` ao struct `chartMeta` de `fetchYahoo` (hoje o campo chega do Yahoo e é descartado) — custo zero, sem chamada nova.
- [ ] 4.3 Novo classificador (ex.: `internal/.../assettype`): função tiered `instrumentType=="ETF"→ETFs`; sufixo `3–8→Acoes`; sufixo `11`: `ETF_SET→ETFs`, `UNIT_SET→Acoes`, senão `FIIs`; demais `""`. Mapas `ETF_SET` (espelho do front) e `UNIT_SET` (~40 units: TAEE11, SANB11, KLBN11, ENGI11, SAPR11, BPAC11, ALUP11…).
- [ ] 4.4 Popular `QuoteResponse.AssetType` em `fetchYahoo` e propagar em `/quote` e `/quotes`.
- [ ] 4.5 Teste de mesa do classificador (ETF por instrumentType, unit por UNIT_SET, FII default, ação por sufixo, BDR/índice→"").
- [ ] 4.6 (Futuro, se necessário) Upgrade da fonte para brapi.dev ou ingestão do arquivo de instrumentos da B3, caso "falso-FII" vire reclamação real.

## 5. Validação manual

- [ ] 5.1 Adicionar `TAEE11` como **Ações** pelo modal — deve salvar sem bloquear, com aviso informativo no máximo.
- [ ] 5.2 Repetir com seção travada em Ações — não deve bloquear.
- [ ] 5.3 Adicionar `MXRF11` como **FIIs** — deve salvar normalmente.
- [ ] 5.4 Confirmar que `BOVA11` ainda é reconhecido/permitido como ETF.
