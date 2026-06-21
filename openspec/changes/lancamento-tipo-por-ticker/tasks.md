## 1. Util de detecção de tipo

- [x] 1.1 Criar `src/app/models/asset-type.util.ts` com `ETF_TICKERS` (lista de ETFs B3 conhecidos) e `detectAssetType(ticker): AssetType | null` (11+lista→ETFs; 11 fora→FIIs; 3/4/5/6/7/8→Acoes; senão null).

## 2. Sugestão do tipo no modal

- [x] 2.1 Em `add-transaction-modal.ts`, ao resolver/alterar o ticker, se `!isAssetTypeLocked` e `detectAssetType(ticker)` ≠ null, preencher `form.assetType` com o tipo detectado.
- [x] 2.2 Garantir override manual (não reaplicar a sugestão por cima de uma escolha do usuário no mesmo ticker; reavaliar apenas quando o ticker muda).

## 3. Validação distingue FII/ETF

- [x] 3.1 Em `save()`, substituir `tickerKind` por `detectAssetType`; se `detected !== null && detected !== form.assetType`, setar `errors.ticker` com mensagem clara e abortar.
- [x] 3.2 Remover o helper `tickerKind` (aposentado pelo util).

## 4. Placeholder do ticker por tipo

- [x] 4.1 Em `add-transaction-modal.ts`, getter `tickerPlaceholder` por `form.assetType` (Ações→`Ex: VALE3`; FIIs→`Ex: MXRF11`; ETFs→`Ex: BOVA11`; vazio→genérico).
- [x] 4.2 No `add-transaction-modal.html`, usar `[placeholder]="tickerPlaceholder"` no input de ticker.

## 5. Radar — destaques por mínimo de ativos

- [x] 5.1 Em `dividends-radar.ts`, `topMonth` retorna 0 quando `max <= 1` (melhor mês só com >1 ativo).
- [x] 5.2 `isNextMonth` exige `monthCards()[nextMonth-1].tickers.length >= 1` além das condições atuais.

## 6. Verificação

- [x] 6.1 `npx prettier --write` nos arquivos alterados.
- [x] 6.2 `ng build` sem erros.
- [ ] 6.3 Digitar ticker preenche o tipo sugerido (quando não travado); override funciona.
- [ ] 6.4 Bloquear FII salvo como ETF e ETF salvo como FII; ação com tipo errado também bloqueia; sufixo desconhecido não bloqueia.
- [ ] 6.5 Placeholder do ticker muda conforme o tipo selecionado.
- [ ] 6.6 Radar: "Próximo mês" só destaca com ≥1 ativo; "Melhor mês" só com >1 ativo.
- [x] 6.7 Commit e push.
