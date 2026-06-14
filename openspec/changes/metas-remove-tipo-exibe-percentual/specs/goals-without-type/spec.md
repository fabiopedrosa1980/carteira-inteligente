## ADDED Requirements

### Requirement: Metas não possuem tipo
Uma meta NÃO DEVE ter campo de tipo nem ticker. O modelo, a API e o formulário DEVEM expor apenas nome e valor alvo.

#### Scenario: Criar meta sem tipo
- **WHEN** o usuário cria uma meta informando nome e valor alvo
- **THEN** a meta é persistida sem campos de tipo ou ticker e a requisição é aceita

#### Scenario: Formulário sem seletor de tipo
- **WHEN** o usuário abre o formulário de nova meta ou de edição
- **THEN** não há seletor de Tipo nem campo de Ticker, apenas Nome e Valor Alvo

### Requirement: Progresso sempre por patrimônio total
O progresso de qualquer meta DEVE ser calculado como `patrimônio total da carteira ÷ valor alvo`, limitado a 100%.

#### Scenario: Cálculo do progresso
- **WHEN** o patrimônio total do usuário é R$ 50.000 e a meta tem valor alvo R$ 100.000
- **THEN** o progresso retornado é 50%

#### Scenario: Progresso limitado a 100%
- **WHEN** o patrimônio total excede o valor alvo da meta
- **THEN** o progresso retornado é 100%

#### Scenario: Sem posições
- **WHEN** o usuário não possui posições em ações
- **THEN** o valor atual é 0 e o progresso é 0%

### Requirement: Migração remove colunas legadas
A inicialização do banco DEVE remover de forma best-effort as colunas legadas `type` e `ticker` da tabela `goals`, evitando falhas de insert pela antiga restrição `NOT NULL`.

#### Scenario: Banco legado com coluna type NOT NULL
- **WHEN** a tabela `goals` existente possui a coluna `type NOT NULL`
- **THEN** a coluna é removida na inicialização e novas metas podem ser inseridas sem informar tipo

#### Scenario: Banco novo sem colunas legadas
- **WHEN** a tabela `goals` é criada do zero pelo AutoMigrate
- **THEN** a tentativa de remover colunas inexistentes é ignorada sem erro fatal
