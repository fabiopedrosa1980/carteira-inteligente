## Context

O modal de detalhe do ativo (`StockDetailsModalComponent`) tem um `<header class="details-header">` com dois grupos: `.title-group` (ticker + nome) e `.price-group` (preço em R$ e variação do dia). O corpo lista indicadores fundamentalistas e informações da empresa. A mudança é puramente de apresentação: remover o `.price-group`.

## Goals / Non-Goals

**Goals:**
- Remover preço (valor) e variação do dia do cabeçalho do detalhe.
- Manter o cabeçalho com a identidade do ativo e o layout limpo.

**Non-Goals:**
- Não remover os campos `price`/`changePercent` do modelo `Stock` nem de outras telas (lista, cards).
- Não alterar as seções de indicadores/empresa.

## Decisions

- **Remover o bloco `.price-group` do template** em vez de escondê-lo via CSS, mantendo o HTML enxuto e sem markup morto. Alternativa (ocultar com `*ngIf`/CSS) descartada por deixar código sem uso.
- **Limpar os estilos órfãos** (`.price-group`, `.d-price`, `.currency`, `.d-change`) e ajustar `.details-header` para o caso de um único grupo (ticker/nome), evitando espaçamento/alinhamento herdado de um layout de dois grupos.

## Risks / Trade-offs

- [Estilos órfãos deixados no SCSS] → Mitigação: remover as regras junto com o markup e conferir o alinhamento do cabeçalho após a mudança.
- [Usuário pode sentir falta da cotação no detalhe] → Mitigação: a cotação continua visível na lista/cards de onde o detalhe é aberto.
