## ADDED Requirements

### Requirement: Cabeçalho do acordeão por tipo exibe total e rentabilidade

Na aba "Meus Ativos", o cabeçalho de cada acordeão de tipo (Ações, FIIs, ETFs) SHALL exibir o **total do tipo** (somatório do saldo/valor atual das posições daquele tipo) e a **rentabilidade do tipo** (rentabilidade agregada = variação total sobre o custo total do tipo). A rentabilidade MUST ter cor por sinal (positivo/negativo). Esses valores MUST aparecer mesmo com o acordeão colapsado. O cabeçalho MUST permanecer legível e contido no mobile, sem rolagem horizontal da página.

#### Scenario: Total e rentabilidade no cabeçalho

- **WHEN** a aba "Meus Ativos" é exibida com posições em um tipo
- **THEN** o cabeçalho daquele tipo mostra o total (valor atual somado) e a rentabilidade agregada do tipo
- **AND** a rentabilidade é exibida com cor de positivo (verde) ou negativo (vermelho) conforme o sinal

#### Scenario: Resumo visível com acordeão colapsado

- **WHEN** o acordeão de um tipo está colapsado
- **THEN** total e rentabilidade do tipo continuam visíveis no cabeçalho

#### Scenario: Rentabilidade agregada por custo

- **WHEN** um tipo tem múltiplas posições
- **THEN** a rentabilidade exibida é a variação total do tipo (saldo total − custo total) dividida pelo custo total, e não a média simples das rentabilidades individuais

#### Scenario: Dados insuficientes

- **WHEN** um tipo não tem custo válido (sem preço médio/quantidade) para calcular rentabilidade
- **THEN** a rentabilidade não é exibida (ou aparece como indisponível), sem quebrar o cabeçalho

#### Scenario: Cabeçalho legível no mobile

- **WHEN** a aba "Meus Ativos" é exibida em mobile (≤600px)
- **THEN** nome do tipo, total e rentabilidade cabem no cabeçalho sem rolagem horizontal da página
