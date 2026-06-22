## ADDED Requirements

### Requirement: Alocação atual por classe

O sistema SHALL calcular a **alocação atual** da carteira por classe (Ações / FIIs / ETFs) como o percentual que o `saldo` de cada classe representa do **patrimônio total** (soma dos saldos de todas as posições). Posições sem saldo válido (sem cotação ou quantidade) MUST ser desconsideradas. Quando o patrimônio total é zero, o cálculo MUST retornar zero para todas as classes sem erro.

#### Scenario: Percentual por classe

- **WHEN** a carteira tem posições em mais de uma classe
- **THEN** cada classe recebe o percentual do seu saldo sobre o patrimônio total
- **AND** a soma dos percentuais das classes é 100% (quando há saldo)

#### Scenario: Carteira vazia

- **WHEN** não há posições com saldo válido
- **THEN** a alocação de todas as classes é zero, sem erro

### Requirement: Desvio vs alvo e montante de rebalanceamento

O sistema SHALL comparar a alocação atual de cada classe ao **alvo configurado** e expor o **desvio** (atual − alvo, em pontos percentuais) e o **montante em R$** necessário para a classe atingir o alvo. Aporte (classe abaixo do alvo) e venda (classe acima do alvo) MUST ser tratados com o mesmo peso (sem lógica fiscal). Classes dentro de uma tolerância configurável do alvo MUST ser sinalizadas como "no alvo".

#### Scenario: Classe abaixo do alvo

- **WHEN** uma classe está abaixo do seu alvo
- **THEN** o desvio é negativo e o montante indica quanto aportar para convergir

#### Scenario: Classe acima do alvo

- **WHEN** uma classe está acima do seu alvo
- **THEN** o desvio é positivo e o montante indica quanto reduzir para convergir

#### Scenario: Classe no alvo

- **WHEN** a alocação de uma classe está dentro da tolerância do alvo
- **THEN** a classe é marcada como "no alvo", sem ação sugerida

### Requirement: Detecção de concentração por ativo

O sistema SHALL identificar ativos cujo `saldo` ultrapassa um **limite de concentração** (percentual do patrimônio total, configurável). Cada ativo acima do limite MUST ser reportado com seu percentual atual.

#### Scenario: Ativo acima do limite

- **WHEN** um único ativo representa mais que o limite de concentração do patrimônio
- **THEN** o ativo é sinalizado como concentração, com seu percentual

#### Scenario: Sem concentração

- **WHEN** nenhum ativo ultrapassa o limite
- **THEN** nenhuma concentração é sinalizada
