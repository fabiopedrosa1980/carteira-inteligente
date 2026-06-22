## ADDED Requirements

### Requirement: Endpoint de configuração de alocação (dependência externa)

O backend SHALL expor um endpoint REST para **ler e gravar** a configuração de alocação da carteira (alvos por classe + limite de concentração). Este requisito é uma **dependência externa**: o backend é um serviço Go separado (`carteira-inteligente-api.onrender.com`), fora deste repositório. O frontend é construído contra este contrato e degrada para defaults enquanto o endpoint não existir.

- `GET /api/v1/allocation` → `{ targets: { Acoes: number, FIIs: number, ETFs: number }, concentrationLimit: number }` (percentuais).
- `PUT /api/v1/allocation` com o mesmo shape no corpo → persiste e retorna a configuração salva.
- Na ausência de configuração salva, o `GET` MAY retornar defaults ou vazio; o frontend MUST aplicar defaults nesse caso.

#### Scenario: Ler configuração

- **WHEN** o frontend chama `GET /api/v1/allocation`
- **THEN** recebe os alvos por classe e o limite de concentração

#### Scenario: Gravar configuração

- **WHEN** o frontend envia `PUT /api/v1/allocation` com alvos e limite válidos
- **THEN** o backend persiste e retorna a configuração salva
