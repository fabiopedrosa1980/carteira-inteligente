## ADDED Requirements

### Requirement: Cabeçalho do acordeão de Lançamentos exibe total rotulado e rentabilidade

Na aba "Lançamentos", o cabeçalho de cada acordeão de tipo (Ações, FIIs, ETFs) SHALL exibir, à direita: o **valor total do tipo** formatado como moeda BRL, **alinhado à direita** do cabeçalho, com um **rótulo descritivo** que o identifique (ex.: "Total"); e a **rentabilidade do tipo** (variação agregada sobre o custo total), com **cor por sinal** (positivo/negativo) e rótulo descritivo (ex.: "Rent."). O valor total e a rentabilidade MUST permanecer visíveis mesmo com o acordeão colapsado. O cabeçalho MUST permanecer legível e contido no mobile, sem rolagem horizontal da página, mantendo a contagem de itens à esquerda.

#### Scenario: Total alinhado à direita com rótulo

- **WHEN** a aba "Lançamentos" é exibida com lançamentos em um tipo
- **THEN** o valor total do tipo aparece alinhado à direita do cabeçalho
- **AND** acompanha um rótulo descritivo que o identifica como total

#### Scenario: Rentabilidade do tipo no cabeçalho

- **WHEN** um tipo possui custo válido para cálculo de rentabilidade
- **THEN** a rentabilidade agregada do tipo aparece no cabeçalho ao lado do total, com cor por sinal e rótulo descritivo

#### Scenario: Rentabilidade agregada por custo

- **WHEN** um tipo tem múltiplas posições
- **THEN** a rentabilidade exibida é a variação total do tipo (saldo total − custo total) dividida pelo custo total, e não a média simples das rentabilidades individuais

#### Scenario: Resumo visível com acordeão colapsado

- **WHEN** o acordeão de um tipo está colapsado
- **THEN** o total rotulado e a rentabilidade do tipo continuam visíveis no cabeçalho

#### Scenario: Dados insuficientes para rentabilidade

- **WHEN** um tipo não tem custo válido (sem preço/quantidade) para calcular rentabilidade
- **THEN** a rentabilidade não é exibida (ou aparece como indisponível), sem quebrar o cabeçalho

#### Scenario: Cabeçalho contido no mobile

- **WHEN** a aba "Lançamentos" é exibida em mobile (≤600px)
- **THEN** contagem à esquerda, total rotulado e rentabilidade cabem sem rolagem horizontal da página
