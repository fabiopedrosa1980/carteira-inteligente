## Context

Em `dividends-summary.html`, dentro de `*ngIf="!loading() && !error()"`, o card de total `.ds-total-card` é renderizado **sempre** (linhas 28–34), seguido do estado vazio `.ds-no-data` (`*ngIf="rows().length === 0"`) ou da lista `.ds-list` (`*ngIf="rows().length > 0"`). Logo, quando não há dados, o total aparece zerado acima do bloco vazio. O componente já expõe `rows()` e `total()`.

## Goals / Non-Goals

**Goals:**
- Não exibir o card de total quando `rows().length === 0`.
- Preservar o comportamento atual quando há dados.

**Non-Goals:**
- Não alterar o cálculo do total nem o estado vazio em si.
- Não mexer em estilos.

## Decisions

- **Condicionar `.ds-total-card`**: adicionar `*ngIf="rows().length > 0"` ao card de total. Assim, no estado vazio só o `.ds-no-data` é exibido (mantendo o padrão das demais telas), e com dados o total volta a aparecer. Alternativa descartada: ocultar via CSS — menos explícito e mantém o nó no DOM sem necessidade.

## Risks / Trade-offs

- [O `fade-in` do total e do estado vazio podem competir visualmente] → Não: com a condição, apenas um dos blocos é renderizado por vez no caminho sem dados.

## Open Questions

Nenhuma.
