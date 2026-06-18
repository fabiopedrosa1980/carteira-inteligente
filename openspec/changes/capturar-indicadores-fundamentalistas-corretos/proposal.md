## Why

A tela de detalhes mostra, sob o título "Indicadores fundamentalistas", dados que na verdade são da seção "Informações sobre a empresa" do Investidor10 (valor de mercado, patrimônio, ativos, dívida…). Os indicadores fundamentalistas de fato (P/L, P/VP, ROE, DY, margens, EV/EBITDA, Dív. líquida/PL etc.) ficam em outra seção da página (`#table-indicators`), com estrutura HTML diferente, e por isso não estão sendo capturados. É preciso corrigir o scraper para capturar a seção correta e organizar a exibição.

## What Changes

- **Backend Go:** o scraper do Investidor10 passa a extrair os indicadores **da seção `#table-indicators`** (Indicadores Fundamentalistas), adaptando-se à sua estrutura (`.cell` com `<span>` de rótulo + `.value > <span>` de valor), ignorando as médias de Setor/Subsetor. Deixa de capturar a seção "Informações sobre a empresa".
- **Frontend:** organizar a tela de detalhes para os rótulos fundamentalistas (alguns mais longos), permitindo que o rótulo quebre em até 2 linhas sem cortar, mantendo o grid de 4 cards por linha.

## Capabilities

### New Capabilities
<!-- Nenhuma capability nova. -->

### Modified Capabilities
- `status-invest-indicators`: o scraper captura a seção correta (indicadores fundamentalistas), não as informações da empresa.
- `stock-details-view`: organização dos cards de indicadores para rótulos fundamentalistas.

## Impact

**Backend Go (`carteira-inteligente-api`):**
- `internal/infrastructure/scraper/investidor10.go` — `extractIndicators` escopado a `#table-indicators` com parsing adaptado; helpers de busca por id e primeiro `<span>`.

**Frontend (este repo):**
- `src/app/components/stock-details-modal/stock-details-modal.scss` — rótulo do indicador com quebra em até 2 linhas (sem ellipsis cortando), alinhamento ajustado.

**Operação:** os indicadores persistidos serão recapturados no próximo boot/sync do serviço (re-scrape).
