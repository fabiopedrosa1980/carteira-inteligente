## Why

Na aba "Meus Ativos" (tab `portfolio`), o cabeçalho de cada acordeão de tipo (Ações, FIIs, ETFs) mostra apenas o nome e a contagem. Falta uma visão rápida de quanto cada tipo vale e como está rendendo — hoje é preciso abrir o grupo e somar mentalmente. Mostrar **total e rentabilidade por tipo** no próprio cabeçalho dá leitura imediata da carteira.

## What Changes

- No cabeçalho de cada acordeão de tipo em "Meus Ativos", exibir:
  - **Total do tipo** — somatório do saldo (valor atual) das posições daquele tipo.
  - **Rentabilidade do tipo** — rentabilidade agregada do tipo (variação sobre o custo), com cor por sinal (positivo/negativo).
- Os valores aparecem mesmo com o acordeão **colapsado** (resumo no header).
- O cabeçalho deve permanecer legível no mobile (sem rolagem horizontal nem estouro).

## Capabilities

### New Capabilities
- `meus-ativos-rentabilidade-por-tipo`: Cabeçalho do acordeão por tipo em "Meus Ativos" exibe total e rentabilidade agregada do tipo.

### Modified Capabilities

## Impact

- `src/app/components/dashboard/dashboard.html` — `.ah-right` do acordeão de cada grupo ganha total + rentabilidade.
- `src/app/components/dashboard/dashboard.ts` — métodos agregados por grupo (`groupSaldo`, `groupRentabilidade`) usando os helpers de `position.util`.
- `src/app/components/dashboard/dashboard.scss` — estilos `.sec-total`/`.sec-rent` no header e ajuste responsivo.
- Sem mudanças de API ou modelo de dados.
