## Why

O app é forte em **acompanhar** a carteira (posições, P&L, dividendos), mas não ajuda no **momento da decisão** de compra/venda: dá os insumos (preço, DY, indicadores) e deixa o investidor fazer a conta de cabeça. Para o investidor de dividendos brasileiro, a pergunta central é *"a que preço esse ativo vira compra?"*. O **preço-teto** (método Bazin para ações; yield + P/VP para FIIs) responde isso diretamente e roda sobre dados que o app **já possui** (histórico de dividendos + cotação), sem novo backend.

## What Changes

- **Calcular o preço-teto e a "zona de compra"** por ativo da carteira:
  - **Ações**: `teto = DPA(12m) / yield-alvo`, onde DPA(12m) é a soma dos proventos por cota pagos nos últimos 12 meses.
  - **FIIs**: teto por yield (`rendimento anualizado / yield-alvo`) **e** sinal de P/VP (caro/barato vs valor patrimonial), exibidos lado a lado.
  - **ETFs**: marcados como **"n/a"** (preço-teto por dividendo não se aplica).
- **Classificar em zonas (semáforo)** comparando preço atual ao teto, com margem de segurança: 🟢 Compra (abaixo do justo com margem) · 🟡 Justo/Perto · 🔴 Caro · ⚪ Sem dados.
- **Configurar o yield-alvo** com padrão por classe (ex.: Ações 6%, FIIs 8%) e **override por ativo**, além de uma **margem de segurança** (default 10%), persistidos localmente.
- **Exibir o veredito** sem coluna nova: a **faixa lateral** da linha/card (que hoje marca a variação do dia) passa a refletir a cor da zona, com **caption** de desconto vs teto sob o ticker e **ordenação por desconto vs teto**; mais uma seção dedicada no detalhe do ativo, com **disclaimer** de que não é recomendação de investimento.
- **Exibir o DY atual** de cada ativo **inline, sob o ticker**, na lista de **Meus Ativos** — complementando o preço-teto como insumo de decisão, sem aumentar a largura da tabela. Usa `dividend_yield` já disponível.

## Capabilities

### New Capabilities
- `preco-teto-calculo`: cálculo do DPA(12m), do preço-teto por classe (Ações via Bazin; FIIs via yield + P/VP), da margem e da classificação em zonas, incluindo estados "sem dados" e "n/a (ETF)".
- `preco-teto-configuracao`: yield-alvo padrão por classe com override por ativo e margem de segurança, persistidos localmente.
- `preco-teto-exibicao`: apresentação do veredito (badge no card, coluna/ordenação na lista, seção no detalhe) com disclaimer.
- `meus-ativos-dy-atual`: exibição do DY atual de cada ativo inline (sob o ticker) na lista de Meus Ativos.

### Modified Capabilities
<!-- Nenhuma capability existente tem seus requisitos alterados. -->

## Impact

- **Novo util** (ex.: `src/app/models/preco-teto.util.ts`) — cálculo puro de DPA(12m), teto e zona; testável isoladamente, no mesmo estilo de `dividends-received.util.ts`.
- **Novo serviço/estado de configuração** (ex.: `PrecoTetoConfigService`) — yield-alvo por classe + overrides + margem, persistidos em `localStorage` (padrão já usado para `radar-view`).
- **UI**: lista `.acoes-row` do dashboard (faixa `::before` = zona, caption "DY · −X% teto" sob o ticker, ordenação por desconto), `stock-details-modal` (seção "Preço-teto"). `StockCardComponent` é código morto e **não** será usado.
- **Dados**: usa `dividends` (`amount`/`pay_date`) e cotação já carregados; FII P/VP via `indicators` (degrada para só-yield se ausente). **Sem novo endpoint de backend.**
- **Não é recomendação de investimento** — exige disclaimer visível.
