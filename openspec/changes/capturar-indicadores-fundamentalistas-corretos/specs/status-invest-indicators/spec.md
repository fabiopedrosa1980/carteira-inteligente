## MODIFIED Requirements

### Requirement: Indicadores fundamentais via Investidor10

A API (backend Go) SHALL obter os indicadores **fundamentalistas** de um ticker a partir da seção de Indicadores Fundamentalistas do Investidor10 (`#table-indicators`) — ex.: P/L, P/VP, ROE, ROA, ROIC, DY, Payout, margens, EV/EBITDA, Dív. líquida/PL, LPA, VPA — e NÃO a partir da seção "Informações sobre a empresa". Os indicadores SHALL ser obtidos no cadastro, persistidos no Stock e lidos do banco nas requisições de posições; na ausência, a tela não quebra. Cada indicador é um par rótulo/valor; o valor é o número do ativo (ignorando as médias de Setor/Subsetor).

#### Scenario: Captura da seção correta
- **WHEN** o scraper processa a página de um ticker
- **THEN** extrai os indicadores fundamentalistas (P/L, P/VP, ROE, DY, margens, etc.) da seção de indicadores, e não os dados de "Informações sobre a empresa"

#### Scenario: Valor do ativo, sem médias de setor
- **WHEN** um card de indicador inclui as médias de Setor/Subsetor
- **THEN** apenas o valor do próprio ativo é capturado como valor do indicador

#### Scenario: Persistência e leitura
- **WHEN** um ticker é cadastrado (ou o sync periódico roda)
- **THEN** os indicadores fundamentalistas corretos são persistidos e servidos do banco nas posições
