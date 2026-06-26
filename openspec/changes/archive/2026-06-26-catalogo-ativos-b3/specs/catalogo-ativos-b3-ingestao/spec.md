## ADDED Requirements

### Requirement: Robô coleta o catálogo completo da B3

O backend Go SHALL prover um job de ingestão que coleta **todos** os ativos listados na B3 nas três categorias — **Ações**, **FIIs** e **ETFs** — e os persiste na base da API. Cada ativo coletado MUST conter, no mínimo, `ticker` (normalizado em maiúsculas) e `type` (`Acoes` | `FIIs` | `ETFs`), e SHALL incluir `name` e `sector` quando a fonte os fornecer. O `type` MUST ser derivado da listagem/segmento da B3, não de heurística por sufixo do ticker.

#### Scenario: Coleta cobre as três categorias

- **WHEN** o job de ingestão é executado com sucesso
- **THEN** a base passa a conter ativos com `type` igual a `Acoes`, `FIIs` e `ETFs`

#### Scenario: Tipo vem da listagem, não do sufixo

- **WHEN** uma unit de ação terminada em 11 (ex.: TAEE11, SANB11) é coletada
- **THEN** seu `type` registrado é `Acoes`

#### Scenario: Ticker normalizado

- **WHEN** um ativo é persistido
- **THEN** seu `ticker` é armazenado em maiúsculas e sem espaços

### Requirement: Persistência idempotente por ticker

A ingestão SHALL persistir os ativos na tabela `b3_assets` usando **upsert por ticker**, de modo que reexecuções não criem duplicatas e atualizem `name`, `type` e `sector` quando mudarem. Uma execução parcial ou com falha MUST NOT corromper o catálogo já existente.

#### Scenario: Reexecução não duplica

- **WHEN** o job roda duas vezes com o mesmo ticker na fonte
- **THEN** existe exatamente uma linha em `b3_assets` para aquele ticker

#### Scenario: Atualização de campos

- **WHEN** o nome ou setor de um ticker já existente muda na fonte e o job roda
- **THEN** a linha correspondente é atualizada sem alterar o identificador da linha

### Requirement: Execução sob demanda e agendada

O job de ingestão SHALL ser acionável **sob demanda** (ex.: endpoint administrativo ou comando) e SHALL ser **agendado** para refresh periódico do catálogo. Falha de uma execução agendada MUST NOT derrubar a API; o catálogo previamente persistido permanece disponível.

#### Scenario: Refresh agendado mantém o catálogo

- **WHEN** uma execução agendada falha ao baixar a fonte
- **THEN** a API continua respondendo com o catálogo da última ingestão bem-sucedida
