## Why

O Radar de proventos atual é um **mapa de sazonalidade** do ano anterior: bom para ver em que mês um ativo costuma pagar, mas não responde a pergunta mais acionável do investidor — **"o que preciso comprar antes da próxima data-com para não perder o provento?"**.

Investigando os dados, descobrimos que:

- O backend é **retrospectivo**: nenhum provento tem `ex_date` no futuro. Quando um provento entra na base, a data-com já passou. Logo, **não existe "próxima data-com anunciada"** para contar regressivamente.
- A aba **Projetados** não cobre essa dor: ela mostra proventos cujo `pay_date` ainda vai cair, mas cuja **data-com já passou** — é "dinheiro a caminho", não "ação a tomar".
- O Radar lê **apenas a carteira** (`getAcoes`/`getFiis`); ele não enxerga o universo de ativos acompanhados, então não consegue surfar **oportunidades de entrada** — exatamente onde se "perde" um dividendo de verdade.

A solução é **estimar** a próxima data-com a partir do ritmo histórico de cada ativo (cadência) e apresentá-la como uma faixa ordenada por urgência, cruzando com o eixo **já tenho × não tenho**.

## What Changes

- Nova faixa **"Próximas datas-com"** em Dividendos: lista de ativos ordenada pela urgência (dias até a próxima data-com **estimada**), respeitando o seletor Ações/FIIs.
- **Motor de cadência**: a partir das `ex_date` históricas de cada ativo, detectar o intervalo típico (mensal ~30d, trimestral ~90d, semestral ~180d, anual ~365d) e projetar `próxima_estimada = última_ex_date + intervalo`, com um nível de confiança derivado da variância dos intervalos.
- **Universo ampliado**: combinar a carteira (`getAcoes`/`getFiis`) com o universo acompanhado (`getStocks`), marcando cada item como **🟢 tenho** (reforço) ou **🔴 não tenho** (oportunidade de entrada).
- Cada item da faixa exibe: ticker, data-com estimada (dia quando há confiança; mês quando a cadência é irregular), cadência detectada, contagem regressiva e o marcador tenho/não-tenho.
- Rotulagem honesta: a data-com é **estimada** (≈/"previsto"), com aviso para confirmar no RI do ativo. Itens sem histórico suficiente (1 provento) ou com padrão irregular são tratados sem cravar dia.
- Apenas frontend: reaproveita os endpoints existentes; sem mudança de backend.

## Capabilities

### New Capabilities
- `proximas-datas-com`: estimativa da próxima data-com por cadência histórica, faixa ordenada por urgência sobre carteira + universo acompanhado, com eixo tenho/não-tenho para apoiar a compra antes da data-com.

### Modified Capabilities
<!-- Nenhuma capability existente muda de requisito; esta é aditiva. -->

## Impact

**Frontend (este repo):**
- `src/app/components/dividends/dividends.{ts,html}` — exibir a nova faixa "Próximas datas-com".
- Novo `src/app/components/proximas-datas-com/*` — faixa ordenada por urgência, `@Input() assetType`.
- Possível util de cadência (detecção de intervalo + projeção da próxima data-com a partir de `ex_date[]`).
- Fontes de dados existentes: `BackendApiService.getStocks()` (universo), `getAcoes()`/`getFiis()` (carteira) e `getStockDividends(id)` (histórico de proventos por ativo).

**Sem impacto de backend** — a estimativa é derivada no cliente a partir dos dados já disponíveis.
