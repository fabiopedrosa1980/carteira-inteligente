# lancamento-tipo-por-ticker Specification

## Purpose
TBD - created by archiving change lancamento-tipo-por-ticker. Update Purpose after archive.
## Requirements
### Requirement: Detecção do tipo de ativo a partir do ticker

A aplicação SHALL determinar o tipo de ativo preferencialmente a partir do **catálogo da B3** informado pelo backend (campo `assetType` da cotação ou endpoint `/assets/:ticker`). A heurística por sufixo do ticker (sufixo **3, 4, 5, 6, 7 ou 8** → **Ações**; sufixo **11** → **ETF** quando o ticker pertencer à lista de ETFs conhecidos, caso contrário **indeterminado**) MUST ser usada apenas como **fallback offline**, quando o catálogo não respondeu ou não conhece o ticker. Quando nenhuma fonte determinar o tipo, ele é **indeterminado**.

#### Scenario: Tipo do catálogo tem prioridade

- **WHEN** o backend informa `assetType` para o ticker (ex.: TAEE11 → "Acoes")
- **THEN** esse tipo é usado, ignorando a heurística por sufixo

#### Scenario: Fallback usa a heurística por sufixo

- **WHEN** o catálogo não respondeu e o ticker termina em 3/4/5/6/7/8 (ex.: PETR4)
- **THEN** o tipo detectado pelo fallback é "Ações"

#### Scenario: Indeterminado sem catálogo nem sufixo conhecido

- **WHEN** o catálogo não conhece o ticker e o sufixo não é reconhecido pela heurística
- **THEN** o tipo é indeterminado

### Requirement: Campo Tipo sugere o tipo detectado

No modal de lançamento, quando o tipo **não está travado** pela seção de origem, ao informar/resolver o ticker a aplicação SHALL **preencher o campo "Tipo de Ativo"** com o tipo vindo do catálogo (`assetType`) quando presente, recorrendo à heurística por sufixo apenas como fallback. O usuário MUST poder alterar manualmente o tipo sugerido.

#### Scenario: Sugestão preenchida com o tipo do catálogo

- **WHEN** o usuário informa um ticker e o catálogo retorna seu tipo
- **THEN** o campo "Tipo de Ativo" é preenchido com o tipo do catálogo

#### Scenario: Sugestão por fallback quando catálogo ausente

- **WHEN** o catálogo não respondeu e o sufixo do ticker é reconhecido
- **THEN** o campo "Tipo de Ativo" é preenchido com o tipo do fallback

#### Scenario: Tipo travado pela seção não é sobrescrito

- **WHEN** o lançamento é aberto a partir de uma seção que trava o tipo
- **THEN** o tipo permanece o da seção (a sugestão não sobrescreve)

#### Scenario: Override manual

- **WHEN** o usuário troca manualmente o tipo sugerido
- **THEN** o valor escolhido pelo usuário é mantido

### Requirement: Validação distingue FII de ETF

Ao salvar, a aplicação SHALL **impedir o salvamento** quando o tipo escolhido **divergir do tipo detectado** pelo ticker, exibindo mensagem clara. Isso MUST incluir a distinção **FII vs ETF**: um ticker de FII não pode ser salvo como ETF e vice-versa. Quando o tipo for indeterminado (sufixo não reconhecido), a validação por tipo MUST NOT bloquear.

#### Scenario: Bloqueia FII salvo como ETF

- **WHEN** o ticker é de FII (11 fora da lista de ETFs) e o tipo escolhido é "ETFs"
- **THEN** o salvamento é impedido com mensagem de incompatibilidade

#### Scenario: Bloqueia ETF salvo como FII

- **WHEN** o ticker está na lista de ETFs e o tipo escolhido é "FIIs"
- **THEN** o salvamento é impedido com mensagem de incompatibilidade

#### Scenario: Bloqueia ação com tipo errado

- **WHEN** o ticker é de ação e o tipo escolhido é "FIIs" ou "ETFs" (ou vice-versa)
- **THEN** o salvamento é impedido

#### Scenario: Tipo indeterminado não bloqueia

- **WHEN** o ticker tem sufixo não reconhecido
- **THEN** a validação por tipo não bloqueia o salvamento

