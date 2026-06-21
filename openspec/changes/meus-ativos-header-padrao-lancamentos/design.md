## Context

Dois acordeões com cabeçalhos parecidos mas inconsistentes:
- **Lançamentos** (`my-assets.html`): `.ah-left` = `.sec-label` + `.sec-count` (badge); `.ah-right` = `.sec-total` (pipe `currency: 'BRL'`, cor accent) + `.chevron`.
- **Meus Ativos** (`dashboard.html`): `.ah-left` = `.sec-label` + `.sec-count`; `.ah-right` = `.sec-total` (`R$ <number>`, cor neutra) + `.sec-rent` (% colorido) + `.chevron`. No `dashboard.scss`, `.sec-count` é ocultada em ≤600px.

## Goals / Non-Goals

**Goals:**
- Cabeçalho de Meus Ativos no mesmo padrão de Lançamentos (total em moeda/accent, contagem em badge).
- Contagem do tipo sempre visível (incl. mobile).
- Espaçamento coerente entre contagem, total e rentabilidade.

**Non-Goals:**
- Não alterar o acordeão de Lançamentos.
- Não mudar cálculos (`groupSaldo`/`groupRentabilidade`) nem TS.

## Decisions

- **HTML** (`dashboard.html`): trocar
  `R$ {{ groupSaldo(group) | number: '1.2-2' }}` por
  `{{ groupSaldo(group) | currency: 'BRL' : 'symbol' : '1.2-2' }}` (igual a Lançamentos). Estrutura `.ah-left`/`.ah-right` mantida; `.sec-count` já existe.
- **SCSS** (`dashboard.scss`):
  - `.sec-total` → `color: var(--accent)` (padrão de Lançamentos), mantendo peso/fonte.
  - Remover a regra `@media (max-width: 600px) { .sec-count { display: none } }`.
  - Espaçamento coerente: `.ah-right { gap: 12px }` (8px no mobile) e `.ah-left { gap: 8–10px }` consistentes; garantir que total e rentabilidade tenham o mesmo gap entre si e em relação ao chevron.
  - Mobile: manter fontes compactas de `.sec-total`/`.sec-rent`/`.sec-count` para caber nome + badge + total + rentabilidade sem rolagem horizontal.

## Modal de lançamento (AddTransactionModalComponent)

Contexto: o campo Preço é `type="number"` (`onPriceChange`); o ticker tem autocomplete via `searchTickers` (subscription `searchSub` → `suggestions`); a confirmação ocorre em `save()` que valida campos e chama `svc.add/update`. `StockQuote` não traz categoria; `TickerSuggestion` é só `{ticker,name}`.

### Máscara de moeda no Preço (`lancamento-preco-mascara-moeda`)
- Trocar o input para `type="text"` `inputmode="decimal"`.
- Manter `form.price` numérico; adicionar `priceDisplay` (string formatada). Handler `onPriceInput(raw)`:
  - extrai dígitos, interpreta como centavos → `value = digits/100`.
  - `form.price = value`; `priceDisplay = formato BRL` (`Intl.NumberFormat('pt-BR', {minimumFractionDigits:2})` ou `1.234,56`).
  - manter `priceManuallyEdited = true`.
- Quando a cotação preenche `form.price`, atualizar `priceDisplay` também (formatado).
- `save()` continua usando `form.price` (número). O prefixo "R$" pode ficar como adorno fixo no label/campo.

### Validação ticker × tipo (`lancamento-ticker-valida-tipo`)
- Helper `tickerKind(ticker): 'acao' | 'fii_etf' | 'unknown'`:
  - normaliza upper/trim; pega o sufixo numérico final.
  - termina em `11` → `fii_etf`; termina em `3|4|5|6|7|8` → `acao`; senão `unknown`.
- Em `save()` (e/ou ao resolver o ticker), comparar com `form.assetType`:
  - `assetType==='Acoes'` e kind==='fii_etf' → erro.
  - `assetType` ∈ {`FIIs`,`ETFs`} e kind==='acao' → erro.
  - kind==='unknown' ou (kind==='fii_etf' com FIIs/ETFs) → ok.
  - setar `errors.ticker` com mensagem clara e abortar o save.

### Autocomplete sem fracionário (`lancamento-autocomplete-sem-fracionario`)
- No `searchSub`, filtrar a lista: `list.filter(s => !/F$/i.test(s.ticker))`. Tickers padrão terminam em dígito; só os fracionários terminam em "F", então o filtro é seguro.

## Risks / Trade-offs

- Mobile mais cheio (nome + badge + total + rentabilidade). Mitigação: badge e textos compactos; `white-space: nowrap` + gaps enxutos. Se ainda apertar em telas muito estreitas, priorizar manter tudo em uma linha reduzindo levemente as fontes (sem ocultar a contagem, que é requisito).
- `currency: 'BRL'` usa o locale registrado; o app já usa esse pipe em Lançamentos, então o símbolo/locale serão consistentes.
- **Validação por sufixo é heurística**: não distingue FII de ETF (ambos 11) e ignora BDRs/Units; cobre só os erros óbvios (ação ↔ 11). Documentado no spec.
- Máscara manual (sem lib): cuidar do caret/edição; manter simples (reformatar no input). Validar com colar valor e apagar.
