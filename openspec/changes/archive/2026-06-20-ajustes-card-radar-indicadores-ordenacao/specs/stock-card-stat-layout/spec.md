## ADDED Requirements

### Requirement: Nota alinhada à linha do ticker no card

No card de ação, a Nota (exibida no topo, alinhada à direita) SHALL ficar **alinhada à linha do ticker**, e não centralizada verticalmente entre o ticker e o nome da empresa. O alinhamento MUST manter a Nota visualmente na mesma linha do ticker em qualquer largura de tela.

#### Scenario: Nota na linha do ticker

- **WHEN** um card de ação com `nota > 0` é exibido
- **THEN** a Nota aparece alinhada à linha do ticker (topo do bloco de identidade), à direita
- **AND** não fica centralizada na altura entre o ticker e o nome da empresa
