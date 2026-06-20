## ADDED Requirements

### Requirement: Marca do cabeçalho volta para o início

A marca no cabeçalho (logo + texto "Carteira Inteligente") SHALL ser clicável e, ao ser acionada, SHALL levar o usuário de volta à página inicial (aba padrão), fechando qualquer detalhe de ativo aberto. A marca SHALL ser acionável também por teclado e indicar que é clicável (cursor de ponteiro).

#### Scenario: Clique na marca volta à home
- **WHEN** o usuário clica na logo ou no texto "Carteira Inteligente"
- **THEN** a aplicação exibe a página inicial (aba padrão) e fecha o detalhe de ativo, se houver

#### Scenario: Acionável por teclado
- **WHEN** a marca está focada e o usuário pressiona Enter ou Espaço
- **THEN** a aplicação volta à página inicial

#### Scenario: Indicação de clicável
- **WHEN** o usuário passa o mouse sobre a marca
- **THEN** o cursor indica que ela é clicável
