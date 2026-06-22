## Why

O card de Alocação recém-criado **quebra o layout** e parece um widget genérico, destoando dos cards de resumo da carteira:

- A linha inferior de cada classe usa `justify-content: space-between` entre o rótulo do alvo e a ação ("▼ reduzir R$ 14.916"); como o texto de moeda é longo, em telas estreitas os dois colidem/quebram.
- Cores hardcoded (`#e0a82e`) ignoram o token `--color-warning`, então o tema claro fica fora do padrão.
- O input usa `var(--bg)` em vez de `--input-bg`.
- Três barras de progresso desconectadas são a solução "template" — não comunicam **composição** (a carteira como um todo) nem têm a polidez dos `ps-card` vizinhos.

A meta é deixar a tela **profissional e estável** (sem quebra em web e mobile), com uma identidade visual própria coerente com o resto do app.

## What Changes

- **Substituir as 3 barras separadas por uma "faixa de composição" única** (stacked) que mostra Ações/FIIs/ETF como segmentos proporcionais de uma só barra — a carteira inteira em uma linha — com **marcadores de alvo** discretos por segmento.
- **Reestruturar o detalhamento por classe como um "ledger" em grid** com colunas alinhadas (classe · atual% · alvo% · Δ) usando `tabular-nums`, de modo que o valor de rebalanceamento **nunca colida**; no mobile, a ação (aportar/reduzir R$) desce para a própria linha em vez de espremer.
- **Padronizar cores nos tokens do tema** (`--color-warning`, `--color-pos`, `--color-neg`, `--accent`, `--input-bg`) — fim dos hex hardcoded; tema claro e escuro consistentes.
- **Alinhar a moldura ao padrão dos cards de resumo** (raio, padding, tipografia, eyebrow) para o card não parecer um corpo estranho.
- **Editar o alvo na própria barra**: no modo edição, a faixa de composição vira o controle — **handles arrastáveis** nos limites entre os segmentos ajustam o alvo de cada classe diretamente sobre a barra de percentual (arrastar entre Ações↔FIIs redistribui o alvo, mantendo a soma em 100%). Suporte a teclado (setas) e ARIA de slider. Os campos numéricos de alvo deixam de ser a forma primária de edição (o limite de concentração segue como input).
- **Garantir o piso de qualidade**: responsivo até o mobile, foco de teclado visível nos controles, `prefers-reduced-motion` respeitado, estados vazios/concentração legíveis.

## Capabilities

### Modified Capabilities
- `carteira-alocacao-exibicao`: a apresentação passa a usar a faixa de composição única + ledger em grid alinhado e tokens do tema, com layout estável (sem overflow) em web e mobile.

## Impact

- **UI apenas**: `allocation-card.html` e `allocation-card.scss` (estrutura + estilos). Sem mudança de cálculo (`allocation.util.ts`), serviço ou contrato de backend.
- **Sem novas dependências/fontes** — reusa os tokens e a família tipográfica já existentes (consistência é a escolha profissional).
- Possível ajuste pequeno no `allocation-card.ts` se a faixa de composição precisar de um helper de cor por classe.
