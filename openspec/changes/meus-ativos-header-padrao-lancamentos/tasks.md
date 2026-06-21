## 1. Alinhar o header ao padrão de Lançamentos

- [x] 1.1 Em `dashboard.html`, trocar o total do header para o pipe de moeda: `{{ groupSaldo(group) | currency: 'BRL' : 'symbol' : '1.2-2' }}` (no lugar de `R$ {{ ...| number }}`).
- [x] 1.2 Confirmar a estrutura `.ah-left` (sec-label + sec-count) e `.ah-right` (sec-total + sec-rent + chevron).

## 2. Estilos: contagem visível, accent e espaçamento coerente

- [x] 2.1 Em `dashboard.scss`, `.sec-total` → `color: var(--accent)` (padrão de Lançamentos).
- [x] 2.2 Remover a regra que oculta `.sec-count` no mobile (`@media (max-width:600px){ .sec-count{ display:none } }`).
- [x] 2.3 Garantir espaçamento coerente: gaps consistentes em `.ah-right` (total/rent/chevron) e `.ah-left` (label/badge), desktop e mobile.
- [x] 2.4 Ajustar fontes compactas no mobile para caber nome + badge + total + rentabilidade sem rolagem horizontal.

## 3. Modal: máscara de moeda no Preço

- [x] 3.1 Em `add-transaction-modal.html`, trocar o input de Preço para `type="text"` `inputmode="decimal"`, ligado a `priceDisplay` com `(ngModelChange)="onPriceInput($event)"`.
- [x] 3.2 Em `add-transaction-modal.ts`, adicionar `priceDisplay` e `onPriceInput(raw)`: dígitos→centavos→`form.price` numérico; formatar `priceDisplay` em BRL (`1.234,56`); manter `priceManuallyEdited`.
- [x] 3.3 Ao preencher preço pela cotação, atualizar `priceDisplay` formatado; ao iniciar edição, popular `priceDisplay` a partir de `form.price`.

## 4. Modal: validação ticker × tipo

- [x] 4.1 Em `add-transaction-modal.ts`, adicionar `tickerKind(ticker)` (sufixo: 11→fii_etf; 3/4/5/6/7/8→acao; senão unknown).
- [x] 4.2 Em `save()`, bloquear e setar `errors.ticker` quando: tipo Ações com kind fii_etf; ou tipo FIIs/ETFs com kind acao. Permitir unknown e FII↔ETF.

## 5. Modal: autocomplete sem fracionário

- [x] 5.1 No `searchSub` (`add-transaction-modal.ts`), filtrar sugestões removendo tickers terminados em "F" (`!/F$/i.test(ticker)`).

## 6. Verificação

- [x] 6.1 `npx prettier --write` nos arquivos alterados (dashboard + add-transaction-modal).
- [x] 6.2 `ng build` sem erros.
- [ ] 6.3 Desktop: header de Meus Ativos no padrão de Lançamentos (total em moeda/accent), contagem/total/rentabilidade bem espaçados.
- [ ] 6.4 Mobile (≤600px): contagem do tipo visível; tudo cabe sem rolagem horizontal.
- [ ] 6.5 Modal: preço formata como moeda ao digitar e salva o número correto.
- [ ] 6.6 Modal: bloquear ação cadastrada como FII/ETF e vice-versa; FII↔ETF permitido.
- [ ] 6.7 Modal: autocomplete não lista tickers fracionários (final "F").
- [x] 6.8 Commit e push.
