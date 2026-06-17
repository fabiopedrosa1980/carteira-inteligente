## ADDED Requirements

### Requirement: Inicialização resiliente do Google Sign-In

A tela de login SHALL aguardar o carregamento do script do Google Sign-In (carregado de forma assíncrona) antes de exibir um erro de indisponibilidade. A inicialização SHALL tentar novamente (retry) por um período limitado e só exibir a mensagem de erro após esgotar as tentativas.

#### Scenario: Script ainda carregando
- **WHEN** a tela de login é aberta e o objeto `google` ainda não está disponível
- **THEN** a inicialização aguarda e tenta novamente, sem exibir erro imediatamente

#### Scenario: Script carrega dentro do tempo
- **WHEN** o script do Google fica disponível durante as tentativas
- **THEN** o botão de login é renderizado normalmente e nenhum erro é exibido

#### Scenario: Script não carrega
- **WHEN** o script do Google não fica disponível após esgotar as tentativas
- **THEN** a tela de login exibe a mensagem de indisponibilidade
