## Context

Dois ajustes na aba "Meus Ativos" (tab `portfolio` em `dashboard.html`/`dashboard.scss`), sem mudança de lógica ou dados:

1. **Cabeçalho do acordeão**: em `dashboard.html` (~linhas 337–347), o bloco `ah-right` exibe dois `sec-metric` — Total (`groupSaldo`) e Rent. (`sec-rent` / `groupRentabilidade`) — além do chevron. A rentabilidade do tipo deve sair do cabeçalho.
2. **Card de ativo (mobile)**: em `dashboard.scss`, no `@media (max-width: 640px)` da `.acoes-list`, o `grid-template-areas` da `.acoes-row` está:
   ```
   'ticker hoje'
   'saldo  qtd'
   'preco  patual'
   'rent   var'
   ```
   `hoje` (Variação hoje, `td:nth-child(5)`) ocupa o topo direito; `rent` (Rentabilidade, `td:nth-child(8)`) o rodapé esquerdo. Os campos usam grid-areas nomeadas atribuídas via `td:nth-child(...)`, com alinhamentos próprios (`hoje`: `justify-self:end`, `align-self:center`, `text-align:right`; `rent`: alinhado à esquerda; `var`: `justify-self:end`).

## Goals / Non-Goals

**Goals:**
- Remover a rentabilidade do cabeçalho do acordeão, mantendo apenas o Total.
- No card mobile, colocar a rentabilidade no topo e a "Variação hoje" na mesma linha da "Variação".

**Non-Goals:**
- Não remover a rentabilidade por ativo da lista/tabela (ela permanece).
- Não alterar o cálculo de rentabilidade nem o método `groupRentabilidade` (mantido para uso futuro/eventual).
- Não mexer no layout desktop da tabela além do cabeçalho do acordeão.

## Decisions

- **Remover `sec-rent` do cabeçalho**: excluir o `<span class="sec-metric" *ngIf="groupRentabilidade(group) !== null">…</span>` (Rent.) em `dashboard.html`, mantendo o `sec-metric` do Total e o chevron. O método `groupRentabilidade` permanece no componente (sem uso no template do cabeçalho), evitando remoções de lógica desnecessárias. Alternativa descartada: remover também o método — fora do escopo e arriscado.
- **Trocar `hoje` ↔ `rent` no grid**: alterar o `grid-template-areas` para:
  ```
  'ticker rent'
  'saldo  qtd'
  'preco  patual'
  'hoje   var'
  ```
  Como os campos travam pela área nomeada, a troca posiciona a rentabilidade no topo direito e a "Variação hoje" no rodapé esquerdo (na mesma linha da "Variação").
- **Ajustar alinhamentos às novas posições**: a área move, mas o alinhamento dos blocos precisa acompanhar a posição:
  - `rent` (`td:nth-child(8)`) no topo direito → `justify-self: end`, `text-align: right`, `align-self: center` (acompanhando o ticker).
  - `hoje` (`td:nth-child(5)`) no rodapé esquerdo → `justify-self: start`, `text-align: left`, remover `align-self: center` (passa a alinhar como os demais campos da base).
  - `var` permanece à direita; ambos `hoje` e `var` ficam na linha inferior, lado a lado.

## Risks / Trade-offs

- [Mover `hoje`/`rent` sem ajustar alinhamento deixaria os rótulos desalinhados na nova posição] → Ajustar `justify-self`/`text-align`/`align-self` conforme a nova coluna/linha; validar visualmente em ≤640px.
- [Manter `groupRentabilidade` sem uso no cabeçalho deixa código "morto" no template] → O método continua útil/cohente com o domínio; remoção fica fora do escopo para minimizar risco.

## Open Questions

Nenhuma.
