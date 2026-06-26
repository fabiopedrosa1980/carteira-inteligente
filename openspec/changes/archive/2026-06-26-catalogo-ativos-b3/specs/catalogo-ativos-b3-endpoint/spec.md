## ADDED Requirements

### Requirement: Resolução de ticker pelo catálogo local

O backend SHALL prover `GET /api/v1/assets/:ticker` que resolve um ticker **exclusivamente a partir da tabela `b3_assets`**, sem qualquer chamada a serviço externo. A resposta MUST conter `ticker`, `name`, `type` (`Acoes` | `FIIs` | `ETFs`) e `sector` (vazio quando desconhecido). Para ticker inexistente no catálogo, o endpoint SHALL responder de forma não-encontrada (ex.: 404 ou payload com indicador de ausência), sem recorrer a fonte externa.

#### Scenario: Ticker presente no catálogo

- **WHEN** o cliente chama `GET /assets/TAEE11`
- **THEN** a resposta traz `type: "Acoes"`, `name` e `sector` do catálogo, sem consulta externa

#### Scenario: Ticker ausente do catálogo

- **WHEN** o cliente chama `GET /assets/XXXX99` e o ticker não existe em `b3_assets`
- **THEN** a resposta indica ausência (não-encontrado) e nenhuma chamada externa é feita

### Requirement: Busca de tickers pelo catálogo local

O backend SHALL prover `GET /api/v1/assets/search?q=<termo>` que retorna sugestões de ticker a partir de `b3_assets`, casando por prefixo de `ticker` e/ou `name`. A resposta MUST ser uma lista de itens com `ticker`, `name` e `type`. Em termo vazio ou sem correspondência, a resposta SHALL ser uma **lista vazia** (sem erro).

#### Scenario: Busca por prefixo retorna sugestões

- **WHEN** o cliente chama `GET /assets/search?q=TAEE`
- **THEN** a lista inclui `TAEE11` com `type: "Acoes"`

#### Scenario: Sem correspondência retorna lista vazia

- **WHEN** o termo não casa com nenhum ativo do catálogo
- **THEN** a resposta é uma lista vazia e status de sucesso

### Requirement: Cotação enriquecida com o tipo do catálogo

Os endpoints `GET /api/v1/quote/:ticker` e `GET /api/v1/quotes` SHALL preencher o campo `assetType` consultando `b3_assets` localmente. O preço e demais dados de mercado continuam vindo da fonte de cotação externa, mas a **classificação do tipo** MUST vir do catálogo. Quando o ticker não estiver no catálogo, `assetType` SHALL ser vazio (`""`) e o front aplica seu fallback.

#### Scenario: assetType vem do catálogo

- **WHEN** `GET /quote/TAEE11` é chamado e TAEE11 está no catálogo como `Acoes`
- **THEN** a resposta de cotação traz `assetType: "Acoes"`

#### Scenario: Ticker fora do catálogo não inventa tipo

- **WHEN** `GET /quote/<ticker>` é chamado para um ticker ausente de `b3_assets`
- **THEN** `assetType` retorna `""`
