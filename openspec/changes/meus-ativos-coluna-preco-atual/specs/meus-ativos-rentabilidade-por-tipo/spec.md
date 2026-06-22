## MODIFIED Requirements

### Requirement: Cabeçalho do acordeão por tipo exibe total e rentabilidade

Na aba "Meus Ativos", o cabeçalho de cada acordeão de tipo (Ações, FIIs, ETFs) SHALL seguir o **mesmo padrão visual do acordeão de "Lançamentos"**: à esquerda o **nome do tipo** com a **contagem de ativos do tipo** como badge; à direita o **total do tipo** formatado como **moeda (BRL)** e em cor de destaque (accent), seguido da **rentabilidade do tipo** (agregada = variação total sobre o custo total) com **cor por sinal** (positivo/negativo). O total e a rentabilidade SHALL ser acompanhados de **rótulos descritivos** que os identifiquem (ex.: "Total" para o valor total e "Rent." para a rentabilidade), em vez de apenas os números justapostos. A **contagem MUST permanecer visível inclusive no mobile**. O espaçamento entre contagem, total e rentabilidade MUST ser coerente (gaps consistentes). Esses valores MUST aparecer mesmo com o acordeão colapsado. O cabeçalho MUST permanecer legível e contido no mobile, sem rolagem horizontal da página.

#### Scenario: Padrão alinhado ao de Lançamentos

- **WHEN** a aba "Meus Ativos" é exibida com posições em um tipo
- **THEN** o cabeçalho mostra o nome do tipo com a contagem em badge à esquerda
- **AND** o total do tipo aparece à direita formatado como moeda (BRL) na cor de destaque
- **AND** a rentabilidade agregada aparece ao lado do total, com cor por sinal
- **AND** o espaçamento entre contagem, total e rentabilidade é coerente

#### Scenario: Rótulos descritivos no total e na rentabilidade

- **WHEN** o cabeçalho de um tipo é exibido com total e rentabilidade
- **THEN** o total acompanha um rótulo que o identifica (ex.: "Total")
- **AND** a rentabilidade acompanha um rótulo que a identifica (ex.: "Rent.")
- **AND** os rótulos permanecem visíveis sem causar rolagem horizontal no mobile

#### Scenario: Contagem visível no mobile

- **WHEN** a aba "Meus Ativos" é exibida em mobile (≤600px)
- **THEN** a contagem de ativos do tipo permanece visível no cabeçalho
- **AND** nome, contagem, total e rentabilidade cabem sem rolagem horizontal da página

#### Scenario: Resumo visível com acordeão colapsado

- **WHEN** o acordeão de um tipo está colapsado
- **THEN** contagem, total e rentabilidade do tipo continuam visíveis no cabeçalho

#### Scenario: Rentabilidade agregada por custo

- **WHEN** um tipo tem múltiplas posições
- **THEN** a rentabilidade exibida é a variação total do tipo (saldo total − custo total) dividida pelo custo total, e não a média simples das rentabilidades individuais

#### Scenario: Dados insuficientes

- **WHEN** um tipo não tem custo válido (sem preço médio/quantidade) para calcular rentabilidade
- **THEN** a rentabilidade não é exibida (ou aparece como indisponível), sem quebrar o cabeçalho
