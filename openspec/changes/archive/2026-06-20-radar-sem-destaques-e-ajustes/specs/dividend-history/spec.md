## MODIFIED Requirements

### Requirement: Rótulo da coluna de data-com no Histórico

A tabela de Histórico de proventos SHALL ter uma coluna de data-com com rótulo completo "Data Com" em telas largas e rótulo curto **"Dt Com"** em telas estreitas (mobile).

#### Scenario: Rótulo curto no mobile
- **WHEN** a tabela de Histórico é exibida em tela estreita
- **THEN** o cabeçalho da coluna de data-com mostra "Dt Com"

#### Scenario: Rótulo completo em telas largas
- **WHEN** a tabela de Histórico é exibida em tela larga
- **THEN** o cabeçalho da coluna de data-com mostra "Data Com"
