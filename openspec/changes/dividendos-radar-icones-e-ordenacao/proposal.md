## Why

Pequenos ajustes de consistência e usabilidade nas telas de Dividendos:

1. No Radar, quando não há dados para mostrar, o alternador de visualização (cards / matriz "batalha naval") continua visível, oferecendo controles sem efeito.
2. Os estados vazios das telas de dividendos usam todos o mesmo ícone (calendário), sem relação com a tela; usar o ícone do próprio sub-menu deixa cada estado vazio reconhecível.
3. O Histórico de dividendos não permite ordenar a tabela; ordenar por qualquer coluna facilita a análise.

## What Changes

- **Radar — ocultar alternador sem dados**: quando o Radar não tem dados (estado vazio), ocultar os ícones de visualização em **cards** e em **matriz (batalha naval)**.
- **Estados vazios — ícone por tela**: nos estados vazios das telas de dividendos, usar o **ícone do sub-menu correspondente** (Histórico, Recebidos, Projetados, Radar) em vez do calendário genérico.
- **Histórico — ordenar por todas as colunas**: tornar a tabela do Histórico ordenável por **Tipo, Data Com, Data de Pagamento e Valor**, alternando ascendente/descendente ao clicar no cabeçalho, com indicador visual da coluna/ordem ativa.

## Capabilities

### New Capabilities
- `radar-alternador-sem-dados`: o Radar oculta o alternador de visualização (cards/matriz) quando está no estado vazio.
- `dividendos-estado-vazio-icone-por-tela`: cada estado vazio das telas de dividendos usa o ícone do seu sub-menu.
- `historico-ordenacao-colunas`: a tabela do Histórico de dividendos é ordenável por todas as colunas.

### Modified Capabilities
<!-- Nenhuma capability existente tem seus requisitos alterados. -->

## Impact

- `src/app/components/dividends-radar/dividends-radar.html` — condição para ocultar `.radar-view-toggle` no estado vazio; ícone do estado vazio.
- `src/app/components/dividend-history/dividend-history.html` / `.ts` / `.scss` — cabeçalhos clicáveis, lógica de ordenação e ícone do estado vazio.
- `src/app/components/dividends-summary/dividends-summary.html` / `.ts` — ícone do estado vazio por modo (Recebidos/Projetados).
- Sem mudanças de API ou modelos de dados.
