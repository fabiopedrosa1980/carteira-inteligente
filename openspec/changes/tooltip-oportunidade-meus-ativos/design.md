## Context

A tabela de Meus Ativos vive em `DashboardComponent` (`dashboard.html`/`.ts`/`.scss`). A célula `cell-oportunidade` renderiza `oportunidadeBadge(stock)`, que internamente chama `precoTetoOf(stock)` — método que já devolve um `PrecoTetoResult` completo (zona, dpa12m, yieldAlvo, teto, precoJusto, descontoPct, pvpSinal). A tela de detalhe (`StockDetailsModalComponent`) consome esse mesmo `PrecoTetoResult` e o renderiza na seção "Preço-teto", usando os helpers `zonaLabel`, `descontoLabel`, `pvpLabel` e o pipe `number`.

Ou seja, todos os dados necessários para o tooltip já estão disponíveis no Dashboard sem nenhuma nova consulta. O trabalho é de UI: exibir o mesmo recorte de informação num popover acionado por hover.

## Goals / Non-Goals

**Goals:**
- Exibir, no hover do indicador de oportunidade, o detalhamento de preço-teto idêntico ao da tela de detalhe.
- Reaproveitar `precoTetoOf` e a mesma formatação, evitando divergência de valores entre tooltip e detalhe.
- Preservar o clique que abre o detalhe.

**Non-Goals:**
- Alterar o cálculo de preço-teto (`preco-teto.util.ts`) ou a tela de detalhe.
- Tooltip de toque/tap dedicado para mobile (o clique abre o detalhe, que já cobre o caso); foco é hover em desktop.
- Tornar o tooltip interativo/clicável (é somente leitura).

## Decisions

- **CSS hover puro, ancorado na célula.** O tooltip é um elemento posicionado de forma absoluta dentro de `.cell-oportunidade` (que recebe `position: relative`) e revelado via `:hover`/`:focus-within`. Evita estado em TypeScript e listeners de mouse, seguindo o padrão de tooltips já usado no projeto (atributo `title` e `[title]` nos indicadores). Alternativa considerada: estado `signal` com `(mouseenter)/(mouseleave)` — rejeitada por adicionar complexidade sem ganho, já que o conteúdo é estático por linha.
- **Reuso de `precoTetoOf(stock)` no template.** O markup do tooltip lê o resultado uma vez por linha (via `@let t = precoTetoOf(stock)` no bloco `@for`) e renderiza os campos. Garante paridade de valores com o badge e com o detalhe.
- **Escopo fixo de cinco campos com rótulo.** O tooltip exibe exatamente Yield-alvo, Preço-teto, Preço justo, DPA (12m) e Preço atual vs teto, cada um como par rótulo+valor. Veredito de zona e P/VP ficam de fora (continuam disponíveis na tela de detalhe). Isso simplifica o markup e dispensa o helper `zonaLabel` no tooltip.
- **Helpers de rótulo compartilhados.** Reaproveitar `descontoLabel` para "Preço atual vs teto" (mesma formatação de sinal/percentual da tela de detalhe). Decisão: adicionar um método fino no `DashboardComponent` espelhando esse helper, mantendo o componente standalone sem nova dependência. Os demais valores usam o pipe `number` direto no template. Alternativa: extrair util compartilhado — adiada para não ampliar o escopo.
- **Markup espelhando a seção "Preço-teto".** Mesma estrutura de "indicator grid" (label + value) usada no detalhe, para consistência visual, restrita aos cinco campos e omitida nos estados `sem-dados`/`na`.

## Risks / Trade-offs

- [Tooltip cortado pela borda da tabela/overflow] → posicionar com folga e revisar `overflow` do contêiner da tabela; se necessário, abrir o tooltip acima/à esquerda em colunas próximas da borda.
- [Hover indisponível em telas de toque] → não é regressão: o clique na linha continua abrindo o detalhe completo, que é a fonte canônica em mobile.
- [Divergência futura entre rótulos do tooltip e do detalhe] → mitigado preferindo, num passo futuro, extrair os rótulos para um util único; por ora os mapas são idênticos e pequenos.

## Open Questions

- Nenhuma bloqueante. Extração de um util de rótulos compartilhado pode ser feita depois como refactor, sem impacto neste comportamento.
