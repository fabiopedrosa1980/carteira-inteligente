## Why

Cada tela define seu próprio recuo horizontal de forma independente, então títulos e cards não ficam na mesma coluna ao navegar entre as abas. Hoje Meus Ativos, Dividendos e Portfolio usam 20px (desktop) / 16px (mobile), mas **Metas** usa 16px no desktop e **Importar** é centralizado (`max-width` + `margin: auto`). Ao trocar de aba, o conteúdo "pula" horizontalmente.

## What Changes

- Definir um **recuo horizontal padrão de 16px** em todos os breakpoints, aplicado de forma consistente ao título (`.page-title`/cabeçalho da tela) e à coluna dos cards em **todas** as telas. (Valor revisado de 20px→16px após auditoria — ver design.)
- **Meus Ativos / Dividendos / Portfolio:** trocar o recuo de 20px para 16px (`$pad-x`, `$dv-pad-x`, `.section-header` e cards do acordeão).
- **Metas:** já usa 16px — permanece como referência, sem alteração.
- **Importar:** remover a centralização (`max-width: 640px; margin: 0 auto`) e alinhar à esquerda, com o mesmo recuo das demais telas.
- Garantir que título e cards de cada tela compartilhem o mesmo recuo (reforça o spec `titulo-alinhado-aos-cards`), agora idêntico **entre** telas.
- Sem mudança de tipografia, cores, tamanho de fonte ou estrutura de cards — apenas margem/recuo horizontal.

## Capabilities

### New Capabilities
- `margens-telas-padronizadas`: recuo horizontal consistente (título + cards) entre todas as telas, por breakpoint.

### Modified Capabilities
<!-- Nenhuma. O spec titulo-alinhado-aos-cards permanece válido; esta capability o estende para consistência entre telas. -->

## Impact

- **Frontend (SCSS):** `dashboard.scss` (`.section-header`), `my-assets.scss` (`$pad-x`), `dividends.scss` (`$dv-pad-x`), `goals.scss` (`.metas-header`), `import.scss` (remoção do `max-width`/centralização). Possível introdução de um token compartilhado para o recuo.
- **Visual:** alinhamento idêntico de título e cards ao alternar entre Meus Ativos, Lançamentos, Dividendos, Metas e Importar, em desktop e mobile.
- **Sem** mudança de comportamento, dados ou API.
