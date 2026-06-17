## Context

O `StockCardComponent` renderiza identidade (ticker + nome), nota, preço e faixa de estatísticas. Hoje o nome é truncado em 20 caracteres no getter `displayName` e o `nota-badge` fica no topo (`.card-top`), com `margin-left: auto`. A tela Meus Ativos (`my-assets.scss`) usa `var(--accent)` para todos os elementos verdes de destaque (contadores, totais, ticker-badge, cabeçalhos ativos). No tema dark, `--accent` vale `#1a7f4b` — um verde escuro que se confunde com o fundo `#161b22` dos cards.

São três ajustes puramente de apresentação, sem mudança de modelo de dados, API ou lógica de estado.

## Goals / Non-Goals

**Goals:**
- Exibir nomes de empresa por extenso até 40 caracteres.
- Mover o `nota-badge` para a base do card mantendo a regra de ocultar quando a nota é zero.
- Tornar o verde de destaque do tema dark mais visível na tela Meus Ativos.

**Non-Goals:**
- Alterar o tema light (deve permanecer visualmente igual).
- Redesenhar o layout do card além do reposicionamento da nota.
- Alterar a fonte/cálculo da nota, do nome ou de qualquer dado.

## Decisions

**1. Truncamento do nome — alterar a constante no getter.**
Trocar `20` por `40` em `displayName` (`stock-card.ts`). Mantém a lógica de `—` para nome ausente e de reticências. O `.company` no HTML já usa `text-overflow: ellipsis` como rede de segurança caso o container seja estreito.

**2. Reposicionar a nota — mover o markup para a base.**
Retirar o `nota-badge` de `.card-top` e renderizá-lo após a `.stat-strip`, dentro de uma região inferior do card. Como `.stat-strip` usa `margin-top: auto`, a nota ficará ancorada ao final. Ajustar os estilos: remover o `margin-left: auto` herdado do contexto do topo e definir alinhamento adequado na base (ex.: badge alinhado à direita ou integrado à faixa inferior). Alternativa considerada: posicionamento absoluto no rodapé — descartada por complicar o fluxo responsivo já existente em `@media (max-width: 640px)`.

**3. Verde de destaque — clarear `--accent` apenas no tema dark.**
Ajustar `--accent` em `:root` (tema dark) de `#1a7f4b` para um verde mais vibrante (ex.: `#2ea043`, alinhado ao verde de UI do GitHub). Isso propaga automaticamente para todos os elementos de Meus Ativos que já consomem `var(--accent)`, sem novos tokens. O texto branco dos botões (`--btn-accent-text: #ffffff`) permanece legível sobre o tom mais claro, e `--btn-accent-hover` (`#1f9d5e`) continua coerente. Alternativa considerada: criar token dedicado `--accent-strong` usado só em `my-assets.scss` — descartada por gerar mais alterações e divergência de cor entre telas. O bloco `body.light-theme` não é tocado.

## Risks / Trade-offs

- [Clarear `--accent` afeta outros usos do token além de Meus Ativos no tema dark] → É desejável (consistência global de destaque); validar visualmente botões/realces principais após a mudança.
- [Nome de 40 caracteres pode reflow em telas estreitas] → `.company` já trunca via CSS `ellipsis` e o `title` exibe o nome completo no hover; sem overflow do card.
- [Nota na base pode competir com a `.stat-strip`] → Definir espaçamento/alinhamento explícito para a nota na região inferior, preservando o comportamento responsivo atual.
