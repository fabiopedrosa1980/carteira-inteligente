## ADDED Requirements

### Requirement: Cabeçalho em uma única linha no mobile

Em telas estreitas (largura ≤600px), o cabeçalho superior (`.dashboard-header`) SHALL manter a logo e os ícones de ação (ocultar valores, trocar tema, sair) em **uma única linha**, sem quebrar para uma segunda linha. Para caber, o app SHALL reduzir tamanhos e espaçamentos (botões-ícone e gaps menores) em vez de remover os ícones; o texto da logo MUST poder encolher/truncar com reticências quando o espaço for insuficiente. Os ícones de ação MUST permanecer com alvo de toque adequado (≥30px) e NÃO devem encolher antes do texto da logo.

#### Scenario: Cabeçalho não quebra em telas pequenas

- **WHEN** o app é exibido em largura ≤600px
- **THEN** a logo e os três ícones (ocultar valores, trocar tema, sair) aparecem na mesma linha
- **AND** o cabeçalho não quebra para uma segunda linha

#### Scenario: Texto da logo cede espaço primeiro

- **WHEN** a largura é muito estreita e o conteúdo não cabe por completo
- **THEN** o texto da logo trunca com reticências
- **AND** os três ícones de ação permanecem visíveis e acionáveis na mesma linha

#### Scenario: Alvos de toque preservados

- **WHEN** o cabeçalho está em uma linha no mobile
- **THEN** cada ícone de ação mantém um alvo de toque de pelo menos 30px

#### Scenario: Desktop inalterado

- **WHEN** o app é exibido em largura de desktop
- **THEN** o cabeçalho mantém o layout atual (logo à esquerda, ações à direita)
