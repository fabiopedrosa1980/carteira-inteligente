# Design

## Contexto

Hoje, no breakpoint mobile, as ações de tela colapsam para full-width empilhado:

- `goals.scss:356` — `.form-actions` vira `column-reverse`, `.btn { width: 100% }`
- `allocation-card.scss:53` — `.alloc-actions` vira `column`, `.alloc-btn { width: 100% }`
- `add-transaction-modal.scss:304` / `add-stock-modal.scss` — `.modal-footer` vira `column-reverse`, `.btn { width: 100% }`

No desktop, esses mesmos containers já são `display: flex` numa linha com `justify-content: flex-end` — ou seja, **a hierarquia lado a lado é o estado base**, e o mobile é que abandona a hierarquia ao empilhar. Portanto B1 é essencialmente "não colapsar para coluna no mobile; manter a linha, mas com pesos diferentes".

## Decisão A — Editar (Alocação) vira botão-ícone no cabeçalho

O gatilho de edição sai do rodapé (`.alloc-actions`) e vira um botão-ícone de lápis dentro de `.alloc-head`, alinhado à direita do bloco título+patrimônio.

- Reusa os tokens já existentes: `--icon-btn-size` (36px), `--icon-btn-radius`, `--icon-btn-icon`, e o tint azul suave `--btn-edit-fg` + `color-mix(... 12%/22% ...)` — o **mesmo tratamento** dos lápis das linhas de lista (Metas/Meus Ativos). Consistência total de idioma.
- `aria-label="Editar alocação"` (é icon-only).
- Em modo edição, o ícone do cabeçalho é ocultado (`*ngIf="!editing()"`); as ações Salvar/Cancelar aparecem no rodapé (`.alloc-actions`, visível só quando `editing()`).

**Escopo: todas as larguras.** Um layout só (menos CSS condicional) e o ícone-no-header também fica mais limpo no desktop, alinhado ao idioma das listas. A alternativa "só no mobile" foi considerada e descartada por criar dois layouts divergentes para manter (ver Alternativas).

## Decisão B1 — Cancelar/Salvar lado a lado com hierarquia (mobile)

No breakpoint mobile, em vez de empilhar full-width, o par fica na mesma linha:

- `Cancelar` — `.btn--ghost` / `.alloc-btn.ghost`, largura mínima pelo conteúdo (`flex: 0 0 auto`).
- Primário (`Salvar` / `Criar meta` / `Salvar Lançamento` / `Adicionar Lançamentos`) — `flex: 1`, ocupando a maior fatia da linha, **à direita**.
- Ambos `min-height: 44px` (alvo de toque HIG). Gap pela escala (`--space-2`).
- Ordem visual e no DOM: Cancelar à esquerda, primário à direita (alcance do polegar; primário como último foco de tab).

Aplica nos mesmos quatro containers, substituindo o `flex-direction: column`/`column-reverse` + `width: 100%` do bloco mobile.

## Decisão — Incluir/Adicionar seguem full-width

Os CTAs de empty state e de rodapé de seção em Meus Ativos ("Adicionar") **não mudam**: são a ação primária daquela seção, sem par de "Cancelar" concorrente, então o full-width é a hierarquia correta.

## Alternativas consideradas

| Alternativa | Por quê não |
|---|---|
| **A só no mobile** | Mantém o botão de texto "Editar" no desktop, criando dois layouts divergentes para o mesmo card. O ícone-no-header funciona bem em ambos. |
| **B2 — barra de ações sticky no rodapé dos modais** | Bom para "Salvar sempre visível", mas adiciona complexidade (`env(safe-area-inset-bottom)`, salto do teclado no iOS) sem ganho claro nos formulários curtos atuais. Pode ser um follow-up se algum formulário crescer. |
| **Cancelar como link de texto** | Alvo de toque menor que 44px e menos afordância de botão. Descartado por acessibilidade. |

## Riscos

- O tint suave do lápis precisa manter contraste do ícone ≥ 4.5:1 nos dois temas — já validado no change anterior de suavização dos botões (mesmos tokens).
- Em telas muito estreitas (≤320px), o par lado a lado com rótulos longos ("Adicionar Lançamentos") pode apertar; mitigar com `white-space: nowrap` no primário e deixar o ghost encolher primeiro (já é `flex: 0 0 auto`, então quem cede é o texto do ghost — avaliar reduzir o ghost a só ícone abaixo de 340px, se necessário na execução).
