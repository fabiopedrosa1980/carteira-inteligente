## Context

A aba "Meus Ativos" (`portfolio`) agrupa as ações por tipo em acordeões (`groups = ['Ações','FII','ETF']`). O cabeçalho (`.accordion-header`) tem `.ah-left` (label + `.sec-count`) e `.ah-right` (só o `.chevron`). As posições por grupo vêm de `stocksForGroup(g)`. Os helpers de `position.util` calculam por ativo: `saldo` (qty×preço atual), `custo` (qty×preço médio), `rentabilidade` (% por ativo) — todos com guarda `null`.

A aba "Lançamentos" já tem um padrão de `.sec-total` no header do acordeão, que podemos espelhar visualmente.

## Goals / Non-Goals

**Goals:**
- Mostrar total (saldo) e rentabilidade agregada por tipo no cabeçalho do acordeão.
- Rentabilidade agregada correta (por custo total), não média de percentuais.
- Header legível no mobile.

**Non-Goals:**
- Não alterar a tabela/cards internos do grupo.
- Não mudar API/modelo.
- Não tocar na aba Lançamentos.

## Decisions

- **Agregação em `dashboard.ts`** (novos métodos):
  ```ts
  groupSaldo(g: string): number {
    return this.stocksForGroup(g).reduce((s, st) => s + (saldo(st) ?? 0), 0);
  }
  private groupCusto(g: string): number {
    return this.stocksForGroup(g).reduce((s, st) => s + (custo(st) ?? 0), 0);
  }
  groupRentabilidade(g: string): number | null {
    const c = this.groupCusto(g);
    if (c <= 0) return null;
    return ((this.groupSaldo(g) - c) / c) * 100;
  }
  ```
  `saldo`/`custo` já estão importados no componente. Rentabilidade agregada = (saldoTotal − custoTotal) / custoTotal × 100.
- **HTML** (`.ah-right`, antes do chevron):
  - `.sec-total` → `R$ {{ groupSaldo(group) | number:'1.2-2' }}` (exibe quando `groupSaldo(group) > 0`).
  - `.sec-rent` → `±{{ |rent| | number:'1.1-1' }}%` com `[class.pos]/[class.neg]`, exibido quando `groupRentabilidade(group) !== null`. Reutiliza `abs()` já existente.
- **SCSS**: adicionar `.sec-total` (peso/again accent discreto, mono opcional) e `.sec-rent` (cor por sinal via `.pos`/`.neg`). Ajuste responsivo: em ≤600px reduzir `font-size`/`gap` do `.ah-right`; se necessário, ocultar `.sec-count` no mobile para dar espaço a total+rent. Header continua `justify-content: space-between` (ah-left | ah-right) — sem rolagem horizontal.

## Risks / Trade-offs

- ETFs podem ter `saldo` mas `custo`/preço médio ausente em alguns casos → rentabilidade `null` (não exibida). Total ainda aparece.
- Espaço no mobile: label + count + total + rent + chevron pode apertar. Mitigação: ocultar `.sec-count` no mobile e usar fonte compacta. Validar visualmente.
- Rentabilidade agregada por custo pode divergir da média visual das linhas — é o comportamento correto e intencional (documentado no spec).
