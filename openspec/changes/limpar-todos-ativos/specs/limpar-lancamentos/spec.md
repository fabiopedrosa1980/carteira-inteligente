## ADDED Requirements

### Requirement: API remove todos os lançamentos

A API Go SHALL expor uma rota `DELETE /api/v1/transactions` que remove **todos os lançamentos** do usuário em uma única operação. A rota MUST responder com sucesso (2xx) mesmo quando não houver nenhum lançamento a remover (operação idempotente), e MUST persistir a remoção no banco antes de responder.

#### Scenario: Remove todos os lançamentos existentes

- **WHEN** uma requisição `DELETE /api/v1/transactions` é recebida e existem lançamentos cadastrados
- **THEN** todos os lançamentos são apagados do banco
- **AND** a API responde com status de sucesso

#### Scenario: Limpeza com carteira já vazia

- **WHEN** uma requisição `DELETE /api/v1/transactions` é recebida e não há nenhum lançamento
- **THEN** a API responde com status de sucesso sem erro
- **AND** nenhum registro é alterado

### Requirement: Botão de limpar tudo na tela de Lançamentos

A tela de Lançamentos SHALL exibir um botão **"Limpar tudo"** no cabeçalho que permite remover todos os lançamentos de uma vez. O botão MUST estar disponível somente quando existir ao menos um lançamento; com a carteira vazia ele MUST ficar oculto ou desabilitado.

#### Scenario: Botão visível com lançamentos

- **WHEN** a tela de Lançamentos é exibida e há ao menos um lançamento
- **THEN** o botão "Limpar tudo" é apresentado no cabeçalho

#### Scenario: Botão indisponível sem lançamentos

- **WHEN** não há nenhum lançamento cadastrado
- **THEN** o botão "Limpar tudo" não fica disponível (oculto ou desabilitado)

### Requirement: Confirmação antes de limpar tudo

Ao acionar "Limpar tudo", a aplicação MUST exibir a **mesma confirmação de exclusão** usada nas remoções individuais (`ConfirmService`), deixando claro que a ação remove **todos** os lançamentos. A remoção MUST ocorrer apenas se o usuário confirmar; ao cancelar, nada é alterado.

#### Scenario: Usuário confirma a limpeza

- **WHEN** o usuário clica em "Limpar tudo" e confirma na caixa de diálogo
- **THEN** a aplicação chama `DELETE /api/v1/transactions`
- **AND** a lista de lançamentos é esvaziada e os dados derivados são recarregados
- **AND** uma notificação de sucesso é exibida

#### Scenario: Usuário cancela a limpeza

- **WHEN** o usuário clica em "Limpar tudo" e cancela na caixa de diálogo
- **THEN** nenhuma requisição de remoção é enviada
- **AND** os lançamentos permanecem inalterados
