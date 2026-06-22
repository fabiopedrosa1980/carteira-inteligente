## ADDED Requirements

### Requirement: Alvos de alocação por classe configuráveis

O sistema SHALL permitir configurar o **alvo de alocação** (percentual) de cada classe (Ações / FIIs / ETFs). Os alvos MUST ser editáveis pelo usuário. Na ausência de configuração salva, defaults razoáveis MUST ser aplicados.

#### Scenario: Editar alvos

- **WHEN** o usuário ajusta o alvo de uma classe
- **THEN** os cálculos de desvio e rebalanceamento passam a usar o novo alvo

#### Scenario: Defaults na primeira utilização

- **WHEN** não há alvos salvos
- **THEN** alvos padrão por classe são aplicados

### Requirement: Limite de concentração configurável

O sistema SHALL permitir configurar o **limite de concentração** por ativo (percentual do patrimônio), com um default razoável. O limite MUST ser usado na detecção de concentração.

#### Scenario: Ajustar o limite

- **WHEN** o usuário altera o limite de concentração
- **THEN** a sinalização de ativos concentrados passa a usar o novo limite

### Requirement: Persistência dos alvos e do limite no backend

A configuração de alvos por classe e o limite de concentração SHALL ser **persistidos no backend** via o endpoint de alocação. Ao recarregar o app, a configuração MUST ser restaurada a partir do backend; na ausência de configuração, os defaults MUST ser aplicados. Enquanto o endpoint não estiver disponível, o app MUST degradar para os defaults sem quebrar a tela.

#### Scenario: Configuração restaurada do backend

- **WHEN** o usuário recarrega o app após salvar a configuração
- **THEN** os alvos e o limite são restaurados a partir do backend

#### Scenario: Backend indisponível

- **WHEN** o endpoint de alocação não responde
- **THEN** o app aplica os defaults e a tela de alocação continua funcional
