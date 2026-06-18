## MODIFIED Requirements

### Requirement: Dividendos Recebidos no ano atual
Na aba "Dividendos Recebidos", o sistema SHALL calcular, para o ano-calendário atual, o valor recebido somando os proventos cuja **data de pagamento (`pay_date`) é anterior à data de hoje** (já pagos, até a data atual −1), considerando para cada provento o produto `valor_por_cota × cotas_elegíveis`, onde uma cota é elegível quando a data do lançamento que a originou é menor ou igual à data-com (`ex_date`) do provento.

#### Scenario: Provento já pago conta
- **WHEN** um provento do ano atual tem data de pagamento anterior a hoje e há 100 cotas elegíveis a R$ 0,50/cota
- **THEN** o sistema SHALL contabilizar R$ 50,00 recebidos

#### Scenario: Provento ainda não pago não conta
- **WHEN** um provento do ano atual tem data de pagamento igual ou posterior a hoje
- **THEN** o provento SHALL NOT ser contabilizado em Dividendos Recebidos

#### Scenario: Elegibilidade por data-com mantida
- **WHEN** um lançamento tem data posterior à data-com (`ex_date`) de um provento já pago
- **THEN** as cotas desse lançamento SHALL NOT ser contabilizadas para aquele provento

#### Scenario: Total recebido consolidado
- **WHEN** o usuário visualiza a aba "Dividendos Recebidos"
- **THEN** o sistema SHALL exibir o total recebido (proventos já pagos) somando todos os ativos e o detalhamento por ativo

### Requirement: Dividendos Projetados a partir do ano corrente
Na aba "Dividendos Projetados", o sistema SHALL calcular, para o ano-calendário corrente, os proventos cuja **data-com (`ex_date`) é maior que a data de hoje** (ainda por vir), somando para cada ativo o produto `valor_por_cota × total_de_cotas_atuais`.

#### Scenario: Provento futuro projetado
- **WHEN** um provento do ano corrente tem data-com posterior a hoje, valor R$ 0,30/cota, e o usuário possui 200 cotas atualmente
- **THEN** o sistema SHALL projetar R$ 60,00 para esse provento

#### Scenario: Provento com data-com já passada não é projetado
- **WHEN** um provento do ano corrente tem data-com igual ou anterior a hoje
- **THEN** o provento SHALL NOT ser contabilizado em Dividendos Projetados

#### Scenario: Ano corrente dinâmico
- **WHEN** o cálculo de Dividendos Projetados é executado
- **THEN** o sistema SHALL usar o ano-calendário corrente do sistema, sem ano fixo

#### Scenario: Total projetado consolidado
- **WHEN** o usuário visualiza a aba "Dividendos Projetados"
- **THEN** o sistema SHALL exibir o total projetado (proventos futuros do ano corrente) somando todos os ativos e o detalhamento por ativo
