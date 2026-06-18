## Why

A barra superior e as tabelas editáveis já adotaram ícones SVG de traço, mas **emojis** ainda aparecem em vários pontos (sub-tabs de Dividendos 📋/💰/📈, estados vazios 📭/🎯, ícone do modal 📋, avisos ⚠️, check/fechar ✓/✕), o que destoa do padrão profissional e renderiza diferente por SO/navegador. Os tamanhos de botão também variam entre telas. É preciso **substituir todos os emojis pelo novo padrão SVG** e **padronizar os tamanhos de botão**.

## What Changes

- Substituir **todos os emojis pictográficos** por ícones SVG de traço (`viewBox 24`, `stroke=currentColor`), no mesmo padrão já adotado:
  - **Menus de Dividendos**: sub-tabs Histórico/Recebidos/Projetados (📋/💰/📈) → ícones SVG.
  - **Estados vazios**: 📭 (Meus Ativos / Minhas Ações) e 🎯 (Metas) → SVG.
  - **Modal de lançamento**: ícone 📋 do cabeçalho → SVG; fechar ✕ e check ✓ → SVG.
  - **Avisos** ⚠️ (histórico/projeções/confirmação) → SVG de alerta.
  - **Toast** ✓ → SVG de check.
- Manter os glifos tipográficos direcionais (↑ ↓ de ordenação, ← de "Voltar") como texto, por renderizarem de forma consistente e não serem emojis.
- A tela de detalhes de Minhas Ações já não tem ícones nos sub-títulos (nada a remover ali).
- **Padronizar os tamanhos de botão** num conjunto coeso: ação primária, secundário, botão-ícone (md e sm), mantendo consistência de altura/padding/raio/peso entre telas.

## Capabilities

### New Capabilities
- `button-sizing`: escala padronizada de tamanhos de botão.

### Modified Capabilities
- `app-navigation-icons`: sub-tabs de Dividendos passam a usar SVG (sem emoji).
- `editable-tables-chrome`: estados vazios e demais ícones das telas com tabelas usam SVG.

## Impact

**Frontend (este repo):**
- `dividends/*` — sub-tabs com `iconPath` SVG.
- `dividend-history/*`, `dividends-summary/*`, `confirm-dialog/*` — avisos ⚠️ → SVG.
- `goals/*`, `my-assets/*`, `dashboard/*` — estados vazios 📭/🎯 → SVG.
- `add-transaction-modal/*`, `add-stock-modal/*` — modal-icon 📋, ✕, ✓ → SVG.
- `toast/*` — ✓ → SVG.
- SCSS dos componentes acima + ajustes de tamanho de botão para a escala padronizada.
