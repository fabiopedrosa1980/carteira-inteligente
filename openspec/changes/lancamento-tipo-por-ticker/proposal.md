## Why

A regra atual de validação ticker×tipo usa só o sufixo do ticker e **trata FII e ETF como equivalentes** (ambos terminam em 11), permitindo cadastrar FII em ETF e vice-versa. Além disso, o campo "Tipo de Ativo" começa genérico ("Selecione...") com as 3 opções, mesmo quando o ticker já indica o tipo. O ideal é **detectar o tipo a partir do ticker** (origem do ativo) e **sugerir** esse tipo no campo, além de bloquear de fato a troca FII↔ETF.

## What Changes

- **Detecção de tipo pelo ticker**: derivar o tipo do ativo a partir do ticker — sufixo 3/4/5/6/7/8 → Ação; sufixo 11 → ETF se estiver numa **lista de ETFs conhecidos da B3**, senão FII.
- **Sugestão no campo Tipo**: ao informar o ticker (quando o tipo não está travado por seção), preencher o campo "Tipo de Ativo" com o **tipo detectado**, em vez do genérico "Selecione..." (o usuário ainda pode trocar).
- **Placeholder por tipo**: o exemplo no campo de ticker passa a ser **específico do tipo selecionado** (Ações → `Ex: VALE3`; FIIs → `Ex: MXRF11`; ETFs → `Ex: BOVA11`), em vez do genérico com os três.
- **Validação reforçada**: bloquear o salvamento quando o tipo escolhido **divergir** do detectado — incluindo **FII vs ETF** (corrige o caso de cadastrar FII em ETF e vice-versa).
- Supersede a regra anterior baseada apenas em sufixo (`lancamento-ticker-valida-tipo`).

### Radar — regras de destaque

- **Próximo mês**: só destacar o "Próximo mês — oportunidade" se aquele mês tiver **no mínimo 1 ativo** do tipo do usuário.
- **Melhor mês**: só destacar o "Melhor mês" se o mês com mais ativos tiver **mais de 1 ativo** do tipo (≥ 2); com 0 ou 1, não destacar.

## Capabilities

### New Capabilities
- `lancamento-tipo-por-ticker`: detecção do tipo de ativo a partir do ticker (com lista de ETFs), sugestão no campo Tipo e validação que distingue FII de ETF.
- `lancamento-ticker-placeholder-por-tipo`: placeholder do campo de ticker específico do tipo selecionado.
- `radar-destaques-minimo-ativos`: regras de destaque do Radar (próximo mês com ≥1 ativo; melhor mês com >1 ativo).

### Modified Capabilities

## Impact

- `src/app/models/asset-type.util.ts` (novo) — lista de ETFs conhecidos + `detectAssetType(ticker)`.
- `src/app/components/add-transaction-modal/add-transaction-modal.ts` + `.html` — auto-sugestão do tipo ao resolver o ticker; validação usando `detectAssetType` (substitui `tickerKind`); placeholder do ticker por tipo.
- `src/app/components/dividends-radar/dividends-radar.ts` — `topMonth` só com >1 ativo; `isNextMonth` só quando o mês tem ≥1 ativo.
- Sem mudanças de API/modelo. Limitação: a separação FII/ETF depende da lista de ETFs (novos ETFs precisam ser adicionados); documentada no design.
