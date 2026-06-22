## ADDED Requirements

### Requirement: Ícone do Patrimônio Total coerente com os demais cards de resumo

No resumo da carteira da aba "Meus Ativos", o ícone do card "Patrimônio Total" SHALL ter o **mesmo tamanho** dos ícones dos demais cards de resumo (mesma dimensão do tile e do glifo), mantendo a coerência visual entre os cards. O destaque do card de Patrimônio Total MUST continuar existindo pelo tamanho do valor, não pelo tamanho do ícone.

#### Scenario: Ícone do Patrimônio com tamanho dos demais

- **WHEN** o resumo da carteira é exibido com ativos
- **THEN** o ícone do card "Patrimônio Total" tem o mesmo tamanho dos ícones dos outros cards de resumo
- **AND** o card de Patrimônio Total mantém o destaque pelo tamanho do seu valor
