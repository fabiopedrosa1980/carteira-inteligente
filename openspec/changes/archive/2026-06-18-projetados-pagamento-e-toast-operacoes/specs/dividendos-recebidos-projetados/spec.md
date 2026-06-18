## MODIFIED Requirements

### Requirement: Dividendos Projetados a partir do ano corrente
Na aba "Dividendos Projetados", o sistema SHALL calcular, para o ano-calendário corrente, os proventos (Dividendos e JCP) cuja **data de pagamento (`pay_date`) é igual ou posterior à data de hoje** (ainda a receber), somando para cada ativo o produto `valor_por_cota × total_de_cotas_atuais`.

#### Scenario: Provento com pagamento futuro é projetado
- **WHEN** um provento do ano corrente tem data de pagamento igual ou posterior a hoje, valor R$ 0,30/cota, e o usuário possui 200 cotas atualmente
- **THEN** o sistema SHALL projetar R$ 60,00 para esse provento

#### Scenario: Provento já pago não é projetado
- **WHEN** um provento do ano corrente tem data de pagamento anterior a hoje
- **THEN** o provento SHALL NOT ser contabilizado em Dividendos Projetados

#### Scenario: Complementar a Recebidos sem lacuna
- **WHEN** os proventos do ano corrente são classificados
- **THEN** os de `pay_date` anterior a hoje SHALL aparecer em Recebidos e os de `pay_date` igual ou posterior a hoje SHALL aparecer em Projetados, sem sobreposição

#### Scenario: Inclui Dividendos e JCP
- **WHEN** um ativo possui proventos do tipo Dividendo e do tipo JCP
- **THEN** ambos SHALL ser somados no cálculo de Projetados

#### Scenario: Ano corrente dinâmico
- **WHEN** o cálculo de Dividendos Projetados é executado
- **THEN** o sistema SHALL usar o ano-calendário corrente do sistema, sem ano fixo
