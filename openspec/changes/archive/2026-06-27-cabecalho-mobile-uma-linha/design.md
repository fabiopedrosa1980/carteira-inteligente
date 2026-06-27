## Context

O `.dashboard-header` (`dashboard.scss:6`) é `display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:16px`. Seus filhos diretos são `.header-left` (logo: marca + texto) e `.header-actions` (chip do usuário + 3 `.icon-btn`).

Como `flex-wrap: wrap` está ativo, quando logo + ações não cabem, `.header-actions` quebra para a segunda linha. Hoje:
- `.user-name` já some em ≤600px (`dashboard.scss:100`), restando o avatar.
- `.icon-btn` tem 36×36px (`dashboard.scss:110`).
- Não há `min-width:0` na `.header-left`/`.logo`, então o texto da logo não trunca — ele força a largura e provoca a quebra.

## Goals / Non-Goals

**Goals:**
- Cabeçalho em uma linha no mobile (≤600px), sem esconder ícones.
- Texto da logo trunca; ícones de ação não encolhem.

**Non-Goals:**
- Esconder chip/avatar ou texto da logo (decisão do usuário: só reduzir tamanhos/gaps).
- Alterar o layout do desktop.
- Mudar HTML/TS.

## Decisions

### Decisão 1: `flex-wrap: nowrap` no header em ≤600px
- **Escolha**: Forçar `nowrap` no `.dashboard-header` no mobile para impedir a quebra.
- **Rationale**: É a causa direta da segunda linha.

### Decisão 2: Permitir o texto da logo encolher/truncar
- **Escolha**: `.header-left`/`.logo { min-width: 0; }` e `.logo-text { overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }`. `.header-actions { flex-shrink: 0; }` para os ícones não cederem.
- **Alternativa**: Esconder o texto da logo — rejeitada pela escolha do usuário (manter tudo).
- **Rationale**: Em flexbox, o item só trunca com `min-width:0`; priorizar os ícones mantém as ações sempre acessíveis.

### Decisão 3: Reduzir tamanhos/gaps no mobile
- **Escolha**: Em ≤600px, `.icon-btn` 32×32px, `.header-actions` gap 6px, `.dashboard-header` gap 8px, `.user-chip` padding menor. Em ≤480px, opcionalmente `.icon-btn` 30×30px e gaps 4px.
- **Rationale**: Abre espaço mantendo alvo de toque ≥30px.

## Risks / Trade-offs

- **Telas muito estreitas (≤320px)** podem truncar bastante o texto da logo → aceitável; a marca (ícone) permanece e os ícones de ação ficam íntegros.
- **`min-width:0` pode afetar alinhamento** → validar que a marca da logo não distorce (ela tem `flex-shrink:0`).

## Migration Plan

1. Ajustar regras responsivas em `dashboard.scss` (≤600px e ≤480px).
2. `ng build` e validar em larguras 360/390/414px e desktop.

**Rollback**: Reverter o commit (mudança isolada em `dashboard.scss`).
