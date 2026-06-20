## 1. Card de Minhas Ações: não cortar a Nota/setor no desktop

- [x] 1.1 Em `stock-card.scss`, adicionar `flex-wrap: wrap` e um `row-gap` (ex.: 8px) à base de `.stat-strip`, para que Hoje/DY/Nota/setor quebrem de linha em cards estreitos em vez de serem cortados.
- [x] 1.2 Conferir que a regra mobile (≤ 640px) continua coerente (já tinha wrap) e que nada é clipado pelo `overflow: hidden` do card.

## 2. Radar mobile: cards com altura uniforme

- [x] 2.1 Em `dividends-radar.scss`, no `@media (max-width: 480px)` de `.radar-grid`, adicionar `grid-auto-rows: 1fr` para igualar a altura de todos os cards à do card mais cheio.
- [x] 2.2 Conferir que `.radar-card` estica para preencher a linha (stretch padrão do grid) e que o conteúdo permanece alinhado ao topo.

## 3. Remover textos descritivos abaixo do header

- [x] 3.1 Em `dividends-radar.html`, remover o `<p class="radar-hint">…</p>`; remover a regra `.radar-hint` em `dividends-radar.scss` se não usada em outro ponto.
- [x] 3.2 Em `stock-details-modal.html`, remover o `<p class="section-hint">…</p>`; remover a regra `.section-hint` no SCSS se órfã.
- [x] 3.3 Confirmar que o subtítulo de Lançamentos (`.page-subtitle` em `my-assets.html`) permanece intacto.

## 4. Verificação

- [x] 4.1 `npx prettier --write` nos arquivos alterados e `ng build` para garantir compilação (atenção ao budget de SCSS).
- [x] 4.2 Conferir no desktop: card de ação estreito mostra Nota e setor inteiros (sem corte). No mobile: cards do Radar todos do mesmo tamanho. Radar e Detalhes sem hint; Lançamentos com subtítulo.
- [x] 4.3 Commit e push seguindo o workflow do CLAUDE.md (stage específico dos arquivos).
