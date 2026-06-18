## Context

Continuação da direção profissional da `top-bar-profissional` (ícones SVG inline de traço, `currentColor`, foco visível, sem biblioteca). As tabelas editáveis:
- **Meus Ativos** (`my-assets`): acordeão por classe (seções com `sec.icon` 🏢/🌐), tabela de lançamentos com `.btn-edit` (✏️) e `.btn-remove` (🗑️). Cores hardcoded: `.sec-count`/`.ticker-badge`/`.btn-edit:hover` usam `rgba(26,127,75,…)`; `.btn-remove:hover` usa `rgba(207,34,46,0.1)`.
- **Metas** (`goals`): tabela com `.icon-btn` (✏️) e `.icon-btn.danger` (🗑️); `.icon-btn.danger:hover` usa `rgba(252,129,129,0.15)`.

Tokens disponíveis: `--accent`, `--color-pos`, `--color-neg`, `--border`, etc.

## Goals / Non-Goals

**Goals:**
- Ícones SVG de traço nas ações (editar/excluir) e nas seções (FIIs/ETFs).
- "+" SVG nos botões de adicionar.
- Cores das listas via tokens (`color-mix`), sem `rgba` fixo de marca.

**Non-Goals:**
- Re-adicionar ícone à seção Ações (removido intencionalmente antes).
- Redesenhar a estrutura das tabelas.

## Decisions

**1. Ícones SVG inline.** Definir os mesmos paths de lápis e lixeira usados como SVG de traço (viewBox 24, `stroke=currentColor`, width 2). Aplicar em `my-assets.html` (`.btn-edit`/`.btn-remove`) e `goals.html` (`.icon-btn`/`.icon-btn.danger`). Botões de adicionar recebem um `<svg>` de "+" antes do texto.

**2. Ícones de seção (FIIs/ETFs).** Em `my-assets.ts`, trocar `icon` (emoji) por `iconPath` (SVG `d`): FIIs = prédio; ETFs = globo/grade. Ações continua sem ícone (`iconPath` vazio → não renderiza). No template, renderizar `<svg>` quando houver `iconPath`.

**3. Cores padronizadas.** Substituir tints fixos por `color-mix`:
- Verde (accent): `rgba(26,127,75,X)` → `color-mix(in srgb, var(--accent) Y%, transparent)` em `.sec-count`, `.ticker-badge`, `.btn-edit:hover`, etc.
- Vermelho: `rgba(207,34,46,0.1)` / `rgba(252,129,129,0.15)` → `color-mix(in srgb, var(--color-neg) 12%, transparent)`; texto/borda em `var(--color-neg)`.
Mantém-se os greys neutros (`rgba(128,128,128,…)`) por serem agnósticos ao tema. Totais e badges de valor continuam em `var(--accent)`.

**4. Consistência de botões-ícone.** Reaproveitar o padrão de botão-ícone (tamanho consistente, hover, `:focus-visible`) já estabelecido; ações de editar em accent, excluir em `--color-neg`.

## Risks / Trade-offs

- [Suporte a `color-mix`] → amplamente suportado nos navegadores atuais; o app já usa `color-mix` em outros componentes (stock-card, detalhes), então é seguro.
- [Inconsistência: Ações sem ícone] → intencional (decisão anterior); FIIs/ETFs com SVG.
- [SVG inline duplicado entre componentes] → aceitável; mantém zero dependências, alinhado à abordagem do projeto.
