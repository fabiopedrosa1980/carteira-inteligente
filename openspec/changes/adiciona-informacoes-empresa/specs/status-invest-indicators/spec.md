## MODIFIED Requirements

### Requirement: Indicadores fundamentais via Investidor10

A API (backend Go) SHALL, em uma única requisição à página do ticker no Investidor10, extrair tanto os **Indicadores Fundamentalistas** (`#table-indicators`) quanto as **Informações sobre a empresa** (`#table-indicators-company`). Ambos SHALL ser obtidos no cadastro, persistidos no Stock (campos separados) e lidos do banco nas requisições de posições; na ausência, a tela não quebra. Cada item é um par rótulo/valor.

#### Scenario: Duas seções numa só busca
- **WHEN** o scraper processa a página de um ticker
- **THEN** retorna, da mesma página, a lista de indicadores fundamentalistas e a lista de informações da empresa

#### Scenario: Persistência e leitura
- **WHEN** um ticker é cadastrado (ou o sync periódico roda)
- **THEN** indicadores e informações da empresa são persistidos e servidos do banco nas posições
