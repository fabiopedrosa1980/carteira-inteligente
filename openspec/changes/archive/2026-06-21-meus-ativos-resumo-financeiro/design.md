## Context

"Meus Ativos" é a aba principal do app — dark theme, CSS custom properties (`--card-bg`, `--border`, `--accent`, `--text-primary`, `--text-secondary`). Os dados vêm de dois caminhos: posições (acoes signal) via `getAcoes/getFiis/getEtfs` e histórico de dividendos via `StockDataService.stocks()` (já injetado como `svc`). O bloco de resumo fica entre o section-header e os acordeões, dentro do `ng-container` do tab `portfolio`.

## Goals / Non-Goals

**Goals:**
- 4 métricas financeiras antes dos acordeões com hierarquia visual clara
- Layout assimétrico: Patrimônio em destaque (hero), 3 métricas secundárias compactas
- Responsive sem scroll horizontal, funciona em ≤640px e ≤480px
- Sem novos endpoints — derivar tudo dos dados já carregados

**Non-Goals:**
- Gráficos, sparklines ou animações de contagem
- Filtros de período para dividendos
- Breakdown por grupo (Ações / FII / ETF) no bloco de resumo

## Decisions

### Layout: "Ledger Strip" — assimétrico, não 4 cards iguais

O mundo da contabilidade tem uma hierarquia natural: o que você TEM (patrimônio) é o fato primário; o que pagou, ganhou e recebeu são anotações desse fato. O layout codifica essa hierarquia.

**Desktop (>640px)** — CSS Grid `3fr 2fr` separando duas zonas:

```
┌─────────────────────────────────────────────────────────┐
│  ZONA HERO (3fr)         │ ZONA SECUNDÁRIA (2fr)        │
│                          │                              │
│  Patrimônio Total        │  Investido    Dividendos     │
│  R$ 47.320,00            │  R$ 41.500    R$ 2.840       │
│  +R$ 5.820  +14,0% ↑    │                              │
└─────────────────────────────────────────────────────────┘
```

**Mobile (≤640px)** — empilha verticalmente:

```
┌─────────────────────────────────┐
│  Patrimônio Total               │
│  R$ 47.320,00  +14,0% ↑        │
├──────────────┬──────────────────┤
│  Investido   │  Dividendos      │
│  R$ 41.500   │  R$ 2.840        │
└──────────────┴──────────────────┘
```

**Elemento assinatura**: Lucro não é um card separado. É uma anotação tipográfica subordinada ao Patrimônio — aparece diretamente abaixo do valor hero em fonte menor com cor semântica (verde/vermelho). Lê-se como um verbete contábil: "aqui está o total, aqui está a variação". Sem badge, sem borda própria.

### Fontes de dados dos 4 computeds

| Métrica | Fonte | Fórmula |
|---|---|---|
| Patrimônio Total | `sortedStocks()` + `saldo()` util | `∑ saldo(s) ?? 0` |
| Valor Investido | `sortedStocks()` + `custo()` util | `∑ custo(s) ?? 0` |
| Lucro Total | derivado | `patrimonioTotal - valorInvestido` |
| Dividendos Recebidos | `svc.stocks()` (StockDataService) | `∑ d.value × stock.quantity` por todos os registros históricos |

`custo` precisa ser importado de `position.util` (não está importado atualmente).

Dividendos é uma estimativa histórica — usa quantidade atual × valor histórico por ação. Exibir como "Dividendos Hist." no label para comunicar a natureza aproximada.

### Ajuste mobile da tabela (≤480px)

No breakpoint ≤480px, ocultar também a coluna **Rent.** (7ª coluna, `nth-child(7)`), deixando apenas **Ativo** e **Saldo**. No ≤640px o comportamento atual permanece (Ativo, Saldo, Rent. visíveis).

### Estrutura de classes CSS

```
.portfolio-summary          → wrapper com margin-bottom e display:none quando acoes vazio
  .ps-strip                 → grid 3fr 2fr (desktop) / 1fr (mobile)
    .ps-hero                → zona patrimônio
      .ps-label             → "Patrimônio Total" (text-secondary, small)
      .ps-value             → valor hero (text-primary, large, tabular-nums)
      .ps-lucro             → anotação de lucro (colorida, smaller)
    .ps-secondary           → zona 2-col sub-grid
      .ps-stat              → célula individual (Investido / Dividendos)
        .ps-stat-label      → label (text-secondary, 11px)
        .ps-stat-value      → valor (text-primary, 15px)
```

### Não usar card elevado

O `.ps-strip` usa `background: var(--card-bg)`, `border: 1px solid var(--border)`, `border-radius: 10px` — mesma linguagem visual dos acordeões. Sem gradient, sem sombra extra.

## Risks / Trade-offs

- **Dividendos históricos vs. recebidos reais**: a fórmula `d.value × qty_atual` superestima quando o investidor vendeu parte da posição. Aceitável para MVP; um endpoint dedicado resolveria a precisão.
- **svc.stocks() pode estar vazio**: se `StockDataService` ainda não carregou (app novo), dividendos retornam 0. Sem erro — o valor exibe R$ 0,00 graciosamente.
- **acoes() com stocks sem qty/avgPrice**: `custo(s)` retorna null para esses; o `?? 0` no reduce os ignora. Patrimônio pode subestimar ETFs sem preço atual.
