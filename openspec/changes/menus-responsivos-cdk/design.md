## Context

App Angular 21, standalone components, signals, tema claro/escuro com CSS variables, **zero deps de UI**. Cinco tiras de menu sofrem com quebra de linha no mobile e cada uma resolve de forma própria. A lib histórica `@angular/flex-layout` está descontinuada (parou na v15) e não roda na v21. `@angular/cdk` é a alternativa oficial, leve, sem estilo imposto e que versiona junto com o Angular.

Tiras afetadas:
- `.tab-nav` — `dashboard.html` / `dashboard.scss`
- `.sort-controls` — `dashboard.html` / `dashboard.scss`
- `.dv-asset-toggle` e `.dv-tabs` — `dividends.html` / `dividends.scss`
- `.dh-years` (chips) e `.dh-selector` — `dividend-history.html` / `dividend-history.scss` / `.ts`

## Goals / Non-Goals

**Goals:**
- Padrão único de barra rolável (`<app-scroll-bar>`) reutilizado nas 5 tiras, preservando o visual de cada uma.
- Detecção de mobile reativa via `ResponsiveService` (CDK `BreakpointObserver` → signals).
- Histórico: anos como combo no mobile / chips no desktop, com só uma variante no DOM.
- Nenhuma rolagem horizontal da página; fade de borda funcionando nos dois temas.

**Non-Goals:**
- Adotar Angular Material / `mat-tab-group` (traria Material Design e re-tematização).
- Resolver tabelas/cards largos que estouram (follow-up separado).
- Setas ‹ › de navegação no desktop (pode virar incremento depois).

## Decisions

- **`@angular/cdk` como única dep nova.** Oficial, sem estilo, primitivos de breakpoint/scroll. Alternativa descartada: `@angular/flex-layout` (descontinuada, incompatível com v21); Material/PrimeNG (impõem design e brigam com o tema artesanal).
- **`ResponsiveService` com signals.** Usa `BreakpointObserver.observe('(max-width: 600px)')` convertido em signal via `toSignal`. `isMobile`/`isTablet` ficam disponíveis a todo o app. Mantém o breakpoint de 600px já usado no header. Alternativa descartada: media query duplicada no CSS de cada componente (foi o que gerou o DOM duplicado chips/combo).
- **`<app-scroll-bar>` cuida só do comportamento, não do visual.** Projeta o conteúdo com `<ng-content>`; aplica `display:flex; flex-wrap:nowrap; overflow-x:auto`, esconde a scrollbar, `scroll-snap-type: x proximity`. O visual (pill, chip, aba) continua no SCSS de cada menu. Alternativa descartada: um componente de "tabs" opinado que renderiza os botões — não encaixa no pill nem nos chips.
- **Fade de borda via `mask-image`, condicional ao scroll.** `mask-image: linear-gradient(...)` "come" a opacidade do próprio conteúdo, então funciona em qualquer fundo e em ambos os temas (vs. gradiente de cor sólida, que exigiria saber a cor do fundo por tema). A condicionalidade (fade só quando há overflow, e de que lado) usa `animation-timeline: scroll()` quando suportado, degradando para "fade fixo nas bordas" em browsers antigos — aceitável.
- **Item ativo visível via `scrollIntoView({ inline: 'nearest' })`.** O `<app-scroll-bar>` observa qual item tem a classe ativa (ou recebe um input) e o traz à vista ao mudar. Mantém simples; sem dependência de roteador.
- **Histórico chips↔combo por `@if(isMobile())`.** Remove o DOM duplicado. O combo reusa `availableYears()`, `selectedYear()` e `selectYear()` já existentes; valor sentinela `'all'` → `null`.

## Risks / Trade-offs

- [Adicionar uma dependência num app que tinha zero] → CDK é oficial, tree-shakeable e usamos só `Layout`/scroll; impacto de bundle pequeno e justificado pela padronização.
- [`animation-timeline: scroll()` não é universal] → Degrada para fade fixo; nenhuma quebra funcional, só estética em browsers antigos.
- [Refatorar 5 templates para envolver com `<app-scroll-bar>`] → Mecânico e isolado por tira; cada menu mantém seu SCSS, reduzindo risco de regressão visual.
- [`scrollIntoView` em container com `scroll-snap`] → Testar para não "brigar" com o snap; usar `inline: 'nearest'` evita saltos bruscos.
- [Versão do CDK deve casar com Angular 21] → Instalar `@angular/cdk@^21` para alinhar major.
