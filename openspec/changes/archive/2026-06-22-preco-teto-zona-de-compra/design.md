## Context

O app acompanha a carteira mas não apoia a decisão de compra/venda. A feature de **preço-teto** (Bazin para ações; yield + P/VP para FIIs) preenche esse gap usando dados já carregados:

- `Stock.dividends[]` (`amount` por cota, `payDate`, `type`) — via `BackendApiService.getStockDividends`, já mapeados em `StockDataService`.
- Cotação atual — `Stock.price` / `ApiAcaoItem.current_price`.
- `indicators[]` (Investidor10) — pode conter "P/VP" para FIIs (e "VPA").
- Classe do ativo — Ações/FIIs/ETFs (`asset_type`).

Padrões existentes a reusar: utils puros e testáveis no estilo de `dividends-received.util.ts`; persistência de preferência via `localStorage` (como `radar-view` no `dividends-radar`); seção com `indicators-grid` e ícone de "info" no `stock-details-modal`.

## Goals / Non-Goals

**Goals:**
- Responder "compro a esse preço?" por ativo, com semáforo + percentual vs teto.
- Ações (Bazin/DPA 12m) e FIIs (yield + P/VP) na v1; ETF = "n/a".
- Yield-alvo por classe + override por ativo; margem configurável; tudo client-side.

**Non-Goals:**
- Sem novo endpoint/back-end na v1.
- Sem recomendação automática de compra/venda (apenas zona informativa + disclaimer).
- Sem watchlist de ativos fora da carteira (fica para evolução).
- Sem tratamento fino de IR sobre JCP na v1 (assumir valor bruto, sinalizar limitação).

## Decisions

- **DPA(12m) em util puro** `preco-teto.util.ts`: `dpaTrailing12m(dividends, today)` = soma de `amount` com `payDate` em `(today − 12m, today]`. Independe de cotas (diferente de `receivedForTicker`, que multiplica por cotas e usa ano-calendário). Decisão: trailing 12m em vez de último ano-calendário — mais atual e coerente com a leitura de "projetados".
- **Fórmula por classe** no mesmo util:
  - Ação: `teto = DPA12m / yieldAlvo`.
  - FII: `tetoYield = (rendimentoMensal × 12) / yieldAlvo` (usando DPA12m como rendimento anual quando os proventos forem mensais) **e** `sinalPVP` a partir do indicador "P/VP" (>1 caro, <1 barato). Quando "P/VP" ausente, usa só o yield.
  - ETF: retorna `{ status: 'na' }`.
- **Zonas**: `precoJusto = teto × (1 − margem)`; `🟢 preço ≤ precoJusto`; `🟡 precoJusto < preço ≤ teto`; `🔴 preço > teto`; `⚪` quando DPA12m ≤ 0 / sem histórico. Saída inclui `descontoPct = preço/teto − 1`.
- **Config em `PrecoTetoConfigService`** com signals + `localStorage`: `{ yieldByClass: {Acoes, FIIs}, overrides: {ticker: yield}, margem }`. Defaults: Ações 6%, FIIs 8%, margem 10%. Resolução do yield: `overrides[ticker] ?? yieldByClass[classe]`.
- **UI — abordagem "faixa + inline" (sem novas colunas).** A tabela `.acoes-list` já tem **8 colunas** e o mesmo `<tr class="acoes-row">` vira card 2×4 no mobile (`@media max-width:640px`, `grid-template-areas`). Adicionar colunas estouraria desktop e mobile. Por isso a zona e o DY entram **sem coluna nova**:
  - **NOTA:** `StockCardComponent` (`src/app/components/stock-card/*`) é **código morto** — não é usado em lugar nenhum. O card real é o `.acoes-row` responsivo do dashboard. Toda exibição de zona/DY vai nele, não no `StockCardComponent`.
  - **Faixa = zona (atrito 1).** Reaproveitar `tr.acoes-row::before` (hoje pinta verde/vermelho por `is-up`/`is-down` = variação do dia) para refletir a **cor da zona** (🟢🟡🔴 / cinza ⚪/ETF). O sobe/desce do dia continua dito pelo **texto colorido** de "Variação hoje" (`+1,24%`), então não se perde informação — só se troca o dono da faixa estrutural.
  - **DY + desconto inline sob o ticker (atrito 3).** Em `cell-ativo`, abaixo do ticker, exibir `DY 6,2% · −18% teto`. Isso substitui o atual "300 un." (`ca-qty`), que **duplica** a coluna Qtd (no desktop e no mobile). Estados: ⚪ "teto n/d"; ETF "n/a"; DY ausente/zero → "—".
  - **Ordenação por desconto-vs-teto (atrito 2).** Sem coluna "Zona", o handle de ordenação vem do header **"Variação hoje" convertido em "Zona"**: `setSort('zona')` ordena por `descontoPct` (mais barato vs teto primeiro). A coluna física continua mostrando a variação do dia; só o rótulo/critério do header muda para zona — ou, alternativamente, um mini-toggle de ordenação (decisão de UI na fase de tasks).
  - `stock-details-modal`: seção "Preço-teto" reaproveitando `indicators-grid` (DPA/rendimento, yield-alvo, teto, preço justo, veredito) + disclaimer.
- **Disclaimer** fixo ("informativo, não é recomendação de investimento") na seção do modal e acessível a partir do caption/seção de preço-teto.
- **DY inline (não coluna).** O DY usa `dividend_yield` (já em `ApiAcaoItem`/`Stock`), formatado como `%` (ex.: `number: '1.1-1'` + "%"), exibido **sob o ticker** (não em coluna nova) para caber no desktop e no card mobile sem estourar o grid 2×4.

## Risks / Trade-offs

- [P/VP de FII pode não vir nos `indicators`] → Degrada graciosamente para sinal só-yield; P/VP é "bônus" quando presente.
- [Dividendo extraordinário infla DPA(12m) → teto falso-alto] → Limitação conhecida na v1; futura flag "inclui evento atípico". Documentar.
- [JCP é bruto (−15% IR) e mistura com dividendo líquido] → v1 assume bruto; sinalizar como limitação.
- [FII com proventos não mensais quebra a anualização ingênua] → Usar DPA(12m) direto como base anual (robusto a frequência), em vez de `mensal × 12`.
- [Ativo recém-listado / sem 12m de histórico] → ⚪ "Sem dados"; nunca número chutado.
- [Persistir só em localStorage não sincroniza entre dispositivos] → Aceitável na v1; migração futura para backend (como `goals`).

## Migration Plan

Feature aditiva: nenhuma migração de dados. Sem config salva, aplicam-se os defaults. Rollback = ocultar a UI (badge/seção); o util e o service não afetam fluxos existentes.

## Open Questions

- Local de edição da configuração (yield-alvo/margem): seção em "Metas"/configurações ou inline no detalhe do ativo? (decisão de UI para a fase de tasks/UI).
- v2: aba "Zona de compra hoje" listando os 🟢 da carteira (e futura watchlist).
