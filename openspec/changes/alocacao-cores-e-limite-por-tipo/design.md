## Context

O card de Alocação usa 3 cores de classe (`--class-acoes/fii/etf`) e, na edição, 3 sliders independentes que clampam só em `[0,100]` por classe, com um aviso (`alloc-warn`) quando a soma ≠ 100. Problemas: ETF (`#a78bfa`/`#7c3aed`) lê como azul perto do FII azul; e o usuário quer impedir ultrapassar 100% em vez de só avisar.

## Goals / Non-Goals

**Goals:** 3 cores distinguíveis (sem dois azuis); soma ≤ 100% por construção (cap por tipo); remover o aviso de soma.

**Non-Goals:** mudar cálculo/serviço/backend; tratar soma < 100% (continua permitido — alvo subalocado é válido).

## Decisions

- **Cores por tipo (tokens):** Ações = verde (`--class-acoes`, mantém), FIIs = azul (`--class-fii`, mantém), ETFs = **roxo** distinto do azul. Novos valores de `--class-etf`: dark `#a855f7`, light `#9333ea` (roxo saturado, claramente fora da família azul). Não usar âmbar para ETF (colide com `--color-warning` do status "abaixo").
- **Cap por tipo no `setClassTarget`:** ao definir o alvo de uma classe, calcular `maxDisponivel = 100 − (alvoOutra1 + alvoOutra2)` e aplicar `clampTo(0, maxDisponivel)`. Vale para arraste (pointer) e teclado, pois ambos passam pelo mesmo `setClassTarget`. Resultado: soma nunca > 100%.
- **Remover `alloc-warn`** do template e o uso do `targetsSum` para o aviso (pode manter `targetsSum` se ainda usado; senão remover).
- **Cores das ações (ledger):** `st-abaixo` (aportar) → `--color-pos` (verde), `st-acima` (reduzir) → `--color-neg` (vermelho), `st-no-alvo` → `--text-secondary` (neutro). Antes aportar era `--color-warning` (âmbar); a semântica verde=compra/vermelho=venda fica mais clara.

## Risks / Trade-offs

- [Soma pode ficar < 100%] → permitido por design (alvo parcial). Sem aviso, o usuário vê pelos próprios valores; aceitável.
- [Roxo vs azul ainda próximos para daltônicos] → roxo saturado + a legenda textual (rótulo por classe) dão redundância além da cor.

## Migration Plan

Visual/comportamental, sem migração. Rollback = reverter token e o cap.

## Open Questions

- Nenhuma — decisões fechadas pelo pedido (roxo para ETF; cap em vez de aviso).
