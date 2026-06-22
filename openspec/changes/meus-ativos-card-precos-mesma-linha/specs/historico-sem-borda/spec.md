## ADDED Requirements

### Requirement: Tela de Histórico sem borda no contêiner

O contêiner da tela de Histórico de dividendos (`.dh-section`) SHALL ser exibido **sem borda** ao redor do conteúdo. O restante da apresentação (fundo, cantos arredondados e espaçamento interno) MUST permanecer inalterado.

#### Scenario: Histórico sem borda

- **WHEN** a tela de Histórico de dividendos é exibida
- **THEN** o contêiner não apresenta borda ao redor do conteúdo
- **AND** o fundo e o espaçamento internos permanecem inalterados
