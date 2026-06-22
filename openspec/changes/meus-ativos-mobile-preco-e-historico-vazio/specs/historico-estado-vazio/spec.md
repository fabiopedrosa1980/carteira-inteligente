## ADDED Requirements

### Requirement: Mensagem de estado vazio no Histórico sem posições

Na tela de **Histórico**, quando não há nenhuma posição/dado de histórico a exibir — ou seja, terminou o carregamento das posições (`loadingPositions` falso), não há erro, não há processamento pendente e a lista de posições visíveis está vazia — o sistema SHALL exibir uma **mensagem de estado vazio** orientando o usuário (ex.: cadastrar lançamentos para ver o histórico de dividendos), em vez de não mostrar nada. A mensagem MUST seguir o padrão visual de estado vazio já usado no app e MUST desaparecer assim que houver posições. Os estados de carregamento, erro e processamento já existentes MUST continuar tendo precedência sobre a mensagem de vazio.

#### Scenario: Carteira sem posições

- **WHEN** o Histórico termina de carregar e não há nenhuma posição visível, sem erro nem processamento
- **THEN** a tela exibe uma mensagem de estado vazio orientando o usuário
- **AND** não exibe seletores de ativo/ano nem tabela

#### Scenario: Precedência dos demais estados

- **WHEN** o Histórico está carregando, em erro, ou com histórico em processamento
- **THEN** a mensagem de estado vazio NÃO é exibida (esses estados têm precedência)

#### Scenario: Some ao haver posições

- **WHEN** passa a existir ao menos uma posição visível
- **THEN** a mensagem de estado vazio deixa de ser exibida e os seletores/tabela aparecem normalmente
