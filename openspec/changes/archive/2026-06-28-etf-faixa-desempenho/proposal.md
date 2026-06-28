## Why

Na lista de **Meus Ativos**, a faixa lateral é um **semáforo de oportunidade de compra**: para Ações/FIIs ela reflete a zona de preço-teto (🟢 barato · 🟡 justo · 🔴 caro). Para **ETFs** isso não se aplica (ETF de índice não se avalia por dividend yield), então a faixa caía na zona `na` e herdava `--zona-color: var(--border)` — a mesma cor da borda, criando o bug visual da **"borda na borda"**.

A primeira tentativa colorir o ETF por **preço atual vs preço médio** estava conceitualmente errada: isso mede o **lucro/prejuízo da posição**, não oportunidade — e é **invertido** (ETF acima do meu médio = bom P&L, mas pior ponto de entrada). Esta change substitui essa regra por um sinal **honesto de oportunidade de mercado** para ETF: a **posição do preço atual dentro da faixa de 52 semanas**.

## What Changes

- A faixa lateral dos **ETFs** passa a refletir a **posição na faixa de 52 semanas** (`pos = (atual − mín52) / (máx52 − mín52)`):
  - `pos < 0,30` (perto do fundo do ano) → 🟢 **oportunidade**
  - `0,30 ≤ pos ≤ 0,70` → 🟡 **justo**
  - `pos > 0,70` (perto do topo do ano) → 🔴 **caro**
- Quando faltam dados de 52 semanas (máx/mín ausentes, `máx == mín`, ou preço atual indisponível), a faixa fica **neutra** — sem cor que se confunda com a borda.
- **Remove** a regra anterior de preço atual vs preço médio (P&L) para ETF.
- Resolve o bug visual da **"borda na borda"** (faixa neutra deixa de usar `var(--border)`).
- **BREAKING (contrato de API):** depende de o backend expor **máxima e mínima de 52 semanas** dos ETFs (o Yahoo já fornece `fiftyTwoWeekHigh`/`fiftyTwoWeekLow`; hoje o backend não repassa). Enquanto o backend não enviar, o frontend degrada para **faixa neutra** no ETF (nada quebra).
- Ações e FIIs **não mudam**: mantêm o semáforo de preço-teto.

## Capabilities

### New Capabilities
<!-- Nenhuma capability nova: o comportamento vive na exibição da faixa de zona. -->

### Modified Capabilities
- `preco-teto-exibicao`: o requisito do veredito de zona na lista passa a definir o sinal de **oportunidade do ETF** pela **posição na faixa de 52 semanas** (em vez de neutro fixo ou de P&L). "Sem dados" de 52 sem e preço indisponível permanecem neutros; Ações/FIIs inalterados.

## Impact

- **Backend (repo separado — pré-requisito):** estender o payload de posições de ETF (`/transactions/etfs`) para incluir máxima e mínima de 52 semanas (origem: Yahoo Finance, já consultado).
- **Frontend — código:** `src/app/models/stock.model.ts` (campos opcionais de 52 sem), `src/app/services/backend-api.service.ts` (mapear os novos campos do `ApiAcaoItem`), `src/app/components/dashboard/dashboard.ts` (regra de zona do ETF por faixa de 52 sem, substituindo a de P&L) e `src/app/components/dashboard/dashboard.scss` (estado neutro transparente).
- **Conceitual:** a faixa fica **unificada** — significa "oportunidade de compra" para todos os tipos (antes o ETF destoava). Sem coluna nova; caption do ETF segue oculto.
- **Sem impacto** no detalhe do ativo, nem nas demais telas.
