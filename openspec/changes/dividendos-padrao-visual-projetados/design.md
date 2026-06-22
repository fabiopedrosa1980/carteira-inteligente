## Context

As quatro telas de Dividendos vivem em componentes separados, com contêineres e títulos divergentes. A referência (Projetados/Recebidos = `dividends-summary`) usa:

- `.ds-section`: `margin-top: 2rem; padding: 1.5rem; background: var(--card-bg); border-radius: 12px; border: 1px solid var(--border);`
- `.ds-title`: `font-size: 1.1rem; font-weight: 600; color: var(--text-primary); margin: 0 0 0.35rem; display: flex; align-items: center; gap: 0.5rem;`

Estado atual das outras telas:

- **Histórico** (`dividend-history.scss`): `.dh-section` igual ao `.ds-section`, porém **sem `border`** (removida na mudança `historico-sem-borda`, ainda não arquivada); `.dh-title` igual ao `.ds-title`, exceto `margin: 0 0 1.25rem`.
- **Radar** (`dividends-radar.scss`): **não há regra `.radar-section`** (o `<div class="radar-section">` existe no HTML, mas sem estilos de card); `.radar-title` é `font-size: 20px; font-weight: 700; margin: 1rem 0 0.25rem;`.

## Goals / Non-Goals

**Goals:**
- Histórico e Radar adotarem o card (fundo, cantos, borda, espaçamento) e o título do padrão de Projetados.
- Recebidos/Projetados sem regressão.

**Non-Goals:**
- Não alterar textos de título, conteúdo, markup ou lógica.
- Não mexer no componente de Resumo (referência).
- Não unificar os estilos em um arquivo compartilhado (cada componente mantém seu SCSS); apenas alinhar valores.

## Decisions

- **Histórico**: em `.dh-section`, **restaurar** `border: 1px solid var(--border)` (alinhando ao `.ds-section`); em `.dh-title`, ajustar `margin` para `0 0 0.35rem`. Isso reverte conscientemente a remoção de borda feita em `historico-sem-borda`, conforme a nova decisão de padronizar pelo Projetados.
- **Radar**: criar a regra `.radar-section` com os mesmos valores de `.ds-section` (`margin-top: 2rem; padding: 1.5rem; background: var(--card-bg); border-radius: 12px; border: 1px solid var(--border);`); ajustar `.radar-title` para `font-size: 1.1rem; font-weight: 600; margin: 0 0 0.35rem;` (mantendo `color` e adicionando `display:flex; align-items:center; gap:0.5rem` para paridade com `.ds-title`).
- **Texto do título do Radar**: mantém-se "Radar de proventos" (apenas o estilo é padronizado). Alternativa descartada: encurtar para "Radar" — mudaria a cópia sem pedido explícito.
- Reaproveitar as variáveis de tema (`--card-bg`, `--border`, `--text-primary`) em vez de cores fixas, garantindo coerência entre temas claro/escuro.

## Risks / Trade-offs

- [Reintroduzir a borda do Histórico conflita com a mudança anterior `historico-sem-borda`] → É intencional: o usuário redefiniu o padrão como o de Projetados (com borda). O proposal registra a superação.
- [Adicionar padding ao `.radar-section` desloca o conteúdo do Radar (toolbar/grid/matriz)] → Esperado e desejado (passa a respeitar o card); validar que a matriz com rolagem horizontal continua contida no card.

## Open Questions

Nenhuma.
