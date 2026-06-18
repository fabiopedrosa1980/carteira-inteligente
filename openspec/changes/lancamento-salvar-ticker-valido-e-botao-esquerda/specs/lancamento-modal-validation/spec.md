## ADDED Requirements

### Requirement: Salvar habilitado apenas com ticker válido

No modal de lançamento (modo adição), o botão Salvar SHALL ficar desabilitado enquanto o ticker for inválido — ou seja, vazio, em busca (carregando) ou não encontrado pela cotação. Salvar SHALL ser habilitado quando o ticker for resolvido com sucesso. Em modo edição, onde o ticker é fixo, o botão NÃO SHALL ser bloqueado por essa regra.

#### Scenario: Ticker não encontrado
- **WHEN** o ticker informado não é encontrado na cotação
- **THEN** o botão Salvar fica desabilitado

#### Scenario: Buscando cotação
- **WHEN** a cotação do ticker está sendo buscada
- **THEN** o botão Salvar fica desabilitado

#### Scenario: Ticker válido
- **WHEN** o ticker é resolvido com sucesso (cotação encontrada)
- **THEN** o botão Salvar é habilitado (sujeito às demais validações)

#### Scenario: Edição não bloqueia
- **WHEN** o modal está em modo edição (ticker fixo)
- **THEN** o botão Salvar não é desabilitado pela validade do ticker
