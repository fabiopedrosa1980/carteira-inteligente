## Why

As telas de carteira mostram preço médio, saldo e variação, mas nunca a **cotação atual** (preço unitário corrente) de cada ticker — o usuário não consegue comparar de imediato quanto pagou (preço unit./médio) com quanto o ativo vale agora. Além disso, o cabeçalho do acordeão de "Lançamentos" exibe um total sem rótulo e sem rentabilidade (diferente do acordeão de "Meus Ativos"), e os valores do cabeçalho de "Meus Ativos" aparecem sem rótulo que os identifique. Por fim, a carteira mostra "Dividendos Recebidos", mas não os **dividendos ainda a receber** no ano, que já existem calculados na tela de Dividendos → Projetados.

## What Changes

- **Coluna de Preço Atual (cotação)** em ambas as telas:
  - "Meus Ativos" (aba `portfolio`): nova coluna de cotação corrente do ticker (`stock.price`) na tabela de ativos.
  - "Lançamentos" (componente `my-assets`): nova coluna de preço atual do ticker em cada linha, resolvida pela cotação da carteira (`StockDataService`).
- **Cabeçalho do acordeão de "Lançamentos"** passa a exibir o **total com rótulo** e a **rentabilidade do tipo**, com o **valor total alinhado à direita** — alinhando ao padrão do acordeão de "Meus Ativos".
- **Cabeçalho do acordeão de "Meus Ativos"** ganha **rótulos descritivos** no total e na rentabilidade (ex.: "Total" e "Rent."), em vez de apenas os números justapostos.
- **Card "Dividendos a receber"** nos cards de Patrimônio de "Meus Ativos", calculado com a mesma lógica de Dividendos → Projetados (proventos do ano corrente com pagamento de hoje em diante × cotas atuais).

## Capabilities

### New Capabilities
- `meus-ativos-coluna-preco-atual`: coluna de cotação atual do ticker nas tabelas das telas "Meus Ativos" e "Lançamentos".
- `lancamentos-acordeao-rentabilidade`: cabeçalho do acordeão de "Lançamentos" exibe total rotulado e rentabilidade do tipo, com o total alinhado à direita.
- `dividendos-a-receber-card`: card de "Dividendos a receber" (projetados do ano) nos cards de Patrimônio de "Meus Ativos".

### Modified Capabilities
- `meus-ativos-rentabilidade-por-tipo`: o total e a rentabilidade no cabeçalho do acordeão passam a ter rótulos descritivos que os identifiquem.

## Impact

- **Frontend (Angular)**:
  - `src/app/components/dashboard/dashboard.html` / `dashboard.ts` / `dashboard.scss` — coluna de preço atual na tabela de Meus Ativos, rótulos no cabeçalho do acordeão e novo card de Dividendos a receber.
  - `src/app/components/my-assets/my-assets.html` / `my-assets.ts` / `my-assets.scss` — coluna de preço atual por lançamento e novo cabeçalho (total rotulado + rentabilidade + alinhamento à direita).
- **Serviços**: leitura de `StockDataService.stocks()` (cotação/preço atual por ticker) já disponível; reutilização da lógica de projeção de dividendos hoje em `DividendsSummaryComponent` (modo `projected`), idealmente extraída para util compartilhado em `src/app/models/dividends-received.util.ts`.
- **Sem mudanças de backend/API.** Nenhuma alteração de contrato externo.
