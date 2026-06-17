## ADDED Requirements

### Requirement: Logout da aplicação

A aplicação SHALL oferecer uma ação de logout acessível no header do dashboard. Ao acionar o logout, a sessão do usuário SHALL ser encerrada (token e usuário limpos) e o usuário SHALL ser redirecionado para a tela de login.

#### Scenario: Usuário faz logout
- **WHEN** o usuário aciona o botão de logout no header
- **THEN** a sessão é encerrada e o app navega para `/login`

#### Scenario: Sessão encerrada bloqueia rota protegida
- **WHEN** o usuário fez logout
- **THEN** o acesso à rota protegida do dashboard é bloqueado pelo guard, permanecendo na tela de login
