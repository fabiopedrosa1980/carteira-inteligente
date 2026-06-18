## ADDED Requirements

### Requirement: Informações sobre a empresa

A API (backend Go) SHALL capturar as "Informações sobre a empresa" do Investidor10 (seção `#table-indicators-company`) — ex.: valor de mercado, valor de firma, patrimônio líquido, ativos, dívida, liquidez média diária, nº de papéis — como pares rótulo/valor (valor abreviado de `.simple-value`), persisti-las no Stock e servi-las no payload de posições (`company_info`). O frontend SHALL exibi-las numa seção própria "Informações sobre a empresa" na tela de detalhes.

#### Scenario: Captura das informações da empresa
- **WHEN** o scraper processa a página de um ticker
- **THEN** extrai as informações da empresa (valor de mercado, patrimônio, ativos, etc.) da seção `#table-indicators-company`

#### Scenario: Seção própria na tela
- **WHEN** a tela de detalhes é exibida e há informações da empresa
- **THEN** elas aparecem numa seção "Informações sobre a empresa", separada dos Indicadores Fundamentalistas

#### Scenario: Ausência não quebra
- **WHEN** não há informações da empresa para o ativo
- **THEN** a seção não é exibida e a tela funciona normalmente
