## Why

A parte superior da app (header + navegação por abas) depende de **emojis** — 📈 no logo, ☀️/🌙 no tema, e 📊/📈/📅/🎯 nas abas. Emojis renderizam diferente em cada SO/navegador e dão aparência amadora/templated. Para um app financeiro, a barra superior deve parecer uma **toolbar de terminal**: ícones de traço (SVG) nítidos, controles consistentes e tipografia/espaçamento precisos.

## What Changes

- Substituir o **emoji do logo** (📈) por uma **marca SVG** (barras ascendentes em verde de destaque), com wordmark "Carteira Inteligente" refinado.
- Substituir o toggle de tema **☀️/🌙** por ícones **SVG sol/lua**.
- Substituir os **ícones emoji das abas** por **ícones SVG de traço** (Meus Ativos, Minhas Ações, Dividendos, Metas), monocromáticos e alinhados.
- Unificar os **controles** (tema + sair) como botões-ícone consistentes; refinar o chip de usuário, espaçamento, estados de hover/foco e tornar o header **sticky**.

## Capabilities

### New Capabilities
- `app-shell-chrome`: aparência profissional da barra superior (header + abas) com ícones SVG e controles consistentes.

### Modified Capabilities
- `app-navigation-icons`: ícones das abas passam de emoji para SVG de traço (mantendo a semântica stocks/portfólio/etc.).

## Impact

**Frontend (este repo):**
- `src/app/components/dashboard/dashboard.html` — marca SVG, ícones SVG nas abas e nos controles.
- `src/app/components/dashboard/dashboard.ts` — `tabs` ganham `iconPath` (SVG) em vez de emoji.
- `src/app/components/dashboard/dashboard.scss` — estilo da toolbar (header sticky, botões-ícone, chip, hover/foco).
