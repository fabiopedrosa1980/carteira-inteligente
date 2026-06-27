## Why

Nos cards de Lançamentos no mobile, os valores de **Data**, **Qtd** e **Preço unit.** usam a mesma cor secundária (acinzentada) dos rótulos, ficando com baixo contraste e pouco legíveis. O usuário quer que os **rótulos** mantenham a cor atual (secundária) e os **valores** fiquem em branco (cor primária), criando hierarquia clara entre rótulo e dado.

## What Changes

- No card de Lançamentos no mobile (≤600px):
  - **Rótulos** (Data, Qtd, Preço unit., Total) MANTÊM a cor secundária atual.
  - **Valores** de Data, Qtd e Preço unit. passam a usar a cor primária (`--text-primary`), que é branca/near-white no tema escuro — destacando o dado.
  - Ticker e Total já usam a cor primária; permanecem como estão.
- Desktop (tabela) inalterado.

## Capabilities

### New Capabilities
<!-- Nenhuma capability nova. -->

### Modified Capabilities
- `lancamentos-mobile-grid`: o card de Lançamentos no mobile passa a contrastar rótulo (secundário) e valor (primário/branco) em todos os campos.

## Impact

- **Arquivos**: `src/app/components/my-assets/my-assets.scss` (cor dos valores no bloco mobile do card).
- **Tema**: usa `--text-primary` (branco no escuro, escuro no claro) — legível nos dois temas; os rótulos seguem em `--text-secondary`.
- **Sem** mudança de HTML/TS, lógica, API ou estado.
