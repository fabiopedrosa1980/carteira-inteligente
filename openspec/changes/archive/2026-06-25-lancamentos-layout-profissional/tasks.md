## 1. Cabeçalho com faixa de resumo

- [x] 1.1 Em `my-assets.html`, reestruturar `.page-header`: título "Lançamentos" + contagem como meta discreta à esquerda; bloco de **Total investido** (legenda + valor em destaque) ligado a `totalAll()`; "Limpar tudo" à direita.
- [x] 1.2 Em `my-assets.scss`, estilizar a faixa de resumo: total como figura de destaque com `font-variant-numeric: tabular-nums`, legenda em caixa-alta discreta, e rebaixar `.btn-clear-all` (ghost discreto) para não competir com título/total.
- [x] 1.3 Garantir que, sem lançamentos, "Limpar tudo" não aparece e a faixa não destaca total > 0 (reaproveitar `*ngIf` existente em `svc.transactions().length`).
- [x] 1.4 Conferir o cabeçalho no mobile (≤600px): empilhar título/total/ação sem corte e mantendo o ritmo.

## 2. Alinhamento numérico da tabela (desktop)

- [x] 2.1 Em `my-assets.scss`, alinhar à direita as colunas numéricas (Qtd., Preço Unit., Total) no `.table-header` e na `.table-row`, com `tabular-nums`; manter Ativo e Data à esquerda; Operação à direita.
- [x] 2.2 Ajustar os cabeçalhos clicáveis (`.th-sort`) das colunas numéricas para alinhar título + seta de ordenação à direita (`justify-content: flex-end`), preservando a área de clique/hover.
- [x] 2.3 Confirmar que o alinhamento à direita não afeta o card mobile (regras dentro de `@media (max-width: 600px)` continuam mandando no card).

## 3. Ritmo de espaçamento consistente

- [x] 3.1 Em `my-assets.scss`, unificar o padding horizontal de `.table-header`, `.table-row`, `.add-row` e `.ma-pagination` com as bordas do card de seção (mesmo passo).
- [x] 3.2 Padronizar o gap entre seções (`.sections-list`) e o respiro interno do cabeçalho de seção; centralizar valores em variáveis SCSS locais para evitar divergência.

## 4. Cabeçalho de seção como linha-resumo

- [x] 4.1 Refinar `.accordion-header`/`.ah-right` para que rótulo + badge fiquem à esquerda e a métrica "Total" (legenda sobre valor, `tabular-nums`, à direita) anteceda o chevron de forma alinhada.
- [x] 4.2 Ajustar o badge de contagem (`.sec-count`) e a legenda (`.sec-cap`) para leitura coerente e alinhamento vertical com o valor.

## 5. Estado vazio por seção

- [x] 5.1 Em `my-assets.html`, substituir `.empty-msg` por um bloco de estado vazio centrado (ícone + título curto + CTA "Adicionar") quando `!svc.loading()` e a seção está vazia; o CTA chama `openAdd(sec.id)`.
- [x] 5.2 Quando a seção está vazia, suprimir o rodapé "Adicionar" duplicado (o CTA do vazio assume); manter o rodapé quando há linhas.
- [x] 5.3 Em `my-assets.scss`, estilizar o estado vazio seguindo o idioma de vazio do app (ícone com `--accent`, texto secundário), responsivo.

## 6. Validação

- [x] 6.1 `npx prettier --write` nos arquivos alterados.
- [x] 6.2 `ng build` sem erros (avisos de budget pré-existentes são aceitáveis).
- [x] 6.3 Revisão visual desktop: total em destaque no cabeçalho; colunas numéricas à direita e alinhadas; espaçamentos uniformes; cabeçalho de seção coerente; estado vazio com CTA.
- [x] 6.4 Revisão visual mobile (≤600px): card de lançamento inalterado; cabeçalho empilhado sem corte; estado vazio legível.
