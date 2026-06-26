# transacao-tipo-validado-backend Specification

## Purpose
TBD - created by archiving change lancamento-valida-tipo-catalogo. Update Purpose after archive.
## Requirements
### Requirement: API valida o tipo do lançamento contra o catálogo

Na criação de uma transação (`POST /api/v1/transactions`), a API Go SHALL validar o `asset_type` enviado contra o catálogo `b3_assets`. Quando o ticker existir no catálogo e o tipo do catálogo divergir do `asset_type` enviado, a API MUST **rejeitar** a criação com HTTP 422 e mensagem clara de incompatibilidade. Quando o ticker não existir no catálogo, a API MUST **aceitar** o lançamento (validação conservadora, sem bloquear ativos fora do catálogo). A checagem MUST NOT depender de consulta externa — usa apenas o catálogo local.

#### Scenario: Tipo confirmado pelo catálogo é aceito

- **WHEN** o catálogo classifica o ticker como `Acoes` e o lançamento envia `asset_type: "Acoes"` (ex.: TAEE11)
- **THEN** a transação é criada (HTTP 201)

#### Scenario: Tipo divergente é rejeitado

- **WHEN** o catálogo classifica o ticker como `ETFs` e o lançamento envia `asset_type: "FIIs"` (ex.: BOVA11)
- **THEN** a criação é rejeitada com HTTP 422 e mensagem de incompatibilidade

#### Scenario: Ticker fora do catálogo é aceito

- **WHEN** o ticker não existe em `b3_assets`
- **THEN** a transação é criada normalmente (sem bloqueio por tipo)

