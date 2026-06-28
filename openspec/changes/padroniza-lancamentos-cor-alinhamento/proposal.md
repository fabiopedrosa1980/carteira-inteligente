## Why

A tabela da tela de **Lançamentos** (`MyAssetsComponent`) destoa da lista de **Meus Ativos** (dashboard): ela pinta o **Total** e o **badge do ticker** em verde (`--accent`) e alinha as colunas numéricas **à direita**, enquanto a lista de Meus Ativos usa **texto neutro** (ticker simples, valores em cor primária) e alinhamento **à esquerda**. O resultado são duas listagens com idiomas visuais diferentes. Esta change padroniza Lançamentos pelo padrão de Meus Ativos.

## What Changes

- **Total (Lançamentos):** remover o verde — a cor do valor passa de `--accent` para `--text-primary` (mantendo o peso para o total seguir legível como total da linha).
- **Ticker (Lançamentos):** remover o badge verde (pílula com fundo/typo em `--accent`) — o ticker vira **texto neutro** em cor primária, no mesmo idioma do ticker da lista de Meus Ativos.
- **Alinhamento (Lançamentos, desktop):** as colunas numéricas (Qtd., Preço Unit., Total) e Operação deixam de ser **à direita** e passam a **à esquerda**, padronizando com Meus Ativos. Cabeçalho e valores acompanham.
- **Escopo:** apenas a tabela **desktop** de Lançamentos. Os cards **mobile** (layout próprio em grid) e o **cabeçalho de seção** do acordeão (linha-resumo com Total à direita) permanecem inalterados.

## Capabilities

### New Capabilities
<!-- Nenhuma. -->

### Modified Capabilities
- `lancamentos-layout-profissional`: o requisito "Alinhamento numérico das colunas da tabela" muda de **à direita** para **à esquerda** (padronizando com Meus Ativos); adiciona-se a regra de **cor neutra** para Total e ticker (sem destaque verde).

## Impact

- **Frontend apenas, CSS:** `src/app/components/my-assets/my-assets.scss` (cor do `.total-cell` e do `.ticker-badge`; remoção/ajuste do bloco `@media (min-width: 601px)` que alinha colunas à direita). Possível ajuste pontual no HTML se necessário.
- **Sem mudança** de dados, rotas, API ou comportamento — é apresentação.
- **Sem impacto** em Meus Ativos (já é o padrão-alvo), no mobile de Lançamentos, nem nas demais telas.
