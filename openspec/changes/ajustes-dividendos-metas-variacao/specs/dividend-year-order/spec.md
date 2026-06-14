## ADDED Requirements

### Requirement: Chips de ano em ordem decrescente
Os chips de ano no filtro da tela de dividendos DEVEM ser exibidos em ordem decrescente (ano mais recente primeiro), com o chip "Todos" sempre na primeira posição.

#### Scenario: Ordem dos anos
- **WHEN** a tela de dividendos é renderizada com a janela de 5 anos
- **THEN** os chips de ano aparecem do maior para o menor (ex.: 2026, 2025, 2024, 2023, 2022), com "Todos" antes deles

#### Scenario: Filtro continua funcionando
- **WHEN** o usuário clica em um chip de ano exibido na nova ordem
- **THEN** a tabela filtra os dividendos daquele ano e a paginação reinicia na primeira página
