## Context

`StockDetailsModalComponent` (in-page) exibe: cabeçalho (ticker/nome + preço/variação), resumo da posição (cards), e indicadores fundamentalistas via `*ngFor` sobre `stock.indicators` (`{label, value}` strings vindas do Investidor10). Hoje o grid de indicadores usa `repeat(auto-fill, minmax(150px, 1fr))` e os valores são exibidos como recebidos (casas decimais variáveis). O projeto não tem framework de teste.

Identidade visual existente (a manter): figuras em fonte monoespaçada, `font-variant-numeric: tabular-nums`, tokens de tema (`--card-bg`, `--border`, `--color-pos/neg`). A skill de frontend-design orienta gastar disciplina em alinhamento/posicionamento, não em um novo "look".

## Goals / Non-Goals

**Goals:**
- Indicadores com ≤2 casas decimais (preservando sufixos).
- Grid de indicadores em 4 cards por linha (responsivo).
- Posicionamento/alinhamento refinados.
- Teste de componente que protege o layout.

**Non-Goals:**
- Redesenhar o tema ou mudar a fonte do app.
- Formatar as métricas do resumo (DY/Nota/Preço médio) — fora do escopo (decisão: só indicadores).
- E2e completo com login Google.

## Decisions

**1. Formatação ≤2 casas (frontend).**
Helper `formatValue(value: string): string` no componente: se o valor casar com um número BR (com `.` de milhar e `,` decimal) e sufixo opcional (ex.: `%`), arredonda a parte numérica para no máximo 2 casas (sem casas extras desnecessárias) e reanexa o sufixo; caso contrário retorna o valor original. Aplicado no template (`{{ formatValue(ind.value) }}`).

**2. Grid 4 por linha.**
`.indicators-grid { grid-template-columns: repeat(4, minmax(0, 1fr)); }`. Responsivo: 3 colunas em ~900px, 2 em ~600px. `minmax(0,1fr)` evita estouro por conteúdo largo; valores com `text-overflow: ellipsis`/`white-space: nowrap` quando necessário.

**3. Posicionamento (frontend-design).**
Garantir alinhamento de baseline entre rótulo e valor no card; preço/variação alinhados à direita com mesmo eixo; resumo e indicadores com espaçamento vertical consistente; foco visível no botão Voltar; `prefers-reduced-motion` respeitado (sem novas animações). Sem overflow horizontal em qualquer largura.

**4. Teste de componente (Playwright CT).**
Adicionar `@playwright/experimental-ct-angular` + `@playwright/test`; `playwright-ct.config.ts`, `playwright/index.html`, `playwright/index.ts`. Spec monta `StockDetailsModalComponent` com um `stock` mock (incluindo indicadores com >2 casas) e assevera: cabeçalho com ticker/preço, resumo presente, grid de indicadores com 4 colunas (checar `grid-template-columns` computado ou contagem por linha via boundingBox), valores formatados a ≤2 casas, e largura do container ≤ viewport (sem overflow). Script `npm run test:ct`.

## Risks / Trade-offs

- [Playwright CT é experimental para Angular] → Aceitável para um teste de layout; isolado do build de produção. Se instável, alternativa é TestBed.
- [Detectar "4 por linha" de forma robusta] → Preferir checar `getComputedStyle(grid).gridTemplateColumns` com 4 trilhas em viewport larga.
- [Formatação genérica de valores] → Só transforma quando casa o padrão numérico+sufixo; demais valores passam intactos.
- [Nova dependência de dev] → Apenas devDependencies; não afeta o bundle de produção.
