# meus-ativos-grupos Specification

## Purpose
Define o agrupamento dos ativos da tela "Meus Ativos" em seções por tipo (Ações, FIIs, ETFs), com acordeão colapsável e paginação independente por grupo.

## Requirements

### Requirement: Ativos agrupados por tipo em seções colapsáveis

A tela "Meus Ativos" SHALL organizar os ativos em **três seções** (Ações, FIIs, ETFs), cada uma exibida como um acordeão colapsável. Seções sem ativos MUST ser omitidas. Por padrão, todas as seções presentes estão **expandidas**.

#### Scenario: Seções expandidas por padrão

- **WHEN** a tela de Meus Ativos é carregada com ativos de tipos diferentes
- **THEN** cada tipo com ativos aparece como uma seção separada, expandida
- **AND** seções sem ativos não são renderizadas

#### Scenario: Colapsar uma seção

- **WHEN** o usuário clica no cabeçalho de uma seção
- **THEN** o conteúdo daquela seção fica oculto
- **AND** as outras seções permanecem inalteradas

#### Scenario: Expandir uma seção colapsada

- **WHEN** o usuário clica no cabeçalho de uma seção colapsada
- **THEN** o conteúdo da seção fica visível novamente

### Requirement: Cabeçalho da seção exibe nome do tipo e contagem

O cabeçalho de cada seção SHALL exibir o **nome do tipo** (Ações, FIIs, ETFs) e a **contagem total** de ativos naquele tipo. Um indicador visual (ex.: seta) MUST refletir o estado expandido/colapsado.

#### Scenario: Cabeçalho com contagem

- **WHEN** a seção de Ações está expandida e contém 5 ativos
- **THEN** o cabeçalho mostra "Ações (5)" e uma seta indicando estado aberto

#### Scenario: Indicador de estado

- **WHEN** a seção está colapsada
- **THEN** o indicador visual (seta) aponta para baixo (ou similar) indicando que há conteúdo oculto

### Requirement: Paginação independente por grupo

Dentro de cada seção, a lista e o grid de cards SHALL exibir no máximo **10 itens por página**. Cada grupo tem seus próprios controles de paginação (anterior/próxima). A página atual de um grupo MUST ser independente dos outros grupos.

#### Scenario: Mais de 10 ativos em um grupo

- **WHEN** o grupo Ações contém 15 ativos
- **THEN** apenas os 10 primeiros são exibidos na página 1
- **AND** controles de paginação aparecem abaixo da lista/grid daquele grupo
- **AND** clicar em "Próxima" exibe os 5 ativos restantes na página 2

#### Scenario: 10 ou menos ativos — sem paginação

- **WHEN** o grupo FIIs contém 3 ativos
- **THEN** todos são exibidos sem controles de paginação

#### Scenario: Paginações independentes

- **WHEN** o usuário avança para a página 2 do grupo Ações
- **THEN** o grupo FIIs permanece na página 1
