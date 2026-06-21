## Why

O cabeçalho do acordeão por tipo em "Meus Ativos" não segue o mesmo padrão visual do acordeão de "Lançamentos": o total usa `R$ <número>` (em vez do formato de moeda usado em Lançamentos) e em cor neutra, e a contagem de ativos do tipo é **ocultada no mobile**. O espaçamento entre os valores do header (total e rentabilidade) também ficou inconsistente. Padronizar deixa as duas telas coerentes e mais legíveis.

## What Changes

- Alinhar o cabeçalho do acordeão de "Meus Ativos" ao **mesmo padrão do acordeão de "Lançamentos"**: total formatado como **moeda (BRL)** e na cor de destaque (accent), contagem do tipo como **badge ao lado do nome**.
- **Mostrar o número de ativos do tipo** sempre (inclusive no mobile) — não ocultar mais a contagem.
- Manter a **rentabilidade** do tipo no header (cor por sinal) e garantir **espaçamento coerente** entre contagem, total e rentabilidade.
- Cabeçalho deve permanecer contido no mobile (sem rolagem horizontal).

### Modal de lançamento (adicionar ativo)

- **Máscara de moeda** no campo **Preço Unit.**: ao digitar, formatar como moeda BRL (ex.: `1.234,56`), mantendo o valor numérico para o cálculo/salvamento.
- **Validação de tipo pelo ticker**: ao inserir um ativo, verificar se o ticker condiz com o **tipo escolhido** (Ação, ETF, FII) conforme sua origem; bloquear/avisar em incompatibilidade óbvia. Como as APIs não retornam a categoria, a validação é **heurística por sufixo do ticker** (3/4/5/6/7/8 → Ação; 11 → FII/ETF).
- **Autocomplete sem fracionário**: nas sugestões de ticker, **descartar os ativos fracionários** (ticker terminado em **"F"**, ex.: `PETR4F`).

## Capabilities

### New Capabilities
- `lancamento-preco-mascara-moeda`: campo Preço Unit. do modal de lançamento com máscara de moeda BRL ao digitar.
- `lancamento-ticker-valida-tipo`: validação (heurística por sufixo) de que o ticker condiz com o tipo de ativo escolhido.
- `lancamento-autocomplete-sem-fracionario`: autocomplete de ticker descarta ativos fracionários (final "F").

### Modified Capabilities
- `meus-ativos-rentabilidade-por-tipo`: o cabeçalho passa a seguir o padrão de Lançamentos (total em moeda/accent, contagem sempre visível como badge) com espaçamento coerente, mantendo total e rentabilidade.

## Impact

- `src/app/components/dashboard/dashboard.html` — `.sec-total` passa a usar o pipe `currency: 'BRL'`.
- `src/app/components/dashboard/dashboard.scss` — `.sec-total` em accent; remover ocultação de `.sec-count` no mobile; espaçamento coerente em `.ah-right`/`.ah-left`.
- `src/app/components/add-transaction-modal/add-transaction-modal.html` — campo Preço vira texto com máscara; mensagem de validação de tipo.
- `src/app/components/add-transaction-modal/add-transaction-modal.ts` — máscara de moeda (parse/format), validação ticker×tipo por sufixo, filtro de fracionários no autocomplete.
- Sem mudanças de API ou modelo de dados.
