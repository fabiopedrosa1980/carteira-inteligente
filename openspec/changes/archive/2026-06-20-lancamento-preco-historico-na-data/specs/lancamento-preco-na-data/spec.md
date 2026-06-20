## ADDED Requirements

### Requirement: Preço do ativo na data informada

Ao adicionar um lançamento, quando o usuário informa uma **data anterior a hoje**, o sistema SHALL buscar o **preço de fechamento do ativo naquela data** e preencher o campo de preço com esse valor (em vez da cotação atual). A busca SHALL usar o endpoint de cotação com o parâmetro de data (`?date=YYYY-MM-DD`). Para data igual a hoje ou futura, o sistema SHALL usar a cotação atual.

#### Scenario: Data passada usa preço histórico
- **WHEN** o usuário informa um ticker válido e uma data anterior a hoje
- **THEN** o campo de preço é preenchido com o fechamento do ativo naquela data

#### Scenario: Data de hoje usa cotação atual
- **WHEN** a data informada é hoje (ou futura)
- **THEN** o campo de preço é preenchido com a cotação atual

#### Scenario: Refetch ao trocar a data
- **WHEN** o usuário altera a data com um ticker válido já informado
- **THEN** o preço é rebuscado para a nova data

### Requirement: Preservar preço editado manualmente

O preenchimento automático NÃO SHALL sobrescrever um preço que o usuário tenha editado manualmente. Em modo de **edição** de um lançamento existente, o sistema NÃO SHALL auto-preencher o preço a partir da data.

#### Scenario: Edição manual preservada
- **WHEN** o usuário edita o campo de preço manualmente e depois muda a data
- **THEN** o valor digitado é mantido (não é sobrescrito pela cotação)

#### Scenario: Modo edição preserva o preço registrado
- **WHEN** um lançamento existente é editado e a data é alterada
- **THEN** o preço registrado não é sobrescrito automaticamente

### Requirement: Indicação da data da cotação

Quando o preço vier de uma data passada, a interface SHALL indicar a data de referência da cotação (ex.: "Cotação de DD/MM/AAAA").

#### Scenario: Indicador de cotação histórica
- **WHEN** o preço é preenchido com o valor de uma data passada
- **THEN** a interface mostra a data de referência da cotação

### Requirement: Contrato de cotação por data (serviço de cotação)

O endpoint de cotação SHALL aceitar `?date=YYYY-MM-DD`. Quando a data for anterior a hoje, SHALL retornar o preço de fechamento naquela data; se não houver pregão na data, SHALL usar o pregão anterior mais próximo. Quando a data for ausente, igual a hoje ou futura, SHALL retornar a cotação atual. A forma da resposta permanece a mesma (incluindo `found`).

#### Scenario: Cotação histórica por data
- **WHEN** o endpoint recebe `?date=` com uma data passada de um ticker válido
- **THEN** retorna o preço de fechamento daquela data (ou do pregão anterior mais próximo)

#### Scenario: Sem data retorna cotação atual
- **WHEN** o endpoint é chamado sem `date` (ou com hoje/futuro)
- **THEN** retorna a cotação atual
