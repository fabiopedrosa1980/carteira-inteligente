## Context

São três ajustes visuais isolados, sem mudança de lógica ou de dados:

1. **Radar — estado vazio**: hoje em `dividends-radar.html:102` o vazio é `<p class="radar-empty">Nenhum ativo com proventos no período.</p>`, estilizado em `dividends-radar.scss:11` apenas como texto secundário. As telas de dividendos já têm um padrão consolidado (`.ds-no-data` em `dividends-summary` e `.dh-no-data` em `dividend-history`): contêiner flex centralizado com ícone (accent), título (texto primário) e texto descritivo.
2. **Card Meus Ativos (mobile)**: o layout em card aparece em `dashboard.scss` no bloco `@media (max-width: 640px)` da `.acoes-list`. O grid (`grid-template-areas`) é:
   ```
   'ticker hoje'
   'saldo  saldo'
   'rent   var'
   'preco  patual'
   'qtd    qtd'
   ```
   - A "Variação hoje" (`td:nth-child(5)`) é renderizada como pílula com `background` colorido (`color-mix`), destacando-se dos demais campos.
   - A quantidade (`td:nth-child(2)`, área `qtd`) ocupa uma linha inteira isolada no fim do card, gerando espaço em branco ocioso.
3. **Resumo — ícone Patrimônio Total**: `.ps-card-icon` mede 30×30 (svg 16×16); o override `.ps-card-hero .ps-card-icon` (`dashboard.scss:839`) o aumenta para 38×38 (svg 20×20), destoando dos demais cards.

## Goals / Non-Goals

**Goals:**
- Estado vazio do Radar no mesmo padrão visual das telas de dividendos.
- Card de ativo no mobile sem realce de fundo na "Variação hoje" e com a quantidade acima da variação, sem espaço em branco ocioso.
- Ícone do Patrimônio Total com o mesmo tamanho dos demais cards de resumo.

**Non-Goals:**
- Não alterar lógica, modelos, ordenação ou os dados exibidos.
- Não mexer no layout desktop da tabela de ativos.
- Não alterar o destaque do valor (número-herói) do Patrimônio Total.

## Decisions

- **Radar reutiliza o padrão `*-no-data`**: criar markup com ícone + título + texto e classes próprias do Radar (ex.: `.radar-no-data`, `.radar-no-data-icon`, `.radar-no-data-title`, `.radar-no-data-text`) espelhando os valores de `.ds-no-data`. Optou-se por classes próprias (em vez de reaproveitar `.ds-*`) para manter o escopo de estilo no componente do Radar, evitando acoplamento entre componentes. O ícone reaproveita o glifo de calendário usado nas telas de dividendos, coerente com a natureza do Radar.
- **Variação hoje sem fundo**: remover `background` (estados base, `.pos` e `.neg`) do `td:nth-child(5)`, mantendo apenas a cor do texto por sinal. Mantém-se a leitura de alta/queda sem o realce de pílula.
- **Reorganizar o grid do card**: redesenhar `grid-template-areas` para posicionar `qtd` acima de `var`, eliminando a linha `'qtd qtd'` de largura inteira. Para **não perder nenhum campo** (o card tem 8 campos: ticker, hoje, saldo, preço atual, preço médio, qtd, variação, rentabilidade), o `saldo` deixa de ocupar a linha inteira e passa a dividir a linha com o `Preço atual`, mantendo o destaque pelo tamanho da fonte. Layout adotado:
  ```
  'ticker hoje'
  'saldo  patual'
  'preco  qtd'
  'rent   var'
  ```
  Assim a quantidade fica imediatamente acima da variação (mesma coluna), o card não tem mais a linha solta nem espaço em branco, e todos os campos são preservados. Os nomes das áreas são reaproveitados, então só o mapa `grid-template-areas` muda; o `qtd` ganha `justify-self: end` para alinhar à direita junto da coluna de variação.
- **Ícone do Patrimônio coerente**: remover o override `.ps-card-hero .ps-card-icon` para o ícone herdar o tamanho padrão (30×30 / svg 16×16). O destaque do card permanece via `.ps-card-hero .ps-card-value` (tamanho do valor), inalterado.

## Risks / Trade-offs

- [Reordenar `grid-template-areas` pode desalinhar campos se um `td:nth-child` mudar de área sem ajustar o seletor correspondente] → Mapear cada `nth-child` à nova área e validar visualmente no breakpoint ≤640px.
- [Remover o fundo da "Variação hoje" reduz a ênfase visual do momentum do dia] → É exatamente o pedido; a cor por sinal preserva a leitura de alta/queda.
- [Classes próprias no Radar duplicam regras de estilo já existentes nas telas de dividendos] → Duplicação mínima e intencional para manter o estilo encapsulado por componente.

## Open Questions

Nenhuma.
