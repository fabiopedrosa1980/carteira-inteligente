## Why

Dois ajustes no card de Alocação recém-redesenhado:

1. **Cores por tipo com azul duplicado:** hoje FIIs usa azul (`--class-fii` #3b82f6) e ETFs usa um periwinkle (`--class-etf` #a78bfa) que lê como **azul-arroxeado** — os dois segmentos ficam parecidos e difíceis de distinguir na faixa de composição e na legenda.
2. **Aviso de soma em vez de limite efetivo:** ao editar os alvos por classe, quando a soma passa de 100% o app só **mostra uma mensagem** ("Os alvos somam X%"). O usuário prefere que o controle **não deixe ultrapassar**: cada tipo é limitado ao máximo disponível (100% − soma dos outros), de modo que a soma nunca exceda 100%.

## What Changes

- **Triade de cores distinta por tipo** (sem dois azuis): Ações = verde, FIIs = azul, ETFs = **roxo** claramente diferente do azul (dark + light), mantendo tudo em tokens do tema.
- **Limitar cada slider ao máximo do tipo:** ao arrastar/ajustar o alvo de uma classe, o valor é **limitado a `100 − (soma dos outros dois)`**, garantindo soma ≤ 100% por construção; o teclado respeita o mesmo teto.
- **Remover a mensagem de soma** (`alloc-warn`): com o cap, ultrapassar 100% deixa de ser possível, então o aviso não é mais necessário.
- **Cores das ações de rebalanceamento por semântica:** **aportar = verde** (era âmbar) e **reduzir = vermelho**; "no alvo" fica neutro. Verde = direção de compra, vermelho = direção de venda.

## Capabilities

### Modified Capabilities
- `carteira-alocacao-exibicao`: cores por tipo distintas (sem azul duplicado) e edição por classe com **teto por tipo** (cap em 100% − soma dos demais) no lugar do aviso de soma.

## Impact

- **UI apenas:** `styles.scss` (token `--class-etf` nos dois temas) e `allocation-card.*` (cap no `setClassTarget`, remoção do `alloc-warn`).
- Sem mudança em `allocation.util.ts`, serviço ou backend.
