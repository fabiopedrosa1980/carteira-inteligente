## ADDED Requirements

### Requirement: Faixa de próximas datas-com estimadas

A tela de Dividendos SHALL exibir uma faixa "Próximas datas-com" no topo da sub-tab Radar, listando ativos ordenados pela urgência (menor número de dias até a próxima data-com **estimada** primeiro), respeitando o seletor Ações/FIIs. A faixa SHALL combinar a carteira com o universo de ativos acompanhados (`getStocks`) e marcar cada item como **possuído** (🟢) ou **não possuído** (🔴). A data-com exibida SHALL ser rotulada como estimativa, com aviso para confirmar na fonte oficial.

#### Scenario: Ordenação por urgência
- **WHEN** a faixa é exibida
- **THEN** os ativos aparecem do menor para o maior número de dias até a próxima data-com estimada

#### Scenario: Eixo tenho / não-tenho
- **WHEN** um ativo do universo está na carteira da classe selecionada
- **THEN** o item é marcado como possuído (reforço); caso contrário, como não possuído (oportunidade)

#### Scenario: Respeita o seletor de classe
- **WHEN** o seletor está em Ações (ou FIIs)
- **THEN** a faixa lista apenas ativos daquela classe

#### Scenario: Rótulo de estimativa
- **WHEN** uma data-com é exibida
- **THEN** ela é apresentada como estimativa (≈/"previsto") com aviso para confirmar no RI

### Requirement: Estimativa da próxima data-com por cadência

O sistema SHALL estimar a próxima data-com de cada ativo a partir das datas-com (`ex_date`) históricas, detectando o intervalo típico (mediana dos intervalos consecutivos) e projetando `próxima = última_ex_date + intervalo`, rolando para frente até ultrapassar a data atual. A cadência SHALL ser classificada (mensal, trimestral, semestral, anual). O nível de detalhe SHALL depender da regularidade do histórico.

#### Scenario: Dia estimado quando o ritmo é regular
- **WHEN** o ativo tem pelo menos 3 datas-com e baixa variação entre os intervalos
- **THEN** a faixa mostra o **dia** estimado da próxima data-com e a cadência detectada

#### Scenario: Apenas mês quando o ritmo é irregular
- **WHEN** o ativo tem histórico com alta variação entre os intervalos (ou apenas um intervalo)
- **THEN** a faixa mostra o **mês provável**, sem cravar o dia

#### Scenario: Sem histórico suficiente
- **WHEN** o ativo tem menos de duas datas-com no histórico
- **THEN** ele é omitido da faixa (sem projeção possível)

#### Scenario: Ritmo quebrado
- **WHEN** a última data-com do ativo é muito mais antiga que o intervalo típico (ex.: além de 1,5× o intervalo)
- **THEN** o ativo é omitido da faixa, para evitar estimativa fantasma

### Requirement: Horizonte da faixa

A faixa SHALL exibir apenas ativos cuja próxima data-com estimada caia dentro de um horizonte próximo (padrão: 45 dias). Ativos com data-com estimada além do horizonte NÃO SHALL aparecer na faixa.

#### Scenario: Dentro do horizonte
- **WHEN** a próxima data-com estimada de um ativo está dentro do horizonte
- **THEN** o ativo aparece na faixa com a contagem regressiva em dias

#### Scenario: Fora do horizonte
- **WHEN** a próxima data-com estimada está além do horizonte
- **THEN** o ativo não aparece na faixa
