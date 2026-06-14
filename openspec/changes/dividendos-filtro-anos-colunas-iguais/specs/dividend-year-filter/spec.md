## ADDED Requirements

### Requirement: Padrão exibe todos os 5 anos
Ao carregar o histórico de dividendos de um ativo, a tabela DEVE exibir por padrão todos os dividendos da janela de 5 anos, sem filtro de ano aplicado.

#### Scenario: Carga inicial sem filtro
- **WHEN** um ativo é selecionado e seus dividendos são carregados
- **THEN** a tabela exibe os dividendos de todos os anos disponíveis (últimos 5 anos), sem restrição a um único ano

#### Scenario: Opção "Todos" ativa por padrão
- **WHEN** a tela de dividendos é renderizada
- **THEN** o chip "Todos" está marcado como ativo e nenhum ano específico está selecionado

### Requirement: Clicar em um ano filtra a tabela
Os anos DEVEM ser exibidos como chips clicáveis. Clicar em um ano filtra a tabela para aquele ano; clicar em "Todos" remove o filtro.

#### Scenario: Filtrar por ano específico
- **WHEN** o usuário clica no chip de um ano (ex.: 2023)
- **THEN** a tabela passa a exibir apenas os dividendos com pagamento em 2023 e a paginação é reiniciada na primeira página

#### Scenario: Voltar para todos os anos
- **WHEN** um ano está selecionado e o usuário clica em "Todos"
- **THEN** a tabela volta a exibir os dividendos de todos os 5 anos

#### Scenario: Chip ativo destacado
- **WHEN** um filtro de ano está aplicado
- **THEN** o chip correspondente é exibido com estilo de ativo
