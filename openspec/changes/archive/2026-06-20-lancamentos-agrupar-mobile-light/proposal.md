## Why

A tabela "Agrupar por ticker" (Lançamentos) mantém **5 colunas** no mobile, ficando apertada e difícil de ler em telas estreitas. Precisamos de um layout mais legível: **cards empilhados** por ativo (rótulo: valor), **fonte maior** e bom contraste **no tema claro** (que o app já suporta).

## What Changes

- **Mobile (≤600px), modo agrupado:** transformar cada linha em um **card empilhado** — ticker em destaque no topo e, abaixo, pares **rótulo: valor** (Quantidade, Preço médio, Total, Lançamentos). Oculta o cabeçalho de colunas (os rótulos passam a ficar em cada linha).
- **Fonte maior** no mobile para melhor leitura.
- **Tema claro:** garantir bom contraste/legibilidade (cards e textos via tokens, validados no claro e no escuro).
- Desktop e o modo detalhado permanecem inalterados.

## Capabilities

### Modified Capabilities
- `lancamentos-agrupar-ticker`: a visão agrupada ganha um layout mobile em cards (rótulo: valor), com fonte maior e legível no tema claro.

## Impact

**Frontend (este repo):**
- `src/app/components/my-assets/my-assets.scss` — layout mobile do `.transactions-table.grouped` (cards empilhados, rótulos via `::before`, fonte maior); ajustes de contraste por tokens.

Apenas CSS — sem mudança de HTML/TS nem backend.
