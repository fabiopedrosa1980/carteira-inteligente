## Context

`stock-card.scss` define a linguagem visual do app: card com `border-radius: 14px`, `padding: 16px 18px 14px 20px`, perf-bar lateral (3px → 5px no hover), hover `translateY(-3px)` + `border-color: var(--accent)` + `box-shadow: 0 8px 28px var(--shadow-hover)`, tipografia mono (`$mono`) com `font-variant-numeric: tabular-nums`, e uma `.stat-strip` inferior separada por `border-top: 1px solid var(--border)` empurrada com `margin-top: auto`. O `.radar-card` atual já tem borda/perf-bar/hover, mas estrutura plana e contador não-mono; o cabeçalho ainda exibe a estrela `.rc-star`.

## Goals / Non-Goals

**Goals:**
- O `.radar-card` ler como um membro da família `stock-card`: mesmo efeito, estrutura e tipografia de números.
- Trocar o indicador do melhor mês de estrela para o texto.

**Non-Goals:**
- Nova paleta/identidade (seria inconsistência — o sistema é o do stock-card).
- Mudar a lógica de `topMonth`/`nextMonth`, contador, textos ou o grid responsivo.

## Decisions

**Plano de design (token system reaproveitado do stock-card):**
- **Cor/efeito:** herdar `--card-bg`, `--border`, `--accent`, `--color-pos`, `--shadow-hover`. Sem cores novas.
- **Tipo:** `$mono` ('SF Mono'/'JetBrains Mono'/…) com `tabular-nums` no contador; mês em label uppercase (como o eyebrow do stock-card).
- **Layout (assinatura herdada):** topo = identidade (mês + contador) · rótulos de destaque · base = faixa de tickers com divisória.
- **Signature:** a perf-bar lateral + a faixa inferior dividida são o que torna o card reconhecível como "da casa".

**1. Remover a estrela.** Tirar `.rc-star` do `.rc-month` no HTML e o estilo `.rc-star` no SCSS. O texto "Melhor mês, aproveite" é o indicador.

**2. Tokens do card.** Igualar ao stock-card: `border-radius: 14px` (já), `padding: 16px 18px 14px 18px`, transição em `transform/border-color/box-shadow`, hover `translateY(-3px)` + borda accent + `box-shadow: 0 8px 28px var(--shadow-hover)`, perf-bar 3px→5px no hover (já). Manter `.top`/`.next` (verde) para borda/perf-bar.

**3. Contador mono.** `.rc-count` usa `$mono` + `tabular-nums` (hoje é fonte padrão).

**4. Faixa inferior com divisória.** `.rc-tickers` recebe `margin-top: auto`, `padding-top: 12px`, `border-top: 1px solid var(--border)` — espelhando `.stat-strip`. `min-height` do card sobe um pouco para a faixa assentar na base de forma consistente. Quando vazio, o `—` (`.rc-empty`) ocupa essa faixa.

**5. Crítica (Chanel — tirar um acessório).** Com a faixa inferior + perf-bar + hover já carregando o "profissional", removemos a estrela (acessório redundante) e não adicionamos novos adornos. Boldness gasta num lugar só: a estrutura herdada.

## Risks / Trade-offs

- [min-height maior] cards com poucos tickers ficam com mais respiro; aceitável e mais alinhado ao stock-card.
- [Divisória em card vazio] meses sem proventos mostram a divisória + `—`; mantém o ritmo visual do grid (ok).
- [Sem estrela] perde-se o glifo chamativo; compensado pelo texto e pela borda/realce verde do `.top`.
