## Why

A coluna **"Oportunidade"** (badge + tooltip com o racional) existe para Ações/FIIs, mas fica **oculta para ETF** (`@if group !== 'ETF'`). Hoje o ETF só tem a faixa lateral colorida, sem número nem explicação — e essa faixa usa a *posição na banda de 52 semanas*, uma métrica que não casa perfeitamente com o badge "−X%" de Ações.

Esta change dá ao ETF a **mesma coluna e o mesmo idioma de racional** das Ações/FIIs, adotando um paralelo conceitual limpo: a **máxima de 52 semanas é o "teto" do ETF**. Assim o ETF ganha um badge e um tooltip explicando *por que* está barato/caro, e badge e cor passam a sair da **mesma métrica** (distância do topo).

## What Changes

- **Reframe da métrica do ETF** (substitui a recém-introduzida posição-na-banda): a faixa e o badge passam a usar a **distância do preço atual até a máxima de 52 semanas**: `desvioTopo = (preço − máx52) / máx52` (negativo = abaixo do topo = mais barato).
  - `desvioTopo > −7%` (colado no topo) → 🔴 caro
  - `−15% ≤ desvioTopo ≤ −7%` → 🟡 justo
  - `desvioTopo < −15%` (longe do topo) → 🟢 oportunidade
- **Coluna "Oportunidade" passa a aparecer para ETF** (remove os três `@if group !== 'ETF'` no colgroup, cabeçalho e célula), com:
  - **badge** `🟢 −22%` (distância do topo), no mesmo formato do badge de Ações;
  - **tooltip** com o racional: Mínima 52 sem, Máxima 52 sem, Preço atual, Distância do topo, e o veredito (🟢/🟡/🔴) + disclaimer de "não é recomendação".
- **Estado neutro** do ETF (sem 52 sem válida) → badge `n/a` e tooltip "Sem dados de 52 semanas", sem número enganoso.
- **Brinde:** com a coluna de volta, o ETF volta a ter as **mesmas 8 colunas** de Ações/FIIs, corrigindo o desalinhamento de `nth-child` dos cards mobile de ETF (rótulos trocados).

## Capabilities

### New Capabilities
<!-- Nenhuma. -->

### Modified Capabilities
- `preco-teto-exibicao`: o veredito de oportunidade do ETF na lista passa a ser a **distância da máxima de 52 semanas** (em vez da posição na banda), exibida também como **coluna "Oportunidade"** (badge + tooltip) — antes oculta para ETF.

## Impact

- **Frontend apenas** — o backend já expõe `fifty_two_week_high`/`fifty_two_week_low` (mapeados em `Stock.high52`/`low52`). Sem mudança de API.
- **Código:** `src/app/components/dashboard/dashboard.ts` (métrica do ETF de `pos` → distância do topo; helpers de badge/veredito/tooltip do ETF) e `dashboard.html` (remove os `@if group !== 'ETF'`; conteúdo do tooltip condicional ETF vs preço-teto). `dashboard.scss` provavelmente não muda (coluna já estilizada).
- **Semântica:** a coluna fica unificada — "oportunidade de compra" para todos os tipos, com racional explícito.
- **Trade-off:** distância-do-topo usa só a máxima; um ETF parado perto das mínimas mas com topo pouco acima nunca fica verde (a banda capturava isso). Aceito em troca do paralelo conceitual com Ações/FIIs.
