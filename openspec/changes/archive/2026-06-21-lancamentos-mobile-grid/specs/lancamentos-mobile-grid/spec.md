## ADDED Requirements

### Requirement: Lançamentos exibidos como card/grid no mobile

Na aba "Lançamentos", em mobile (largura ≤600px), cada lançamento SHALL ser apresentado como um **card** em grid (não como linha de tabela comprimida). O card MUST exibir **todos os campos** do lançamento — Ativo (badge), Data, Quantidade, Preço Unitário e Total — cada um com um **micro-rótulo** (já que o cabeçalho da tabela não é exibido no mobile), e MUST manter os botões **Editar** e **Remover** acessíveis no card. A tabela MUST permanecer contida, sem rolagem horizontal da página. No desktop o formato de tabela (linhas em grid de colunas) permanece.

#### Scenario: Card com todos os campos no mobile

- **WHEN** a aba "Lançamentos" é exibida em largura ≤600px com lançamentos
- **THEN** cada lançamento aparece como um card
- **AND** mostra Ativo, Data, Quantidade, Preço Unitário e Total, cada um com rótulo
- **AND** os botões Editar e Remover estão presentes no card
- **AND** não há rolagem horizontal da página

#### Scenario: Ações e edição preservadas

- **WHEN** o usuário toca em um card de lançamento (fora dos botões)
- **THEN** o modal de edição do lançamento abre
- **AND** os botões Editar/Remover continuam funcionando individualmente

#### Scenario: Desktop mantém tabela

- **WHEN** a aba "Lançamentos" é exibida em largura > 600px
- **THEN** os lançamentos são exibidos como linhas de tabela em grid de colunas

#### Scenario: Ordenação e paginação inalteradas

- **WHEN** o usuário ordena ou pagina no mobile
- **THEN** os cards refletem a ordenação e a paginação existentes, sem alteração de comportamento
