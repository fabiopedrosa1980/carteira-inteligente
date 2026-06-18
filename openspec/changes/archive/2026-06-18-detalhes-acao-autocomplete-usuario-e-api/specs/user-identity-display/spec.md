## ADDED Requirements

### Requirement: Identificação do usuário autenticado

Após o login, a aplicação SHALL exibir a identificação do usuário autenticado (nome e/ou foto) no header do app, com base nos dados do `AuthService`.

#### Scenario: Usuário autenticado
- **WHEN** o usuário está autenticado
- **THEN** o header exibe o nome e/ou a foto do usuário

#### Scenario: Dados parciais
- **WHEN** a foto do usuário não está disponível
- **THEN** o header exibe ao menos o nome (ou um avatar padrão), sem quebrar o layout
