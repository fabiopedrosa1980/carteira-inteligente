## Why

Os menus do app (navegação principal, submenus de Dividendos, chips de ano, ordenação) quebram de linha ou disputam espaço no mobile, e cada um resolve de um jeito diferente (uns com `flex-wrap`, outros com `overflow-x`, o filtro de anos chegou a virar combo via CSS duplicado). Falta um padrão único de "barra que rola" e uma forma reativa de detectar mobile. A lib oficial de layout responsivo histórica (`@angular/flex-layout`) está descontinuada e não roda na v21, então adotamos `@angular/cdk` (oficial, versiona junto com o Angular, sem impor design).

## What Changes

- Adicionar a dependência `@angular/cdk` ao projeto (única dep nova; oficial; sem estilo imposto).
- Criar `ResponsiveService` que expõe `isMobile()` / `isTablet()` como signals, alimentados pelo `BreakpointObserver` do CDK — substituindo decisões espalhadas por media query.
- Criar componente reutilizável `<app-scroll-bar>`: uma casca de rolagem horizontal que nunca quebra linha, com fade de borda (via `mask-image`, independente de tema), `scroll-snap`, e centralização automática do item ativo. O conteúdo (botões) e o visual de cada menu são preservados.
- Aplicar `<app-scroll-bar>` nas 5 tiras de menu: `.tab-nav` (principal), `.dv-asset-toggle` e `.dv-tabs` (Dividendos), `.dh-years` (chips de ano) e `.sort-controls` (ordenação de Minhas Ações).
- No Histórico de dividendos, trocar a lógica chips↔combo de anos: em vez de duplicar ambos no DOM com `display:none`, usar `@if (isMobile())` para renderizar só um (combo no mobile, chips no desktop).

## Capabilities

### New Capabilities
- `responsive-menu-bar`: comportamento de detecção responsiva (mobile/tablet) e a barra de menu rolável reutilizável aplicada aos menus do app.

### Modified Capabilities
<!-- Nenhuma capability de requisitos existente é alterada. -->

## Impact

- **Nova dependência**: `@angular/cdk` (`package.json`).
- **Novos arquivos**: `src/app/services/responsive.service.ts`; `src/app/components/scroll-bar/scroll-bar.ts` (+ html/scss).
- **Componentes ajustados** (template/estilos): `dashboard` (`.tab-nav`, `.sort-controls`), `dividends` (`.dv-asset-toggle`, `.dv-tabs`), `dividend-history` (`.dh-years` → chips/combo via `isMobile()`).
- **Fora de escopo** (follow-up separado): tabelas/cards largos que estouram no mobile; o `ResponsiveService` já fica reutilizável para isso.
- Sem mudança em serviços de dados, modelos ou contratos de API.
