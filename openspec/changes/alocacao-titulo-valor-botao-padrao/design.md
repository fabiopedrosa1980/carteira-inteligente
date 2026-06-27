## Context

O card de Alocação (`allocation-card`) é exibido em Meus Ativos, acima da lista de seções (acordeão). Seu cabeçalho tem título (`<h3>Alocação</h3>`), valor (`.alloc-total`) e botões (`.alloc-btn`: Editar/Salvar/Cancelar). Hoje:

- `.alloc-title h3`: `font-size: 1.1rem; font-weight: 600` (cor padrão).
- `.alloc-total`: `0.9rem; color: var(--text-secondary)`.
- `.alloc-btn`: contorno transparente, `color: --text-secondary`, `padding: 0.3rem 0.8rem; font-size: 0.8rem; radius: 8px`; `.solid` = verde.

Os padrões de Meus Ativos (acordeão) são: `.sec-label` (15px/700/`--text-primary`), `.sec-total` (14px/700/`--accent`/tabular), e o botão padrão `.btn-add-inline` (accent, sem borda, 13px/700, raio 9px, padding 9px 18px).

## Goals / Non-Goals

**Goals:**
- Título e valor do card de Alocação iguais a `.sec-label`/`.sec-total`.
- Botões Editar/Salvar no botão verde padrão; Cancelar secundário.

**Non-Goals:**
- Mudar comportamento de edição, sliders, ledger ou layout do card.
- Alterar a coluna Ação do ledger (outro change já tratou as cores de valores).

## Decisions

### D1: Reaproveitar os tokens/medidas do padrão, sem hardcode de cor
Aplicar os mesmos valores de `.sec-label`/`.sec-total`/`.btn-add-inline` (tamanhos em px e tokens `--text-primary`/`--accent`/`--btn-accent-text`).
- **Por quê:** garante igualdade visual e suporte aos dois temas.

### D2: Base do `.alloc-btn` = botão verde padrão; `.ghost` = secundário
Tornar o `.alloc-btn` base verde (Editar e Salvar já ficam corretos), e definir `.ghost` (Cancelar) como contorno discreto (fundo transparente, borda `--border`, texto `--text-secondary`, hover realça). O modificador `.solid` torna-se redundante (base já é verde) e pode ser mantido sem efeito ou removido.
- **Alternativa descartada:** manter base contorno e adicionar `.primary` ao Editar. Rejeitada por exigir mexer no HTML; ajustar só o SCSS é suficiente.

## Risks / Trade-offs

- **Tamanho do botão verde no cabeçalho** → adotar o padding/raio do `.btn-add-inline` (9px 18px / raio 9px) pode aumentar o botão; manter `font-size: 13px/700`. Validar que não quebra o layout do cabeçalho em mobile; se necessário, reduzir o padding mantendo cor/tipografia.
- **Modo ocultar valores** → inalterado (o blur continua sobre o valor).
- **Contraste do Cancelar** → garantir hover/foco visíveis no estilo secundário.
