## ADDED Requirements

### Requirement: Card de alocação no topo de Meus Ativos

O sistema SHALL exibir um **card "Alocação"** no topo da aba **Meus Ativos**, mostrando, por classe: o **percentual atual**, uma **barra** proporcional, o **alvo** e o **desvio** (com o montante em R$ para rebalancear). O card MUST indicar visualmente as classes que precisam de aporte, as que estão acima do alvo e as que estão no alvo.

#### Scenario: Card mostra alocação e desvios

- **WHEN** a aba Meus Ativos é aberta com posições
- **THEN** o card de Alocação mostra o percentual, alvo e desvio de cada classe

#### Scenario: Carteira vazia

- **WHEN** não há posições com saldo
- **THEN** o card de Alocação não exibe valores enganosos (estado vazio ou ocultação)

### Requirement: Alerta de concentração no card

O card de Alocação SHALL exibir um **alerta de concentração** listando os ativos que ultrapassam o limite configurado, com o percentual de cada um.

#### Scenario: Concentração sinalizada

- **WHEN** algum ativo está acima do limite de concentração
- **THEN** o card mostra um alerta com o(s) ativo(s) e seu(s) percentual(is)

### Requirement: Edição dos alvos e do limite

O card SHALL oferecer uma forma de **editar os alvos por classe e o limite de concentração** (inline ou modal). Ao salvar, a configuração MUST ser persistida e os cálculos MUST refletir os novos valores.

#### Scenario: Editar e salvar

- **WHEN** o usuário edita os alvos/limite e salva
- **THEN** o card recalcula desvios/alertas com os novos valores e a configuração é persistida
