## Why

Após profissionalizar a barra superior (ícones SVG, sem emojis), as **tabelas editáveis** (lançamentos em Meus Ativos e lista de Metas) ainda usam emojis nas ações — ✏️ editar, 🗑️ excluir — e ícones de seção 🏢/🌐. Além disso, as listas usam tons de verde/vermelho **hardcoded** (`rgba(26,127,75,…)`, `rgba(207,34,46,…)`, `rgba(252,129,129,…)`) que não acompanham os tokens de tema, gerando incoerência entre claro/escuro. É preciso aplicar o mesmo padrão profissional (ícones SVG) e padronizar as cores pelos tokens.

## What Changes

- Substituir os ícones emoji das ações das tabelas editáveis (✏️ editar, 🗑️ excluir) por **ícones SVG de traço** consistentes, em Meus Ativos e Metas.
- Substituir os ícones de seção 🏢 (FIIs) e 🌐 (ETFs) do acordeão de Meus Ativos por **ícones SVG de traço** (Ações permanece sem ícone, como já definido).
- Adicionar ícone SVG de "+" nos botões de adicionar (Adicionar Lançamento/Adicionar/Nova Meta) para acabamento consistente.
- **Padronizar as cores das listas** pelos tokens semânticos: trocar `rgba(...)` hardcoded por `color-mix(in srgb, var(--accent)/var(--color-neg) X%, transparent)`, para que badges, totais, hovers e botões usem o verde/vermelho do tema em ambos os modos.

## Capabilities

### New Capabilities
- `editable-tables-chrome`: aparência profissional das tabelas editáveis (ícones SVG e cores padronizadas).

### Modified Capabilities
<!-- Nenhuma capability de requisito existente é alterada. -->

## Impact

**Frontend (este repo):**
- `src/app/components/my-assets/my-assets.{html,ts,scss}` — ícones SVG das ações e seções; cores via tokens.
- `src/app/components/goals/goals.{html,scss}` — ícones SVG das ações; cores via tokens.
