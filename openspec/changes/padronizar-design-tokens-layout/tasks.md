<!-- DESCOBERTA no apply: raio é um sistema de 3 tiers (12 seção / 14 item / 10 chip),
     não 2. O "card 20px" do calendário era pílula; único outlier real = details-panel
     (16px). Tokens e specs ajustados para 3 tiers. Breakpoint canônico = 600px (literal;
     parcial SCSS descartado). Decisões confirmadas pelo usuário: convergir 640→600 e
     tokenizar amplamente + atualizar specs. -->

## 1. Tokens (styles.scss)

- [x] 1.1 Custom properties de raio (3 tiers): `--radius-card: 12px`, `--radius-item: 14px`, `--radius-chip: 10px`.
- [x] 1.2 Breakpoint canônico = `max-width: 600px` (literal; sem parcial SCSS — ver design).
- [x] 1.3 Escala de espaçamento `--space-1: 4px … --space-6: 24px`.

## 2. Normalizar/tokenizar raios de card

- [x] 2.1 Outlier real → `var(--radius-card)`: `.details-panel` (16px).
- [x] 2.2 Tokenizar por tier: `--radius-card` (alloc-card, import-card, meta-form, acordeões my-assets/dashboard, seções de Dividendos); `--radius-item` (stock-card desktop+mobile, acoes-row, table-row, radar-card); `--radius-chip` (ps-card, ds-total-card, indicador, month-card).
- [x] 2.3 Não-cards preservados (pílulas/tags 20px/999px, tooltips, botões, caixa dashed, skeletons).

## 3. Unificar tipografia de Dividendos

- [x] 3.1 Radar/Resumo/Histórico: títulos de seção agora 20px/700 (padrão do app).
- [x] 3.2 Padding dos contêineres → `var(--space-6)`.
- [ ] 3.3 Títulos "sem dados" (`0.98rem`) — mantidos por ora (rótulo secundário; baixo impacto). PENDENTE opcional.

## 4. Unificar breakpoint mobile

- [x] 4.1 Convergir media queries 640→600 em `dashboard.scss` (5×) e `stock-card.scss` (1×). (add-stock-modal 640 é max-width de modal, não media query — mantido.)
- [x] 4.2 Comentários "≤640px" atualizados.

## 5. Specs/artefatos

- [x] 5.1 `design-tokens-layout` reescrito para 3 tiers + 600px.
- [x] 5.2 `mobile-view-fit` ajustado para 600px (sem `$bp-*`).
- [x] 5.3 `proposal.md`/`design.md` alinhados à descoberta dos 3 tiers e ao 600 literal.

## 6. Verificação

- [x] 6.1 Build: `npx ng build` compila sem erros.
- [ ] 6.2 Revisão visual por tela (desktop e mobile) — requer login; PENDENTE de conferência manual.
- [ ] 6.3 Confirmar transição mobile na mesma largura entre telas e ausência de regressões de raio/título — PENDENTE manual.

## 7. Entrega

- [x] 7.1 `npx prettier --write` nos `.scss` alterados.
- [ ] 7.2 Commit(s) e push para `main`.
