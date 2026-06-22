## Context

O `AllocationCardComponent` já calcula tudo (alocação por classe, desvios, concentração). O problema é puramente de **apresentação**: layout quebra (space-between com texto de moeda longo), cores hardcoded e visual de "widget genérico". O app tem um sistema de tokens coeso (GitHub-style dark/light em `styles.scss`) e cards de resumo (`ps-card`) como referência de polidez.

## Goals / Non-Goals

**Goals:**
- Estabilidade de layout em web e mobile (zero overflow/colisão).
- Identidade própria e profissional, coerente com os `ps-card`.
- 100% dos valores derivados de tokens do tema.

**Non-Goals:**
- Mudar cálculo, serviço ou contrato de backend.
- Introduzir nova fonte/biblioteca (consistência > novidade aqui).

## Design plan (token system)

**Color** — reusa os tokens do app; define 3 matizes de segmento para a faixa de composição (funcionam nos dois temas):
- Ações → `--accent` (verde da marca)
- FIIs → azul `#3b82f6` exposto como `--class-fii`
- ETFs → violeta `#a78bfa` exposto como `--class-etf`
- Sinais de desvio: abaixo → `--color-warning`, acima → `--color-neg`, no alvo → `--color-pos`.

**Type** — família do sistema (já em uso). Escala: eyebrow "Composição" 11px/uppercase/`letter-spacing .08em`/`--text-secondary`; título 1.1rem/600; números `tabular-nums`; ação 0.8rem/600.

**Layout** — moldura igual ao `ps-card` (raio 12px, mesmo padding). Estrutura:

```
┌─ Alocação ───────────────────────────── R$ 124.300  [Editar] ─┐
│ COMPOSIÇÃO                                                     │
│ ██████████████ Ações ▏███████ FIIs ▏██ ETF      (alvos ╿)     │
│                                                                │
│  Classe   Atual    Alvo     Ação                               │
│  Ações     62%      50%     ▼ reduzir R$ 14.916                │
│  FIIs      28%      40%     ▲ aportar R$ 14.916                │
│  ETF       10%      10%     ✓ no alvo                          │
│ ───────────────────────────────────────────────────────────  │
│ ⚠ Concentração (20%):  ITSA4 22,3%                            │
└────────────────────────────────────────────────────────────────┘
```

**Signature** — a **faixa de composição única** (stacked) com marcadores de alvo: a carteira inteira numa só barra, em vez de 3 barras de progresso soltas. É o elemento memorável e o que comunica "equilíbrio" de relance.

## Decisions

- **Ledger em CSS Grid** (`grid-template-columns: auto auto auto 1fr` no desktop) garante alinhamento e impede colisão. No mobile, `grid-template-areas` move a ação para uma 2ª linha do item (sem `space-between`).
- **Faixa de composição** = flex de segmentos com `flex: <pct>`; cada segmento ganha cor da classe; marcador de alvo como `::after` posicionado em `alvoPct` relativo ao segmento (ou um tick fino sobre a barra inteira na posição acumulada do alvo).
- **Helper de cor por classe** em `allocation-card.ts` (`classColorVar(classe)`) devolve o nome do CSS var, mantendo o template limpo.
- **Tokens novos** `--class-fii`/`--class-etf` em `styles.scss` (dark + light), para as cores de segmento não ficarem hardcoded.
- **Edição por classe (3 sliders independentes):** no modo edição, mostra-se **um slider por classe** (Ações, FIIs, ETFs), cada um com sua própria trilha 0–100 e um handle arrastável que define o alvo daquela classe. Decisão revista (antes eram 2 handles de fronteira): o usuário pediu 3 controles separados, um por tipo. Os alvos são independentes, então a **soma pode ≠ 100%** e o aviso de soma cobre isso (sem redistribuir). Cada handle custom com `role="slider"`, `aria-valuenow/min/max`, `tabindex=0`, setas (1pp) e Shift+seta (5pp); pointer events (`pointerdown/move/up`) com `touch-action: none`. Cada trilha mostra o **atual** como tick de referência e o **alvo** como fill+handle. O input numérico de alvo sai; o **limite de concentração** segue como input pequeno.
- **Acessibilidade**: foco visível nos handles/inputs/botões; `prefers-reduced-motion` desativa transições de barra; contraste verificado nos dois temas.

## Risks / Trade-offs

- [Marcador de alvo sobre segmentos finos] → quando um segmento é muito pequeno, o tick pode encostar na borda; usar `min-width` no segmento e clamp do tick.
- [Novos tokens de cor] → manter saturação moderada para harmonizar com `--accent`; validar nos dois temas.
- [Faixa única vs barras] → faixa comunica composição melhor, mas o "quanto falta pro alvo" por classe fica no ledger (não na barra); aceitável e mais limpo.

## Migration Plan

Aditivo/visual: sem migração. Rollback = reverter HTML/SCSS do card. Cálculo e serviço intactos.

## Open Questions

- Marcador de alvo: tick por segmento vs uma régua de alvos sobre a barra inteira (decidir na implementação, o que ficar mais limpo).
- Edição: a faixa exibe **alvo** (handles arrastáveis) e o **atual** ao mesmo tempo, ou alterna atual↔alvo no modo edição? Recomendo mostrar o alvo como handles e o atual como sombra/tick de referência atrás.
