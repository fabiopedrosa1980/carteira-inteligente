## ADDED Requirements

### Requirement: Detalhamento mensal colapsável por ativo
Nas abas "Dividendos Recebidos" e "Dividendos Projetados", cada ativo SHALL ser colapsável e, quando expandido, exibir o detalhamento por mês com o respectivo valor, cuja soma corresponde ao total do ativo.

#### Scenario: Expandir um ativo
- **WHEN** o usuário clica em um ativo na aba Recebidos ou Projetados
- **THEN** o sistema SHALL exibir as linhas de meses com valor para aquele ativo
- **AND** a soma dos valores mensais exibidos SHALL ser igual ao total do ativo

#### Scenario: Colapsar um ativo
- **WHEN** o usuário clica novamente em um ativo expandido
- **THEN** o sistema SHALL ocultar o detalhamento mensal, mantendo visível a linha de total do ativo

#### Scenario: Estado inicial colapsado
- **WHEN** a aba é exibida
- **THEN** todos os ativos SHALL iniciar colapsados, mostrando apenas o total por ativo

### Requirement: Quebra mensal de Dividendos Recebidos
Na aba "Dividendos Recebidos", o detalhamento por mês de um ativo SHALL agrupar os proventos do ano atual por mês, sendo o valor de cada mês a soma de `amount × cotas elegíveis` dos proventos daquele mês (respeitando a data-com).

#### Scenario: Mês com provento elegível
- **WHEN** um ativo recebeu, em um mês do ano atual, um provento de R$ 0,50/cota com 100 cotas elegíveis
- **THEN** o detalhamento daquele mês SHALL exibir R$ 50,00

#### Scenario: Mês sem provento não aparece
- **WHEN** um mês do ano atual não possui provento elegível para o ativo
- **THEN** o detalhamento do ativo SHALL NOT exibir uma linha para esse mês

### Requirement: Quebra mensal de Dividendos Projetados
Na aba "Dividendos Projetados", o detalhamento por mês de um ativo SHALL agrupar os proventos do ano anterior por mês, sendo o valor de cada mês a soma de `amount × total de cotas atuais` dos proventos daquele mês.

#### Scenario: Mês projetado com base no ano anterior
- **WHEN** um ativo pagou, em um mês do ano anterior, R$ 0,30/cota e o usuário possui 200 cotas atualmente
- **THEN** o detalhamento daquele mês SHALL exibir R$ 60,00
