## Context

A tela de Lançamentos é o componente standalone `my-assets` (aba "Lançamentos" do dashboard). Cada tipo de ativo (Ações / FIIs / ETFs) é um **acordeão-card** (`.accordion`: `--card-bg`, `--border`, `border-radius: 12px`). O cabeçalho (`.accordion-header`) já segue um padrão consistente: rótulo + contagem à esquerda (`.ah-left`), total rotulado + chevron à direita (`.ah-right`). O corpo traz uma tabela que, em mobile (≤600px), já vira card por linha via `grid-template-areas`. O único botão de adicionar hoje fica no rodapé do corpo (`.add-row > .btn-add-inline`), exigindo expandir e rolar.

O Radar de proventos (`dividends-radar`, visão em cards) exibe tags de destaque no cabeçalho do card de mês: `.rc-tag-top` ("Melhor mês", ícone estrela) e `.rc-tag-next` ("Oportunidade", ícone triângulo de atenção). Em cards estreitos de mobile o texto consome espaço.

O app tem identidade visual já estabelecida: cards com `--card-bg`/`--border`, cor `--accent`, numerais `tabular-nums`/mono, breakpoint principal de 600px. Esta mudança é de **consistência dentro do sistema existente**, não introdução de nova estética.

## Goals / Non-Goals

**Goals:**
- Tornar a ação de adicionar lançamento acessível direto no cabeçalho de cada seção-card, inclusive com a seção recolhida.
- Manter o botão "Adicionar" do rodapé (segundo ponto de acesso), conforme decidido.
- Ajustar o posicionamento dos demais botões (Limpar tudo, Editar/Remover, paginação) para o melhor encaixe em mobile, mantendo alvos de toque e layout contido.
- No Radar, reduzir as tags de destaque a ícone-only no mobile, preservando acessibilidade.

**Non-Goals:**
- Nenhuma mudança de API, modelo de dados ou estado (`openAdd(type)` já existe).
- Nenhuma alteração de comportamento de ordenação/paginação/edição.
- Não redesenhar a estética da tela; apenas posicionamento e responsividade dentro do design system atual.

## Decisions

**1. Botão "+" no `.ah-right` do cabeçalho, dentro do mesmo `<button class="accordion-header">`.**
O cabeçalho do acordeão é um `<button>` que faz `toggle(sec.id)`. Botões aninhados são HTML inválido. Decisão: usar um elemento clicável **não-button** para o "+" (um `<span role="button" tabindex="0">` com `(click)`/`(keydown.enter)` e `$event.stopPropagation()`) posicionado antes do chevron no `.ah-right`. Isso evita aninhar `<button>` e impede que o clique alterne a seção.
- *Alternativa considerada*: transformar o cabeçalho de `<button>` em `<div role="button">` e usar um `<button>` real para o "+". Mais reescrita e risco de regressão no toggle/foco existente — rejeitada por escopo.
- *Estilo*: reaproveitar a linguagem de `.btn-add-inline` (variante compacta, ícone `M12 5v14M5 12h14`), com hover/`focus-visible` em `--accent`, alvo ≥30px.

**2. Manter `.add-row`/`.btn-add-inline` do rodapé intactos.** Atende à escolha "Header + rodapé" e não toca a paginação/tabela.

**3. Posicionamento de botões no mobile via CSS, sem mudança de marcação estrutural.**
- "Limpar tudo": o `.page-header` já empilha (`flex-direction: column; align-items: stretch`) em ≤600px; garantir que `.btn-clear-all` use `justify-content: center` (já existe) e largura confortável.
- Editar/Remover: já reposicionados para a área `actions` à direita do card no mobile — manter, apenas conferir alvo de toque.
- Paginação: `.ma-pagination` já centraliza — manter.
- *Rationale*: o grid mobile da linha→card já existe; a mudança é incremental e localizada, reduzindo risco de regressão.

**4. Radar: ícone-only no mobile via CSS.**
Em `@media (max-width: 600px)`, ocultar o **texto** das tags mantendo o `<svg>`. Como o texto é um nó de texto solto dentro de `.rc-tag-*` (sem wrapper), envolver o rótulo em um `<span class="rc-tag-text">` e aplicar `display: none` no mobile; adicionar `title`/`aria-label` na tag para preservar o rótulo acessível.
- *Alternativa considerada*: `font-size: 0` na tag e restaurar no `svg` — frágil e ruim para acessibilidade. Rejeitada.

**5. Ocultar valores (botão olho) na aba "Meus Ativos" via classe + máscara CSS.**
Estado em `dashboard.ts`: `valoresOcultos = signal<boolean>` inicializado a partir de `localStorage` (chave `ci-hide-values`), com `toggleValores()` que persiste — mesmo padrão de `isDark`/`THEME_KEY`. O botão olho fica no `.section-header` da aba (à direita do título "Meus Ativos"), reusando a linguagem de `.icon-btn` do header; alterna entre ícone "olho cortado" (ocultar) e "olho" (exibir) por `*ngIf="valoresOcultos()"`.
- *Máscara*: alternar uma classe (`.values-hidden`) no contêiner `.portfolio-summary` e aplicar `filter: blur(8px)` + `user-select: none` em `.ps-card-value`. Mantém layout/tamanho exatos, é reversível e não exige `ngIf` em cada um dos 6 cards.
- *Alternativa considerada*: substituir o texto de cada valor por `••••` via `ngIf` por card — mais marcação repetida e risco de divergência entre cards. Rejeitada por manutenção. O blur é o padrão de "shoulder-surfing" usado em apps financeiros e é suficiente para o objetivo (esconder de quem olha a tela).
- *Escopo dos valores mascarados*: todos os `.ps-card-value` da linha de resumo (Patrimônio, Investido, Ganho, Variação, Dividendos Recebidos, a receber), por coerência da ação de privacidade.

## Risks / Trade-offs

- **[HTML inválido por button aninhado]** → Usar `<span role="button">` para o "+" e `stopPropagation`, nunca um `<button>` dentro do `<button>` do cabeçalho.
- **[Clique no "+" alternar a seção]** → `$event.stopPropagation()` no handler do "+".
- **[Acessibilidade do ícone-only no Radar]** → `title` + `aria-label` na tag com o texto completo; `svg` mantém `aria-hidden`.
- **[Aperto no cabeçalho mobile com "+" + total + chevron]** → reduzir `gap` no `.ah-right` em ≤600px (já há regra de `gap: 8px`); validar com ticker/total longos que não há rolagem horizontal.
- **[Regressão de foco/teclado no cabeçalho]** → adicionar `keydown.enter`/`keydown.space` ao "+" e `focus-visible` visível.

## Open Questions

Nenhuma. Placement do botão de adicionar definido como "header + rodapé"; demais botões otimizados por CSS sem mudança estrutural.
