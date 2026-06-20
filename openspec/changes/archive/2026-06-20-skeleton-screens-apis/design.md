## Context

As telas que consomem a API expõem um `loading` (signal) e renderizam um texto enquanto carregam: `dividends-radar` ("Calculando…"), `dividends-summary` (Recebidos/Projetados), `dividend-history` ("Carregando ativos…/dividendos…"), `goals`, e os cards de ativos (carregados no startup via `StockDataService`). O `styles.scss` já centraliza tokens (`--card-bg`, `--border`, etc.) e padrões globais — bom lugar para o sistema de skeleton.

## Goals / Non-Goals

**Goals:**
- Um sistema de skeleton reutilizável e consistente (shimmer + fade-in) no tema atual.
- Skeletons no formato de cada tela que usa a API, substituindo os textos de loading.
- Acessível: respeitar `prefers-reduced-motion`.

**Non-Goals:**
- Spinners de modais (add-stock/add-transaction) — são inline e pequenos, ficam como estão.
- Mudar lógica de fetch ou os dados.

## Decisions

**1. Sistema global (`styles.scss`).**
- `@keyframes skeleton-shimmer { from { background-position: -200% 0 } to { background-position: 200% 0 } }`.
- `.skeleton`: `background: linear-gradient(90deg, var(--card-bg) 25%, color-mix(in srgb, var(--border) 60%, var(--card-bg)) 37%, var(--card-bg) 63%)`, `background-size: 200% 100%`, `animation: skeleton-shimmer 1.4s ease-in-out infinite`, `border-radius: 8px`.
- Helpers de forma: `.skeleton-line` (altura ~12px, raio 6px), `.skeleton-line.sm/.lg`, `.skeleton-chip`, `.skeleton-card` (altura/raio do card). Larguras via modificadores ou estilo local por tela.
- `@media (prefers-reduced-motion: reduce)`: trocar o shimmer por opacidade estática (`animation: none; opacity: .6`).
- `.fade-in { animation: fade-in .25s ease both }` com `@keyframes fade-in { from { opacity: 0 } to { opacity: 1 } }`.

**2. Skeleton por tela (formato fiel ao conteúdo).**
- **Radar:** reusar a grade; no loading, renderizar N linhas × 13 colunas de `.skeleton` (1 col ticker + 12 meses). Quantidade fixa (ex.: 6 linhas).
- **Recebidos/Projetados:** ~5 linhas de lista, cada uma com bloco de ticker + valor (`.skeleton-line`).
- **Histórico:** cabeçalho + ~6 linhas de tabela esqueleto (4 colunas). Enquanto carrega posições, esqueleto do seletor/chips.
- **Metas:** ~3 `.skeleton-card`.
- **Cards de ativos:** grid de ~6 `.skeleton-card` no formato do stock-card.

**3. Aplicação.** Onde hoje é `*ngIf="loading()"` com texto → trocar pelo bloco skeleton. Onde é `*ngIf="!loading()"` com conteúdo → adicionar `class="fade-in"` no container raiz do conteúdo.

**4. Contagem/responsividade.** Skeletons usam os mesmos grids/medidas do conteúdo real (reaproveitam classes do componente) para não "saltar" o layout quando o conteúdo entra.

## Risks / Trade-offs

- [Manutenção] o skeleton espelha a estrutura real; se a tela mudar muito, o skeleton precisa acompanhar. Mitiga-se reusando as classes de layout existentes.
- [Custo visual baixo] shimmer é barato (CSS), sem libs novas.
- [Flash em respostas rápidas] cargas muito rápidas podem piscar o skeleton; aceitável. (Opcional futuro: atraso mínimo antes de exibir — fora do escopo.)
