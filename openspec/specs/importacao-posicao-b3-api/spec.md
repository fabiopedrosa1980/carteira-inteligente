# importacao-posicao-b3-api Specification

## Purpose
TBD - created by archiving change importacao-planilha-b3. Update Purpose after archive.
## Requirements
### Requirement: Endpoint de importação de Posição da B3

A API Go SHALL expor `POST /api/v1/transactions/import` que aceita upload `multipart/form-data` de um único arquivo `.xlsx` no relatório de Posição da B3. O endpoint MUST validar que o arquivo é um `.xlsx` legível antes de processá-lo e rejeitar com erro 4xx quando o arquivo for inválido ou ausente.

#### Scenario: Upload válido aceito

- **WHEN** um arquivo `.xlsx` de Posição válido é enviado no campo do formulário
- **THEN** a API processa o arquivo e responde 2xx com o resumo da importação

#### Scenario: Arquivo ausente ou inválido

- **WHEN** a requisição não contém arquivo ou contém um arquivo que não é um `.xlsx` legível
- **THEN** a API responde com erro 4xx e mensagem descritiva
- **AND** a base de lançamentos permanece inalterada

### Requirement: Parsing das abas de Posição

O endpoint SHALL ler as posições das abas `Acoes`, `ETF` e `Empréstimos` do arquivo. Para `Acoes` e `ETF`, usa a coluna `Código de Negociação` como ticker, `Quantidade` como quantidade e `Preço de Fechamento` como preço. Para `Empréstimos`, usa o ticker contido na coluna `Produto`, `Quantidade` como quantidade, `Preço de Fechamento` como preço e a coluna `Natureza` para filtrar (ver requisito de empréstimos). Linhas sem ticker, de total/rodapé, ou com quantidade ≤ 0 MUST ser ignoradas. A aba `Tesouro Direto` MUST ser ignorada.

#### Scenario: Posições de Ações e ETF lidas

- **WHEN** o arquivo contém linhas válidas nas abas `Acoes` e `ETF`
- **THEN** cada linha válida gera uma posição com ticker, quantidade e preço de fechamento

#### Scenario: Posições de Empréstimos lidas

- **WHEN** o arquivo contém linhas válidas na aba `Empréstimos`
- **THEN** cada linha válida gera uma posição com ticker, quantidade, preço de fechamento e a natureza (`Doador`/`Tomador`)

#### Scenario: Linhas não-dados e aba fora de escopo ignoradas

- **WHEN** o arquivo contém linhas de total/rodapé, linhas vazias, ou a aba `Tesouro Direto`
- **THEN** essas linhas e a aba não geram lançamentos

### Requirement: Classificação de tipo por ticker

Para cada posição, o endpoint SHALL determinar o `asset_type` (`Acoes`, `FIIs` ou `ETFs`) a partir do catálogo/regra de classificação por ticker já usado pela API, e não apenas pela aba de origem. Tickers da aba `ETF` MUST ser classificados como `ETFs`; tickers da aba `Acoes` MUST ser classificados como `Acoes` ou `FIIs` conforme a classificação do ticker.

#### Scenario: ETF classificado como ETFs

- **WHEN** uma posição vem da aba `ETF` (ex.: `IVVB11`)
- **THEN** o lançamento criado tem `asset_type = ETFs`

#### Scenario: Ticker da aba Acoes classificado por catálogo

- **WHEN** uma posição vem da aba `Acoes` e o ticker é classificado como FII pelo catálogo
- **THEN** o lançamento criado tem `asset_type = FIIs`

### Requirement: Sobreposição atômica dos lançamentos

O endpoint SHALL substituir integralmente os lançamentos existentes pelos derivados da planilha: apagar todos os lançamentos atuais e criar um lançamento sintético por posição importada. A operação MUST ser atômica — se o parsing ou a gravação falhar, nenhum lançamento existente pode ser perdido.

#### Scenario: Base substituída pelas posições importadas

- **WHEN** o arquivo é processado com sucesso
- **THEN** todos os lançamentos anteriores são removidos
- **AND** existe exatamente um lançamento por posição importada, com a quantidade da planilha, o preço de fechamento como preço e a data do relatório como data

#### Scenario: Falha não destrói a base atual

- **WHEN** ocorre erro durante o parsing ou a gravação
- **THEN** os lançamentos existentes antes da importação são preservados
- **AND** a API responde com erro

### Requirement: Resposta com resumo da importação

A resposta de sucesso SHALL incluir um resumo com o total de posições importadas por classe (`Acoes`, `FIIs`, `ETFs`) e a lista de tickers ignorados (com o motivo, quando aplicável), para que a tela possa exibi-lo ao usuário.

#### Scenario: Resumo retornado

- **WHEN** a importação é concluída com sucesso
- **THEN** a resposta inclui a contagem de lançamentos criados por classe
- **AND** inclui a lista de tickers ignorados

### Requirement: Empréstimo de ativos (natureza Doador)

Na aba `Empréstimos`, o endpoint SHALL incluir como posição do investidor apenas as linhas com natureza **`Doador`** (ativos emprestados pelo investidor, que continuam de sua propriedade). Linhas com natureza **`Tomador`** (ativos tomados emprestados) MUST ser ignoradas. As posições de `Doador` MUST ser classificadas em `Acoes`/`FIIs` pelo catálogo, da mesma forma que as posições da aba `Acoes`.

#### Scenario: Posição emprestada como Doador é incluída

- **WHEN** uma linha da aba `Empréstimos` tem natureza `Doador` (ex.: BBSE3, 71 cotas)
- **THEN** ela gera um lançamento com o ticker, a quantidade e o preço de fechamento da linha
- **AND** o `asset_type` é definido pelo catálogo (`Acoes` ou `FIIs`)

#### Scenario: Posição tomada como Tomador é ignorada

- **WHEN** uma linha da aba `Empréstimos` tem natureza `Tomador`
- **THEN** ela não gera lançamento

### Requirement: Agregação de quantidade por ticker entre abas

Quando o mesmo ticker aparece em mais de uma aba (ex.: parte disponível em `Acoes` e parte emprestada em `Empréstimos`), o endpoint SHALL gerar **um único lançamento** por ticker, com a **soma** das quantidades das ocorrências. O preço do lançamento MUST ser o `Preço de Fechamento` do ticker e o `asset_type` MUST ser único por ticker (definido pela classificação).

#### Scenario: Quantidades somadas para ticker em duas abas

- **WHEN** um ticker aparece na aba `Acoes` com N cotas e na aba `Empréstimos` (Doador) com M cotas
- **THEN** o lançamento importado desse ticker tem quantidade N + M
- **AND** existe apenas um lançamento para esse ticker

#### Scenario: Ticker presente em uma única aba

- **WHEN** um ticker aparece em apenas uma das abas
- **THEN** o lançamento reflete a quantidade dessa aba, sem alteração

