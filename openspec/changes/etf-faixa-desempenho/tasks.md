## 1. Contrato de API (pré-requisito — backend, repo separado)

- [x] 1.1 Backend (repo `carteira-inteligente-api`): incluir no payload de posições (`/transactions/acoes|fiis|etfs`) os campos `fifty_two_week_high`/`fifty_two_week_low` (origem Yahoo `meta`, fallback mín/máx da série de 1 ano). `AcaoItem` + `fetchYahooQuote`/`cachedYahooQuote` estendidos. Build/vet/63 testes OK.

## 2. Modelo e mapeamento (frontend)

- [x] 2.1 Em `ApiAcaoItem` (`backend-api.service.ts`), declarar `fifty_two_week_high?` e `fifty_two_week_low?` (opcionais).
- [x] 2.2 Em `Stock` (`stock.model.ts`), adicionar campos opcionais `high52?` e `low52?`.
- [x] 2.3 Em `mapItem` (`dashboard.ts`), mapear os novos campos da API para `high52`/`low52` no `Stock` do ETF.

## 3. Regra de zona do ETF por faixa de 52 semanas (dashboard.ts)

- [x] 3.1 Substituir `etfZonaClass` (hoje P&L: atual vs médio) por um cálculo de **posição na faixa de 52 sem**: `pos = (price − low52) / (high52 − low52)`, recortado em [0, 1].
- [x] 3.2 Aplicar limiares como constantes: `pos < 0,30` → `zona-compra`; `0,30 ≤ pos ≤ 0,70` → `zona-justo`; `pos > 0,70` → `zona-caro`.
- [x] 3.3 Degradação graciosa: `high52`/`low52` ausentes, `high52 == low52`, ou `price ≤ 0`/ausente → `zona-na` (neutro), sem sinal enganoso.
- [x] 3.4 Garantir que `zonaClass` roteia só ETF para esse cálculo; Ações/FIIs seguem por `zonaOf`/`precoTetoOf` inalterados.
- [x] 3.5 Remover qualquer dependência de `avgPrice` na coloração do ETF (regra de P&L descartada).

## 4. Estado neutro sem "borda na borda" (dashboard.scss)

- [x] 4.1 Estado neutro (`zona-na` / sem dados) usa `--zona-color: transparent`, eliminando a barra cinza colada na borda no desktop e no card mobile. _(Já aplicado; reaproveitado.)_
- [x] 4.2 Confirmar que verde/amarelo/vermelho de `zona-compra/justo/caro` seguem aplicados ao ETF (faixa desktop via `box-shadow` inset e card mobile via `::before`). _(Classes inalteradas; ETF agora as recebe via `etfZonaClass`.)_

## 5. Verificação

- [x] 5.1 Com `high52`/`low52` presentes: ETF perto do fundo (verde), no meio (amarelo) e perto do topo (vermelho). _(Verificado por lógica de código + build; confirmação visual no navegador pendente — depende do backend enviar 52 sem.)_
- [x] 5.2 Sem 52 sem (backend ainda não envia) ou `máx == mín`: ETF fica neutro, sem borda dupla, no desktop e no card mobile (≤600px). _(Verificado por lógica: `etfZonaClass` → `zona-na` → `--zona-color: transparent`.)_
- [x] 5.3 Ações e FIIs mantêm o semáforo de preço-teto inalterado (🟢/🟡/🔴/⚪) e o caption de desconto vs teto. _(Caminho `sector !== 'ETF'` inalterado.)_
- [x] 5.4 Rodar `npx prettier --write` nos arquivos alterados e `ng build` sem erros.
