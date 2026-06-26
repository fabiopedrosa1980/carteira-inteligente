## Context

No `dashboard.scss`, dentro do bloco mobile (`@media (max-width: 640px)`) da `.acoes-list`, o Saldo é estilizado como número-herói:

```scss
// 3) Saldo — número-herói do card.
td:nth-child(6) {
  grid-area: saldo;
  font-size: 23px;   // <- maior que o ticker
  font-weight: 700;
  line-height: 1.1;
}
```

O ticker (`.cell-ativo`) no mesmo bloco usa `font-size: 16px; font-weight: 700;`.

## Goals / Non-Goals

**Goals:**
- Igualar a fonte do Saldo à do ticker (16px) no card mobile.

**Non-Goals:**
- Não alterar peso, grid, rótulos (`::before`) ou demais campos do card.
- Não tocar no desktop nem em outros componentes.

## Decisions

**1. Trocar `font-size: 23px` por `16px` no `td:nth-child(6)`.**
Casar com o valor do ticker. Manter `font-weight: 700` e `line-height: 1.1`. O comentário "número-herói" é atualizado para refletir o novo tamanho.
- *Alternativa considerada*: referenciar uma variável compartilhada de tamanho. Rejeitada — os dois valores são literais no mesmo bloco; uma variável para um único par seria overhead sem ganho.

## Risks / Trade-offs

- [Saldo perde o destaque de "herói"] → é exatamente o pedido; a hierarquia passa a ser equilibrada entre ticker e Saldo. Reversível em um valor.
