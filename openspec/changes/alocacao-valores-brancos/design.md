## Context

O card de Alocação (`allocation-card`) exibe um ledger com as colunas classe · Atual · Alvo · Ação. As células de valor de **Atual** e **Alvo** usam a classe `.num`, hoje com `color: var(--text-secondary)` (`allocation-card.scss`). Os rótulos de cabeçalho dessas colunas também usam `.num`, dentro de `.ledger-head`. A coluna **Ação** (`.act`) tem cores de status próprias.

## Goals / Non-Goals

**Goals:**
- Valores de Atual e Alvo em `--text-primary` (branco no escuro).

**Non-Goals:**
- Mudar os rótulos de cabeçalho, a coluna Ação, layout ou tipografia.
- Hardcode de `#fff` (quebraria o tema claro).

## Decisions

### D1: Escopar a cor às células de valor, não ao cabeçalho
Aplicar `color: var(--text-primary)` apenas às `.num` das linhas de valor (`.ledger-row .num`), mantendo as `.num` do `.ledger-head` em `--text-secondary`.
- **Por quê:** o `.num` é compartilhado entre cabeçalho e valores; escopar pela linha preserva a hierarquia (rótulos cinza, valores brancos).
- **Alternativa descartada:** mudar `.num` globalmente. Rejeitada porque deixaria os rótulos "Atual"/"Alvo" também brancos.

### D2: Usar token de tema, não branco fixo
`--text-primary` já é branco no tema escuro e escuro no claro.
- **Por quê:** consistência com o resto do app e suporte aos dois temas.

## Risks / Trade-offs

- **Especificidade CSS** → `.ledger-row .num` (duas classes) supera `.num` (uma classe), garantindo a cor nos valores sem `!important`.
- **Modo "ocultar valores"** → inalterado; o blur de privacidade continua aplicado por cima da cor.
