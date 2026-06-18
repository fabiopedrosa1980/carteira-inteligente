## ADDED Requirements

### Requirement: Seleção de classe de ativo em Dividendos

A tela de Dividendos SHALL oferecer um seletor de classe de ativo com as opções **Ações** e **FIIs**. A classe selecionada SHALL determinar quais proventos são carregados e exibidos nas visões Histórico, Recebidos e Projetados. O padrão inicial SHALL ser Ações.

#### Scenario: Padrão inicial Ações
- **WHEN** o usuário abre a tela de Dividendos
- **THEN** a classe Ações vem selecionada e as visões carregam apenas proventos de ações

#### Scenario: Selecionar FIIs recarrega
- **WHEN** o usuário seleciona FIIs no seletor
- **THEN** a visão atual recarrega exibindo apenas os proventos de FIIs (rendimentos)

#### Scenario: Seleção preservada entre as sub-tabs
- **WHEN** o usuário troca entre Histórico, Recebidos e Projetados
- **THEN** a classe selecionada (Ações ou FIIs) é mantida e cada visão carrega apenas aquela classe
