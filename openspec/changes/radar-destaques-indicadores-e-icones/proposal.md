## Why

Três ajustes de leitura/visual:

- **Ver ativo:** o destaque dos "indicadores mais usados" será **removido** (todos os indicadores ficam iguais), e cada indicador ganha um **ícone "i"** que mostra a **descrição** do indicador ao passar o mouse — mais informativo que o realce.
- **Radar:** os destaques de mês foram removidos antes; trazê-los de volta — **estrela no mês com mais ativos** e **"Oportunidade de compra" com ícone de atenção no próximo mês** — ajuda a decisão, e devem aparecer **nas duas visões** (matriz e cards), de forma profissional.
- **Toggle de visão:** os botões "Cards | Matriz" em texto ficam mais limpos como **ícones** (um de cards, um de matriz).

## What Changes

- **Ver ativo:** **remover** o destaque dos indicadores-chave (a classe `.indicator.key` e a lógica `isKeyIndicator`) e adicionar um **ícone "i"** por indicador com a **descrição** em tooltip (hover).
- **Radar — destaques (matriz e cards):**
  - **Mês com mais ativos:** ícone de **estrela** + realce.
  - **Próximo mês ao atual:** rótulo/sinal **"Oportunidade de compra"** + ícone de **atenção** + realce.
  - Uma **legenda** explicando os dois ícones. Execução profissional e consistente nas duas visões.
- **Radar — toggle por ícones:** trocar os botões de texto por **ícones** (cards / matriz), com `title`/`aria-label` para acessibilidade.

## Capabilities

### Modified Capabilities
- `dividends-radar`: reintroduz os destaques de mês (estrela no top, atenção/"Oportunidade de compra" no próximo) na matriz e nos cards; alternador de visão por ícones.

### Added Capabilities
- `ativo-indicadores-info`: remoção do destaque dos indicadores-chave e ícone "i" com descrição (tooltip) por indicador na tela de ver ativo.

## Impact

**Frontend (este repo):**
- `dividends-radar.{ts,html,scss}` — `topMonth`/`nextMonth` e helpers; ícones de estrela/atenção e realces na matriz e nos cards; legenda; toggle por ícones.
- `stock-details-modal.{ts,html,scss}` — remover `.indicator.key`/`isKeyIndicator`; mapa de descrições + ícone "i" com tooltip por indicador.

Sem backend.
