## Why

A aba do navegador ainda exibe o favicon padrão do Angular (`public/favicon.ico`), o que destoa da identidade visual do produto — especialmente agora que o app passa a rodar no domínio próprio `carteira-inteligente.com`. O projeto já tem uma marca consolidada: as barras douradas ascendentes (`#C9A84C`) usadas no header (`dashboard.html`) e na tela de login (`login.html`). O favicon deve refletir essa marca.

## What Changes

- Substituir o favicon padrão do Angular por um ícone baseado na marca do projeto (barras douradas ascendentes sobre fundo escuro).
- Adicionar um `favicon.svg` (vetorial, nítido em qualquer resolução) como ícone primário.
- Gerar um `favicon.ico` multi-resolução (16/32/48) como fallback para navegadores/abas que requisitam `.ico`.
- Atualizar as referências de ícone em `src/index.html` para apontar para os novos arquivos.

## Capabilities

### New Capabilities
- `app-favicon`: Define o ícone de marca exibido na aba do navegador e em atalhos, alinhado à identidade visual (barras douradas) do produto.

### Modified Capabilities
<!-- Nenhuma capability de comportamento existente é alterada. -->

## Impact

- **Arquivos**: `public/favicon.svg` (novo), `public/favicon.ico` (substituído), `src/index.html` (links de ícone).
- **Build/Tooling**: Não há ferramenta de imagem instalada (ImageMagick/rsvg/sharp ausentes); a geração do `.ico` exigirá uma ferramenta pontual (ex.: `npx sharp` + `png-to-ico`).
- **Usuário final**: Aba do navegador passa a exibir a marca do projeto em vez do logo do Angular.
- **Sem impacto** em lógica de negócio, APIs ou estado.
