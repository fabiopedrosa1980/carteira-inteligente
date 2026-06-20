## 1. Card — Nota na linha do ticker

- [x] 1.1 Em `stock-card.scss`, trocar `align-self: center` por `align-self: flex-start` em `.card-nota` e alinhar verticalmente à linha do ticker (ajuste fino de `line-height`/`margin` se preciso).
- [x] 1.2 Validar em desktop e mobile que a Nota fica na mesma linha do ticker (não centralizada entre ticker e nome).

## 2. Ordenação (web) — rótulo "Ordenar por" não cortado

- [x] 2.1 Em `dashboard.html`, na ramificação desktop, tirar `<span class="sort-label">Ordenar por</span>` de dentro do `app-scroll-bar` e envolvê-lo num container `.sort-controls` (flex) com o `app-scroll-bar` (classe `.sort-scroll`) contendo só os botões.
- [x] 2.2 Em `dashboard.scss`, ajustar `.sort-controls` para flex container (label + barra) e mover os estilos de dimensionamento para `.sort-scroll` (`flex: 0 1 auto; min-width: 0; max-width: 100%`), mantendo o escopo mobile (`width:100%` em ≤640px).
- [x] 2.3 Validar no desktop que "Ordenar por" aparece completo, sem fade/clip, e a barra de botões ainda rola quando necessário.

## 3. Radar — tag ao lado dos tickers + oportunidade no mês atual

- [x] 3.1 Em `dividends-radar.html`, mover a tag de destaque (`.rc-tag`) para a mesma linha dos chips de ticker (dentro/junto de `.rc-tickers`).
- [x] 3.2 Em `dividends-radar.scss`, ajustar `.rc-tickers`/tag para layout em linha com `flex-wrap`, mantendo cores de destaque e sem estourar o card.
- [x] 3.3 Em `dividends-radar.ts`, alterar a origem do mês de oportunidade para o **mês atual** (`getMonth()+1`), mantendo `isNextMonth`/classe `.next` apenas com o novo valor.
- [x] 3.4 Em `dividends-radar.html`, atualizar a legenda "Próximo mês — oportunidade de compra" para refletir o **mês atual**.
- [x] 3.5 Validar: tag inline com tickers; destaque de oportunidade no mês atual; legenda coerente.

## 3b. Radar — sem destaques para FIIs

- [ ] 3b.1 Em `dividends-radar.ts`, fazer `isTopMonth`/`isNextMonth` retornarem `false` quando `assetType === 'FIIs'` (ou condicionar a origem do destaque ao tipo Ações).
- [ ] 3b.2 Em `dividends-radar.html`, ocultar os itens da legenda ("Mês com mais ativos" e "Próximo mês — oportunidade de compra") quando `assetType === 'FIIs'`.
- [ ] 3b.3 Validar: com FIIs, nenhum card/coluna recebe "Melhor mês" ou "Oportunidade" e a legenda some; com Ações, os destaques permanecem.

## 4. Detalhe da ação — descrição de todos os indicadores

- [x] 4.1 Em `stock-details-modal.ts`, ampliar o mapa `DESCRIPTIONS` (chaves normalizadas) cobrindo o conjunto comum do Investidor10 (P/EBIT, P/Ativo, PSR, EV/EBIT, ROA, margens, variações de dívida, Patrimônio/Ativos, Passivos/Ativos, Giro de Ativos, CAGR receitas/lucros, etc.).
- [x] 4.2 Validar no detalhe de uma ação que os indicadores comuns exibem o ícone "i" com descrição.

## 5. Ordenação (mobile) — Nome por padrão, sem "Padrão"

- [x] 5.1 Em `dashboard.ts`, iniciar `sortField` em `'name'`.
- [x] 5.2 Em `dashboard.html`, remover `<option value="default">Padrão</option>` do combo mobile.
- [x] 5.3 Validar no mobile que o combo inicia em "Nome", sem opção "Padrão", e os cards aparecem ordenados por nome.

## 6. Histórico — Ativo e Ano na mesma linha

- [x] 6.1 Em `dividend-history.html`, envolver o seletor de Ativo (`.dh-selector`) e o filtro de ano (chips + combo) num container `.dh-controls`.
- [x] 6.2 Em `dividend-history.scss`, estilizar `.dh-controls` como flex (`align-items: center; gap; flex-wrap: wrap`), preservando chips no desktop e combo no mobile, sem rolagem horizontal.
- [x] 6.3 Validar no desktop e mobile que Ativo e Ano ficam na mesma linha e os filtros funcionam como antes.

## 7. Verificação e entrega

- [x] 7.1 Rodar `npx prettier --write` nos arquivos alterados e `ng build` para garantir que compila.
- [x] 7.2 Commit e push por área (prefixos `feat:`/`fix:`/`style:`), staged por arquivo específico.
