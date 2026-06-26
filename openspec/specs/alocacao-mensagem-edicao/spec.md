# alocacao-mensagem-edicao Specification

## Purpose
TBD - created by archiving change ocultar-valores-global-e-msg-alocacao. Update Purpose after archive.
## Requirements
### Requirement: Confirmação ao editar a distribuição da carteira

Ao salvar a edição da **distribuição** (alvos por classe e/ou limite de concentração) no card de alocação de Meus Ativos, a aplicação SHALL exibir uma mensagem de sucesso ("Distribuição alterada com sucesso") usando o mesmo mecanismo de toast das demais operações (`NotificationService`). A mensagem MUST aparecer apenas no salvamento (não ao cancelar).

#### Scenario: Sucesso ao salvar a edição

- **WHEN** o usuário salva a edição dos alvos/limite de alocação
- **THEN** um toast "Distribuição alterada com sucesso" é exibido no padrão atual

#### Scenario: Cancelar não exibe mensagem

- **WHEN** o usuário cancela a edição
- **THEN** nenhuma mensagem de sucesso é exibida

