## ADDED Requirements

### Requirement: Colunas com largura proporcional
A tabela de histórico de dividendos DEVE definir larguras proporcionais para as colunas via `<colgroup>`, mantendo as proporções estáveis independentemente do conteúdo de cada linha.

#### Scenario: Larguras proporcionais aplicadas
- **WHEN** a tabela é renderizada com qualquer quantidade de linhas
- **THEN** as colunas Tipo, Data Com, Data de Pagamento e Valor mantêm larguras proporcionais fixas (somando 100%)

#### Scenario: Coluna Valor alinhada à direita
- **WHEN** a tabela exibe valores monetários
- **THEN** o cabeçalho e as células da coluna Valor são alinhados à direita

### Requirement: Campos exibidos formatados corretamente
A tabela DEVE exibir Tipo como badge (Dividendo em verde, JCP em amarelo), as datas Data Com e Data de Pagamento no formato `dd/MM/yyyy`, e o Valor em formato monetário BRL.

#### Scenario: Tipo como badge
- **WHEN** o registro é do tipo JCP
- **THEN** é exibido um badge amarelo com o texto "JCP"

#### Scenario: Datas formatadas
- **WHEN** uma data está presente
- **THEN** é exibida como `dd/MM/yyyy`; quando ausente, exibe "—"

#### Scenario: Valor em BRL
- **WHEN** o valor do dividendo é exibido
- **THEN** é formatado como moeda BRL (ex.: R$ 0,77)
