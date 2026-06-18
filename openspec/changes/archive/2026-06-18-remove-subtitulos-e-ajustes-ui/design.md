## Context

Mapeamento atual:
- Subtítulos de página (`.page-subtitle`): Minhas Ações (`dashboard.html`), Dividendos (`dividends.html`), Metas (`goals.html`), Meus Ativos (`my-assets.html` — contém contagem + Total).
- Subtítulo do topo do app: `.header-subtitle` em `dashboard.html` ("Análise de dividendos · Ações do Ibovespa").
- Subtítulos de seção em Dividendos: `.ds-subtitle` (`dividends-summary.html`) vindo do `subtitle` computado em `dividends-summary.ts`.
- Logout: botão de texto "Sair" (`.btn-logout`) no header.
- Lista de Metas: cada linha tem `<span class="meta-icon">🎯</span>` antes do nome.
- Login: `LoginComponent.MAX_INIT_ATTEMPTS = 25` com poll de 200ms.

## Goals / Non-Goals

**Goals:**
- Remover subtítulos conforme escopo, mantendo a linha de dados de Meus Ativos.
- Logout como ícone (acessível via title/aria-label).
- Remover o ícone por linha na lista de Metas.
- Retry do login com 3 tentativas.

**Non-Goals:**
- Remover o subtítulo de Meus Ativos (mantém o Total).
- Alterar a lógica de cálculo de Metas, dividendos ou autenticação além do limite de retry.

## Decisions

**1. Remoção de subtítulos.** Excluir os elementos `<p class="page-subtitle">` de Minhas Ações, Dividendos e Metas; `<p class="header-subtitle">` do topo do app; e `<p class="ds-subtitle">` de Dividendos. Remover o `subtitle` computado de `dividends-summary.ts` (sem outros usos) e as regras CSS órfãs `.header-subtitle`/`.ds-subtitle`. A regra global `.page-subtitle` (em `styles.scss`) permanece, pois Meus Ativos ainda a usa.

**2. Logout como ícone.** Substituir o texto "Sair" por um ícone (SVG inline de "sair/porta" ou glifo), mantendo `title="Sair"` e `aria-label="Sair"`. Ajustar `.btn-logout` no `dashboard.scss` para dimensões de botão-ícone, alinhado ao `.btn-theme`.

**3. Lista de Metas sem ícone.** Remover `<span class="meta-icon">🎯</span>` de `goals.html` e a regra `.meta-icon` em `goals.scss`. O `.meta-name-cell` permanece (apenas o nome).

**4. Retry do login = 3.** Alterar `MAX_INIT_ATTEMPTS` de 25 para 3 em `login.ts` (mantendo o intervalo de 200ms): após 3 tentativas, exibe o erro.

## Risks / Trade-offs

- [3 tentativas × 200ms ≈ 600ms pode ser curto para o script async] → É o valor solicitado; o intervalo de 200ms é mantido. Se necessário no futuro, aumentar o intervalo sem mexer no número de tentativas.
- [Header de Meus Ativos diferente das demais (mantém subtítulo)] → Intencional: carrega o Total; decisão do usuário.
- [Ícone de logout sem texto pode reduzir clareza] → Mitigado com `title`/`aria-label` "Sair".
