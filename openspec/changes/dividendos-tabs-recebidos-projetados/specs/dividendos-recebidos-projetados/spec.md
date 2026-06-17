## ADDED Requirements

### Requirement: Abas na tela de Dividendos
A tela de Dividendos SHALL apresentar três abas: "Histórico de Dividendos", "Dividendos Recebidos" e "Dividendos Projetados".

#### Scenario: Navegação entre abas
- **WHEN** o usuário abre a tela de Dividendos
- **THEN** o sistema SHALL exibir as três abas e, por padrão, a aba "Histórico de Dividendos" selecionada

#### Scenario: Histórico preservado
- **WHEN** o usuário seleciona a aba "Histórico de Dividendos"
- **THEN** o sistema SHALL exibir a visão de histórico de proventos por ativo já existente

### Requirement: Dividendos Recebidos no ano atual
Na aba "Dividendos Recebidos", o sistema SHALL calcular, para o ano-calendário atual, o valor recebido somando para cada provento do ano atual de cada ativo o produto `valor_por_cota × cotas_elegíveis`, onde uma cota é elegível quando a data do lançamento que a originou é menor ou igual à data-com (`ex_date`) do provento.

#### Scenario: Lançamento anterior à data-com
- **WHEN** o usuário tem um lançamento de 100 cotas de um ativo com data anterior à data-com de um provento de R$ 0,50/cota no ano atual
- **THEN** o sistema SHALL contabilizar R$ 50,00 recebidos desse provento

#### Scenario: Lançamento posterior à data-com não conta
- **WHEN** um lançamento tem data posterior à data-com (`ex_date`) de um provento
- **THEN** as cotas desse lançamento SHALL NOT ser contabilizadas para aquele provento

#### Scenario: Vários lançamentos com elegibilidade parcial
- **WHEN** um ativo possui dois lançamentos, um elegível e outro com data posterior à data-com de um provento
- **THEN** o sistema SHALL contabilizar apenas as cotas do lançamento elegível para aquele provento

#### Scenario: Total recebido consolidado
- **WHEN** o usuário visualiza a aba "Dividendos Recebidos"
- **THEN** o sistema SHALL exibir o total recebido no ano atual somando todos os ativos e o detalhamento por ativo

#### Scenario: Sem proventos no ano atual
- **WHEN** não há proventos elegíveis no ano atual
- **THEN** o sistema SHALL exibir total igual a R$ 0,00

### Requirement: Dividendos Projetados a partir do ano anterior
Na aba "Dividendos Projetados", o sistema SHALL calcular, para cada ativo, o produto `total_por_cota_do_ano_anterior × total_de_cotas_atuais` e somar todos os ativos, onde `total_por_cota_do_ano_anterior` é a soma dos proventos por cota do ano-calendário imediatamente anterior.

#### Scenario: Projeção com base no ano anterior
- **WHEN** um ativo pagou R$ 1,20/cota no total do ano anterior e o usuário possui 200 cotas atualmente
- **THEN** o sistema SHALL projetar R$ 240,00 para esse ativo

#### Scenario: Total projetado consolidado
- **WHEN** o usuário visualiza a aba "Dividendos Projetados"
- **THEN** o sistema SHALL exibir o total projetado somando todos os ativos e o detalhamento por ativo

#### Scenario: Ativo sem proventos no ano anterior
- **WHEN** um ativo não pagou proventos no ano anterior
- **THEN** a projeção desse ativo SHALL ser R$ 0,00
