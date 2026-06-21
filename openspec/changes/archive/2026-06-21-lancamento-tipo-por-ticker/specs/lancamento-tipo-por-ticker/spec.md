## ADDED Requirements

### Requirement: Detecção do tipo de ativo a partir do ticker

A aplicação SHALL detectar o tipo de ativo a partir do ticker: sufixo **3, 4, 5, 6, 7 ou 8** → **Ações**; sufixo **11** → **ETF** quando o ticker pertencer a uma **lista de ETFs conhecidos da B3**, caso contrário → **FII**. Quando o sufixo não for reconhecido, o tipo é **indeterminado**. Essa detecção MUST ser a base tanto da sugestão de tipo quanto da validação.

#### Scenario: Ação detectada

- **WHEN** o ticker termina em 3/4/5/6/7/8 (ex.: PETR4, VALE3)
- **THEN** o tipo detectado é "Ações"

#### Scenario: ETF detectado por lista

- **WHEN** o ticker termina em 11 e está na lista de ETFs conhecidos (ex.: BOVA11, IVVB11)
- **THEN** o tipo detectado é "ETFs"

#### Scenario: FII detectado

- **WHEN** o ticker termina em 11 e não está na lista de ETFs (ex.: MXRF11, HGLG11)
- **THEN** o tipo detectado é "FIIs"

### Requirement: Campo Tipo sugere o tipo detectado

No modal de lançamento, quando o tipo **não está travado** pela seção de origem, ao informar/resolver o ticker a aplicação SHALL **preencher o campo "Tipo de Ativo" com o tipo detectado**, em vez do valor genérico "Selecione...". O usuário MUST poder alterar manualmente o tipo sugerido.

#### Scenario: Sugestão preenchida ao digitar o ticker

- **WHEN** o usuário informa um ticker reconhecido e o tipo não está travado
- **THEN** o campo "Tipo de Ativo" é preenchido com o tipo detectado

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
