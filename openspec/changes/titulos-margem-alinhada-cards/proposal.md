## Why

Os títulos de tela (`.page-title` — "Meus Ativos", "Lançamentos", "Dividendos", "Minhas Metas", "Radar"…) não ficam consistentemente **alinhados à margem dos cards** abaixo deles em todas as telas. Onde o container de cards tem padding/recuo próprio diferente do bloco do título, o título "desencosta" da coluna dos cards, deixando o layout desalinhado e pouco profissional.

## What Changes

- Padronizar o **alinhamento horizontal do título** de cada tela com a **margem esquerda dos cards** daquela tela, em todas as telas do app.
- Aplicar a regra de forma consistente em **mobile e desktop** (respeitando os paddings do container `.content` em cada breakpoint).
- Onde necessário, ajustar a margem/padding do bloco de cabeçalho (`.page-title`/`.page-header`) para casar com o recuo do grid/lista de cards, sem alterar o tamanho/tipografia do título.

## Capabilities

### New Capabilities
- `titulo-alinhado-aos-cards`: o título de cada tela compartilha a mesma margem horizontal de início dos cards da tela, em todos os breakpoints.

### Modified Capabilities
<!-- nenhuma -->

## Impact

- **`src/styles.scss`** — `.page-title`/`.page-header` (margem/alinhamento base).
- **SCSS por tela** que sobrescreve recuo de header ou de container de cards (ex.: `dashboard.scss`, `my-assets`, `dividends`, `dividends-radar`, `goals`) — alinhar o início do título ao início dos cards.
- **Somente CSS/estrutura visual** — sem mudança de lógica, dados ou contrato de API.
- Telas a cobrir: Meus Ativos, Lançamentos, Dividendos, Radar, Metas (e demais que usam `.page-title`).
