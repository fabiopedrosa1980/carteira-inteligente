## ADDED Requirements

### Requirement: Indicadores sem destaque, com descrição em tooltip

Na tela de ver ativo, os indicadores fundamentalistas NÃO SHALL ter realce de "mais usados" (todos com o mesmo visual). Cada indicador com descrição conhecida SHALL exibir um **ícone "i"** que, ao passar o mouse, mostra a **descrição** do indicador.

#### Scenario: Sem destaque
- **WHEN** a lista de indicadores é exibida
- **THEN** nenhum indicador recebe realce especial de "mais usado"

#### Scenario: Ícone de informação com descrição
- **WHEN** um indicador com descrição conhecida é exibido
- **THEN** ele mostra um ícone "i" e, ao passar o mouse, exibe a descrição do indicador

#### Scenario: Indicador sem descrição
- **WHEN** um indicador não tem descrição conhecida
- **THEN** ele é exibido sem o ícone "i"
