## Why

No Histórico de dividendos, o filtro de anos hoje vira um combo `<select>` no mobile (ao lado de "Ativo") e só mostra os chips no desktop. O usuário prefere a experiência da web — **chips de ano** — também no mobile, exibidos na **linha de baixo** e **quebrando de linha** quando não couberem, em vez de combo ou rolagem horizontal.

## What Changes

- **Anos sempre em chips** (como na web): remover o combo `<select>` de anos do mobile.
- **Chips na linha de baixo**: os chips de ano ficam abaixo do seletor de "Ativo", em todos os tamanhos de tela.
- **Sem scroll no mobile**: no mobile, os chips **quebram de linha** (`flex-wrap`) em vez de rolar horizontalmente; deixam de usar `<app-scroll-bar>`.
- Simplificação: remover a lógica `isMobile()` / `selectYearFromCombo()` e o uso de `ScrollBarComponent` no componente de histórico, já que não há mais alternância chips/combo nem rolagem.

## Capabilities

### New Capabilities
<!-- Nenhuma capability nova; ajusta comportamento já versionado em responsive-menu-bar. -->

### Modified Capabilities
- `responsive-menu-bar`: o filtro de anos do Histórico deixa de alternar chips/combo por viewport — passa a exibir sempre chips, que quebram de linha no mobile (sem combo, sem rolagem).

## Impact

- `src/app/components/dividend-history/dividend-history.html` — remover o combo de anos e o wrapper `<app-scroll-bar>`; renderizar sempre os chips em um `<div class="dh-years">`.
- `src/app/components/dividend-history/dividend-history.scss` — `.dh-years` volta a `flex-wrap: wrap`; remover regra do `.dh-year-select`.
- `src/app/components/dividend-history/dividend-history.ts` — remover `isMobile`, `selectYearFromCombo`, injeção de `ResponsiveService` e import de `ScrollBarComponent` (se não usados em outro ponto).
- `ResponsiveService` e `<app-scroll-bar>` continuam existindo (usados em outras telas); nenhuma dependência removida do projeto.
- Apenas template/estilos e limpeza de lógica; sem mudança em serviços de dados, modelos ou API.
