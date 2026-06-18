## ADDED Requirements

### Requirement: Pill de Maior Baixa

O resumo da tela Minhas Ações SHALL exibir um pill "Maior Baixa" com a menor variação percentual do dia entre as ações da carteira. O valor SHALL ser exibido em vermelho quando negativo, seguindo o padrão de cores semânticas da aplicação.

#### Scenario: Maior baixa do dia
- **WHEN** há ações com cotação carregada
- **THEN** o pill "Maior Baixa" mostra a menor variação percentual (ex.: -3,21%) destacada em vermelho quando negativa

#### Scenario: Sem ações na carteira
- **WHEN** não há ações com cotação
- **THEN** o pill exibe um valor neutro (ex.: 0,00% ou —) sem quebrar o layout

### Requirement: Pill de Maior Nota

O resumo da tela Minhas Ações SHALL exibir um pill "Maior Nota" com a maior nota entre as ações da carteira, mostrando o valor da nota e o ticker da ação correspondente.

#### Scenario: Maior nota com ticker
- **WHEN** há ações com nota maior que zero
- **THEN** o pill "Maior Nota" mostra o valor da maior nota e o ticker da ação correspondente

#### Scenario: Sem notas disponíveis
- **WHEN** nenhuma ação possui nota maior que zero
- **THEN** o pill exibe um valor neutro (—) sem quebrar o layout
