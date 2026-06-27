## MODIFIED Requirements

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

## ADDED Requirements

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
