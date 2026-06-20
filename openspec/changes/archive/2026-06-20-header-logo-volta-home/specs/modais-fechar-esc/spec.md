## ADDED Requirements

### Requirement: Fechar modais com a tecla Esc

Os modais e diálogos da aplicação SHALL fechar ao pressionar a tecla **Esc**: o modal de Lançamento (adição/edição), o de Adicionar ativo, o de Detalhe de ativo e o diálogo de Confirmação. Para o diálogo de Confirmação, Esc SHALL equivaler a **cancelar**.

#### Scenario: Esc fecha o modal aberto
- **WHEN** um modal (lançamento, adicionar ativo ou detalhe de ativo) está aberto e o usuário pressiona Esc
- **THEN** o modal é fechado

#### Scenario: Esc cancela a confirmação
- **WHEN** o diálogo de confirmação está aberto e o usuário pressiona Esc
- **THEN** o diálogo é fechado como se "Cancelar" tivesse sido escolhido

#### Scenario: Esc sem modal aberto não tem efeito
- **WHEN** nenhum modal/diálogo está aberto e o usuário pressiona Esc
- **THEN** nada acontece
