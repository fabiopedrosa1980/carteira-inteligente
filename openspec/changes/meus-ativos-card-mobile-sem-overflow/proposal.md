## Why

No mobile, os cards da **visão em lista** da aba Meus Ativos (cada ativo vira card em grid de 2 colunas) estão **estourando a largura** quando um valor é longo: as células têm `white-space: nowrap`, mas os itens do grid não têm `min-width: 0`, então a largura de "min-content" de um valor longo empurra a coluna além da sua fração `1fr`. O conteúdo fica cortado/empurrado e dá sensação de scroll, sem margem confortável nas laterais.

## What Changes

- Garantir que as células do card (itens do grid) **encolham** dentro da sua coluna: aplicar `min-width: 0` aos `td` do card no mobile, com `overflow: hidden` + `text-overflow: ellipsis` para truncar com elegância valores muito longos em vez de estourar o card.
- Resultado: o card sempre cabe na largura da viewport (com a margem lateral já existente do `.content`/tbody), **sem rolagem horizontal** nem conteúdo cortado nas bordas.
- Sem mudança de comportamento, dados ou estrutura do grid — apenas contenção de largura das células.

## Capabilities

### New Capabilities
<!-- Nenhuma. -->

### Modified Capabilities
- `mobile-view-fit`: passa a cobrir também os cards da visão em lista de Meus Ativos, exigindo que o conteúdo das células permaneça contido na coluna, sem gerar rolagem horizontal nem corte nas laterais.

## Impact

- **Componente**: `src/app/components/dashboard/dashboard.scss` (bloco mobile `@media (max-width: 640px)` da `.acoes-list`, regra dos `td` do card).
- **Sem impacto** em HTML, serviços, modelos, rotas, API ou estado. Nenhuma dependência nova.
- Afeta somente largura ≤640px; o desktop não muda.
