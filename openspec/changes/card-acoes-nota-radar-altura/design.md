## Context

- **Stock card** (`stock-card.scss`): `.stat-strip` é `display: flex; gap: 14px` **sem** `flex-wrap` no desktop (só ganha wrap em ≤ 640px). Contém Hoje · sep · DY · sep · Nota · `.sector-tag` (`margin-left: auto`). O card tem `overflow: hidden`. A grade de Minhas Ações é `repeat(auto-fill, minmax(170px, 1fr))`, então cards podem ficar estreitos (~170px) e a faixa estoura — o `overflow: hidden` **corta** Nota/setor.
- **Radar** (`dividends-radar.scss`): `.radar-grid` é grid 4→2 colunas (mobile `repeat(2, minmax(0,1fr))`). `.radar-card` tem `min-height: 96px` e conteúdo variável (chips de ticker). Em grid, cards da mesma linha já ficam iguais (stretch), mas **linhas diferentes** têm alturas diferentes.

## Goals / Non-Goals

**Goals:**
- Card de ação: nenhum texto cortado no desktop; a faixa quebra de linha quando preciso.
- Radar mobile: todos os cards com a mesma altura, ditada pelo card com mais tickers.

**Non-Goals:**
- Mudar conteúdo/colunas do card ou do radar.
- Alterar o desktop do radar (escopo do pedido é mobile).
- Mexer em template/serviços.

## Decisions

- **`.stat-strip` com `flex-wrap: wrap`.** Adicionar `flex-wrap: wrap` e um `row-gap` à base de `.stat-strip`, valendo também no desktop. Assim, em cards estreitos, Nota/setor descem para a próxima linha (totalmente visíveis) em vez de serem cortados pelo `overflow: hidden`. Racional: é o mesmo padrão já usado no mobile (≤ 640px), unificando o comportamento. Alternativa descartada: aumentar o `minmax(170px → 200px)` da grade — reduz o número de colunas e não garante ausência de corte com nomes/valores grandes.
- **Radar: `grid-auto-rows: 1fr` no mobile.** Em `@media (max-width: 480px)`, adicionar `grid-auto-rows: 1fr` ao `.radar-grid`. Isso iguala a altura de todas as linhas à da linha mais alta; como os cards já esticam (stretch padrão do grid), todos ficam com a altura do card mais cheio. Racional: solução CSS pura, sem medir conteúdo. Alternativa descartada: altura fixa — quebraria com muitos tickers; `1fr` adapta ao conteúdo real.
- **Remover hints descritivos (Radar e Detalhes), manter resumo de Lançamentos.** Apagar o `<p class="radar-hint">` (dividends-radar.html) e o `<p class="section-hint">` (stock-details-modal.html). O subtítulo de Lançamentos (`.page-subtitle`, com o Total) é mantido por ser informação útil, não texto explicativo. Estilos órfãos (`.radar-hint`, `.section-hint`) podem ser removidos junto, se não usados em outro lugar. Racional: declutter dos textos puramente explicativos, preservando dado relevante.

## Risks / Trade-offs

- [Separadores (`.stat-sep`) em linha quebrada podem ficar em posição estranha] → Cosmético; a prioridade é não cortar texto. Se necessário, ocultar o separador órfão é ajuste menor.
- [`grid-auto-rows: 1fr` com cards muito desiguais cria espaço vazio nos cards vazios] → Esperado e desejado (grade regular); o card vazio mostra "—" centralizado/topo.
- [Budget de SCSS do stock-card/radar] → As adições são mínimas (1–2 linhas cada); sem risco de estourar budget.
