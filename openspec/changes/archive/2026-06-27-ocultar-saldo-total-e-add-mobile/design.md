## Context

O estado global de privacidade é o `ValueVisibilityService.hidden` (signal, persistido em localStorage), exposto no Dashboard como `valoresOcultos()` e passado aos componentes via `[hideValues]`. O mascaramento é puramente CSS: classes `.values-hidden` aplicam `filter: blur(...)` aos elementos-alvo.

Estado atual do mascaramento:
- `dashboard.scss`: `.sections-list.values-hidden .sec-total` e `.portfolio-summary.values-hidden .ps-card-value` (apenas totais de seção e cards de resumo). O `td` de **Saldo** da tabela "Meus Ativos" (`dashboard.html:541`) não tem classe e **não** é mascarado.
- `my-assets.scss`: `.meus-ativos.values-hidden { .ma-summary-val, .sec-total }` (cabeçalho + total de seção). O `.total-cell` por linha **não** é mascarado.

Estado atual do botão adicionar em Lançamentos (mobile):
- `.add-row` (rodapé "Adicionar") está `display:none` no mobile (`my-assets.scss:278`).
- `.btn-add-card` ("+" por card) está `display:none` no desktop e `inline-flex` no mobile (`my-assets.scss:552`), renderizado em `my-assets.html:134-148` dentro do `.action-cell`.

## Goals / Non-Goals

**Goals:**
- Mascarar, sob privacidade ativa, o **Saldo por ativo** (Dashboard) e o **Total da operação por lançamento** (Lançamentos), desktop e mobile.
- No mobile de Lançamentos: mostrar "Adicionar" no rodapé da seção e remover o "+" por card.

**Non-Goals:**
- Mascarar preços por linha (Preço Médio/Atual/Unit.) ou a Variação em R$ — fora do escopo confirmado.
- Alterar o botão "+" do cabeçalho de seção (se/onde existir) — escopo é o "+" por card.
- Mudar lógica de serviços/estado.

## Decisions

### Decisão 1: Mascarar por CSS, adicionando classe ao `td` de Saldo
- **Escolha**: Adicionar `class="cell-saldo"` ao `td` de Saldo em `dashboard.html` e a regra `.sections-list.values-hidden .cell-saldo { filter: blur(7px); ... }`. Para Lançamentos, adicionar `.meus-ativos.values-hidden .total-cell` ao bloco existente.
- **Alternativa**: Usar `nth-child` para mirar a coluna. Rejeitada por ser frágil (a coluna Oportunidade existe só para não-ETF, deslocando índices).
- **Rationale**: Classe explícita é robusta a mudanças de colunas e consistente com o padrão atual de blur.

### Decisão 2: Reusar o blur existente (mesma intensidade)
- **Escolha**: `filter: blur(7px)` + `user-select:none; pointer-events:none`, igual aos demais valores mascarados.
- **Rationale**: Consistência visual com o que já existe.

### Decisão 3: Mobile add = mostrar `.add-row`, remover `.btn-add-card`
- **Escolha**: Remover o bloco `btn-add-card` do `my-assets.html`; no `my-assets.scss`, tornar `.add-row` visível no mobile (remover o `display:none`) e remover as regras do `.btn-add-card`.
- **Rationale**: O footer "Adicionar" já existe e tem o comportamento desejado (`openAdd(type)`); basta exibi-lo no mobile. Remove duplicidade.

## Risks / Trade-offs

- **Drift de specs**: `lancamentos-mobile-grid`/`lancamentos-botao-adicionar-secao` mencionam um "+" no cabeçalho da seção que não corresponde ao "+" por card atual. → O delta foca no comportamento real (remover "+" por card; "Adicionar" no rodapé no mobile); não toca o "+" de cabeçalho.
- **Largura da `.action-cell` (72px) no mobile** com 2 botões em vez de 3 → revisar alinhamento; provavelmente folga maior, sem quebra.
- **Cache do localStorage** não afeta CSS; sem risco de migração.

## Migration Plan

1. Dashboard: classe `cell-saldo` + regra de blur.
2. Lançamentos: blur do `.total-cell`; exibir `.add-row` no mobile; remover `btn-add-card` (HTML + SCSS).
3. `ng build` e validar visualmente em ≤600px e desktop, com privacidade on/off.

**Rollback**: Reverter o commit (mudanças isoladas em 2 componentes).
