## Context

`.page-title` é global (`src/styles.scss:169`, `margin: 0 0 4px`). As telas renderizam título e cards dentro de `.content` (`dashboard.scss`: padding 32px desktop / 16px / 12px mobile). Quando uma tela dá recuo extra só ao container de cards (ou só ao header), o título deixa de encostar na coluna dos cards. O objetivo é um alinhamento consistente título × cards em todas as telas, sem tocar tipografia.

## Goals / Non-Goals

**Goals:**
- Início do título alinhado ao início dos cards em todas as telas, desktop e mobile.
- Solução consistente e centralizada onde possível (evitar regra ad-hoc por tela).

**Non-Goals:**
- Mudar tamanho/peso/cor/tipografia do título.
- Redesenhar grids de cards ou paddings gerais do `.content`.
- Qualquer mudança de lógica/dados.

## Decisions

### 1. Mesma "calha" horizontal para título e cards
Garantir que título e container de cards compartilhem o **mesmo recuo horizontal** — preferencialmente herdando o padding do `.content` (sem recuos extras divergentes). Quando uma tela precisa de recuo próprio nos cards, replicar o mesmo no header (ou, melhor, mover o recuo para um wrapper comum que envolve título + cards).
- *Alternativa descartada:* empurrar o título com `margin-left` fixo por tela — frágil entre breakpoints; preferir herança do mesmo container.

### 2. Auditar antes de ajustar
Mapear, por tela, o recuo efetivo do título e o dos cards (desktop e mobile) e corrigir só onde divergem. Evita "consertar" telas já alinhadas.

## Risks / Trade-offs

- **Regressão em telas já alinhadas** → auditar antes (Decisão 2) e verificar visualmente cada tela após o ajuste.
- **Divergência mobile × desktop** → validar nos dois breakpoints; o recuo deve seguir o padding do `.content` por breakpoint.
