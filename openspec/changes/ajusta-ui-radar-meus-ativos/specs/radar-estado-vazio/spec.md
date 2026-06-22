## ADDED Requirements

### Requirement: Estado vazio do Radar no padrão das telas de dividendos

Quando o Radar de proventos não tiver ativos com proventos no período, a tela SHALL exibir um bloco de estado vazio centralizado com **ícone**, **título** e **texto descritivo**, no mesmo idioma visual usado nos estados vazios das demais telas de dividendos ("Histórico de dividendos" e "Resumo de dividendos"). O bloco MUST substituir o texto solto anterior. O ícone MUST usar a cor de destaque (accent) e o título MUST usar a cor de texto primária, mantendo o restante do texto em cor secundária.

#### Scenario: Radar sem proventos no período

- **WHEN** o Radar termina de carregar e não há ativos com proventos no período
- **THEN** é exibido um bloco de estado vazio com ícone, título e texto descritivo
- **AND** o bloco segue o mesmo padrão visual dos estados vazios das telas de dividendos
- **AND** o texto solto "Nenhum ativo com proventos no período." não é mais exibido isoladamente

#### Scenario: Radar com proventos

- **WHEN** o Radar termina de carregar e há ativos com proventos no período
- **THEN** o bloco de estado vazio não é exibido
- **AND** as visualizações de cards/matriz são exibidas normalmente
