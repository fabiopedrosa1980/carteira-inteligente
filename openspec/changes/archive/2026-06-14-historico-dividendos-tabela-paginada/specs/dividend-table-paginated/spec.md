## ADDED Requirements

### Requirement: Tabela de dividendos com colunas Tipo, Data Com, Data de Pagamento e Valor
A tela de Dividendos SHALL exibir os registros em tabela (não em cards), com as colunas: Tipo (JCP | Dividendo), Data Com, Data de Pagamento e Valor (formatado em R$).

#### Scenario: Tabela renderiza dividendos do ativo selecionado
- **WHEN** o usuário acessa a aba de Dividendos com pelo menos um ativo cadastrado
- **THEN** é exibida uma tabela com linhas contendo Tipo, Data Com, Data de Pagamento e Valor para cada dividendo

#### Scenario: Coluna Tipo exibe badge diferenciado
- **WHEN** um dividendo tem `type` igual a "JCP"
- **THEN** a célula Tipo exibe um badge visualmente distinto de "Dividendo"

#### Scenario: Valores monetários formatados em BRL
- **WHEN** a tabela exibe a coluna Valor
- **THEN** o valor é formatado em Real brasileiro com 2 casas decimais (ex: R$ 1,23)

#### Scenario: Datas formatadas em dd/MM/yyyy
- **WHEN** a tabela exibe Data Com ou Data de Pagamento
- **THEN** as datas são exibidas no formato brasileiro dd/MM/yyyy

### Requirement: Paginação client-side com 10 itens por página
A tabela de dividendos SHALL ser paginada, exibindo no máximo 10 registros por página, com controles de navegação (anterior / próxima / número de página).

#### Scenario: Mais de 10 dividendos exibe paginação
- **WHEN** o ativo possui mais de 10 dividendos
- **THEN** apenas os 10 primeiros são exibidos e os controles de paginação ficam visíveis

#### Scenario: Menos de 10 dividendos oculta paginação
- **WHEN** o ativo possui 10 ou menos dividendos
- **THEN** todos os registros são exibidos e os controles de paginação não aparecem

#### Scenario: Navegar para próxima página
- **WHEN** o usuário clica em "próxima"
- **THEN** a tabela exibe os próximos 10 registros; se já está na última página, o botão fica desabilitado

#### Scenario: Navegar para página anterior
- **WHEN** o usuário clica em "anterior"
- **THEN** a tabela exibe os 10 registros anteriores; se está na primeira página, o botão fica desabilitado

### Requirement: Estado vazio quando não há dividendos
A tabela SHALL exibir uma mensagem de estado vazio quando o ativo não possuir dividendos cadastrados.

#### Scenario: Nenhum dividendo cadastrado
- **WHEN** o ativo selecionado não possui dividendos
- **THEN** a tabela exibe a mensagem "Nenhum dividendo encontrado" no lugar das linhas
