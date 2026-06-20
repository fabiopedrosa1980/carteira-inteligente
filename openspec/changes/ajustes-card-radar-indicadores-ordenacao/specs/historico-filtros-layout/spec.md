## ADDED Requirements

### Requirement: Seletor de Ativo e filtro de Ano na mesma linha no Histórico

No Histórico, o seletor de "Ativo" e o filtro de "Ano" SHALL ser dispostos **na mesma linha** (mesma faixa horizontal), em vez de empilhados em linhas separadas. O layout MUST quebrar de forma graciosa quando não houver espaço, sem gerar rolagem horizontal da página, preservando o comportamento atual de cada filtro (chips de ano no desktop, combo de ano no mobile).

#### Scenario: Filtros na mesma linha

- **WHEN** o Histórico é exibido com posições disponíveis
- **THEN** o seletor de Ativo e o filtro de Ano aparecem na mesma linha
- **AND** em telas estreitas o conjunto quebra sem rolagem horizontal da página

#### Scenario: Comportamento dos filtros preservado

- **WHEN** o Histórico é exibido no desktop e no mobile
- **THEN** o filtro de ano permanece como chips no desktop e como combo no mobile
- **AND** ambos continuam aplicando o mesmo filtro de antes
