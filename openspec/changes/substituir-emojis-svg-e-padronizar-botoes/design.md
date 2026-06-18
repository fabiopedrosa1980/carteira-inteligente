## Context

Padrão de ícone já estabelecido (top-bar e tabelas editáveis): SVG inline de traço, `viewBox="0 0 24 24"`, `stroke="currentColor"`, `stroke-width="2"`, `fill="none"`, sem biblioteca. Emojis remanescentes mapeados:
- Dividendos sub-tabs (`dividends.ts`): 📋/💰/📈.
- Estados vazios: 📭 (`my-assets`, `dashboard` empty-portfolio), 🎯 (`goals` empty).
- Modal: 📋 (`add-transaction-modal` modal-icon), ✕ fechar, ✓ no texto de salvar (também `add-stock-modal`).
- Avisos ⚠️: `dividend-history`, `dividends-summary`, `confirm-dialog`. Processamento ⏳ (`dividend-history`).
- Toast: ✓.
- `dividend-calendar` está **sem uso** (não renderizado) → fora do escopo.
- Glifos ↑ ↓ (ordenação) e ← ("Voltar") são tipográficos e permanecem.

## Decisions

**1. Conversão de emoji → SVG.** Para cada emoji pictográfico, inserir um `<svg>` de traço apropriado:
- Sub-tabs Dividendos: `iconPath` por aba (Histórico = lista/clipboard; Recebidos = cifrão/entrada; Projetados = linha ascendente) renderizado como `<svg><path [attr.d]>`. Remover o campo `icon` emoji.
- Estado vazio 📭 → ícone "inbox"; 🎯 → "alvo".
- Modal 📋 → "clipboard"; ✕ → "x"; ✓ (texto salvar e toast) → "check".
- ⚠️ → "alert-triangle"; ⏳ → "clock"/spinner (ou manter como texto "…"; usar alert/clock SVG).
Cada SVG herda cor por `currentColor` e tamanho via classe (`.empty-illustration`, `.modal-icon`, `.alert-icon`, etc.).

**2. Escala de tamanhos de botão.** Definir e aplicar:
- **Ação (md):** altura efetiva ~38px → `padding: 10px 18px`, `border-radius: 9px`, `font: 14px/700`. Aplicar a `btn-add-transaction`, `btn-nova`, `btn-save`, `btn-cancel`, `btn-danger`, `btn-back`.
- **Botão-ícone (md):** `36×36`, raio 9px → `icon-btn` (header), `close-btn`, `pag-btn`.
- **Botão-ícone (sm):** `30×30`, raio 6px → ações de linha (`btn-edit`, `btn-remove`, `icon-btn` das metas).
- **Inline/secundário (sm):** `padding: 7px 12px`, raio 8px, font 12/600 → `btn-add-inline`.
- **Nav (tabs/toggle):** `dv-tab`, `dv-asset-btn` e abas principais mantêm seu papel de navegação, com alturas alinhadas entre si.
Valores aplicados diretamente em cada SCSS (sem renomear classes), garantindo consistência; `:focus-visible` em todos.

**3. Acessibilidade.** Botões-ícone com `aria-label`/`title`; SVG com `aria-hidden`. Foco visível mantido.

## Risks / Trade-offs

- [Mudança ampla (muitos arquivos)] → agrupar por componente; cada arquivo é uma edição pequena e verificável; `ng build` ao final.
- [Escolha de glifos vs. emojis] → manter setas/Voltar como texto é decisão consciente (não são emojis e renderizam bem).
- [Padronizar botões sem refator de classes] → alinhar valores é mais seguro que introduzir utilitários globais agora; resultado visual consistente.
- [`dividend-calendar` sem uso] → não tocar (evita esforço em código morto).
