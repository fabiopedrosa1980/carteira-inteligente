## Why

No mobile os títulos das páginas ("Dividendos", "Minhas Metas", "Lançamentos", "Importar") ficam colados na borda esquerda da tela — falta margem/recuo horizontal. No desktop o recuo confortável vem do padding do container (`.content` = 32px), mas no breakpoint mobile esse padding cai para 12px e os títulos perdem o "respiro" lateral, parecendo grudados na borda. Isso quebra na prática o comportamento já especificado em `titulo-alinhado-aos-cards`, que exige alinhamento consistente título × cards em desktop **e** mobile.

## What Changes

- Garantir margem/recuo horizontal adequado para os títulos de página no mobile, eliminando o efeito de "colado na borda esquerda".
- Aplicar o ajuste de forma **consistente entre todas as telas** que usam título de página, independentemente da classe de cabeçalho (`.page-header`, `.metas-header` em Metas, `.section-header` em Meus Ativos).
- Preservar o alinhamento título × borda esquerda dos cards (não reintroduzir recuo divergente entre título e cards).
- Não alterar tamanho, peso ou tipografia do título — apenas o espaçamento horizontal no breakpoint mobile.

## Capabilities

### New Capabilities
<!-- Nenhuma capability nova; é um ajuste de comportamento de uma capability existente. -->

### Modified Capabilities
- `titulo-alinhado-aos-cards`: refina o comportamento em mobile, exigindo que o título mantenha um recuo horizontal mínimo (não fique colado na borda da tela) sem perder o alinhamento com os cards.

## Impact

- `src/styles.scss` — regras globais `.page-header` / `.page-title` (breakpoint `max-width: 600px`).
- `src/app/components/dashboard/dashboard.scss` — `.content` (padding mobile) e `.section-header`.
- `src/app/components/goals/goals.scss` — `.metas-header`.
- `src/app/components/dividends/dividends.scss` — `.page-header`.
- `src/app/components/my-assets/my-assets.scss` — `.page-header`.
- `src/app/components/import/import.scss` — herda estilo global do título.
- Apenas CSS/SCSS; sem mudança de TypeScript, API ou modelo de dados.
