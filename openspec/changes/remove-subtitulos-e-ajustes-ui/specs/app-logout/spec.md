## MODIFIED Requirements

### Requirement: Logout da aplicação

A aplicação SHALL oferecer uma ação de logout acessível no header do dashboard, representada por um **ícone** (com rótulo acessível/title "Sair"). Ao acionar o logout, a sessão do usuário SHALL ser encerrada (token e usuário limpos) e o usuário SHALL ser redirecionado para a tela de login.

#### Scenario: Logout via ícone
- **WHEN** o usuário aciona o ícone de logout no header
- **THEN** a sessão é encerrada e o app navega para `/login`

#### Scenario: Ícone acessível
- **WHEN** o usuário passa o cursor/foco sobre o ícone de logout
- **THEN** um rótulo acessível "Sair" é exposto (title/aria-label)

#### Scenario: Sessão encerrada bloqueia rota protegida
- **WHEN** o usuário fez logout
- **THEN** o acesso à rota protegida do dashboard é bloqueado pelo guard, permanecendo na tela de login
