## 1. Criar o ícone vetorial de marca

- [x] 1.1 Criar `public/favicon.svg` derivado do `brand-icon` do login (barras douradas `#C9A84C` + ponto no topo), com fundo escuro arredondado para contraste
- [x] 1.2 Conferir visualmente o SVG (render 128px) em fundo escuro — barras douradas + linha de tendência OK

## 2. Gerar o favicon.ico de fallback

- [x] 2.1 Rasterizar o `favicon.svg` em PNGs 16x16, 32x32 e 48x48 (via `sharp` em install temporário, sem dep permanente)
- [x] 2.2 Empacotar os PNGs em `public/favicon.ico` multi-resolução (via `png-to-ico`)
- [x] 2.3 Validar que `public/favicon.ico` foi substituído (MS Windows icon resource, 3 ícones 16/32/48)

## 3. Referenciar no index.html

- [x] 3.1 Em `src/index.html`, adicionar `<link rel="icon" type="image/svg+xml" href="favicon.svg">` como ícone primário
- [x] 3.2 Manter `<link rel="icon" type="image/x-icon" href="favicon.ico">` como fallback

## 4. Validar

- [x] 4.1 Rodar `ng build` sem erros (favicon.svg + favicon.ico presentes no dist e referenciados no index.html)
- [x] 4.2 Confirmado via build + render de preview; recomenda-se hard refresh/aba anônima para limpar cache do favicon antigo
