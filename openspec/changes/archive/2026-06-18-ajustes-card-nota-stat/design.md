## Context

Após a mudança `ajustes-card-acoes`, o nome trunca em 40 caracteres e a nota fica num bloco inferior `.card-bottom` com estilo de badge (`.nota-badge`). A faixa `.stat-strip` já renderiza Hoje e DY como itens `.stat` (rótulo `.stat-label` + valor `.stat-value`), e o `.stat-value` já tem as classes de cor por faixa `nota-high/nota-mid/nota-low` (definidas mas hoje usadas só pelo badge). O getter `notaClass` em `stock-card.ts` continua disponível.

São ajustes puramente de apresentação, sem mudança de dados/estado.

## Goals / Non-Goals

**Goals:**
- Reduzir o truncamento do nome para 30 caracteres.
- Exibir a nota como um `.stat` na `.stat-strip`, ao lado de Hoje e DY, com o mesmo estilo.
- Eliminar o `.card-bottom`/`.nota-badge` agora redundantes.

**Non-Goals:**
- Alterar tema, cálculo da nota ou qualquer dado.
- Mudar a ordem/aparência de Hoje e DY.

## Decisions

**1. Nome — alterar a constante.** Trocar `40` por `30` em `displayName` (`stock-card.ts`).

**2. Nota como stat.** Remover o `.card-bottom` do HTML e adicionar, dentro da `.stat-strip`, um novo `.stat` com `.stat-label` "Nota" e um `.stat-value` aplicando `notaClass`, exibido via `*ngIf="stock.nota > 0"`. Posicioná-lo após o item de DY. Reaproveitar as classes existentes `nota-high/nota-mid/nota-low` em `.stat-value`, que já definem as cores por faixa — sem novo CSS de cor. Manter o `★` é opcional; para alinhar ao estilo enxuto de Hoje/DY, exibir apenas o valor numérico (`stock.nota | number: '1.0-1'`). Alternativa considerada: manter o badge e só movê-lo para dentro da strip — descartada por não seguir "o mesmo estilo" de Hoje/DY.

**3. Limpeza de CSS.** Remover as regras `.card-bottom` e `.nota-badge`/`.nota-star`/`.nota-value` que ficam órfãs. As classes `.stat-value.nota-*` permanecem (agora efetivamente usadas pelo novo stat).

## Risks / Trade-offs

- [Faixa pode ficar apertada em mobile com Hoje + DY + Nota] → A `.stat-strip` já tem `flex-wrap` em `@media (max-width: 640px)`; os itens refluem sem estourar o card.
- [Remover `.nota-badge` pode deixar estilos referenciados em outro lugar] → O badge só é usado no `stock-card`; verificar que nenhuma outra referência existe antes de remover.
