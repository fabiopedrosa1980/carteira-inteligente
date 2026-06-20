## Why

Enquanto as telas buscam dados na API (Go), hoje mostram apenas um texto ("Calculando…", "Carregando dividendos…"). É pouco informativo e parece travado. O padrão moderno é o **skeleton screen**: placeholders no **formato do conteúdo real** com um brilho animado (**shimmer**), que comunica "está vindo" e reduz a sensação de espera. Ao terminar, o conteúdo real entra com um **fade-in** suave.

## What Changes

- Criar um **sistema reutilizável de skeleton** no `styles.scss`: classe base `.skeleton` com shimmer (gradiente animado) sobre os tokens do tema (claro/escuro), respeitando `prefers-reduced-motion`; e um utilitário `.fade-in` para a revelação do conteúdo.
- Trocar os estados de carregamento textuais por **skeletons no formato de cada tela** que consome a API:
  - **Radar** (matriz) → grade de células esqueleto.
  - **Recebidos / Projetados** (resumo) → linhas de lista esqueleto.
  - **Histórico** → linhas de tabela esqueleto (e o seletor/anos enquanto posições carregam).
  - **Metas** → cards esqueleto.
  - **Cards de ativos** (Meus Ativos/Dashboard) → cards esqueleto.
- Aplicar `fade-in` ao conteúdo quando o carregamento termina.

## Capabilities

### Added Capabilities
- `loading-skeletons`: padrão visual de carregamento (skeleton + shimmer + fade-in) aplicado às telas que consomem a API.

## Impact

**Frontend (este repo):**
- `src/styles.scss` — keyframes do shimmer, classes `.skeleton`/`.skeleton-*` e `.fade-in`; fallback de `prefers-reduced-motion`.
- `dividends-radar`, `dividends-summary`, `dividend-history`, `goals`, e a lista de cards de ativos — markup de skeleton no estado de carregamento + `fade-in` no conteúdo.

Sem mudança de backend.
