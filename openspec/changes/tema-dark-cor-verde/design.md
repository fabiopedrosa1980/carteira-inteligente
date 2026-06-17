## Context

As cores de tema vivem em `src/styles.scss` como variáveis CSS, definidas em dois blocos: `:root` (tema escuro, padrão) e `body.light-theme` (tema claro). O tema escuro usa azul como destaque; o claro usa verde:

| Variável | Escuro (atual) | Claro |
| --- | --- | --- |
| `--accent` | `#63b3ed` | `#1a7f4b` |
| `--btn-accent-text` | `#0d1117` | `#ffffff` |
| `--btn-accent-hover` | `#90cdf4` | `#1f9d5e` |
| `--shadow-hover` | `rgba(99,179,237,0.15)` | `rgba(26,127,75,0.15)` |

Além das variáveis, há azul "hardcoded" (`#63b3ed` e `rgba(99,179,237,…)`) em SCSS de componentes (`dashboard`, `my-assets`, `dividend-calendar`, `add-transaction-modal`). Esses valores fixos não acompanham o tema e precisam ser trocados por variáveis.

Separadamente, a tela Meus Ativos exibe um texto descritivo (`hint`) sob o título de cada seção de tipo de ativo, que o usuário quer remover.

## Goals / Non-Goals

**Goals:**
- Tema escuro com a mesma cor de destaque verde do tema claro.
- Destaque dirigido por variáveis de tema, sem azul fixo nos componentes.
- Remover o texto descritivo das seções de Meus Ativos.

**Non-Goals:**
- Redesenhar a paleta (apenas trocar o destaque do escuro para o verde do claro).
- Alterar tokens semânticos não relacionados ao destaque (`--color-pos`, `--color-neg`, `--color-warning`).
- Qualquer mudança de comportamento, dados ou API.

## Decisions

### 1. Igualar as variáveis de destaque do tema escuro ao verde do claro
No bloco `:root`, definir `--accent: #1a7f4b`, `--btn-accent-hover: #1f9d5e`, `--shadow-hover: rgba(26,127,75,0.15)`. Também ajustar `--btn-accent-text` para `#ffffff` no escuro, pois o valor atual (`#0d1117`, quase preto) teria contraste ruim sobre o verde escuro — espelhando o que o tema claro já faz.
- *Alternativa considerada*: gerar um verde mais claro só para o escuro. Rejeitada: o pedido é usar **o mesmo** verde do tema claro.

### 2. Converter azul fixo em variáveis de tema
Substituir `#63b3ed` por `var(--accent)` e `rgba(99,179,237,α)` por um realce derivado do verde. Onde houver opacidade, usar `var(--shadow-hover)` quando o alfa for ~0.15, ou um `rgba` verde equivalente (`rgba(26,127,75,α)`) para manter a intensidade. Isso também corrige resíduos de azul que apareciam no tema claro.
- *Alternativa considerada*: adicionar novas variáveis de realce com alfa (ex.: `--accent-soft`). Possível melhoria futura, mas fora do escopo mínimo; usar `rgba` verde direto mantém a mudança pequena.

### 3. Remover o `hint` das seções de Meus Ativos
Remover o campo `hint` do array `sections` em `my-assets.ts`, o elemento `.sec-hint` em `my-assets.html` e a regra `.sec-hint` em `my-assets.scss`. O agrupamento de título + contagem (`.sec-titles`/`.sec-label-row`) pode ser simplificado de volta, mas manter o wrapper não causa problema — a decisão é remover apenas o texto descritivo.

## Risks / Trade-offs

- [Verde escuro do tema claro (`#1a7f4b`) pode ter contraste menor sobre o fundo escuro `#0d1117` que o azul anterior] → Mitigado mantendo texto branco nos botões (`--btn-accent-text: #ffffff`) e usando o hover mais claro `#1f9d5e`. É o trade-off explícito do pedido (mesma cor).
- [Algum azul fixo não mapeado ficar para trás] → Mitigado por busca por `#63b3ed`/`99,179,237` antes de concluir.

## Migration Plan

1. Atualizar variáveis em `styles.scss`.
2. Trocar azul fixo por variáveis nos componentes.
3. Remover `hint` em Meus Ativos.
4. `ng build` e inspeção visual nos dois temas.
5. Rollback: reverter o commit; mudança puramente estática.

## Open Questions

- Nenhuma. O pedido define a cor-alvo (verde do tema claro).
