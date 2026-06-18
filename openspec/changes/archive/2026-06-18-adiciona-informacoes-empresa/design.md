## Context

Investidor10 (confirmado no HTML real):
- `#table-indicators` → Indicadores Fundamentalistas (`.cell` com 1º `<span>` rótulo + `.value > <span>` valor). Já capturado por `extractIndicators`.
- `#table-indicators-company` → Informações sobre a empresa (`.cell` com `<span class="title">` rótulo + `<span class="value">` contendo `.simple-value` abreviado + `.detail-value` completo).

Hoje o fluxo de import (`importDividendsForStock`) chama `scraper.FetchIndicators(ticker, fii)` → `UpdateIndicators`; `respondPositions` lê `Indicators` do catálogo. O `domain.Stock` já tem `Indicators []Indicator gorm:"serializer:json"`.

## Goals / Non-Goals

**Goals:**
- Capturar também as informações da empresa, numa única busca à página.
- Persistir e servir `company_info`.
- Exibir a seção "Informações sobre a empresa" na tela de detalhes.

**Non-Goals:**
- Buscar a página duas vezes (uma só requisição extrai as duas seções).
- Trazer as médias de Setor/Subsetor dos indicadores.

## Decisions

**1. Scraper: extrair as duas seções numa só busca.**
Refatorar `FetchIndicators` para `FetchProfile(ticker, fii) (indicators, companyInfo []domain.Indicator, err error)`: baixa e parseia a página uma vez, retornando `extractIndicators(doc)` (`#table-indicators`) e `extractCompanyInfo(doc)` (`#table-indicators-company`). `extractCompanyInfo` usa `.title` (rótulo) e `.value` preferindo `.simple-value` (evita o valor duplicado). Manter `FetchIndicators` como wrapper se necessário para compatibilidade, ou ajustar os chamadores.

**2. Persistência.**
`domain.Stock.CompanyInfo []Indicator gorm:"serializer:json" json:"company_info,omitempty"`. Repo/serviço: `UpdateCompanyInfo(id, []Indicator)` (espelha `UpdateIndicators`). No `importDividendsForStock`, chamar `FetchProfile` uma vez e persistir indicadores + informações.

**3. Leitura nas posições.**
`AcaoItem.CompanyInfo []Indicator json:"company_info,omitempty"`. Em `respondPositions`, montar `companyInfoByTicker` a partir do `FindAll` e atribuir.

**4. Frontend.**
- Modelo: `Stock.companyInfo?: IndicatorItem[]`; `ApiAcaoItem.company_info?`; mapping no `loadAcoes`.
- Tela: nova `<section>` "Informações sobre a empresa" abaixo dos indicadores. Como os valores são mais largos ("R$ 528,46 Bilhões"), usar um grid de 2 colunas (responsivo a 1 no mobile) com rótulo e valor; sem `formatValue` (valores já vêm legíveis/abreviados). Reaproveitar estilos de `.indicator`/`.indicators-grid` com uma variante mais larga.

**5. Re-scrape.**
Após o deploy, boot/sync recaptura e persiste indicadores + informações.

## Risks / Trade-offs

- [Estrutura do Investidor10 muda] → best-effort; ausência de seção → lista vazia, tela não quebra.
- [Migração de coluna nova `company_info`] → AutoMigrate adiciona; registros antigos preenchem no próximo sync.
- [Mais dados no payload] → pequeno; ambos vêm do banco, sem custo de scraping por requisição.
