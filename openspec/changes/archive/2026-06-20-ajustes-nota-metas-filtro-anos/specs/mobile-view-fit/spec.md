## ADDED Requirements

### Requirement: Nota do ativo no topo do card alinhada ao ticker sem rótulo

No card de ação, a Nota do ativo SHALL ser exibida na mesma linha do ticker, alinhada à direita do card, **sem o rótulo "Nota"**. A Nota MUST deixar de aparecer no `stat-strip` do rodapé. O valor da Nota MUST manter sua cor por faixa (alta/média/baixa) e só aparece quando `nota > 0`.

#### Scenario: Nota ao lado do ticker

- **WHEN** um card de ação com `nota > 0` é exibido em qualquer largura de tela
- **THEN** a Nota aparece no topo do card, na mesma linha do ticker, alinhada à direita
- **AND** nenhum rótulo "Nota" é exibido junto ao valor
- **AND** a Nota não aparece mais no rodapé (`stat-strip`)
- **AND** a cor do valor reflete a faixa da nota (alta/média/baixa)

#### Scenario: Sem nota cadastrada

- **WHEN** um card de ação com `nota = 0` é exibido
- **THEN** nenhum valor de Nota é renderizado no topo nem no rodapé do card

### Requirement: Tela de Metas não corta texto no mobile

Na aba "Minhas Metas" em mobile (largura ≤ 480px), todas as células da tabela (nome da meta, valor atual, progresso e operação) SHALL permanecer legíveis sem que o texto seja cortado de forma a impedir a leitura, e sem gerar rolagem horizontal da página.

#### Scenario: Células legíveis em tela estreita

- **WHEN** a aba Minhas Metas é exibida em largura ≤ 480px com metas cadastradas
- **THEN** os textos das células visíveis não são cortados a ponto de ficarem ilegíveis
- **AND** não há rolagem horizontal da página

### Requirement: Filtro de anos do Histórico vira combo com rótulo "Ano" no mobile

No Histórico, em mobile (largura ≤ 480px), o filtro de anos SHALL ser exibido como um combo (`select`) precedido do rótulo "Ano", em vez de chips. No desktop o filtro pode permanecer em chips. A opção "Todos" MUST continuar disponível no combo, e selecionar um ano MUST aplicar o mesmo filtro que os chips aplicavam.

#### Scenario: Combo de ano no mobile

- **WHEN** o Histórico é exibido em largura ≤ 480px com posições disponíveis
- **THEN** o filtro de anos aparece como um combo com o rótulo "Ano"
- **AND** o combo inclui a opção "Todos" e cada ano disponível
- **AND** selecionar um ano filtra os dividendos exibidos por aquele ano

#### Scenario: Chips no desktop

- **WHEN** o Histórico é exibido em largura > 480px
- **THEN** o filtro de anos é exibido em chips
