# lancamentos-mobile-grid Specification

## Purpose
TBD - created by archiving change lancamentos-mobile-grid. Update Purpose after archive.
## Requirements
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

### Requirement: Posicionamento dos botões da tela de Lançamentos otimizado para mobile

Na aba "Lançamentos", em mobile (largura ≤600px), os botões da tela SHALL ser posicionados para o melhor encaixe na tela estreita, mantendo o layout **contido** (sem rolagem horizontal) e **alvos de toque adequados** (≥30px de altura). Especificamente: o botão **"Limpar tudo"** do header da página MUST ocupar a largura disponível de forma confortável quando o header empilha; o novo botão **"+"** no cabeçalho da seção MUST manter alvo de toque adequado sem comprimir o total nem o chevron; os botões **Editar** e **Remover** de cada card MUST permanecer alinhados e acionáveis; e a **paginação** por seção MUST permanecer centralizada e legível. No desktop o posicionamento atual dos botões permanece.

#### Scenario: Botões contidos no mobile

- **WHEN** a aba "Lançamentos" é exibida em largura ≤600px
- **THEN** todos os botões (Limpar tudo, "+" da seção, Editar/Remover, paginação) ficam contidos na tela
- **AND** não há rolagem horizontal da página

#### Scenario: Alvos de toque adequados

- **WHEN** a aba "Lançamentos" é exibida em largura ≤600px
- **THEN** cada botão tem alvo de toque adequado (≥30px de altura)
- **AND** os botões permanecem acionáveis sem sobreposição

#### Scenario: Cabeçalho da seção com "+" no mobile

- **WHEN** uma seção é exibida em largura ≤600px
- **THEN** o botão "+" aparece no cabeçalho ao lado do total e do chevron
- **AND** o total e o chevron permanecem legíveis, sem estourar a largura

#### Scenario: Desktop inalterado

- **WHEN** a aba "Lançamentos" é exibida em largura > 600px
- **THEN** o posicionamento dos botões permanece como no layout de desktop

