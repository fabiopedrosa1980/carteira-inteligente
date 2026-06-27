## Context

O conteúdo de cada aba é renderizado dentro de `.content` (padding externo 32/16/12px por breakpoint) no `dashboard.html`. Dentro disso, cada tela aplica seu próprio recuo horizontal interno ao cabeçalho/título e aos cards, via SCSS local:

- `my-assets.scss`: `$pad-x: 20px` (cabeçalho e linhas dos cards)
- `dividends.scss`: `$dv-pad-x: 20px` (mobile 16px)
- `dashboard.scss` `.section-header` (tela Portfolio): 20px desktop / 16px mobile
- `goals.scss` `.metas-header`: **16px** desktop
- `import.scss`: **centralizado** (`max-width: 640px; margin: 0 auto`)

Como os valores divergem (Metas 16px; Importar centralizado), título e cards mudam de coluna ao trocar de aba. O spec `titulo-alinhado-aos-cards` já garante alinhamento título×cards **dentro** de cada tela; falta consistência **entre** telas.

## Goals / Non-Goals

**Goals:**
- Um único recuo horizontal por breakpoint (20px desktop / 16px mobile) usado por todas as telas.
- Corrigir as duas telas fora do padrão (Metas, Importar).

**Non-Goals:**
- Mudar o padding externo de `.content` (mantém 32/16/12).
- Alterar tipografia, cores, tamanho de cards ou estrutura.
- Refatorar todo o SCSS para um design system — apenas padronizar o recuo.

## Decisions

### D1: 16px em todos os breakpoints como recuo canônico
Revisado após auditoria do código: embora 20px seja o valor de desktop em 3 telas, padronizar em 20px é mais invasivo do que parecia — Metas alinha o título a uma `.metas-table` com células de 16px e breakpoint próprio (≤480px), e Meus Ativos usa um Sass var `$pad-x` sem override mobile (fica 20px no mobile, destoando das demais). Unificar em **16px** é o caminho de menor risco: Metas (a tela mais complexa) já está em 16px e fica intocada; basta trocar `$pad-x` e `$dv-pad-x` para 16px e ajustar `.section-header`/cards do Portfolio.
- **Alternativa descartada (20/16):** mexeria no cabeçalho + tabela + breakpoints de Metas e no recuo mobile de Meus Ativos. Mais arquivos, mais risco.
- **Trade-off aceito:** o desktop de Meus Ativos/Dividendos/Portfolio recua 4px a menos (20→16); diferença visual mínima e ganho de consistência total.

### D2: Ajustes pontuais, sem grande refator
- `goals.scss` `.metas-header`: 16px → 20px no desktop (mantém 16px no mobile).
- `import.scss`: remover `max-width`/`margin: 0 auto`; alinhar à esquerda usando o mesmo recuo (a tela passa a ocupar a largura do `.content`, com card de largura plena ou recuo padrão coerente com as demais).
- Conferir `my-assets`/`dividends`/`section-header` — já em 20/16, sem mudança esperada.
- **Por quê:** mudanças localizadas são fáceis de revisar e reverter; não há necessidade de tocar telas que já estão corretas.

### D3: Token compartilhado (opcional, se barato)
Se viável sem reestruturar imports SCSS, expor o recuo como um valor único reutilizado (ex.: variável/contante comum) para evitar regressão futura. Caso o custo seja alto (cada componente tem seu próprio escopo SCSS), manter os valores locais sincronizados em 20/16 é aceitável.
- **Por quê:** o ganho de DRY não justifica reescrever a estrutura de estilos agora; a consistência do valor é o que importa.

## Risks / Trade-offs

- **Regressão visual em telas já corretas** → Não alterar `my-assets`/`dividends`/`section-header` além do necessário; validar visualmente cada aba após a mudança.
- **Importar com card de largura plena pode ficar "largo demais" no desktop** → Aceitável para consistência; se necessário, manter o card com largura natural mas **alinhado à esquerda** no recuo padrão (sem centralizar).
- **Mobile** → Garantir que os overrides ≤600px continuem em 16px em todas as telas (Metas e Importar inclusas).

## Migration Plan

1. Ajustar `goals.scss` e `import.scss`; conferir as demais.
2. `npx prettier --write` nos SCSS alterados e `ng build`.
3. Validar visualmente as 5 abas em desktop e mobile (largura ≤600px), confirmando título e cards na mesma coluna ao alternar.
4. Rollback: reverter o commit; cada ajuste é isolado por arquivo.

## Open Questions

- Nenhuma. Valor canônico (20/16) e telas afetadas (Metas, Importar) definidos.
