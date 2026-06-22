## Why

Nas telas de Dividendos **Recebidos** e **Projetados**, o card de total ("Total recebido" / "Total projetado") é exibido mesmo quando não há proventos, mostrando "R$ 0,00" acima do estado vazio. Isso polui o estado vazio e foge do padrão das demais telas, que apenas mostram o bloco vazio (ícone + título + texto) quando não há dados.

## What Changes

- **Ocultar o card de total** ("Total recebido" / "Total projetado") nas telas de Recebidos e Projetados **quando não houver dados** (nenhum ativo com proventos), exibindo apenas o estado vazio padronizado.
- Quando houver dados, o card de total continua sendo exibido normalmente (sem alteração).

## Capabilities

### New Capabilities
<!-- Nenhuma capability nova. -->

### Modified Capabilities
- `dividendos-resumo-estado-vazio`: no estado vazio, o card de total não é exibido — apenas o bloco vazio padronizado.

## Impact

- `src/app/components/dividends-summary/dividends-summary.html` — condicionar a exibição de `.ds-total-card` a `rows().length > 0`.
- Sem mudanças de API, modelos, lógica ou estilos.
