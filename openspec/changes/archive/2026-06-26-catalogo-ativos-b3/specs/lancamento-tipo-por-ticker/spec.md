## MODIFIED Requirements

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
