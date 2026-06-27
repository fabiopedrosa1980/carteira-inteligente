## ADDED Requirements

### Requirement: Contraste entre rótulo e valor no card de Lançamentos no mobile

No card de Lançamentos no mobile (largura ≤600px), cada campo SHALL distinguir visualmente o **rótulo** do **valor**: o rótulo (Data, Qtd, Preço unit., Total) MUST usar a cor secundária (`--text-secondary`), e o valor MUST usar a cor primária (`--text-primary`), que é branca/near-white no tema escuro. Isso vale para todos os campos do card; Ativo (ticker) e Total já seguem a cor primária e permanecem assim. O comportamento do desktop (tabela) NÃO é alterado.

#### Scenario: Valores em destaque (cor primária) no mobile

- **WHEN** um card de lançamento é exibido em largura ≤600px
- **THEN** os valores de Data, Qtd e Preço unit. aparecem na cor primária (branca no tema escuro)
- **AND** os rótulos correspondentes permanecem na cor secundária

#### Scenario: Rótulos mantêm a cor atual

- **WHEN** um card de lançamento é exibido em largura ≤600px
- **THEN** os micro-rótulos (Data, Qtd, Preço unit., Total) seguem na cor secundária, sem alteração

#### Scenario: Legível no tema claro

- **WHEN** o tema claro está ativo e um card de lançamento é exibido no mobile
- **THEN** os valores usam a cor primária do tema claro (escura), permanecendo legíveis

#### Scenario: Desktop inalterado

- **WHEN** a tela de Lançamentos é exibida no desktop (>600px)
- **THEN** o estilo da tabela (cores das colunas) permanece como antes
