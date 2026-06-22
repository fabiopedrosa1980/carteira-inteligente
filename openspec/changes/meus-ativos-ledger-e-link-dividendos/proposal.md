## Why

Dois ajustes na aba **Meus Ativos**:

1. **Ledger de Alocação quebrando:** as colunas **Atual** e **Alvo** desalinham. Causa: `.ledger-head` e cada `.ledger-row` são **grids CSS independentes** com colunas `auto auto` para Atual/Alvo — cada grid dimensiona o `auto` pelo próprio conteúdo, então a largura no cabeçalho (texto "Atual"/"Alvo") difere da das linhas (`62%`), e as colunas não alinham. A coluna de Ação (`minmax(0,1.4fr)`) ainda pode espremer os números.
2. **Sem atalho para os dividendos:** os cards "Dividendos Recebidos" e "Dividendos a receber" do resumo mostram os totais, mas não levam às telas correspondentes. O usuário quer **clicar no card e abrir a tela de Dividendos** já na visão certa (Recebidos / Projetados).

## What Changes

- **Alinhar o ledger com trilhas de coluna explícitas e compartilhadas** entre cabeçalho e linhas (ex.: `minmax(0,1fr) 3.25rem 3.25rem minmax(0,1.6fr)`), Atual/Alvo à direita com `tabular-nums` e espaçamento de coluna consistente — colunas retas em todas as linhas, sem quebra. Mobile mantém o padrão (Ação desce de linha) com as mesmas trilhas.
- **Tornar os cards de dividendos clicáveis** (links): "Dividendos Recebidos" → aba Dividendos na visão **Recebidos**; "Dividendos a receber" → visão **Projetados**. Implementado via `setActiveTab('calendar')` + um `initialTab` passado ao `DividendsComponent`. Os cards ganham afford­ância (cursor, hover, foco de teclado, `role="button"`).

## Capabilities

### New Capabilities
- `meus-ativos-link-dividendos`: navegação a partir dos cards de resumo de dividendos para a tela de Dividendos na visão correspondente (Recebidos / Projetados).

### Modified Capabilities
- `carteira-alocacao-exibicao`: o ledger passa a usar trilhas de coluna explícitas e compartilhadas (cabeçalho + linhas), com Atual/Alvo alinhados e sem quebra.

## Impact

- **UI:** `allocation-card.scss` (grid do ledger); `dashboard.html`/`dashboard.ts` (cards clicáveis + `dividendsTab` signal); `dividends.ts` (`@Input initialTab`).
- Sem mudança em cálculo, serviço ou backend.
