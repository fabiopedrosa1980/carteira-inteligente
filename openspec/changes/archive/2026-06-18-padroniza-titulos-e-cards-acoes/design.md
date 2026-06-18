## Context

Cada página define seu próprio header com classes locais e valores divergentes:

| Página | Classe título | Ícone | Margem | Header? |
|--------|---------------|-------|--------|---------|
| Meus Ativos (ref) | `.ma-title` 20px | herda 20px | `0 0 4px` | sim |
| Minhas Ações | `.section-title` 20px | herda 20px | `mb: 6px` | sim |
| Metas | `.metas-title` 20px | **22px** | `0` / `4px 0 0` | sim |
| Dividendos | — | — | — | **não** (vai direto pras sub-tabs) |

A tela Minhas Ações tem um `portfolio-stats` com 3 `stat-pill` (Ações, Maior Alta, Destaque). O `dashboard.ts` já expõe `acoes()`, `maxChange()` e `topChangeStock()`; o modelo `Stock` tem `changePercent` e `nota`. No mobile (≤480px), `.dv-tab-label` está `display: none`, escondendo os rótulos das sub-tabs de Dividendos.

## Goals / Non-Goals

**Goals:**
- Um único padrão de header de página aplicado a todas as abas, espelhando Meus Ativos.
- Adicionar header à aba Dividendos.
- Corrigir o ícone 22px de Metas e alinhar margens.
- Adicionar pills Maior Baixa e Maior Nota (com ticker) ao resumo de Minhas Ações.
- Exibir os rótulos das sub-tabs de Dividendos no mobile.

**Non-Goals:**
- Redesenhar o conteúdo das páginas além do header.
- Mudar a lógica de cotação/dividendos.
- Remover o pill "Destaque" existente.

## Decisions

**1. Classes utilitárias globais de header.**
Criar em `src/styles.scss` um padrão compartilhado: `.page-header` (container flex com o botão de ação à direita), `.page-title` (20px/700, flex, `gap: 8px`, margem padronizada), `.page-title-icon` (font-size 20px = tamanho do título) e `.page-subtitle` (13px, cor secundária). Cada página adota essas classes. Espelha exatamente o visual de Meus Ativos. Alternativa considerada: apenas copiar os valores de Meus Ativos para cada SCSS local — descartada por reintroduzir divergência no futuro (sem fonte única de verdade).

**2. Migração página a página.**
Substituir as classes locais (`.ma-title`, `.section-title`, `.metas-title`, etc.) pelo padrão global, mantendo apenas particularidades realmente locais (ex.: posição do botão "+ Adicionar"). Isso elimina o ícone 22px de Metas automaticamente.

**3. Header de Dividendos.**
Adicionar `📅 Dividendos` + subtítulo no topo de `dividends.html`, acima de `.dv-tabs`, usando o padrão global.

**4. Pills Maior Baixa e Maior Nota.**
Adicionar computeds no `dashboard.ts`:
- `minChange = acoes().length ? Math.min(...map(changePercent)) : 0`
- `maxNota = acoes().length ? Math.max(...map(nota)) : 0`
- `topNotaStock = acoes().find(s => s.nota === maxNota())`

No HTML, dentro de `.portfolio-stats`: pill "Maior Baixa" (valor `minChange%`, classe vermelha quando `< 0`) e pill "Maior Nota" (valor `maxNota` + ticker de `topNotaStock`). Ordem proposta: Ações · Maior Alta · Maior Baixa · Destaque · Maior Nota (mantém Alta/Baixa adjacentes). Adicionar `.sp-value.neg { color: var(--color-neg) }` e um `.sp-sub` pequeno para o ticker no pill de nota.

**5. Rótulos das sub-tabs no mobile.**
Em `dividends.scss`, remover o `display: none` de `.dv-tab-label` no `@media (max-width: 480px)`, mantendo o `flex-wrap` já existente em `.dv-tabs` para reflow. Ajustar padding se necessário para os três pills caberem.

## Risks / Trade-offs

- [Migrar para classes globais pode afetar espaçamentos locais sutis] → Validar visualmente cada aba após adotar o padrão; manter overrides locais mínimos quando necessário.
- [Rótulos das sub-tabs no mobile podem quebrar em duas linhas] → `.dv-tabs` já tem `flex-wrap`; aceitável. Reduzir padding/fonte se ficar apertado.
- [`portfolio-stats` com 5 pills pode estourar em telas pequenas] → O container já tem `flex-wrap` e `gap` reduzido no mobile; os pills refluem.
- [Empate de nota/variação entre ações] → `find` retorna a primeira ocorrência; aceitável para um indicador-resumo.
