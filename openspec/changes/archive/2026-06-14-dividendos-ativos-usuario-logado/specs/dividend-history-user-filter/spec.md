## ADDED Requirements

### Requirement: Aba de dividendos exibe somente quando usuário tem posições
A seção de histórico de dividendos DEVE ser renderizada apenas quando o usuário autenticado possuir ao menos uma posição retornada por `GET /transactions/acoes`.

#### Scenario: Seção oculta quando sem posições
- **WHEN** `GET /transactions/acoes` retorna array vazio
- **THEN** a seção de histórico de dividendos não é renderizada e uma mensagem de estado vazio orienta o usuário a cadastrar um ativo

#### Scenario: Seção visível quando há posições
- **WHEN** `GET /transactions/acoes` retorna uma ou mais posições
- **THEN** a seção de histórico de dividendos é exibida com o seletor de ativos e a tabela

### Requirement: Estado vazio orienta o usuário a cadastrar ativos
Quando o usuário não possui posições, a aba de dividendos DEVE exibir uma mensagem direcionando-o para a aba Meus Ativos.

#### Scenario: Mensagem de estado vazio exibida
- **WHEN** o usuário navega para a aba Dividendos sem posições cadastradas
- **THEN** é exibida a mensagem "Cadastre ativos na aba Meus Ativos para ver o histórico de dividendos"
