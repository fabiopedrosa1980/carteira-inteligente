## Why

Os ícones das abas estão trocados em significado: Meus Ativos usa 📊 (gráfico) e Minhas Ações usa 💼 (pasta/portfólio) — o ideal é o inverso, com Minhas Ações remetendo a ações/stocks e Meus Ativos a portfólio. Nas tabelas com edição, o usuário só consegue editar pelo pequeno ícone de lápis; tornar a linha inteira clicável melhora a usabilidade. E no tema light os badges de tipo de provento (Dividendo e JCP) usam cores claras (verde/amarelo claros) que não destacam sobre o fundo claro.

## What Changes

- Trocar os ícones das abas: **Minhas Ações** passa a usar um ícone de ações/stocks (📈) e **Meus Ativos** um ícone de portfólio (💼).
- Tornar a **linha clicável** nas tabelas com edição (lançamentos em Meus Ativos e lista de Minhas Metas): clicar na linha abre a edição; os botões de excluir (e editar) param a propagação para não conflitar.
- Melhorar o contraste dos badges **Dividendo** e **JCP** no **tema light**, com cores mais escuras/saturadas que destaquem sobre o fundo claro (sem regredir o tema dark).

## Capabilities

### New Capabilities
- `app-navigation-icons`: semântica dos ícones das abas (stocks / portfólio).
- `editable-row-click`: linha clicável para editar nas tabelas com edição.
- `dividend-type-theming`: contraste dos badges Dividendo/JCP no tema light.

### Modified Capabilities
<!-- Nenhuma capability de requisito existente é alterada. -->

## Impact

- `src/app/components/dashboard/dashboard.ts` — ícones das abas `meus-ativos` e `portfolio`.
- `src/app/components/my-assets/my-assets.{html,scss}` — `.table-row` clicável; `stopPropagation` nos botões de ação.
- `src/app/components/goals/goals.{html,scss}` — `<tr>` clicável; `stopPropagation` nos botões de ação.
- `src/app/components/dividend-history/dividend-history.scss` — overrides de `.badge-jcp`/`.badge-dividendo` no `body.light-theme`.
