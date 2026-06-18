## Why

A tela de detalhes hoje mostra só os Indicadores Fundamentalistas. As "Informações sobre a empresa" do Investidor10 (valor de mercado, valor de firma, patrimônio líquido, ativos, dívida, liquidez, nº de papéis, etc.) também são úteis e devem aparecer numa seção própria. Para isso, o scraper precisa capturar também essa seção e o frontend precisa exibi-la.

## What Changes

- **Backend Go:** o scraper passa a capturar **também** a seção "Informações sobre a empresa" (`#table-indicators-company`), além dos Indicadores Fundamentalistas (`#table-indicators`), numa única requisição à página. Os dados são persistidos no Stock (campo separado) e servidos no payload de posições (`company_info`).
- **Frontend:** adicionar uma seção **"Informações sobre a empresa"** na tela de detalhes, separada dos Indicadores Fundamentalistas, com os pares rótulo/valor.

## Capabilities

### New Capabilities
- `company-info`: captura e exibição das informações da empresa (Investidor10) na tela de detalhes.

### Modified Capabilities
- `status-invest-indicators`: o scraper passa a extrair as duas seções (indicadores + informações da empresa) numa só busca.
- `stock-details-view`: tela de detalhes ganha a seção "Informações sobre a empresa".

## Impact

**Backend Go (`carteira-inteligente-api`):**
- `internal/infrastructure/scraper/investidor10.go` — `extractCompanyInfo` (`#table-indicators-company`) e função única que busca a página uma vez e retorna indicadores + informações.
- `internal/domain/stock.go` — campo `CompanyInfo []Indicator` persistido.
- `internal/domain/stock_repository.go` + `gorm_stock_repository.go` + `stock_service.go` — `UpdateCompanyInfo`.
- `internal/adapters/http/handler/stock_handler.go` — persistir indicadores + informações no cadastro/sync.
- `internal/adapters/http/handler/transaction_handler.go` — `AcaoItem.CompanyInfo` lido do banco.
- Mocks/testes de Stock.

**Frontend (este repo):**
- `src/app/models/stock.model.ts` — `companyInfo?: IndicatorItem[]`.
- `src/app/services/backend-api.service.ts` — `company_info` em `ApiAcaoItem`.
- `src/app/components/dashboard/dashboard.ts` — mapping.
- `src/app/components/stock-details-modal/*` — nova seção "Informações sobre a empresa".
