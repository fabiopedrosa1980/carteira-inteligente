## Context

Continuação dos refinamentos da entrega `meus-lancamentos-card-mobile` (já arquivada). Componentes envolvidos: `my-assets` (Lançamentos), `dashboard` + `allocation-card` (aba "Meus Ativos"/portfolio) e `dividend-history` (Histórico de Dividendos). Tudo dentro do design system existente (cards `--card-bg`/`--border`, `--accent`, breakpoint 600px no app e 480px no histórico).

Estado atual relevante:
- Card mobile de lançamento (`my-assets.scss`) usa `grid-template-areas: 'ticker actions' / 'data qtd' / 'preco total'`. As ações ficam na linha do ticker.
- O cabeçalho da seção tem um `.btn-add-sec` ("+") + chevron; o rodapé tem `.btn-add-inline` ("Adicionar").
- O olho (`valoresOcultos`) vive em `dashboard.ts` e aplica `.values-hidden` apenas em `.portfolio-summary`. O `app-allocation-card` é irmão, fora desse contêiner.
- `.ps-card-value`: 15px (hero 22px; mobile hero 17px).
- `dividend-history` usa `<table table-layout: fixed>` com 4 colunas a 25% e `td { white-space: nowrap; overflow: hidden; text-overflow: ellipsis }`; em ≤480px `font-size: .78rem`. O valor é truncado quando excede 25%.

## Goals / Non-Goals

**Goals:** ler melhor o card de lançamento no mobile (ações junto do Total); simplificar o acesso de adicionar (só rodapé); estender o olho à Alocação; reduzir a fonte do valor dos cards de resumo; impedir o corte de valores no Histórico mobile.

**Non-Goals:** nenhuma mudança de API/estado/dados; não redesenhar telas; não alterar desktop (exceto a fonte do valor, que muda em ambos).

## Decisions

**1. Card mobile de lançamento — ações na linha do Total.**
Reestruturar o grid para 3 colunas no mobile: `grid-template-columns: 1fr 1fr auto;` com
```
'ticker ticker ticker'
'data   data   qtd'
'preco  total  actions'
```
`.action-cell` recebe `grid-area: actions`, alinhado à direita e centralizado verticalmente com o Total. Remover a área `actions` da linha do ticker. Manter micro-rótulos (`::before`) de Data/Qtd/Preço/Total.
- *Alternativa*: nova 4ª linha só para ações — rejeitada (o usuário pediu na mesma linha do Total).

**2. Remover o botão "+" do cabeçalho.**
Excluir o `<span class="btn-add-sec">` do `my-assets.html` e o estilo `.btn-add-sec` do `.scss`. O `openAdd(type)` continua sendo chamado pelo botão do rodapé. Reverter o `gap: 6px` mobile do `.ah-right` para o valor anterior (8px) já que o "+" não disputa mais espaço.

**3. Olho também oculta a Alocação.**
Adicionar `@Input() hideValues = false` ao `AllocationCardComponent` e aplicar `[class.values-hidden]="hideValues"` na raiz `.alloc-card`. No `.scss` do componente, mascarar com `filter: blur(8px)` os valores em R$: `.alloc-total` e as células de ação do ledger com montante (`.ledger-row .act.st-abaixo`, `.act.st-acima`). Percentuais (`.num`) e `✓ no alvo` permanecem visíveis. No `dashboard.html`, passar `[hideValues]="valoresOcultos()"`.
- *Alternativa*: envolver summary + allocation num só contêiner `.values-hidden` — rejeitada (allocation é componente isolado; input é mais limpo e encapsulado).

**4. Fonte reduzida do valor dos cards de resumo.**
`.ps-card-value`: 15px → **14px**; hero 22px → **19px**; mobile hero 17px → **16px**. Mantém o destaque relativo do hero. Ajuste só em `dashboard.scss`.

**5. Histórico — valor sem corte no mobile.**
Em `@media (max-width: 480px)` de `dividend-history.scss`: rebalancear `<colgroup>` (ex.: Tipo 20%, Data Com 27%, Pagamento 27%, Valor 26%), **alinhar o Valor à direita**, remover o `text-overflow: ellipsis`/`overflow: hidden` da célula de Valor (mantendo `white-space: nowrap`) e reduzir o padding horizontal das células para ganhar espaço. Validar com valores grandes (ex.: "R$ 12.345,67") que nada é cortado e não há rolagem horizontal (já há `overflow-x: hidden` no wrap em ≤480px).
- *Alternativa*: permitir rolagem horizontal — rejeitada (pior UX; o objetivo é caber).

## Risks / Trade-offs

- **[Grid 3 colunas desalinhar Qtd/Ações]** → Qtd e Ações ambos na 3ª coluna (auto), à direita — conferir alinhamento e `justify-self: end`.
- **[Blur na Alocação vazar para percentuais]** → mascarar apenas seletores de valor em R$ (`.alloc-total`, montantes do ledger), nunca `.num`.
- **[Fonte menor comprometer leitura do hero]** → manter hero ainda maior que os demais (19px vs 14px).
- **[Histórico: remover ellipsis estourar a coluna]** → rebalancear larguras + reduzir padding + alinhar à direita garante o cabimento; testar nos breakpoints estreitos (360px).

## Open Questions

Nenhuma. Itens 1 e 2 confirmados pelo usuário ("ações na linha do Total, só no card mobile"; "remover '+' do header, manter rodapé").
