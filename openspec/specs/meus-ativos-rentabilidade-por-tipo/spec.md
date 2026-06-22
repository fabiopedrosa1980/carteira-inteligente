# meus-ativos-rentabilidade-por-tipo Specification

## Purpose
TBD - created by archiving change meus-ativos-rentabilidade-por-tipo. Update Purpose after archive.
## Requirements
### Requirement: Cabeçalho do acordeão por tipo exibe total e rentabilidade

Na aba "Meus Ativos", o cabeçalho de cada acordeão de tipo (Ações, FIIs, ETFs) SHALL seguir o **mesmo padrão visual do acordeão de "Lançamentos"**: à esquerda o **nome do tipo** com a **contagem de ativos do tipo** como badge; à direita o **total do tipo** formatado como **moeda (BRL)** e em cor de destaque (accent). A **rentabilidade do tipo NÃO é mais exibida no cabeçalho**. A **contagem MUST permanecer visível inclusive no mobile**. O espaçamento entre contagem e total MUST ser coerente (gaps consistentes). Esses valores MUST aparecer mesmo com o acordeão colapsado. O cabeçalho MUST permanecer legível e contido no mobile, sem rolagem horizontal da página. A rentabilidade por ativo na lista/tabela permanece inalterada.

#### Scenario: Padrão alinhado ao de Lançamentos

- **WHEN** a aba "Meus Ativos" é exibida com posições em um tipo
- **THEN** o cabeçalho mostra o nome do tipo com a contagem em badge à esquerda
- **AND** o total do tipo aparece à direita formatado como moeda (BRL) na cor de destaque
- **AND** a rentabilidade do tipo não aparece no cabeçalho

#### Scenario: Contagem visível no mobile

- **WHEN** a aba "Meus Ativos" é exibida em mobile (≤600px)
- **THEN** a contagem de ativos do tipo permanece visível no cabeçalho
- **AND** nome, contagem e total cabem sem rolagem horizontal da página

#### Scenario: Resumo visível com acordeão colapsado

- **WHEN** o acordeão de um tipo está colapsado
- **THEN** contagem e total do tipo continuam visíveis no cabeçalho

#### Scenario: Rentabilidade por ativo preservada

- **WHEN** um tipo é expandido com suas posições
- **THEN** a rentabilidade de cada ativo continua sendo exibida na lista/tabela

