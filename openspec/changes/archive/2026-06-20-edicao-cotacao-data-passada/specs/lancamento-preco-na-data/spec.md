## MODIFIED Requirements

### Requirement: Preservar preço editado manualmente

O preenchimento automático NÃO SHALL sobrescrever um preço que o usuário tenha editado manualmente. Em modo de **edição** de um lançamento, ao alterar a data para uma **data anterior a hoje**, o sistema SHALL buscar e preencher o preço com a cotação daquela data (a menos que o preço tenha sido editado manualmente). Para data igual a hoje ou futura em modo edição, o sistema NÃO SHALL alterar o preço automaticamente (preserva o valor registrado).

#### Scenario: Edição com data passada busca a cotação
- **WHEN** um lançamento existente é editado e a data é alterada para uma data anterior a hoje
- **THEN** o preço é preenchido com o fechamento do ativo naquela data

#### Scenario: Edição com data de hoje preserva o preço
- **WHEN** um lançamento existente é editado e a data informada é hoje ou futura
- **THEN** o preço registrado não é alterado automaticamente

#### Scenario: Edição manual preservada
- **WHEN** o usuário edita o campo de preço manualmente e depois muda a data
- **THEN** o valor digitado é mantido (não é sobrescrito pela cotação)

#### Scenario: Abrir a edição não altera o preço
- **WHEN** o modal de edição é aberto
- **THEN** o preço registrado é exibido sem busca automática (só ao alterar a data)
