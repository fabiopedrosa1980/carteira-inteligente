## Context

Tokens existentes em `styles.scss` cobrem só botões (`--icon-btn-size/-radius/-icon`). Não há tokens de raio de card, espaçamento nem breakpoint. Levantamento atual:

- **Raio de card de tela**: 12px é a maioria (alocação, importar, radar, resumo); outliers stock-card 14px, detalhe do ativo 16px, calendário 20px. Cards internos: 10px (ps-card, indicador) vs 14px (stat do radar).
- **Título de seção**: 20px/700 no app (`.page-title`/`.section-title`); Dividendos usa `.ds-title`/`.radar-title`/`.dh-title` em `1.1rem` (~16,5px, root 15px) e paddings em `rem`. O spec `dividendos-telas-padrao-visual` hoje consagra `.ds-title` como referência — ou seja, o "padrão" de Dividendos é, por contrato, divergente do resto.
- **Breakpoint mobile**: 600px é o mais usado; `mobile-view-fit` fixa 640px para os grids de Minhas Ações/Radar; há 480/560 ad-hoc. Dois "padrões oficiais" (600 vs 640).

## Goals / Non-Goals

**Goals:**
- Criar um enxoval mínimo de tokens (raio, spacing, breakpoints) e fazer as telas referenciá-los.
- Eliminar os outliers de raio e a divergência tipográfica de Dividendos.
- Ter um único breakpoint "vira card".

**Non-Goals:**
- Redesenhar telas ou mudar hierarquia de informação.
- Mudar tipografia além do alinhamento de tamanho/unidade dos títulos de seção.
- Tocar em TS/lógica (`ResponsiveService.isMobile()` continua como está; aqui é só CSS).

## Decisions

### Decisão: raios em 3 tiers (`--radius-card: 12px` / `--radius-item: 14px` / `--radius-chip: 10px`)

Descoberta no apply: o app já tem, de fato, três famílias coerentes — seção (12), card de item de lista/grid (14) e stat/chip (10). O "card 20px" do calendário era pílula; o único outlier real é o `.details-panel` (16px). Então os tokens **codificam os 3 tiers existentes** sem mudar valores, e só o `.details-panel` migra (16→`--radius-card`).

**Alternativa — forçar 2 tiers (12/10) e mexer nos 14px:** rejeitada; reduziria a consistência do tier "card de item" e geraria churn para seguir a minoria.

### Decisão: breakpoint canônico **600px** (literal)

600px é o corte mais frequente (`styles.scss`, dashboard, my-assets, dividends, import, detalhe). Convergir os grids de 640px (Minhas Ações, Radar — em `dashboard.scss` e `stock-card.scss`) para 600px alinha a transição mobile em todo o app.

**Decisão de mecanismo:** usar o literal `max-width: 600px` em vez de uma variável SCSS compartilhada. Um parcial `@use` exigiria importar em ~todos os componentes (Angular compila cada `.scss` isolado) — muito churn para ganho marginal sobre um literal legível. (O parcial `src/_breakpoints.scss` chegou a ser criado e foi removido.)

**Trade-off:** os grids de 2 colunas passam a colapsar em 600 em vez de 640 (40px a menos de folga). Impacto visual pequeno; ganho de consistência alto.

> Observação: raio e spacing são custom properties CSS (`--radius-*`/`--space-*`), usáveis em qualquer componente sem import e variáveis por tema. Breakpoints ficam como literais (CSS `@media` não aceita custom properties).

### Decisão: Dividendos adota o título padrão do app

Radar/Resumo/Histórico passam a usar `.section-title`/`.page-title` (20px/700, px) no lugar de `1.1rem`. Isso modifica `dividendos-telas-padrao-visual` (cuja referência deixa de ser `.ds-title` e passa a ser o padrão global). Paddings em `rem` migram para a escala em px.

## Risks / Trade-offs

- [Busca/troca ampla em muitos `.scss`] → Mitigação: aplicar por fases (tokens → raios → Dividendos → breakpoints), com build a cada fase e revisão visual por tela.
- [Mudar 640→600 altera comportamento testado de `mobile-view-fit`] → Documentado no delta; reversível trocando o valor de `$bp-mobile`.
- [Título de Dividendos maior (16,5→20px) pode quebrar layouts apertados] → Verificar Radar/Resumo/Histórico após a troca.
- [Espaçamento via escala pode mudar levemente paddings em rem] → Escolher o degrau da escala mais próximo do valor atual para minimizar deslocamento.

## Migration Plan

Apenas CSS/SCSS; sem migração de dados. Faseado num único change, com commits por fase. Rollback = reverter commits.

## Open Questions

- **Arredondamento alvo**: confirmar 12px/10px (atual da maioria) ou ir mais arredondado (14/16)?
- **Breakpoint canônico**: confirmar 600px (migra os grids de 640) ou manter 640 como canônico?
- **Escopo do spacing**: aplicar a escala em todos os cards agora, ou só introduzir os tokens e migrar incrementalmente?
