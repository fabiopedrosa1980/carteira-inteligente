## ADDED Requirements

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
