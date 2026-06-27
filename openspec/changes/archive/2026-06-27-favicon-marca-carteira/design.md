## Context

Angular 21 serve estáticos da pasta `public/`. Hoje há `public/favicon.ico` (padrão Angular, ~14.7KB) e `src/index.html:8` referencia `<link rel="icon" type="image/x-icon" href="favicon.ico">`.

A marca já existe como SVG inline em dois lugares:
- `dashboard.html` (`logo-mark`, viewBox 0 0 32 32): 3 barras ascendentes + linha de tendência, `currentColor`.
- `login.html` (`brand-icon`, viewBox 0 0 48 48): mesmas barras em `#C9A84C` (dourado) + ponto no topo.

Paleta: dourado `#C9A84C` sobre fundo escuro (`#06090F` no login, `#0d1117` no app). Nenhuma ferramenta de rasterização está instalada (`magick`, `convert`, `rsvg-convert`, `sharp` ausentes).

## Goals / Non-Goals

**Goals:**
- Favicon de marca (barras douradas) substituindo o do Angular.
- `favicon.svg` nítido + `favicon.ico` de fallback (16/32/48).
- Mudança mínima em `index.html`.

**Non-Goals:**
- PWA / `manifest.webmanifest` / apple-touch-icons completos (pode ser change futuro).
- Redesenhar a marca; apenas reusar o mark existente.
- Theming claro/escuro do favicon.

## Decisions

### Decisão 1: Reusar o `brand-icon` do login como base do favicon
- **Escolha**: Derivar o `favicon.svg` do SVG de `login.html` (barras douradas `#C9A84C` + ponto), com um fundo arredondado escuro para contraste em abas claras.
- **Alternativa**: Usar o mark do dashboard (`currentColor`, sem cor fixa). Rejeitada porque favicon precisa de cor explícita.
- **Rationale**: Mantém consistência visual com a identidade já existente.

### Decisão 2: SVG primário + ICO de fallback
- **Escolha**: `index.html` referencia `favicon.svg` (primário) e `favicon.ico` (fallback), nesta ordem.
- **Rationale**: SVG é nítido e leve; `.ico` cobre Safari antigo e requisições diretas a `/favicon.ico`.

### Decisão 3: Gerar o `.ico` via tooling pontual com `npx` (sem dependência permanente)
- **Escolha**: Rasterizar o SVG em PNG (16/32/48) e empacotar em `.ico` usando `npx` (ex.: `sharp` para SVG→PNG e `png-to-ico`), sem adicionar dependências ao `package.json`.
- **Alternativas**: (a) Instalar `sharp`/`png-to-ico` como devDependencies — rejeitada por poluir o projeto para uma tarefa única; (b) serviço web de favicon — rejeitada por enviar a marca para terceiros.
- **Rationale**: Geração reprodutível localmente, sem custo permanente. Requer rede para `npx`.

## Risks / Trade-offs

- **`npx` precisa de rede / pode falhar** → Fallback: manter apenas o `favicon.svg` (já cobre navegadores modernos) e gerar o `.ico` depois; ou usar outra ferramenta disponível.
- **Cache agressivo de favicon do navegador** → A nova marca pode demorar a aparecer; validar em aba anônima / hard refresh.
- **ICO mal formado** → Validar tamanho/*magic bytes* do arquivo gerado antes de commitar.

## Migration Plan

1. Criar `public/favicon.svg` a partir do mark dourado.
2. Gerar PNGs (16/32/48) e empacotar `public/favicon.ico`.
3. Atualizar `src/index.html` (links svg + ico).
4. `ng build` e conferir a aba em aba anônima.

**Rollback**: Restaurar o `public/favicon.ico` original (via git) e reverter o `index.html`.

## Open Questions

- O favicon deve ter fundo escuro arredondado (estilo "app icon") ou barras douradas sobre transparente? (Assumido: fundo escuro arredondado para contraste universal.)
