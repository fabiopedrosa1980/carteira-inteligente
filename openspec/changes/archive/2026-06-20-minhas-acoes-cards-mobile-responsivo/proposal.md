## Why

Na tela de Minhas Ações (cards do dashboard), o grid usa colunas fixas por breakpoint (5/4/3/2). Em telas pequenas, as 2 colunas forçadas apertam o conteúdo do card e geram **scroll horizontal** (a área dos cards ultrapassa a largura da tela). Os cards precisam **se adaptar ao tamanho da tela** e nunca estourar/rolar.

## What Changes

- **Grid fluido:** trocar as colunas fixas do `.stocks-grid` por colunas **auto-ajustáveis** (`repeat(auto-fill, minmax(...))`), que se adaptam de 1 a N colunas conforme a largura — incluindo **1 coluna** em telas muito estreitas, eliminando o scroll horizontal.
- **Endurecer o card contra overflow:** garantir `min-width: 0` nos elementos flexíveis, quebra/elipse de textos longos e ajuste do preço hero em telas estreitas, para o conteúdo nunca escapar do card.
- Manter a linguagem visual atual do `stock-card` (sem nova identidade) — apenas responsividade.

## Capabilities

### Added Capabilities
- `minhas-acoes-cards-responsivo`: o grid de cards de Minhas Ações adapta-se à largura da tela sem scroll horizontal, do desktop ao mobile.

## Impact

**Frontend (este repo):**
- `src/app/components/dashboard/dashboard.scss` — `.stocks-grid` com colunas auto-ajustáveis (substitui os breakpoints fixos).
- `src/app/components/stock-card/stock-card.scss` — proteções contra overflow no mobile (min-width:0, wrap/elipse, clamp do preço).

Sem mudança de TS/HTML nem backend.
