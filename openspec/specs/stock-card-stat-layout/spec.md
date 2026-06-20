# stock-card-stat-layout Specification

## Purpose
TBD - created by archiving change card-acoes-nota-radar-altura. Update Purpose after archive.
## Requirements
### Requirement: Faixa de estatísticas do card não corta textos

A faixa de estatísticas do card de ação (Hoje, DY, Nota e a tag de setor) SHALL exibir todos os seus textos por inteiro, sem cortar/clipar, em qualquer largura de card no desktop. Quando os itens não couberem em uma linha, eles MUST quebrar para a(s) linha(s) abaixo, em vez de serem cortados pela borda do card.

#### Scenario: Nota visível em card estreito no desktop

- **WHEN** um card de ação é exibido no desktop em uma coluna estreita (grade auto-ajustável) com Hoje, DY, Nota e setor
- **THEN** a Nota e o setor permanecem totalmente visíveis
- **AND** se não couberem em uma linha, a faixa quebra para a linha de baixo, sem cortar nenhum texto

#### Scenario: Sem corte por overflow

- **WHEN** o conteúdo da faixa de estatísticas excede a largura do card
- **THEN** o conteúdo reflui (quebra de linha) e nada é ocultado pela borda do card

### Requirement: Nota alinhada à linha do ticker no card

No card de ação, a Nota (exibida no topo, alinhada à direita) SHALL ficar **alinhada à linha do ticker**, e não centralizada verticalmente entre o ticker e o nome da empresa. O alinhamento MUST manter a Nota visualmente na mesma linha do ticker em qualquer largura de tela.

#### Scenario: Nota na linha do ticker

- **WHEN** um card de ação com `nota > 0` é exibido
- **THEN** a Nota aparece alinhada à linha do ticker (topo do bloco de identidade), à direita
- **AND** não fica centralizada na altura entre o ticker e o nome da empresa

