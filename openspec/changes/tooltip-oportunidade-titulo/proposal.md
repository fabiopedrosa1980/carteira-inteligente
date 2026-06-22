## Why

O tooltip de oportunidade (Meus Ativos) tem o título "Preço-teto", mas uma das linhas de dados dentro do próprio tooltip também se chama "Preço-teto". A repetição é confusa e o título não descreve bem o conjunto de indicadores. Um título coerente com a coluna ("Oportunidade") elimina a duplicação e alinha o tooltip ao seu contexto.

## What Changes

- Renomear o título no topo do tooltip de oportunidade de "Preço-teto" para **"Oportunidade"**.
- Sem alterar o veredito da zona, os cinco campos, a formatação ou o comportamento de hover.

## Capabilities

### New Capabilities
- `tooltip-oportunidade-titulo`: define o título exibido no topo do tooltip de oportunidade.

### Modified Capabilities
<!-- Nenhuma. A capability meus-ativos-oportunidade-tooltip (introduzida em mudança ainda não arquivada) descreve veredito e campos; o título é tratado aqui como requisito próprio. -->

## Impact

- `src/app/components/dashboard/dashboard.html` — texto do elemento `.ot-title` na célula `cell-oportunidade`.
- Sem mudanças em TS, SCSS, backend ou dependências. Sem breaking changes.
