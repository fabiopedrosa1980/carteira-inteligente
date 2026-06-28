## Why

O app já padronizou os **botões** via tokens (`--icon-btn-*`) e o **alinhamento dos títulos** aos cards, mas não há tokens para **raio de card**, **espaçamento** nem **breakpoints**. Sem esse enxoval, cada tela divergiu:

- **Raio de card** varia sem critério: 12px (alocação, importar, radar, resumo) convive com 14px (stock-card), 16px (detalhe do ativo) e 20px (calendário); cards internos misturam 10px e 14px.
- **Tipografia de título** tem duas "famílias": o app usa `.page-title`/`.section-title` em **20px (px)**, mas as telas de **Dividendos** (Radar/Resumo/Histórico) usam `.ds-title`/`.radar-title`/`.dh-title` em **1.1rem (~16,5px)** e medidas em `rem` — divergência visual mais perceptível.
- **Breakpoint "vira card no mobile"** é ambíguo: a maioria usa **600px**, mas `mobile-view-fit` fixa **640px** para os grids de Minhas Ações e Radar; ainda há 480/560 ad-hoc. O mesmo conceito dispara em larguras diferentes entre telas.

Padronizar reduz divergência visual, facilita mudanças futuras (um valor num ponto só) e evita novas derivas.

## What Changes

- **Tokens novos** em `styles.scss`: raio em 3 tiers (`--radius-card` seção, `--radius-item` card de item, `--radius-chip` interno/stat) e escala de espaçamento `--space-1..6`.
- **Tokenizar raios por tier** em todas as telas (substituir literais 12/14/10 pelos tokens, sem mudança visual) e **corrigir o único outlier real**: detalhe do ativo `.details-panel` 16→`--radius-card`.
- **Unificar tipografia de Dividendos**: títulos de seção de Radar/Resumo/Histórico passam a usar o padrão do app (20px/700) em vez de `1.1rem`; padding dos contêineres migra para `var(--space-6)`.
- **Unificar breakpoint mobile** em **600px**, convergindo os grids hoje em 640px (Minhas Ações/Radar) para o mesmo corte das demais telas.

> Nota (descoberta no apply): a análise inicial superdimensionou o problema de raio — 14px é um tier coerente ("card de item"), não outlier, e o "card 20px" do calendário era uma pílula. Specs/decisões abaixo já refletem os 3 tiers reais.

## Capabilities

### New Capabilities
- `design-tokens-layout`: tokens compartilhados de raio de card (3 tiers), escala de espaçamento e breakpoint mobile canônico (600px), usados por todas as telas.

### Modified Capabilities
- `dividendos-telas-padrao-visual`: o padrão de título das telas de Dividendos passa a ser o padrão global do app (20px/700), e o raio do card passa a vir de `--radius-card`.
- `mobile-view-fit`: o corte mobile dos grids (Minhas Ações e Radar) passa a usar o breakpoint canônico do app (`$bp-mobile`), em vez de um valor próprio.

## Impact

- `src/styles.scss` — novos tokens/variáveis (raio, spacing, breakpoints).
- Todos os `*.scss` de tela/cartão — substituir valores literais de `border-radius` pelos tokens e breakpoints literais pelas variáveis (busca/troca de baixo risco).
- Telas de Dividendos (`dividends`, `dividends-radar`, `dividends-summary`, `dividend-history`, `dividend-calendar`) — títulos e unidades.
- Apenas CSS/SCSS; sem mudança de TS, API ou modelo de dados.
