## Why

No card de Alocação da carteira, os valores de **Atual** e **Alvo** (ledger) são exibidos em cinza (`--text-secondary`), destoando do padrão recente do app, em que os valores numéricos aparecem na cor primária (branco no tema escuro). Isso deixa esses números com menos destaque do que deveriam ter.

## What Changes

- Os **valores** das colunas **Atual** e **Alvo** do ledger de alocação passam a usar `--text-primary` (branco no tema escuro), padronizando com os demais valores do app.
- Os **rótulos de cabeçalho** das colunas ("Atual"/"Alvo") permanecem em `--text-secondary` (cinza), preservando a hierarquia visual.
- A coluna **Ação** mantém suas cores de status (verde/vermelho/cinza) — fora do escopo.

## Capabilities

### New Capabilities
- `alocacao-valores-cor`: cor dos valores de Atual e Alvo no card de Alocação.

### Modified Capabilities
<!-- Nenhuma capability de spec existente trata da cor desses valores. -->

## Impact

- **Frontend (SCSS):** `allocation-card.scss` — cor das células de valor `.num` do ledger.
- **Sem** mudança de comportamento, dados, layout ou tipografia (apenas cor).
- Respeita os dois temas: `--text-primary` é branco no escuro e escuro no claro.
