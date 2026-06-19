## MODIFIED Requirements

### Requirement: Faixa de próximas datas-com estimadas

A faixa "Próximas datas-com" SHALL viver em uma **sub-tab própria** chamada "Próximas datas-com" na tela de Dividendos (não mais empilhada no topo do Radar). Ela SHALL listar ativos ordenados pela urgência (menor número de dias até a próxima data-com **estimada** primeiro), respeitando o seletor Ações/FIIs, combinando carteira e universo acompanhado e marcando cada item como possuído (🟢) ou não possuído (🔴), com rótulo de estimativa.

#### Scenario: Sub-tab dedicada
- **WHEN** o usuário seleciona a sub-tab "Próximas datas-com"
- **THEN** somente a faixa de próximas datas-com é exibida (sem o grid de sazonalidade)

#### Scenario: Ordenação por urgência
- **WHEN** a faixa é exibida
- **THEN** os ativos aparecem do menor para o maior número de dias até a próxima data-com estimada

#### Scenario: Respeita o seletor de classe
- **WHEN** o seletor está em Ações (ou FIIs)
- **THEN** a faixa lista apenas ativos daquela classe
