## ADDED Requirements

### Requirement: Valores de Atual e Alvo na cor primária

No card de Alocação, os **valores numéricos** das colunas **Atual** e **Alvo** do ledger SHALL usar a cor de texto primária do tema (`--text-primary`) — branca no tema escuro e escura no tema claro — padronizando com os demais valores do app. Os **rótulos de cabeçalho** dessas colunas MUST permanecer na cor secundária (`--text-secondary`), e a coluna **Ação** MUST manter suas cores de status.

#### Scenario: Valores em branco no tema escuro

- **WHEN** o card de Alocação é exibido no tema escuro
- **THEN** os valores de Atual e Alvo aparecem em branco (`--text-primary`)
- **AND** os rótulos de cabeçalho "Atual"/"Alvo" permanecem em cinza

#### Scenario: Coerência no tema claro

- **WHEN** o card de Alocação é exibido no tema claro
- **THEN** os valores de Atual e Alvo usam a cor primária do tema (texto escuro), e não o cinza secundário

#### Scenario: Coluna Ação inalterada

- **WHEN** o card de Alocação é exibido
- **THEN** a coluna Ação mantém suas cores de status (verde/vermelho/cinza)
