## 1. Cálculo (util puro)

- [x] 1.1 Criar `src/app/models/preco-teto.util.ts` com `dpaTrailing12m(dividends, today)` — soma de `amount` com `payDate` em `(today − 12m, today]`, independente de cotas.
- [x] 1.2 Adicionar ao util o cálculo de teto por classe: ação (`DPA12m / yieldAlvo`), FII (`teto por yield` + `sinalPVP` a partir do indicador "P/VP" quando presente), ETF (`status: 'na'`).
- [x] 1.3 Adicionar a classificação em zonas: `precoJusto = teto × (1 − margem)`; 🟢/🟡/🔴/⚪ e `descontoPct = preço/teto − 1`; ⚪ quando DPA12m ≤ 0 / sem histórico.
- [x] 1.4 Cobrir o util com testes (DPA na janela, teto por classe, zonas, sem dados, ETF n/a).

## 2. Configuração (yield-alvo + margem)

- [x] 2.1 Criar `PrecoTetoConfigService` com signals + `localStorage`: `{ yieldByClass: {Acoes, FIIs}, overrides: {ticker}, margem }`, defaults Ações 6% / FIIs 8% / margem 10%.
- [x] 2.2 Expor resolução do yield-alvo por ativo: `overrides[ticker] ?? yieldByClass[classe]`, e leitura/escrita da margem; restaurar de `localStorage` na inicialização.

## 3. Exibição — preço-teto (faixa + inline, sem colunas novas)

- [x] 3.1 `tr.acoes-row::before` (dashboard.scss): trocar a fonte da cor da faixa de `is-up`/`is-down` (variação do dia) para a **cor da zona** (🟢🟡🔴 / cinza ⚪ / neutro ETF). Manter a variação do dia apenas no texto colorido da célula "Variação hoje".
- [x] 3.2 `cell-ativo` (dashboard.html): substituir o "300 un." (`ca-qty`, que duplica a coluna Qtd) por caption inline sob o ticker — `DY X% · −Y% teto`; estados ⚪ "teto n/d", ETF "n/a", DY ausente/zero "—".
- [x] 3.3 Ordenação por desconto-vs-teto: converter o header "Variação hoje" em "Zona" com `setSort('zona')` ordenando por `descontoPct` (mais barato primeiro); a célula física segue mostrando a variação do dia.
- [x] 3.4 `stock-details-modal`: seção "Preço-teto" (DPA/rendimento, yield-alvo, teto, preço justo, veredito) reaproveitando `indicators-grid`; sinal de P/VP para FII quando disponível.
- [x] 3.5 Adicionar disclaimer "informativo, não é recomendação de investimento" na seção do modal e acessível a partir do caption de preço-teto.

## 4. Exibição — DY atual (inline, web + mobile)

- [x] 4.1 Exibir o DY no caption inline de `cell-ativo` (item 3.2), usando `dividend_yield` formatado como `%`, com "—" quando ausente/zero — sem coluna nova; aparece no desktop e no card mobile (mesmo `<tr>`).

## 5. Verificação

- [x] 5.1 Rodar `ng build` e `ng test` (util) e validar: badges/zonas corretos por classe, ETF/sem-dados sem número, DY no desktop, sem rolagem horizontal.
- [x] 5.2 Commit e push seguindo o fluxo do projeto (stage de arquivos específicos).
