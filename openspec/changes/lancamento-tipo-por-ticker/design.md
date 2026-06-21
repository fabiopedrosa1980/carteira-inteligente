## Context

A change `meus-ativos-header-padrao-lancamentos` (ainda ativa) introduziu `tickerKind()` no `add-transaction-modal.ts`, que classifica por sufixo e trata `11` como `fii_etf` (sem separar FII de ETF), permitindo FII↔ETF. As APIs (`/quote`, `/search`) não retornam categoria — só `name` e `sector`. Logo, separar FII de ETF exige uma fonte adicional. O modal já tem o tipo travado (`isAssetTypeLocked`) quando aberto por seção; o campo Tipo, quando livre, começa em "Selecione...".

## Goals / Non-Goals

**Goals:**
- Detectar o tipo pelo ticker, distinguindo FII de ETF.
- Sugerir o tipo no campo quando não travado.
- Bloquear no save divergência tipo×ticker, inclusive FII↔ETF.

**Non-Goals:**
- Não alterar backend/API nem modelo.
- Não impedir override manual do tipo.

## Decisions

- **Fonte de verdade FII/ETF = lista de ETFs** (`asset-type.util.ts`), pois não há categoria na API. ETFs da B3 são um conjunto finito e conhecido; FIIs são o restante dos `11`.
  ```ts
  export const ETF_TICKERS = new Set<string>([
    'BOVA11','BOVV11','BOVB11','BRAX11','PIBB11','IVVB11','SPXI11','NASD11',
    'SMAL11','SMAC11','DIVO11','FIND11','GOVE11','MATB11','ECOO11','ISUS11',
    'XBOV11','GOLD11','HASH11','QBTC11','ETHE11','XINA11','ACWI11','EURP11',
    'TECK11','USTK11','WRLD11','ESGB11','NDIV11','FIXA11','IMAB11','IRFM11',
    'LFTS11','B5P211','IB5M11','DEBB11',
  ]);
  export function detectAssetType(ticker: string): AssetType | null {
    const t = (ticker ?? '').toUpperCase().trim();
    if (/11$/.test(t)) return ETF_TICKERS.has(t) ? 'ETFs' : 'FIIs';
    if (/[345678]$/.test(t)) return 'Acoes';
    return null;
  }
  ```
- **Sugestão**: em `onTickerChange`/ao resolver o ticker, se `!isAssetTypeLocked` e `detectAssetType(ticker)` ≠ null, setar `form.assetType` com o detectado. Override manual continua possível (é um `select`).
- **Validação**: em `save()`, substituir o uso de `tickerKind` por `detectAssetType`. Se `detected !== null && detected !== form.assetType` → `errors.ticker = 'Ticker é de <detected>, não condiz com <escolhido>'` e abortar. Isso cobre ação↔11 e FII↔ETF.
- Remover/aposentar `tickerKind` (substituído pelo util compartilhado).

## Placeholder do ticker por tipo (`lancamento-ticker-placeholder-por-tipo`)

- Adicionar getter `tickerPlaceholder` em `add-transaction-modal.ts` mapeando `form.assetType`: `Acoes`→`Ex: VALE3`; `FIIs`→`Ex: MXRF11`; `ETFs`→`Ex: BOVA11`; vazio→`Ex: VALE3, MXRF11, BOVA11`.
- No HTML, `placeholder="{{ tickerPlaceholder }}"` no input de ticker. Reage à troca de tipo (e à auto-sugestão).

## Radar — destaques por mínimo de ativos (`radar-destaques-minimo-ativos`)

Em `dividends-radar.ts`:
- **Melhor mês** (`topMonth`): manter a busca do mês de maior contagem, mas retornar `0` quando `max <= 1` (só destaca com ≥ 2 ativos). `isTopMonth` continua usando `topMonth()`.
- **Próximo mês** (`isNextMonth`): além de `showHighlights && month === nextMonth`, exigir que o card do próximo mês tenha `tickers.length >= 1`. Usar `monthCards()[this.nextMonth - 1].tickers.length`.
- Observação: `showHighlights` já oculta destaques para FIIs; as regras aplicam-se quando há destaques (Ações).

## Risks / Trade-offs

- **Lista de ETFs desatualizada**: um ETF novo fora da lista é classificado como FII e, se o usuário escolher "ETFs", o save é bloqueado. Mitigação: manter a lista no util (fácil de estender) e cobrir os ETFs mais comuns; documentar. Alternativa futura: campo de categoria no backend.
- Sugestão automática pode trocar um tipo que o usuário já havia escolhido ao digitar novo ticker — comportamento esperado (o tipo deriva do ticker); override continua disponível.
- Relação com a change ativa anterior: este change introduz o capability `lancamento-tipo-por-ticker` que **supersede** a regra por sufixo de `lancamento-ticker-valida-tipo`. Em código, a função nova substitui `tickerKind` no mesmo arquivo.
