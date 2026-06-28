<!-- DESCOBERTA durante o apply: o raio é, de fato, um sistema de 3 tiers
     (12 seção / 14 item / 10 chip), não 2. O "card 20px" do calendário era um
     botão-pílula; o único outlier real de card é o details-panel (16px). Tokens
     ajustados para 3 tiers (--radius-card/--radius-item/--radius-chip). A
     normalização ampla de raio e a convergência de breakpoint foram PAUSADAS
     para redecisão (specs precisam refletir os 3 tiers). -->

## 1. Tokens (styles.scss)

- [x] 1.1 Adicionar custom properties de raio (3 tiers): `--radius-card: 12px`, `--radius-item: 14px`, `--radius-chip: 10px` no `:root`.
- [ ] 1.2 Adicionar variáveis SCSS de breakpoint (`$mobile/$sm/$lg`) num parcial importável. (parcial `src/_breakpoints.scss` criado; aplicação PAUSADA)
- [x] 1.3 Adicionar tokens de escala de espaçamento (`--space-1:4px … --space-6:24px`).

## 2. Normalizar raios de card

- [x] 2.1 Outlier real de card → `var(--radius-card)`: detalhe do ativo `.details-panel` (16px). (calendário/stock-card NÃO eram outliers)
- [~] 2.2 Tokenizar por tier nas telas tocadas (Dividendos): radar-card → `var(--radius-item)`, ds-total-card → `var(--radius-chip)`. Demais telas: PENDENTE.
- [ ] 2.3 Trocar literais 12/14/10 restantes pelos tokens nas demais telas (sem mudança visual). PENDENTE.

## 3. Unificar tipografia de Dividendos

- [x] 3.1 Radar/Resumo/Histórico: títulos de seção (`.radar-title`/`.ds-title`/`.dh-title`) agora usam 20px/700 (padrão do app).
- [x] 3.2 Padding dos contêineres dessas telas migrado para `var(--space-6)`.
- [ ] 3.3 Conferir os títulos "sem dados" (`0.98rem`) para coerência (rótulo secundário em px). PENDENTE.

## 4. Unificar breakpoint mobile

- [ ] 4.1 Substituir os literais de "vira card" pelo `$bp-mobile` nas telas (incluindo migrar os grids de 640px de Minhas Ações e Radar para o canônico).
- [ ] 4.2 Nomear os cortes secundários com `$bp-sm`/`$bp-lg` onde aplicável.

## 5. Verificação

- [ ] 5.1 Build: `npx ng build` compila sem erros.
- [ ] 5.2 Revisão visual por tela (desktop e mobile): alocação, lançamentos, Meus Ativos, Dividendos (Radar/Resumo/Histórico/Calendário), Metas, Importar, detalhe do ativo.
- [ ] 5.3 Confirmar transição mobile na mesma largura entre telas e ausência de regressões de raio/título.

## 6. Entrega

- [ ] 6.1 `npx prettier --write` nos `.scss` alterados.
- [ ] 6.2 Commits por fase (prefixo `style:`/`refactor:`) e push para `main` (stage apenas dos arquivos alterados).
