## Context

A tabela agrupada (`.transactions-table.grouped`) usa CSS grid (`1.4fr repeat(3,1fr) 0.7fr`) tanto no desktop quanto no mobile — 5 colunas (Ativo · Qtd · Preço médio · Total · Lanç.). As células têm classes fixas: `.ticker-cell`, `.qty-cell`, `.price-cell`, `.total-cell`, `.count-cell`. Não há estilo de container próprio; cada `.table-row` tem `border-bottom`. O app suporta tema claro via `body.light-theme` (tokens `--card-bg`, `--border`, `--text-*`).

## Goals / Non-Goals

**Goals:**
- Mobile (≤600px): cards empilhados por ativo, rótulo: valor, legível.
- Fonte maior no mobile.
- Boa leitura no tema claro (e escuro).

**Non-Goals:**
- Mudar HTML/TS (CSS-only) ou o modo detalhado.
- Criar um novo tema (o claro já existe).

## Decisions

**1. Rótulos via `::before` (sem mudar markup).** Como as classes de célula são fixas, os rótulos do mobile vêm de `content` no `::before` de cada célula — zero mudança de HTML.

**2. Card empilhado (≤600px), escopo `.transactions-table.grouped`.**
- Ocultar `.table-header`.
- `.table-row` vira card: `display: block`, `border: 1px solid var(--border)`, `border-radius: 12px`, `background: var(--card-bg)`, `margin-bottom: 8px`, `padding: 14px 16px`. Remover o `border-bottom` plano.
- `.ticker-cell`: bloco no topo, separador inferior (`border-bottom`), `margin-bottom`; `.ticker-badge` maior (~15px).
- `.qty-cell/.price-cell/.total-cell/.count-cell`: `display: flex; justify-content: space-between; align-items: baseline; padding: 4px 0`. `::before` com o rótulo (Quantidade / Preço médio / Total / Lançamentos), em `--text-secondary`, uppercase, menor; o **valor** maior e à direita.

**3. Fonte maior.** Base do card ~14px (vs 12px hoje); valores ~15px; ticker ~15–16px. Mantém hierarquia.

**4. Tema claro.** Tudo via tokens, então o claro/escuro adapta. Card com `--card-bg` + borda `--border` garante separação no claro (onde o fundo é branco). Validar contraste do `--text-secondary` para os rótulos.

## Risks / Trade-offs

- [`::before` e acessibilidade] rótulos visuais via pseudo-elemento não são lidos por todos os leitores de tela; aceitável (a tabela já é visual; valores têm contexto). Alternativa futura: rótulos reais condicionais.
- [Total > tela] valores longos quebram; `justify-content: space-between` com `gap` evita sobreposição.
