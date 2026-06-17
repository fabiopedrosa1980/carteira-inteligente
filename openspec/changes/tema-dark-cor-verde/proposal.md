## Why

O tema escuro usa azul (`#63b3ed`) como cor de destaque, enquanto o tema claro usa verde (`#1a7f4b`). Isso gera inconsistência visual de marca entre os dois temas. O usuário quer que o tema escuro use o mesmo verde do tema claro.

## What Changes

- Alterar a cor de destaque (`--accent`) do tema escuro de azul (`#63b3ed`) para o verde do tema claro.
- Ajustar as variáveis derivadas do destaque no tema escuro (`--btn-accent-hover`, `--shadow-hover` e, se necessário para legibilidade, `--btn-accent-text`) para acompanhar o verde.
- Substituir os valores de azul "hardcoded" (`#63b3ed` e `rgba(99,179,237,…)`) espalhados nos SCSS dos componentes por referências às variáveis de tema (`var(--accent)`, `var(--shadow-hover)` etc.), para que o destaque siga o tema corretamente.
- Remover o texto descritivo (`hint`) exibido sob cada tipo de ativo na tela Meus Ativos (ex.: "Ações de empresas negociadas na bolsa (ex.: PETR4, VALE3)"), simplificando o cabeçalho das seções.

## Capabilities

### New Capabilities
- `tema-cor-destaque`: define a cor de destaque consistente entre temas claro e escuro, usando variáveis de tema em vez de cores fixas.
- `meus-ativos-secoes`: apresentação dos cabeçalhos das seções de tipos de ativo na tela Meus Ativos (sem o texto descritivo).

### Modified Capabilities
<!-- Nenhuma capability existente tem requisitos alterados. -->

## Impact

- `src/styles.scss`: variáveis de destaque do tema escuro (`:root`).
- SCSS de componentes com azul fixo: `dashboard`, `my-assets`, `dividend-calendar`, `add-transaction-modal`.
- `my-assets`: remoção do campo `hint` em `my-assets.ts`, do elemento de descrição em `my-assets.html` e do estilo `.sec-hint` em `my-assets.scss`.
- Apenas mudança visual; sem alteração de comportamento, dados ou API.
