## MODIFIED Requirements

### Requirement: Faixa de próximas datas-com estimadas

A faixa "Próximas datas-com" SHALL viver na **última sub-tab** da tela de Dividendos (após "Radar de proventos"). Ela SHALL listar ativos ordenados pela urgência (menor número de dias até a próxima data-com **estimada** primeiro), respeitando o seletor Ações/FIIs, combinando carteira e universo acompanhado e marcando cada item como possuído (🟢) ou não possuído (🔴), com rótulo de estimativa. Ativos da carteira que tenham data-com estimada dentro do horizonte SHALL aparecer marcados como possuídos.

#### Scenario: Última sub-tab
- **WHEN** as sub-tabs de Dividendos são exibidas
- **THEN** "Próximas datas-com" é a última, depois de "Radar de proventos"

#### Scenario: Carteira contribui com itens
- **WHEN** um ativo possuído tem data-com estimada dentro do horizonte
- **THEN** ele aparece na faixa marcado como possuído (🟢)

#### Scenario: Ordenação por urgência
- **WHEN** a faixa é exibida
- **THEN** os ativos aparecem do menor para o maior número de dias até a próxima data-com estimada

### Requirement: Horizonte da faixa

A faixa SHALL exibir apenas ativos cuja próxima data-com estimada caia dentro de um horizonte próximo de **90 dias**. Ativos com data-com estimada além de 90 dias NÃO SHALL aparecer na faixa. Os textos da faixa (ex.: estado vazio) SHALL refletir o horizonte de 90 dias.

#### Scenario: Dentro do horizonte de 90 dias
- **WHEN** a próxima data-com estimada de um ativo está dentro de 90 dias
- **THEN** o ativo aparece na faixa com a contagem regressiva em dias

#### Scenario: Fora do horizonte
- **WHEN** a próxima data-com estimada está além de 90 dias
- **THEN** o ativo não aparece na faixa

#### Scenario: Estado vazio coerente
- **WHEN** nenhum ativo tem data-com estimada dentro de 90 dias
- **THEN** a faixa exibe uma mensagem que cita o horizonte de 90 dias
