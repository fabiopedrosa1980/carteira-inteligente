## 1. Tokens e moldura

- [x] 1.1 Adicionar tokens `--class-fii` e `--class-etf` (dark + light) em `styles.scss`, harmonizados com `--accent`.
- [x] 1.2 Alinhar a moldura do `.alloc-card` ao padrão dos `ps-card` (raio, padding, tipografia); adicionar eyebrow "Composição".

## 2. Faixa de composição (signature)

- [x] 2.1 Substituir as 3 barras (`.alloc-rows`/`.ar-bar`) por uma **faixa única** de segmentos proporcionais (flex `flex: pct`), cor por classe via helper `classColorVar` em `allocation-card.ts`.
- [x] 2.2 Adicionar marcador(es) de alvo na faixa; aplicar `min-width` no segmento e clamp do tick para segmentos pequenos.

## 3. Ledger por classe (fim do overflow)

- [x] 3.1 Reestruturar o detalhamento como **grid alinhado** (classe · atual% · alvo% · ação), números em `tabular-nums`.
- [x] 3.2 Mobile: via `grid-template-areas`, mover a ação (aportar/reduzir R$) para a 2ª linha do item — remover o `justify-content: space-between` que colide.

## 4. Edição do alvo na própria barra

- [x] 4.1 No modo edição, renderizar **handles arrastáveis** nos limites entre segmentos da faixa de composição; arrastar redistribui o alvo entre as classes vizinhas mantendo a soma em 100%.
- [x] 4.2 Acessibilidade do controle: `role="slider"`, `aria-valuenow/min/max`, `tabindex=0`, setas (1pp) e Shift+seta (5pp); pointer/touch events; refletir no ledger e persistir ao salvar. Remover os inputs numéricos de alvo (manter o input do limite de concentração).

## 5. Cores nos tokens + a11y

- [x] 5.1 Trocar todos os hex hardcoded (`#e0a82e`) por `--color-warning`; input usa `--input-bg`; revisar `--color-pos/neg/accent`.
- [x] 5.2 Foco de teclado visível em handles/inputs/botões; `prefers-reduced-motion` desativa transições da faixa; validar contraste nos dois temas.

## 6. Verificação

- [x] 6.1 `ng build` e validar: sem overflow/colisão em desktop e mobile, faixa de composição correta, alvos editáveis na barra (mouse + teclado, soma 100%), tema claro/escuro consistentes, estados vazio/concentração ok.
- [x] 6.2 Commit e push (stage de arquivos específicos).
