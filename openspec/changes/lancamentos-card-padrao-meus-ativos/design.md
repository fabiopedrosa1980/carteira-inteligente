## Context

O card mobile de Lançamentos (`my-assets.scss`, `.table-row` em `@media (max-width: 600px)`) hoje usa:

```scss
grid-template-columns: 1fr 1fr 1.15fr;
grid-template-areas:
  'ticker ticker qtd'
  'data   preco  total'
  'actions actions actions';
font-family: 'SF Mono', …, monospace;   // números em mono
border-radius: 12px;
```

O card de Meus Ativos (`dashboard.scss`, `tr.acoes-row` em `@media ≤640px`) usa grid de 2 colunas, `border-radius: 14px` e tipografia sans (sem mono). As células de ambos já têm micro-rótulos (`::before`) em caixa-alta.

## Goals / Non-Goals

**Goals:**
- Ticker sozinho na 1ª linha; demais campos 2 por linha (Data·Qtd, Preço·Total); ações no rodapé.
- Padronizar o idioma visual com Meus Ativos: raio 14px e tipografia sans nos valores.
- Manter micro-rótulos, alinhamento (texto à esquerda, números à direita) e Total em destaque.

**Non-Goals:**
- Não alterar o HTML (o arranjo é feito via `grid-template-areas`; as células já têm `grid-area`).
- Não mexer no desktop nem em outros componentes.
- Não alterar comportamento (edição, +, ordenação, paginação).

## Decisions

**1. Novo grid de 2 colunas com ticker em linha própria.**
```scss
grid-template-columns: 1fr 1fr;
grid-template-areas:
  'ticker ticker'
  'data   qtd'
  'preco  total'
  'actions actions';
```
Atende exatamente ao pedido (ticker na 1ª linha; demais 2 por linha). `qtd` e `total` mantêm `justify-self: end` (à direita); `data` e `preco` à esquerda.
- *Alternativa considerada*: manter 3 colunas como em parte do Meus Ativos. Rejeitada — o pedido é explícito por "2 por linha".

**2. Tipografia sans (remover override mono) + raio 14px.**
Remover o `font-family: monospace` do `.table-row` mobile para herdar a sans (igual a Meus Ativos) e mudar `border-radius` de 12px para 14px. Micro-rótulos permanecem (já são sans).
- *Alternativa considerada*: manter mono (mais "financeiro"). Rejeitada — o pedido é padronizar com Meus Ativos, que usa sans.

**3. Ajustes de alinhamento herdados.**
Remover o `align-self: center` que existia na `.qty-cell` (era para quando a Qtd dividia a linha do ticker); agora a Qtd é um campo normal da 2ª linha, alinhado como os demais (`align-items: end` da linha).

## Risks / Trade-offs

- [Trocar mono por sans muda o "peso" dos números] → é o objetivo (paridade com Meus Ativos); reversível.
- [Valores longos em coluna de 1fr] → manter `min-width: 0`/`overflow` já existentes nas células para truncar sem estourar (a tela já é coberta por "card contido, sem rolagem horizontal").
